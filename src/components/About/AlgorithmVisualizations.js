import React from "react";

// ========== 圖論演算法視覺化組件 ==========

// BFS 視覺化
export const BFSVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { graph, visited, queue, current } = stepData;
  const nodes = graph.length;

  // 節點位置（圓形排列）
  const getNodePosition = (index) => {
    const angle = (index / nodes) * 2 * Math.PI - Math.PI / 2;
    const radius = 80;
    return {
      x: 150 + radius * Math.cos(angle),
      y: 120 + radius * Math.sin(angle)
    };
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "15px" }}>
      {/* 圖形顯示區域 */}
      <div style={{ position: "relative", width: "100%", paddingTop: "50%", marginBottom: "10px" }}>
        {/* 繪製邊 */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 300 240">
          {graph.map((neighbors, u) =>
            neighbors.map((v, idx) => {
              if (u < v) { // 避免重複繪製
                const posU = getNodePosition(u);
                const posV = getNodePosition(v);
                return (
                  <line
                    key={`edge-${u}-${v}-${idx}`}
                    x1={posU.x}
                    y1={posU.y}
                    x2={posV.x}
                    y2={posV.y}
                    stroke="rgba(199, 112, 240, 0.5)"
                    strokeWidth="2"
                  />
                );
              }
              return null;
            })
          )}
        </svg>

        {/* 繪製節點 */}
        {Array.from({ length: nodes }, (_, i) => {
          const pos = getNodePosition(i);
          const isVisited = visited.includes(i);
          const isCurrent = current === i;
          const inQueue = queue.includes(i);

          let bgColor = "#1a1a2e";
          let borderColor = "#c770f0";
          let shadow = "none";

          if (isCurrent) {
            bgColor = "#ff6b6b";
            borderColor = "#ff6b6b";
            shadow = "0 0 15px #ff6b6b";
          } else if (isVisited) {
            bgColor = "#c770f0";
            borderColor = "#c770f0";
          } else if (inQueue) {
            bgColor = "#4ecdc4";
            borderColor = "#4ecdc4";
          }

          return (
            <div
              key={`node-${i}`}
              style={{
                position: "absolute",
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: "translate(-50%, -50%)",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: bgColor,
                border: `2px solid ${borderColor}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.9em",
                boxShadow: shadow,
                transition: "all 0.3s ease",
                zIndex: 2
              }}
            >
              {i}
            </div>
          );
        })}
      </div>

      {/* 佇列顯示 */}
      <div style={{ width: "100%", padding: "10px", backgroundColor: "rgba(199, 112, 240, 0.1)", borderRadius: "8px" }}>
        <div style={{ textAlign: "center", color: "#c770f0", marginBottom: "8px", fontSize: "0.9em", fontWeight: "bold" }}>
          佇列 (Queue)
        </div>
        <div style={{ 
          display: "flex", 
          gap: "8px", 
          justifyContent: "center", 
          flexWrap: "wrap",
          minHeight: "50px",
          alignItems: "center"
        }}>
          {queue.length === 0 ? (
            <span style={{ color: "#888" }}>空</span>
          ) : (
            queue.map((node, idx) => (
              <div 
                key={`queue-${idx}`} 
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#4ecdc4",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "0.9em",
                  color: "white",
                  border: "2px solid #3bb8b0",
                  flexShrink: 0
                }}
              >
                {node}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// DFS 視覺化
export const DFSVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { graph, visited, stack, current } = stepData;
  const nodes = graph.length;

  const getNodePosition = (index) => {
    const angle = (index / nodes) * 2 * Math.PI - Math.PI / 2;
    const radius = 80;
    return {
      x: 150 + radius * Math.cos(angle),
      y: 120 + radius * Math.sin(angle)
    };
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "15px" }}>
      {/* 圖形顯示區域 */}
      <div style={{ position: "relative", width: "100%", paddingTop: "50%", marginBottom: "10px" }}>
        {/* 繪製邊 */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 300 240">
          {graph.map((neighbors, u) =>
            neighbors.map((v, idx) => {
              if (u < v) {
                const posU = getNodePosition(u);
                const posV = getNodePosition(v);
                return (
                  <line
                    key={`edge-${u}-${v}-${idx}`}
                    x1={posU.x}
                    y1={posU.y}
                    x2={posV.x}
                    y2={posV.y}
                    stroke="rgba(199, 112, 240, 0.5)"
                    strokeWidth="2"
                  />
                );
              }
              return null;
            })
          )}
        </svg>

        {/* 繪製節點 */}
        {Array.from({ length: nodes }, (_, i) => {
          const pos = getNodePosition(i);
          const isVisited = visited.includes(i);
          const isCurrent = current === i;
          const inStack = stack.includes(i);

          let bgColor = "#1a1a2e";
          let borderColor = "#c770f0";
          let shadow = "none";

          if (isCurrent) {
            bgColor = "#ff6b6b";
            borderColor = "#ff6b6b";
            shadow = "0 0 15px #ff6b6b";
          } else if (isVisited) {
            bgColor = "#c770f0";
            borderColor = "#c770f0";
          } else if (inStack) {
            bgColor = "#ff9f43";
            borderColor = "#ff9f43";
          }

          return (
            <div
              key={`node-${i}`}
              style={{
                position: "absolute",
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: "translate(-50%, -50%)",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: bgColor,
                border: `2px solid ${borderColor}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.9em",
                boxShadow: shadow,
                transition: "all 0.3s ease",
                zIndex: 2
              }}
            >
              {i}
            </div>
          );
        })}
      </div>

      {/* 堆疊顯示 */}
      <div style={{ width: "100%", padding: "10px", backgroundColor: "rgba(255, 107, 107, 0.1)", borderRadius: "8px" }}>
        <div style={{ textAlign: "center", color: "#ff6b6b", marginBottom: "8px", fontSize: "0.9em", fontWeight: "bold" }}>
          堆疊 (Stack)
        </div>
        <div style={{ 
          display: "flex", 
          flexDirection: "column-reverse",
          gap: "6px", 
          justifyContent: "flex-end", 
          alignItems: "center",
          minHeight: "50px",
          maxHeight: "150px",
          overflowY: "auto"
        }}>
          {stack.length === 0 ? (
            <span style={{ color: "#888" }}>空</span>
          ) : (
            stack.map((node, idx) => (
              <div 
                key={`stack-${idx}`} 
                style={{
                  width: "70px",
                  height: "35px",
                  backgroundColor: "#ff6b6b",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "0.9em",
                  color: "white",
                  border: "2px solid #ff5252",
                  flexShrink: 0
                }}
              >
                {node}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Dijkstra 視覺化
export const DijkstraVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { distances, current, visited, graph } = stepData;
  const nodes = distances.length;

  // 節點位置（圓形排列）
  const getNodePosition = (index) => {
    const angle = (index / nodes) * 2 * Math.PI - Math.PI / 2;
    const radius = 80;
    return {
      x: 150 + radius * Math.cos(angle),
      y: 120 + radius * Math.sin(angle)
    };
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      {/* 圖形顯示區域 */}
      {graph && (
        <div style={{ position: "relative", width: "100%", paddingTop: "50%", marginBottom: "15px" }}>
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 300 240">
            {/* 繪製邊和權重 */}
            {graph.map((neighbors, u) =>
              neighbors.map(([v, weight], idx) => {
                if (u < v) {
                  const posU = getNodePosition(u);
                  const posV = getNodePosition(v);
                  const midX = (posU.x + posV.x) / 2;
                  const midY = (posU.y + posV.y) / 2;
                  const isActive = (visited.includes(u) && visited.includes(v));
                  
                  return (
                    <g key={`edge-${u}-${v}-${idx}`}>
                      <line
                        x1={posU.x}
                        y1={posU.y}
                        x2={posV.x}
                        y2={posV.y}
                        stroke={isActive ? "#c770f0" : "rgba(199, 112, 240, 0.3)"}
                        strokeWidth={isActive ? "3" : "2"}
                      />
                      <circle cx={midX} cy={midY} r="10" fill="#1a1a2e" stroke="#4ecdc4" strokeWidth="1.5" />
                      <text x={midX} y={midY + 4} textAnchor="middle" fill="#4ecdc4" fontSize="11" fontWeight="bold">
                        {weight}
                      </text>
                    </g>
                  );
                }
                return null;
              })
            )}
            
            {/* 繪製節點 */}
            {Array.from({ length: nodes }, (_, i) => {
              const pos = getNodePosition(i);
              const isVisited = visited.includes(i);
              const isCurrent = current === i;
              
              let fillColor = "#1a1a2e";
              let strokeColor = "#c770f0";
              
              if (isCurrent) {
                fillColor = "#ff6b6b";
                strokeColor = "#ff6b6b";
              } else if (isVisited) {
                fillColor = "#c770f0";
                strokeColor = "#c770f0";
              }

              return (
                <g key={`node-${i}`}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="18"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="2"
                    style={{
                      filter: isCurrent ? "drop-shadow(0 0 8px #ff6b6b)" : "none",
                      transition: "all 0.3s ease"
                    }}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize="13"
                    fontWeight="bold"
                  >
                    {i}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      <div style={{ marginBottom: "20px", textAlign: "center", color: "#c770f0" }}>
        距離陣列
      </div>
      <div className="array-container">
        {distances.map((dist, idx) => {
          const isInfinity = dist === Infinity;
          const isCurrent = current === idx;
          const isVisited = visited.includes(idx);

          return (
            <div key={`dist-${idx}`} className="array-element" style={{ position: "relative" }}>
              <div style={{ 
                backgroundColor: isCurrent ? "#ff6b6b" : isVisited ? "#c770f0" : "transparent",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "8px",
                zIndex: -1,
                transition: "all 0.3s ease"
              }} />
              <div style={{ fontSize: "0.8em", color: "#aaa" }}>節點 {idx}</div>
              <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                {isInfinity ? "∞" : dist}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Bellman-Ford 視覺化
export const BellmanFordVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { distances, edges, iteration, nodes = 4 } = stepData;

  // 節點位置（圓形排列）
  const getNodePosition = (index) => {
    const angle = (index / nodes) * 2 * Math.PI - Math.PI / 2;
    const radius = 70;
    return {
      x: 150 + radius * Math.cos(angle),
      y: 110 + radius * Math.sin(angle)
    };
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      {/* 圖形顯示區域 */}
      <div style={{ position: "relative", width: "100%", paddingTop: "45%", marginBottom: "15px" }}>
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 300 220">
          {/* 繪製邊和權重 */}
          {edges.map(([u, v, weight], idx) => {
            const posU = getNodePosition(u);
            const posV = getNodePosition(v);
            const midX = (posU.x + posV.x) / 2;
            const midY = (posU.y + posV.y) / 2;
            const isNegative = weight < 0;
            
            return (
              <g key={`edge-${idx}`}>
                <defs>
                  <marker id={`arrow-${idx}`} markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill={isNegative ? "#ff6b6b" : "#c770f0"} />
                  </marker>
                </defs>
                <line
                  x1={posU.x}
                  y1={posU.y}
                  x2={posV.x}
                  y2={posV.y}
                  stroke={isNegative ? "#ff6b6b" : "rgba(199, 112, 240, 0.5)"}
                  strokeWidth="2"
                  markerEnd={`url(#arrow-${idx})`}
                  style={{ transition: "all 0.5s ease" }}
                />
                <circle cx={midX} cy={midY} r="10" fill="#1a1a2e" stroke={isNegative ? "#ff6b6b" : "#4ecdc4"} strokeWidth="1.5" style={{ transition: "all 0.5s ease" }} />
                <text x={midX} y={midY + 4} textAnchor="middle" fill={isNegative ? "#ff6b6b" : "#4ecdc4"} fontSize="11" fontWeight="bold">
                  {weight}
                </text>
              </g>
            );
          })}
          
          {/* 繪製節點 */}
          {Array.from({ length: nodes }, (_, i) => {
            const pos = getNodePosition(i);
            const isSource = i === 0;
            
            return (
              <g key={`node-${i}`}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="18"
                  fill={isSource ? "#51cf66" : "#1a1a2e"}
                  stroke={isSource ? "#51cf66" : "#c770f0"}
                  strokeWidth="2"
                  style={{ transition: "all 0.5s ease" }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="bold"
                >
                  {i}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <span style={{ color: "#c770f0", fontSize: "1.1em" }}>
          迭代次數: {iteration}
        </span>
      </div>
      <div style={{ marginBottom: "20px", textAlign: "center", color: "#c770f0" }}>
        距離陣列
      </div>
      <div className="array-container">
        {distances.map((dist, idx) => (
          <div key={`dist-${idx}`} className="array-element">
            <div style={{ fontSize: "0.8em", color: "#aaa" }}>節點 {idx}</div>
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>
              {dist === Infinity ? "∞" : dist}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Floyd-Warshall 視覺化
export const FloydWarshallVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { matrix, k, nodes = 4 } = stepData;
  const n = matrix.length;

  // 節點位置（圓形排列）
  const getNodePosition = (index) => {
    const angle = (index / nodes) * 2 * Math.PI - Math.PI / 2;
    const radius = 70;
    return {
      x: 150 + radius * Math.cos(angle),
      y: 110 + radius * Math.sin(angle)
    };
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px" }}>
      {/* 圖形顯示區域 */}
      <div style={{ position: "relative", width: "100%", paddingTop: "45%", marginBottom: "15px" }}>
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 300 220">
          {/* 繪製邊 - 根據矩陣 */}
          {matrix.map((row, u) =>
            row.map((weight, v) => {
              if (u !== v && weight !== Infinity && weight < 20) {
                const posU = getNodePosition(u);
                const posV = getNodePosition(v);
                const isHighlight = k !== -1 && (u === k || v === k);
                
                return (
                  <line
                    key={`edge-${u}-${v}`}
                    x1={posU.x}
                    y1={posU.y}
                    x2={posV.x}
                    y2={posV.y}
                    stroke={isHighlight ? "#ff6b6b" : "rgba(199, 112, 240, 0.3)"}
                    strokeWidth={isHighlight ? "3" : "1.5"}
                    markerEnd={isHighlight ? "url(#arrow-highlight)" : "url(#arrow-normal)"}
                    style={{ transition: "all 0.5s ease" }}
                  />
                );
              }
              return null;
            })
          )}
          
          {/* Marker 定義 */}
          <defs>
            <marker id="arrow-normal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="rgba(199, 112, 240, 0.5)" />
            </marker>
            <marker id="arrow-highlight" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#ff6b6b" />
            </marker>
          </defs>
          
          {/* 繪製節點 */}
          {Array.from({ length: nodes }, (_, i) => {
            const pos = getNodePosition(i);
            const isCurrent = k === i;
            
            return (
              <g key={`node-${i}`}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="18"
                  fill={isCurrent ? "#ff6b6b" : "#1a1a2e"}
                  stroke={isCurrent ? "#ff6b6b" : "#c770f0"}
                  strokeWidth="2"
                  style={{
                    filter: isCurrent ? "drop-shadow(0 0 8px #ff6b6b)" : "none",
                    transition: "all 0.5s ease"
                  }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="bold"
                >
                  {i}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <span style={{ color: "#c770f0", fontSize: "1.1em" }}>
          {k === -1 ? "初始化" : `中間節點: ${k}`}
        </span>
      </div>
      <div
        className="matrix-container"
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      >
        {matrix.map((row, i) =>
          row.map((cell, j) => {
            const isHighlight = k !== -1 && (i === k || j === k);
            const isInfinity = cell === Infinity;

            return (
              <div
                key={`cell-${i}-${j}`}
                className={`matrix-cell ${isHighlight ? "highlight" : ""} ${isInfinity ? "infinity" : ""}`}
              >
                {isInfinity ? "∞" : cell}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// Kruskal's MST 視覺化
export const KruskalVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { edges, selected, mstWeight, nodes = 4 } = stepData;

  // 節點位置（圓形排列）
  const getNodePosition = (index) => {
    const angle = (index / nodes) * 2 * Math.PI - Math.PI / 2;
    const radius = 70;
    return {
      x: 150 + radius * Math.cos(angle),
      y: 110 + radius * Math.sin(angle)
    };
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      {/* 圖形顯示區域 */}
      <div style={{ position: "relative", width: "100%", paddingTop: "45%", marginBottom: "15px" }}>
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 300 220">
          {/* 繪製所有邊 */}
          {edges.map((edge, idx) => {
            const posU = getNodePosition(edge.u);
            const posV = getNodePosition(edge.v);
            const midX = (posU.x + posV.x) / 2;
            const midY = (posU.y + posV.y) / 2;
            const isSelected = selected.some(e => 
              (e.u === edge.u && e.v === edge.v) || (e.u === edge.v && e.v === edge.u)
            );
            
            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={posU.x}
                  y1={posU.y}
                  x2={posV.x}
                  y2={posV.y}
                  stroke={isSelected ? "#51cf66" : "rgba(199, 112, 240, 0.3)"}
                  strokeWidth={isSelected ? "4" : "2"}
                  style={{
                    filter: isSelected ? "drop-shadow(0 0 4px #51cf66)" : "none",
                    transition: "all 0.5s ease"
                  }}
                />
                <circle 
                  cx={midX} 
                  cy={midY} 
                  r="10" 
                  fill="#1a1a2e" 
                  stroke={isSelected ? "#51cf66" : "#4ecdc4"} 
                  strokeWidth={isSelected ? "2" : "1.5"}
                  style={{ transition: "all 0.5s ease" }}
                />
                <text 
                  x={midX} 
                  y={midY + 4} 
                  textAnchor="middle" 
                  fill={isSelected ? "#51cf66" : "#4ecdc4"} 
                  fontSize="11" 
                  fontWeight="bold"
                >
                  {edge.w}
                </text>
              </g>
            );
          })}
          
          {/* 繪製節點 */}
          {Array.from({ length: nodes }, (_, i) => {
            const pos = getNodePosition(i);
            
            return (
              <g key={`node-${i}`}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="18"
                  fill="#1a1a2e"
                  stroke="#c770f0"
                  strokeWidth="2"
                  style={{ transition: "all 0.5s ease" }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="13"
                  fontWeight="bold"
                >
                  {i}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <span style={{ color: "#51cf66", fontSize: "1.2em" }}>
          MST 總權重: {mstWeight}
        </span>
      </div>

      {selected.length > 0 && (
        <>
          <div style={{ marginTop: "20px", textAlign: "center", color: "#51cf66" }}>
            已選擇的邊
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
            {selected.map((edge, idx) => (
              <div
                key={`selected-${idx}`}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#51cf66",
                  border: "2px solid #51cf66",
                  borderRadius: "6px",
                  fontSize: "0.9em",
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                ({edge.u}, {edge.v}) = {edge.w}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// DSU 視覺化
export const DSUVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { parent, rank, operation } = stepData;
  
  // 繪製 DSU 樹狀結構
  const renderDSUGraph = () => {
    const n = parent.length;
    const elements = [];
    
    // 計算每個節點的位置（圓形排列）
    const getNodePosition = (index) => {
      const angle = (index / n) * 2 * Math.PI - Math.PI / 2;
      const radius = 80;
      return {
        x: 150 + radius * Math.cos(angle),
        y: 110 + radius * Math.sin(angle)
      };
    };
    
    // 繪製邊（從子節點指向父節點）
    parent.forEach((p, idx) => {
      if (p !== idx) {
        const from = getNodePosition(idx);
        const to = getNodePosition(p);
        elements.push(
          <line
            key={`edge-${idx}-${p}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#c770f0"
            strokeWidth="2"
            markerEnd="url(#arrow-dsu)"
            style={{ transition: "all 0.5s ease" }}
          />
        );
      }
    });
    
    // 繪製節點
    parent.forEach((p, idx) => {
      const pos = getNodePosition(idx);
      const isRoot = p === idx;
      elements.push(
        <g key={`node-${idx}`}>
          <circle
            cx={pos.x}
            cy={pos.y}
            r="18"
            fill={isRoot ? "#51cf66" : "#1a1a2e"}
            stroke={isRoot ? "#51cf66" : "#c770f0"}
            strokeWidth="2"
            style={{ transition: "all 0.5s ease" }}
          />
          <text
            x={pos.x}
            y={pos.y + 5}
            textAnchor="middle"
            fill="white"
            fontSize="13"
            fontWeight="bold"
          >
            {idx}
          </text>
          {rank[idx] > 0 && (
            <text
              x={pos.x}
              y={pos.y + 28}
              textAnchor="middle"
              fill="#f9ca24"
              fontSize="10"
            >
              r:{rank[idx]}
            </text>
          )}
        </g>
      );
    });
    
    return elements;
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px" }}>
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <span style={{ color: "#c770f0", fontSize: "1.1em" }}>
          操作: {operation}
        </span>
      </div>
      
      {/* DSU 圖形視覺化 */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px", textAlign: "center", color: "#c770f0", fontSize: "0.95em" }}>
          並查集結構（線指向父節點）
        </div>
        <svg width="100%" height="240" viewBox="0 0 300 240" style={{ display: "block" }}>
          <defs>
            <marker id="arrow-dsu" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#c770f0" />
            </marker>
          </defs>
          {renderDSUGraph()}
        </svg>
        <div style={{ textAlign: "center", color: "#aaa", fontSize: "0.85em" }}>
          綠色為根節點，r 表示 rank
        </div>
      </div>

      <div style={{ marginBottom: "15px", textAlign: "center", color: "#c770f0" }}>
        Parent 陣列
      </div>
      <div className="array-container">
        {parent.map((p, idx) => (
          <div key={`parent-${idx}`} className="array-element">
            <div style={{ fontSize: "0.8em", color: "#aaa" }}>元素 {idx}</div>
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>{p}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", marginBottom: "15px", textAlign: "center", color: "#c770f0" }}>
        Rank 陣列
      </div>
      <div className="array-container">
        {rank.map((r, idx) => (
          <div key={`rank-${idx}`} className="array-element">
            <div style={{ fontSize: "0.8em", color: "#aaa" }}>元素 {idx}</div>
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>{r}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Bipartite Check 視覺化
export const BipartiteVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { colors, current, isBipartite } = stepData;

  const getNodePosition = (index) => {
    const angle = (index / colors.length) * 2 * Math.PI - Math.PI / 2;
    const radius = 70;
    return {
      x: 200 + radius * Math.cos(angle),
      y: 100 + radius * Math.sin(angle)
    };
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px", position: "relative" }}>
      <div style={{ position: "relative", width: "100%", paddingTop: "50%" }}>
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 400 200">
          <text x="200" y="20" textAnchor="middle" fill={isBipartite ? "#51cf66" : "#ff6b6b"} fontSize="14" fontWeight="bold">
            {isBipartite ? "✓ 是二分圖" : "✗ 不是二分圖"}
          </text>

          {colors.map((color, idx) => {
            const pos = getNodePosition(idx);
            const isCurrent = current === idx;
            let fillColor = "#1a1a2e";
            let strokeColor = "#c770f0";

            if (color === 0) {
              fillColor = "#ff6b6b"; // 紅色
              strokeColor = "#ff6b6b";
            } else if (color === 1) {
              fillColor = "#4ecdc4"; // 藍色
              strokeColor = "#4ecdc4";
            }

            return (
              <g key={`node-${idx}`}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isCurrent ? 24 : 18}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="2"
                  style={{
                    filter: isCurrent ? `drop-shadow(0 0 8px ${strokeColor})` : "none",
                    transition: "all 0.3s ease"
                  }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {idx}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
