import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  const [atcoderRating, setAtcoderRating] = useState("Loading...");
  const [atcoderColor, setAtcoderColor] = useState("#90EE90");
  const [codeforcesRating, setCodeforcesRating] = useState("Loading...");
  const [codeforcesColor, setCodeforcesColor] = useState("#90EE90");

  // AtCoder rating color function
  const getAtCoderColor = (rating) => {
    if (rating >= 2800) return "#FF0000"; // Red (target)
    if (rating >= 2400) return "#FF8000"; // Orange
    if (rating >= 2000) return "#C0C000"; // Yellow
    if (rating >= 1600) return "#0000FF"; // Blue
    if (rating >= 1200) return "#00C0C0"; // Cyan
    if (rating >= 800) return "#008000"; // Green
    if (rating >= 400) return "#804000"; // Brown
    return "#808080"; // Gray
  };

  // Codeforces rating color function
  const getCodeforcesColor = (rating) => {
    if (rating >= 3000) return "#FF0000"; // Legendary Grandmaster (red/black)
    if (rating >= 2600) return "#FF0000"; // International Grandmaster (red)
    if (rating >= 2400) return "#FF0000"; // Grandmaster (red)
    if (rating >= 2300) return "#FF8C00"; // International Master (orange)
    if (rating >= 2100) return "#FF8C00"; // Master (orange)
    if (rating >= 1900) return "#AA00AA"; // Candidate Master (violet)
    if (rating >= 1600) return "#0000FF"; // Expert (blue)
    if (rating >= 1400) return "#03A89E"; // Specialist (cyan)
    if (rating >= 1200) return "#008000"; // Pupil (green)
    return "#808080"; // Newbie (gray)
  };

  useEffect(() => {
    // Fetch AtCoder rating - 使用 CORS 代理
    const fetchAtCoderRating = async () => {
      try {
        // 使用 corsproxy.io 作為代理
        const proxyUrl = 'https://corsproxy.io/?';
        const apiUrl = 'https://atcoder.jp/users/friedturtleee/history/json';
        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const rating = data[data.length - 1].NewRating;
            setAtcoderRating(rating);
            setAtcoderColor(getAtCoderColor(rating));
            return;
          }
        }
        
        // 如果失敗，嘗試備用代理
        try {
          const backupProxy = 'https://api.codetabs.com/v1/proxy?quest=';
          const backupResponse = await fetch(backupProxy + encodeURIComponent(apiUrl));
          const backupData = await backupResponse.json();
          
          if (backupData && backupData.length > 0) {
            const rating = backupData[backupData.length - 1].NewRating;
            setAtcoderRating(rating);
            setAtcoderColor(getAtCoderColor(rating));
            return;
          }
        } catch (backupError) {
          console.log('備用代理也失敗:', backupError);
        }
        
        // 所有方法都失敗
        setAtcoderRating("N/A");
        setAtcoderColor("#808080");
      } catch (error) {
        console.log('AtCoder API 失敗:', error);
        setAtcoderRating("N/A");
        setAtcoderColor("#808080");
      }
    };

    fetchAtCoderRating();

    // Fetch Codeforces rating
    fetch("https://codeforces.com/api/user.info?handles=friedturtleee")
      .then(response => response.json())
      .then(data => {
        if (data.status === "OK" && data.result.length > 0) {
          const rating = data.result[0].rating;
          setCodeforcesRating(rating);
          setCodeforcesColor(getCodeforcesColor(rating));
        } else {
          setCodeforcesRating("N/A");
          setCodeforcesColor("#808080");
        }
      })
      .catch(() => {
        setCodeforcesRating("N/A");
        setCodeforcesColor("#808080");
      });
  }, []);

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              <strong>LET ME <span className="purple">INTRODUCE</span> MYSELF</strong>
            </h1>
            <p className="home-about-body">
              我是一名具備程式競賽背景的開發者，長期投入於演算法與資料結構相關競賽，累積了紮實的邏輯思維能力與高效的問題解決能力。
              <br />
              <br />
              除競賽之外，我亦專注於實際專案開發，善於將競賽中訓練出的分析能力與最佳化思維，應用於系統設計與程式實作中。
              <br />
              <br />
              在開發過程中，我結合 AI 工具進行輔助，以兼顧程式品質、開發效率與整體可維護性，致力於打造穩定且具延展性的解決方案。
            </p>
            <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}>
              <p style={{ fontSize: "1.5em", marginBottom: "20px" }}>
                目前我的 AtCoder 積分為{" "}
                <span style={{ color: atcoderColor, fontWeight: "bold", fontSize: "1.3em" }}>
                  {atcoderRating}
                </span>
                、CodeForces 積分為{" "}
                <span style={{ color: codeforcesColor, fontWeight: "bold", fontSize: "1.3em" }}>
                  {codeforcesRating}
                </span>
                。
              </p>
            </div>
            <p className="home-about-body">
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
