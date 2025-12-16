import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Modal, Badge } from "react-bootstrap";
import { auth, googleProvider, db } from "../../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc, writeBatch } from "firebase/firestore";
import Particle from "../Particle";
import { AiOutlineGoogle, AiOutlineEdit } from "react-icons/ai";
import { MdDelete, MdAttachFile, MdFileDownload } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

function Blog() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);

  const ADMIN_EMAIL = "friedturtleee@gmail.com";
  const isAdmin = user?.email === ADMIN_EMAIL;

  // Google 登入
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      console.log("登入成功:", result.user);
    } catch (error) {
      console.error("登入失敗詳細錯誤:", error);
      console.error("錯誤代碼:", error.code);
      console.error("錯誤訊息:", error.message);
      
      let errorMessage = "登入失敗：";
      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage += "您關閉了登入視窗";
          break;
        case "auth/popup-blocked":
          errorMessage += "彈出視窗被瀏覽器封鎖，請允許彈出視窗";
          break;
        case "auth/unauthorized-domain":
          errorMessage += "此網域未在 Firebase 授權列表中，請在 Firebase Console 中新增授權網域";
          break;
        case "auth/operation-not-allowed":
          errorMessage += "Google 登入未啟用，請在 Firebase Console 中啟用 Google 身份驗證";
          break;
        case "auth/network-request-failed":
          errorMessage += "網路連線失敗，請檢查網路連線";
          break;
        default:
          errorMessage += error.message || "請稍後再試";
      }
      alert(errorMessage);
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
      if (editingBlog) {
        // 更新現有文章
        const uploadedAttachments = await uploadAttachments(editingBlog.id);
        await updateDoc(doc(db, "blogs", editingBlog.id), {
          title: newBlog.title,
          content: newBlog.content,
          attachments: uploadedAttachments.length > 0 ? uploadedAttachments : editingBlog.attachments,
          updatedAt: new Date().toISOString()
        });
        alert("更新成功！");
      } else {
        // 先新增文章以獲取 ID
        const docRef = await addDoc(collection(db, "blogs"), {
          title: newBlog.title,
          content: newBlog.content,
          author: user.displayName || user.email,
          authorEmail: user.email,
          attachments: [],
          createdAt: new Date().toISOString()
        });
        
        // 上傳附件
        const uploadedAttachments = await uploadAttachments(docRef.id);
        
        // 更新文章附件資訊
        if (uploadedAttachments.length > 0) {
          await updateDoc(doc(db, "blogs", docRef.id), {
            attachments: uploadedAttachments
          });
        }
        
        alert("發布成功！");
      }

      setNewBlog({ title: "", content: "" });
      setAttachments([]);
      setEditingBlog(null);
      setShowModal(false);
      await loadBlogs();
    } catch (error) {
      console.error("操作失敗:", error);
      alert("操作失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  // 上傳附件（轉換為 base64 並分塊存儲）
  const uploadAttachments = async (blogId) => {
    if (attachments.length === 0) return [];

    setUploadingFiles(true);
    const uploadedFiles = [];

    try {
      for (const file of attachments) {
        // 限制文件大小為 15MB
        if (file.size > 15 * 1024 * 1024) {
          alert(`檔案 ${file.name} 超過 15MB 限制，已跳過`);
          continue;
        }

        const fileId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const base64 = await convertToBase64(file);
        
        // 分塊大小：500KB （更小的分塊以降低單次寫入負擔）
        const chunkSize = 500 * 1024;
        const chunks = [];
        
        for (let i = 0; i < base64.length; i += chunkSize) {
          chunks.push(base64.slice(i, i + chunkSize));
        }

        // 使用批次寫入，每 10 個分塊一批
        const batchSize = 10;
        for (let i = 0; i < chunks.length; i += batchSize) {
          const batch = writeBatch(db);
          const batchChunks = chunks.slice(i, i + batchSize);
          
          for (let j = 0; j < batchChunks.length; j++) {
            const chunkIndex = i + j;
            const chunkRef = doc(db, `blogs/${blogId}/attachments/${fileId}/chunks/chunk_${chunkIndex}`);
            batch.set(chunkRef, {
              data: batchChunks[j],
              index: chunkIndex
            });
          }
          
          await batch.commit();
          
          // 添加延遲以避免超載 Firestore
          if (i + batchSize < chunks.length) {
            await new Promise(resolve => setTimeout(resolve, 300));
          }
        }

        uploadedFiles.push({
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          chunks: chunks.length
        });
      }
    } catch (error) {
      console.error("檔案處理失敗:", error);
      alert("檔案處理失敗，請稍後再試");
    } finally {
      setUploadingFiles(false);
    }

    return uploadedFiles;
  };

  // 將文件轉換為 base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // 處理檔案選擇
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  // 移除附件
  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // 處理附件下載（從 Firestore 重組文件）
  const handleDownloadAttachment = async (file, blogId) => {
    try {
      // 獲取所有分塊
      const chunksQuery = query(
        collection(db, `blogs/${blogId}/attachments/${file.id}/chunks`),
        orderBy("index")
      );
      const chunksSnapshot = await getDocs(chunksQuery);
      
      // 重組 base64
      let base64 = '';
      chunksSnapshot.docs.forEach(doc => {
        base64 += doc.data().data;
      });

      // 創建下載連結
      const link = document.createElement('a');
      link.href = base64;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('下載失敗:', error);
      alert('下載失敗，請稍後再試');
    }
  };

  // 開始編輯
  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setNewBlog({ title: blog.title, content: blog.content });
    setAttachments([]);
    setShowModal(true);
  };

  // 關閉 Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBlog(null);
    setNewBlog({ title: "", content: "" });
    setAttachments([]);
  };

  // 刪除部落格
  const handleDeleteBlog = async (blogId, attachments = []) => {
    if (!window.confirm("確定要刪除這篇文章嗎？")) return;

    try {
      // 刪除所有附件的分塊
      for (const attachment of attachments) {
        try {
          const chunksQuery = query(collection(db, `blogs/${blogId}/attachments/${attachment.id}/chunks`));
          const chunksSnapshot = await getDocs(chunksQuery);
          
          for (const chunkDoc of chunksSnapshot.docs) {
            await deleteDoc(chunkDoc.ref);
          }
        } catch (error) {
          console.error("刪除附件分塊失敗:", error);
        }
      }

      // 刪除文章
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
                    <div className="blog-markdown-content" style={{ textAlign: "left" }}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      >
                        {blog.content}
                      </ReactMarkdown>
                    </div>
                    
                    {/* 附件區域 */}
                    {blog.attachments && blog.attachments.length > 0 && (
                      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "8px" }}>
                        <h6 style={{ color: "#c770f0", marginBottom: "10px" }}>
                          <MdAttachFile /> 附件 ({blog.attachments.length})
                        </h6>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                          {blog.attachments.map((file, index) => (
                            <Badge
                              key={index}
                              bg="secondary"
                              style={{
                                padding: "8px 12px",
                                fontSize: "0.9em",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                transition: "all 0.3s ease",
                                backgroundColor: "#6c757d",
                                border: "none"
                              }}
                              onClick={() => handleDownloadAttachment(file, blog.id)}
                            >
                              <MdFileDownload size={16} />
                              {file.name}
                              {file.size && ` (${(file.size / 1024 / 1024).toFixed(2)} MB)`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <small style={{ color: "#888" }}>
                          作者: {blog.author} | 發布時間: {new Date(blog.createdAt).toLocaleString('zh-TW')}
                          {blog.updatedAt && ` | 更新時間: ${new Date(blog.updatedAt).toLocaleString('zh-TW')}`}
                        </small>
                      </div>
                      {isAdmin && (
                        <div style={{ display: "flex", gap: "10px" }}>
                          <Button
                            variant="info"
                            size="sm"
                            onClick={() => handleEditBlog(blog)}
                          >
                            <AiOutlineEdit /> 編輯
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteBlog(blog.id, blog.attachments || [])}
                          >
                            <MdDelete /> 刪除
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        {/* 發布文章 Modal */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton style={{ backgroundColor: "#1a1a2e", color: "white" }}>
            <Modal.Title>{editingBlog ? "編輯文章" : "發布新文章"}</Modal.Title>
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
                <Form.Label style={{ color: "white" }}>
                  內容 <small style={{ color: "#888" }}>(支援 Markdown 語法)</small>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="輸入文章內容，支援 Markdown 格式：&#10;# 標題&#10;**粗體** *斜體*&#10;- 列表&#10;[連結](url)&#10;```程式碼```"
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  style={{ backgroundColor: "#16213e", color: "white", border: "1px solid #c770f0", fontFamily: "monospace" }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "white" }}>
                  <MdAttachFile /> 附件（單個文件最大 15MB）
                </Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ backgroundColor: "#16213e", color: "white", border: "1px solid #c770f0" }}
                />
                {attachments.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    {attachments.map((file, index) => (
                      <Badge
                        key={index}
                        bg="secondary"
                        style={{ margin: "5px", padding: "8px 12px", fontSize: "0.9em", display: "inline-flex", alignItems: "center", gap: "8px" }}
                      >
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                        <span
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                          onClick={() => removeAttachment(index)}
                        >
                          ✕
                        </span>
                      </Badge>
                    ))}
                  </div>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#1a1a2e" }}>
            <Button variant="secondary" onClick={handleCloseModal}>
              取消
            </Button>
            <Button 
              variant="primary" 
              onClick={handlePublishBlog}
              disabled={loading || uploadingFiles}
            >
              {loading || uploadingFiles ? "處理中..." : editingBlog ? "更新" : "發布"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
}

export default Blog;
