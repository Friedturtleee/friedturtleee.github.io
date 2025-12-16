import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { AiFillGithub } from "react-icons/ai";

function ResumeNew() {
  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Container>
          <Row style={{ justifyContent: "center", paddingTop: "50px", paddingBottom: "50px" }}>
            <Col md={12} style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "2.6em", paddingBottom: "20px" }}>
                <strong className="purple">Credits</strong>
              </h1>
              <p style={{ fontSize: "1.2em", paddingTop: "20px", paddingBottom: "20px" }}>
                This portfolio template is created by
              </p>
              <h2 style={{ fontSize: "2em", paddingBottom: "20px" }}>
                <a
                  href="https://github.com/soumyajit4419/Portfolio"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <AiFillGithub style={{ marginBottom: "5px" }} />
                  {" "}Soumyajit Behera
                </a>
              </h2>
              <p style={{ fontSize: "1.1em", paddingTop: "20px" }}>
                Check out the original template at:
              </p>
              <a
                href="https://github.com/soumyajit4419/Portfolio"
                target="_blank"
                rel="noreferrer"
                className="purple"
                style={{ fontSize: "1.2em" }}
              >
                github.com/soumyajit4419/Portfolio
              </a>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default ResumeNew;
