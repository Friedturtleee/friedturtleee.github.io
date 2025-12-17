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
      y: 100 + radius * Math.sin(angle)
    };
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "15px" }}>
      {/* 圖形顯示區域 */}
      <div style={{ position: "relative", width: "100%", height: "230px", marginBottom: "10px" }}>
        {/* 繪製邊 */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
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
                left: `${pos.x - 18}px`,
                top: `${pos.y - 18}px`,
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
      y: 100 + radius * Math.sin(angle)
    };
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "15px" }}>
      {/* 圖形顯示區域 */}
      <div style={{ position: "relative", width: "100%", height: "230px", marginBottom: "10px" }}>
        {/* 繪製邊 */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
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
                left: `${pos.x - 18}px`,
                top: `${pos.y - 18}px`,
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

  const { distances, current, visited } = stepData;

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
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

  const { distances, edges, iteration } = stepData;

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
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

      <div style={{ marginTop: "20px", textAlign: "center", color: "#c770f0" }}>
        邊列表
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
        {edges.map((edge, idx) => (
          <div
            key={`edge-${idx}`}
            style={{
              padding: "8px 12px",
              backgroundColor: "rgba(199, 112, 240, 0.2)",
              border: "1px solid #c770f0",
              borderRadius: "6px",
              fontSize: "0.9em"
            }}
          >
            {edge[0]} → {edge[1]} ({edge[2]})
          </div>
        ))}
      </div>
    </div>
  );
};

// Floyd-Warshall 視覺化
export const FloydWarshallVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { matrix, k } = stepData;
  const n = matrix.length;

  return (
    <div style={{ width: "100%", maxWidth: "500px" }}>
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

  const { edges, selected, mstWeight } = stepData;

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <span style={{ color: "#c770f0", fontSize: "1.2em" }}>
          MST 總權重: {mstWeight}
        </span>
      </div>

      <div style={{ marginBottom: "15px", textAlign: "center", color: "#c770f0" }}>
        所有邊（按權重排序）
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {edges.map((edge, idx) => {
          const isSelected = selected.some(e => e.u === edge.u && e.v === edge.v);
          return (
            <div
              key={`edge-${idx}`}
              style={{
                padding: "10px 15px",
                backgroundColor: isSelected ? "#51cf66" : "rgba(199, 112, 240, 0.2)",
                border: `2px solid ${isSelected ? "#51cf66" : "#c770f0"}`,
                borderRadius: "8px",
                fontSize: "0.95em",
                fontWeight: isSelected ? "bold" : "normal",
                boxShadow: isSelected ? "0 0 15px #51cf66" : "none"
              }}
            >
              ({edge.u}, {edge.v}) = {edge.w}
            </div>
          );
        })}
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

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <span style={{ color: "#c770f0", fontSize: "1.1em" }}>
          操作: {operation}
        </span>
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
    const radius = 100;
    return {
      x: 250 + radius * Math.cos(angle),
      y: 150 + radius * Math.sin(angle)
    };
  };

  return (
    <div style={{ position: "relative", width: "500px", height: "300px" }}>
      <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <span style={{ 
          color: isBipartite ? "#51cf66" : "#ff6b6b",
          fontSize: "1.1em",
          fontWeight: "bold"
        }}>
          {isBipartite ? "✓ 是二分圖" : "✗ 不是二分圖"}
        </span>
      </div>

      {colors.map((color, idx) => {
        const pos = getNodePosition(idx);
        const isCurrent = current === idx;
        let bgColor = "#1a1a2e";
        let borderColor = "#c770f0";

        if (color === 0) {
          bgColor = "#ff6b6b"; // 紅色
          borderColor = "#ff6b6b";
        } else if (color === 1) {
          bgColor = "#4ecdc4"; // 藍色
          borderColor = "#4ecdc4";
        }

        return (
          <div
            key={`node-${idx}`}
            className={`graph-node ${isCurrent ? "pulse" : ""}`}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              backgroundColor: bgColor,
              borderColor: borderColor,
              transform: isCurrent ? "scale(1.3)" : "scale(1)"
            }}
          >
            {idx}
          </div>
        );
      })}
    </div>
  );
};
