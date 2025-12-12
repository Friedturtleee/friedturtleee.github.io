import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import { auth, googleProvider, db } from "../../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import Particle from "../Particle";
import { AiOutlineGoogle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

function Blog() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  const ADMIN_EMAIL = "friedturtleee@gmail.com";
  const isAdmin = user?.email === ADMIN_EMAIL;

  // Google 登入
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("登入失敗:", error);
      alert("登入失敗，請稍後再試");
    }
  };

  // 登出
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("登出失敗:", error);
    }
  };

  // 載入部落格文章
  const loadBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const blogsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogsData);
    } catch (error) {
      console.error("載入部落格失敗:", error);
    }
  };

  // 發布部落格
  const handlePublishBlog = async () => {
    if (!newBlog.title.trim() || !newBlog.content.trim()) {
      alert("請填寫標題和內容");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "blogs"), {
        title: newBlog.title,
        content: newBlog.content,
        author: user.displayName || user.email,
        authorEmail: user.email,
        createdAt: new Date().toISOString()
      });
      setNewBlog({ title: "", content: "" });
      setShowModal(false);
      await loadBlogs();
      alert("發布成功！");
    } catch (error) {
      console.error("發布失敗:", error);
      alert("發布失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  // 刪除部落格
  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("確定要刪除這篇文章嗎？")) return;

    try {
      await deleteDoc(doc(db, "blogs", blogId));
      await loadBlogs();
      alert("刪除成功！");
    } catch (error) {
      console.error("刪除失敗:", error);
      alert("刪除失敗，請稍後再試");
    }
  };

  // 監聽登入狀態
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 載入部落格
  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Blog</strong>
        </h1>
        <p style={{ color: "white" }}>
          分享我的學習心得與技術筆記
        </p>

        {/* 登入/登出按鈕 */}
        <div style={{ textAlign: "right", marginBottom: "30px", position: "relative", zIndex: 10 }}>
          {user ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "white" }}>
                歡迎,{user.displayName || user.email}
              </span>
              {isAdmin && (
                <Button
                  onClick={() => setShowModal(true)}
                  className="blog-btn blog-btn-primary"
                >
                  發布新文章
                </Button>
              )}
              <Button 
                onClick={handleSignOut}
                className="blog-btn blog-btn-outline"
              >
                登出
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleGoogleSignIn}
              className="blog-btn blog-btn-google"
            >
              <AiOutlineGoogle size={20} /> 使用 Google 登入
            </Button>
          )}
        </div>

        {/* 部落格列表 */}
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {blogs.length === 0 ? (
            <Col md={12}>
              <Card className="blog-card-view">
                <Card.Body>
                  <Card.Text style={{ textAlign: "center", color: "#888" }}>
                    目前還沒有文章
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            blogs.map((blog) => (
              <Col md={12} key={blog.id} style={{ marginBottom: "20px" }}>
                <Card className="blog-card-view">
                  <Card.Body>
                    <Card.Title style={{ color: "#c770f0", fontSize: "1.8em" }}>
                      {blog.title}
                    </Card.Title>
                    <Card.Text style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>
                      {blog.content}
                    </Card.Text>
                    <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <small style={{ color: "#888" }}>
                          作者: {blog.author} | 發布時間: {new Date(blog.createdAt).toLocaleString('zh-TW')}
                        </small>
                      </div>
                      {isAdmin && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteBlog(blog.id)}
                        >
                          <MdDelete /> 刪除
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        {/* 發布文章 Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton style={{ backgroundColor: "#1a1a2e", color: "white" }}>
            <Modal.Title>發布新文章</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#1a1a2e" }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "white" }}>標題</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="輸入文章標題"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  style={{ backgroundColor: "#16213e", color: "white", border: "1px solid #c770f0" }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "white" }}>內容</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="輸入文章內容"
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  style={{ backgroundColor: "#16213e", color: "white", border: "1px solid #c770f0" }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#1a1a2e" }}>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              取消
            </Button>
            <Button 
              variant="primary" 
              onClick={handlePublishBlog}
              disabled={loading}
            >
              {loading ? "發布中..." : "發布"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
}

export default Blog;
