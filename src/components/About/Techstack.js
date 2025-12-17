import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import AlgorithmVisualizer from "./AlgorithmVisualizer";

function Techstack() {
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  const algorithms = [
    "BFS", "DFS", "Dijkstra", "Bellman–Ford", "Floyd–Warshall",
    "Kruskal's MST", "DSU", "Bipartite Check", "Dynamic Programming",
    "Modular Exponentiation", "Prefix / Suffix", "Two Pointers",
    "Sliding Window", "Segment Tree", "Tree Depth", "Subtree Size",
    "Meet in Middle", "BIT", "KMP", "Rabin-Karp", "Z-Algorithm",
    "Manacher", "Trie", "LCS"
  ];

  const handleAlgorithmClick = (algo) => {
    setSelectedAlgorithm(algo);
    setShowVisualizer(true);
  };

  return (
    <>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {algorithms.map((algo, index) => (
          <Col 
            xs={4} 
            md={2} 
            key={index} 
            className="tech-icons"
            onClick={() => handleAlgorithmClick(algo)}
            style={{ cursor: "pointer" }}
          >
            <div className="tech-icons-text" style={{ marginLeft: 0, justifyContent: "center" }}>
              {algo}
            </div>
          </Col>
        ))}
      </Row>

      {/* 演算法視覺化 Modal */}
      <AlgorithmVisualizer
        algorithm={selectedAlgorithm}
        show={showVisualizer}
        onHide={() => setShowVisualizer(false)}
      />
    </>
  );
}

export default Techstack;
