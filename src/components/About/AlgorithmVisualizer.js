import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import "./AlgorithmVisualizer.css";
import { 
  BFSVisualization, 
  DFSVisualization, 
  DijkstraVisualization,
  BellmanFordVisualization,
  FloydWarshallVisualization,
  KruskalVisualization,
  DSUVisualization,
  BipartiteVisualization
} from "./AlgorithmVisualizations";
import {
  DPVisualization,
  ModularExpVisualization,
  PrefixSuffixVisualization,
  TwoPointersVisualization,
  SlidingWindowVisualization,
  SegmentTreeVisualization,
  TreeDepthVisualization,
  SubtreeSizeVisualization,
  MeetInMiddleVisualization,
  BITVisualization
} from "./AlgorithmVisualizationsExtended";
import {
  KMPVisualization,
  RabinKarpVisualization,
  ZAlgorithmVisualization,
  ManacherVisualization,
  TrieVisualization,
  LCSVisualization
} from "./AlgorithmVisualizationsString";
import {
  getBFSData,
  getDFSData,
  getDijkstraData,
  getBellmanFordData,
  getFloydWarshallData,
  getKruskalData,
  getDSUData,
  getBipartiteData,
  getDPData,
  getModularExpData,
  getPrefixSuffixData,
  getTwoPointersData,
  getSlidingWindowData,
  getSegmentTreeData,
  getTreeDepthData,
  getSubtreeSizeData,
  getMeetInMiddleData,
  getBITData,
  getKMPData,
  getRabinKarpData,
  getZAlgorithmData,
  getManacherData,
  getTrieData,
  getLCSData
} from "./AlgorithmData";

const AlgorithmVisualizer = ({ algorithm, show, onHide }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1000); // milliseconds
  const animationRef = useRef(null);

  const algorithmData = getAlgorithmData(algorithm);

  useEffect(() => {
    if (isPlaying && currentStep < algorithmData.steps.length) {
      animationRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (currentStep >= algorithmData.steps.length) {
      setIsPlaying(false);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isPlaying, currentStep, speed, algorithmData.steps.length]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered className="algorithm-modal">
      <Modal.Header closeButton className="algorithm-modal-header">
        <Modal.Title style={{ color: "#c770f0" }}>{algorithm} 視覺化</Modal.Title>
      </Modal.Header>
      <Modal.Body className="algorithm-modal-body">
        <div className="algorithm-visualizer-container">
          {/* 演算法描述 */}
          <div className="algorithm-description">
            <h5 style={{ color: "#c770f0" }}>演算法描述</h5>
            <p>{algorithmData.description}</p>
          </div>

          {/* 視覺化區域 */}
          <div className="visualization-area">
            {renderVisualization(algorithm, currentStep, algorithmData)}
          </div>

          {/* 步驟說明 */}
          <div className="step-explanation">
            <h6 style={{ color: "#c770f0" }}>
              步驟 {Math.min(currentStep + 1, algorithmData.steps.length)} / {algorithmData.steps.length}
            </h6>
            <p>{algorithmData.steps[Math.min(currentStep, algorithmData.steps.length - 1)]?.explanation || ""}</p>
          </div>

          {/* 控制面板 */}
          <div className="control-panel">
            <ButtonGroup>
              <Button
                variant="outline-light"
                onClick={handleReset}
                disabled={currentStep === 0 && !isPlaying}
              >
                重置
              </Button>
              {!isPlaying ? (
                <Button variant="primary" onClick={handlePlay}>
                  播放
                </Button>
              ) : (
                <Button variant="warning" onClick={handlePause}>
                  暫停
                </Button>
              )}
            </ButtonGroup>

            <div className="speed-control">
              <span style={{ color: "#c770f0", marginRight: "10px" }}>速度:</span>
              <ButtonGroup>
                <Button
                  variant={speed === 2000 ? "primary" : "outline-light"}
                  size="sm"
                  onClick={() => handleSpeedChange(2000)}
                >
                  慢
                </Button>
                <Button
                  variant={speed === 1000 ? "primary" : "outline-light"}
                  size="sm"
                  onClick={() => handleSpeedChange(1000)}
                >
                  中
                </Button>
                <Button
                  variant={speed === 500 ? "primary" : "outline-light"}
                  size="sm"
                  onClick={() => handleSpeedChange(500)}
                >
                  快
                </Button>
              </ButtonGroup>
            </div>
          </div>

          {/* 複雜度資訊 */}
          <div className="complexity-info">
            <div className="complexity-item">
              <span className="complexity-label">時間複雜度:</span>
              <span className="complexity-value">{algorithmData.timeComplexity}</span>
            </div>
            <div className="complexity-item">
              <span className="complexity-label">空間複雜度:</span>
              <span className="complexity-value">{algorithmData.spaceComplexity}</span>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

// 演算法視覺化渲染函數
const renderVisualization = (algorithm, currentStep, data) => {
  const stepData = data.steps[Math.min(currentStep, data.steps.length - 1)];

  switch (algorithm) {
    case "BFS":
      return <BFSVisualization stepData={stepData} />;
    case "DFS":
      return <DFSVisualization stepData={stepData} />;
    case "Dijkstra":
      return <DijkstraVisualization stepData={stepData} />;
    case "Bellman–Ford":
      return <BellmanFordVisualization stepData={stepData} />;
    case "Floyd–Warshall":
      return <FloydWarshallVisualization stepData={stepData} />;
    case "Kruskal's MST":
      return <KruskalVisualization stepData={stepData} />;
    case "DSU":
      return <DSUVisualization stepData={stepData} />;
    case "Bipartite Check":
      return <BipartiteVisualization stepData={stepData} />;
    case "Dynamic Programming":
      return <DPVisualization stepData={stepData} />;
    case "Modular Exponentiation":
      return <ModularExpVisualization stepData={stepData} />;
    case "Prefix / Suffix":
      return <PrefixSuffixVisualization stepData={stepData} />;
    case "Two Pointers":
      return <TwoPointersVisualization stepData={stepData} />;
    case "Sliding Window":
      return <SlidingWindowVisualization stepData={stepData} />;
    case "Segment Tree":
      return <SegmentTreeVisualization stepData={stepData} />;
    case "Tree Depth":
      return <TreeDepthVisualization stepData={stepData} />;
    case "Subtree Size":
      return <SubtreeSizeVisualization stepData={stepData} />;
    case "Meet in Middle":
      return <MeetInMiddleVisualization stepData={stepData} />;
    case "BIT":
      return <BITVisualization stepData={stepData} />;
    case "KMP":
      return <KMPVisualization stepData={stepData} />;
    case "Rabin-Karp":
      return <RabinKarpVisualization stepData={stepData} />;
    case "Z-Algorithm":
      return <ZAlgorithmVisualization stepData={stepData} />;
    case "Manacher":
      return <ManacherVisualization stepData={stepData} />;
    case "Trie":
      return <TrieVisualization stepData={stepData} />;
    case "LCS":
      return <LCSVisualization stepData={stepData} />;
    default:
      return <div>演算法視覺化尚未實現</div>;
  }
};

// ========== 演算法數據生成器 ==========
function getAlgorithmData(algorithm) {
  switch (algorithm) {
    case "BFS":
      return getBFSData();
    case "DFS":
      return getDFSData();
    case "Dijkstra":
      return getDijkstraData();
    case "Bellman–Ford":
      return getBellmanFordData();
    case "Floyd–Warshall":
      return getFloydWarshallData();
    case "Kruskal's MST":
      return getKruskalData();
    case "DSU":
      return getDSUData();
    case "Bipartite Check":
      return getBipartiteData();
    case "Dynamic Programming":
      return getDPData();
    case "Modular Exponentiation":
      return getModularExpData();
    case "Prefix / Suffix":
      return getPrefixSuffixData();
    case "Two Pointers":
      return getTwoPointersData();
    case "Sliding Window":
      return getSlidingWindowData();
    case "Segment Tree":
      return getSegmentTreeData();
    case "Tree Depth":
      return getTreeDepthData();
    case "Subtree Size":
      return getSubtreeSizeData();
    case "Meet in Middle":
      return getMeetInMiddleData();
    case "BIT":
      return getBITData();
    case "KMP":
      return getKMPData();
    case "Rabin-Karp":
      return getRabinKarpData();
    case "Z-Algorithm":
      return getZAlgorithmData();
    case "Manacher":
      return getManacherData();
    case "Trie":
      return getTrieData();
    case "LCS":
      return getLCSData();
    default:
      return { description: "演算法描述", steps: [], timeComplexity: "N/A", spaceComplexity: "N/A" };
  }
}

// ========== BFS 數據 ==========
export function getBFSData() {
  return {
    description: "廣度優先搜尋 (BFS) 是一種圖形遍歷演算法，從起始節點開始，逐層訪問所有鄰居節點，使用佇列 (Queue) 來實現。",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    steps: [
      { explanation: "初始化：將起始節點 0 加入佇列", queue: [0], visited: [0], current: null, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] },
      { explanation: "從佇列取出節點 0，訪問其鄰居節點 1 和 2", queue: [1, 2], visited: [0, 1, 2], current: 0, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] },
      { explanation: "從佇列取出節點 1，訪問其未訪問的鄰居節點 3 和 4", queue: [2, 3, 4], visited: [0, 1, 2, 3, 4], current: 1, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] },
      { explanation: "從佇列取出節點 2，所有鄰居都已訪問", queue: [3, 4], visited: [0, 1, 2, 3, 4], current: 2, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] },
      { explanation: "從佇列取出節點 3，所有鄰居都已訪問", queue: [4], visited: [0, 1, 2, 3, 4], current: 3, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] },
      { explanation: "從佇列取出節點 4，所有鄰居都已訪問，BFS 完成", queue: [], visited: [0, 1, 2, 3, 4], current: 4, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] }
    ]
  };
}

// ========== DFS 數據 ==========
export function getDFSData() {
  return {
    description: "深度優先搜尋 (DFS) 是一種圖形遍歷演算法，從起始節點開始，沿著一條路徑盡可能深入，直到無法繼續為止，然後回溯。使用堆疊 (Stack) 或遞迴來實現。",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    steps: [
      { explanation: "初始化：從節點 0 開始 DFS", stack: [0], visited: [0], current: 0, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] },
      { explanation: "訪問節點 0 的第一個鄰居節點 1", stack: [0, 1], visited: [0, 1], current: 1, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] },
      { explanation: "訪問節點 1 的第一個未訪問鄰居節點 3", stack: [0, 1, 3], visited: [0, 1, 3], current: 3, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] },
      { explanation: "節點 3 無未訪問鄰居，回溯到節點 1", stack: [0, 1], visited: [0, 1, 3], current: 1, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] },
      { explanation: "訪問節點 1 的下一個未訪問鄰居節點 4", stack: [0, 1, 4], visited: [0, 1, 3, 4], current: 4, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] },
      { explanation: "節點 4 的鄰居節點 2 尚未訪問", stack: [0, 1, 4, 2], visited: [0, 1, 3, 4, 2], current: 2, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] },
      { explanation: "所有節點都已訪問，DFS 完成", stack: [], visited: [0, 1, 3, 4, 2], current: null, graph: [[1, 2], [0, 3, 4], [0, 4], [1], [1, 2]] }
    ]
  };
}

// ========== Dijkstra 數據 ==========
export function getDijkstraData() {
  return {
    description: "Dijkstra 演算法用於找到從起點到所有其他節點的最短路徑。適用於非負權重的圖。使用優先佇列來選擇當前距離最小的節點。",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    steps: [
      { explanation: "初始化：起點距離為 0，其他節點距離為無限大", distances: [0, Infinity, Infinity, Infinity, Infinity], current: 0, visited: [] },
      { explanation: "處理節點 0，更新鄰居節點 1 和 2 的距離", distances: [0, 4, 2, Infinity, Infinity], current: 0, visited: [0] },
      { explanation: "選擇距離最小的未訪問節點 2，更新其鄰居", distances: [0, 3, 2, 7, 8], current: 2, visited: [0, 2] },
      { explanation: "選擇節點 1，更新鄰居節點 3 和 4", distances: [0, 3, 2, 7, 7], current: 1, visited: [0, 2, 1] },
      { explanation: "選擇節點 3，無需更新", distances: [0, 3, 2, 7, 7], current: 3, visited: [0, 2, 1, 3] },
      { explanation: "選擇節點 4，演算法完成", distances: [0, 3, 2, 7, 7], current: 4, visited: [0, 2, 1, 3, 4] }
    ]
  };
}

export default AlgorithmVisualizer;
