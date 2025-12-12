import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi 大家好！
            <br />
            我是來自台灣的 <strong><span className="purple">friedturtleee</span></strong>，
            <br />
            我現在是一名就讀<strong><span className="purple"> 板橋高中 </span></strong>的學生。
            <br />
            <br />
            除了競程，我也喜歡開發一些網頁，以及遊玩策略性遊戲。
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> <strong>遊玩 Minecraft</strong>
            </li>
            <li className="about-activity">
              <ImPointRight /> <strong>研究 Tetris 策略</strong>
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "AI makes life smarter , but also harder."{" "}
          </p>
          <footer className="blockquote-footer">friedturtleee</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
