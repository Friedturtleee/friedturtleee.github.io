import React from "react";
import { Col, Row } from "react-bootstrap";

function Techstack() {
  const algorithms = [
    "BFS", "DFS", "Dijkstra", "Bellman–Ford", "Floyd–Warshall",
    "Kruskal's MST", "DSU", "Bipartite Check", "Dynamic Programming",
    "Modular Exponentiation", "Prefix / Suffix", "Two Pointers",
    "Sliding Window", "Segment Tree", "Tree Depth", "Subtree Size",
    "Meet in Middle", "BIT"
  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {algorithms.map((algo, index) => (
        <Col xs={4} md={2} key={index} className="tech-icons">
          <div className="tech-icons-text" style={{ marginLeft: 0, justifyContent: "center" }}>{algo}</div>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;
