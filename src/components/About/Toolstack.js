import React from "react";
import { Col, Row } from "react-bootstrap";
import Python from "../../Assets/TechIcons/Python.svg";
import C from "../../Assets/TechIcons/C++.svg";
import CommandBlock from "../../Assets/TechIcons/Command Block.svg";
import Javascript from "../../Assets/TechIcons/Javascript.svg";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Python} alt="Python" className="tech-icon-images" />
        <div className="tech-icons-text">Python</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={C} alt="C++" className="tech-icon-images" />
        <div className="tech-icons-text">C++</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={CommandBlock} alt="Command Block" className="tech-icon-images" />
        <div className="tech-icons-text">CBL</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <img src={Javascript} alt="JavaScript" className="tech-icon-images" />
        <div className="tech-icons-text">JavaScript</div>
      </Col>
    </Row>
  );
}

export default Toolstack;
