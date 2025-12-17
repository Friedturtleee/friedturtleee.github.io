import React from "react";

// ========== DP、數學、陣列、樹演算法視覺化組件 ==========

// Dynamic Programming 視覺化
export const DPVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { dp, n, calculating } = stepData;

  return (
    <div style={{ width: "100%", maxWidth: "700px" }}>
      <div style={{ marginBottom: "20px", textAlign: "center", color: "#c770f0" }}>
        費氏數列 DP 陣列（目標: F({n})）
      </div>
      <div className="array-container">
        {dp.map((value, idx) => (
          <div
            key={`dp-${idx}`}
            className={`array-element ${calculating === idx ? "highlight" : ""}`}
          >
            <div style={{ fontSize: "0.8em", color: "#aaa" }}>F({idx})</div>
            <div style={{ fontSize: "1.3em", fontWeight: "bold" }}>{value}</div>
          </div>
        ))}
      </div>
      {calculating !== null && (
        <div style={{ marginTop: "20px", textAlign: "center", color: "#ff6b6b", fontSize: "1.1em" }}>
          正在計算: F({calculating}) = F({calculating - 1}) + F({calculating - 2})
        </div>
      )}
    </div>
  );
};

// Modular Exponentiation 視覺化
export const ModularExpVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { result, base, exp, expBinary } = stepData;

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <div style={{ fontSize: "1.3em", color: "#c770f0", marginBottom: "10px" }}>
          當前狀態
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
          <div style={{ 
            padding: "15px 25px", 
            backgroundColor: "rgba(199, 112, 240, 0.2)", 
            borderRadius: "10px",
            border: "2px solid #c770f0"
          }}>
            <div style={{ fontSize: "0.9em", color: "#aaa" }}>Result</div>
            <div style={{ fontSize: "1.8em", fontWeight: "bold", color: "#c770f0" }}>{result}</div>
          </div>
          <div style={{ 
            padding: "15px 25px", 
            backgroundColor: "rgba(78, 205, 196, 0.2)", 
            borderRadius: "10px",
            border: "2px solid #4ecdc4"
          }}>
            <div style={{ fontSize: "0.9em", color: "#aaa" }}>Base</div>
            <div style={{ fontSize: "1.8em", fontWeight: "bold", color: "#4ecdc4" }}>{base}</div>
          </div>
          <div style={{ 
            padding: "15px 25px", 
            backgroundColor: "rgba(255, 107, 107, 0.2)", 
            borderRadius: "10px",
            border: "2px solid #ff6b6b"
          }}>
            <div style={{ fontSize: "0.9em", color: "#aaa" }}>Exponent</div>
            <div style={{ fontSize: "1.8em", fontWeight: "bold", color: "#ff6b6b" }}>{exp}</div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div style={{ color: "#c770f0", marginBottom: "10px" }}>指數的二進位表示</div>
        <div style={{ 
          fontSize: "1.5em", 
          fontFamily: "monospace", 
          color: "#51cf66",
          padding: "10px",
          backgroundColor: "rgba(81, 207, 102, 0.1)",
          borderRadius: "8px",
          border: "1px solid #51cf66"
        }}>
          {expBinary || "完成"}
        </div>
      </div>
    </div>
  );
};

// Prefix / Suffix 視覺化
export const PrefixSuffixVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { array, prefix, calculating } = stepData;

  return (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <div style={{ marginBottom: "20px", textAlign: "center", color: "#c770f0" }}>
        原始陣列
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            key={`array-${idx}`}
            className={`array-element ${calculating === idx ? "highlight" : ""}`}
          >
            <div style={{ fontSize: "0.8em", color: "#aaa" }}>[{idx}]</div>
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", marginBottom: "20px", textAlign: "center", color: "#51cf66" }}>
        前綴和陣列
      </div>
      <div className="array-container">
        {prefix.map((value, idx) => (
          <div
            key={`prefix-${idx}`}
            className={`array-element ${calculating === idx ? "highlight" : ""}`}
            style={{ borderColor: "#51cf66", backgroundColor: "rgba(81, 207, 102, 0.2)" }}
          >
            <div style={{ fontSize: "0.8em", color: "#aaa" }}>[{idx}]</div>
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>{value}</div>
          </div>
        ))}
        {prefix.length < array.length && (
          <div className="array-element" style={{ opacity: 0.3 }}>
            <div style={{ fontSize: "1.2em" }}>?</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Two Pointers 視覺化
export const TwoPointersVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { array, left, right, target, sum, found } = stepData;

  return (
    <div style={{ width: "100%", maxWidth: "700px" }}>
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <span style={{ color: "#c770f0", fontSize: "1.2em" }}>
          目標和: {target}
        </span>
        {sum !== null && (
          <span style={{ marginLeft: "20px", color: "#4ecdc4", fontSize: "1.1em" }}>
            當前和: {sum}
          </span>
        )}
      </div>

      <div className="array-container" style={{ position: "relative" }}>
        {array.map((value, idx) => {
          const isLeft = idx === left;
          const isRight = idx === right;
          const isInRange = idx >= left && idx <= right;

          return (
            <div
              key={`arr-${idx}`}
              className="array-element"
              style={{
                position: "relative",
                backgroundColor: isInRange ? "rgba(199, 112, 240, 0.3)" : "rgba(199, 112, 240, 0.1)",
                borderColor: isLeft || isRight ? (isLeft ? "#4ecdc4" : "#ff6b6b") : "#c770f0",
                borderWidth: isLeft || isRight ? "3px" : "2px",
                transform: isLeft || isRight ? "scale(1.1)" : "scale(1)"
              }}
            >
              <div style={{ fontSize: "0.8em", color: "#aaa" }}>[{idx}]</div>
              <div style={{ fontSize: "1.3em", fontWeight: "bold" }}>{value}</div>
              {isLeft && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-25px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#4ecdc4",
                    fontSize: "0.9em",
                    fontWeight: "bold"
                  }}
                >
                  ↑ Left
                </div>
              )}
              {isRight && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-25px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#ff6b6b",
                    fontSize: "0.9em",
                    fontWeight: "bold"
                  }}
                >
                  ↑ Right
                </div>
              )}
            </div>
          );
        })}
      </div>

      {found && (
        <div style={{ marginTop: "40px", textAlign: "center", color: "#51cf66", fontSize: "1.3em", fontWeight: "bold" }}>
          ✓ 找到答案！({array[left]}, {array[right]})
        </div>
      )}
    </div>
  );
};

// Sliding Window 視覺化
export const SlidingWindowVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { array, windowStart, windowEnd, windowSum, maxSum } = stepData;

  return (
    <div style={{ width: "100%", maxWidth: "700px" }}>
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <span style={{ color: "#4ecdc4", fontSize: "1.1em", marginRight: "20px" }}>
          窗口和: {windowSum}
        </span>
        <span style={{ color: "#51cf66", fontSize: "1.1em" }}>
          最大和: {maxSum}
        </span>
      </div>

      <div className="array-container">
        {array.map((value, idx) => {
          const inWindow = idx >= windowStart && idx <= windowEnd;

          return (
            <div
              key={`arr-${idx}`}
              className={`array-element ${inWindow ? "highlight" : ""}`}
              style={{
                backgroundColor: inWindow ? "#4ecdc4" : "rgba(199, 112, 240, 0.2)",
                borderColor: inWindow ? "#4ecdc4" : "#c770f0",
                transform: inWindow ? "translateY(-5px)" : "translateY(0)"
              }}
            >
              <div style={{ fontSize: "0.8em", color: inWindow ? "#000" : "#aaa" }}>[{idx}]</div>
              <div style={{ fontSize: "1.2em", fontWeight: "bold", color: inWindow ? "#000" : "#fff" }}>{value}</div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "20px", textAlign: "center", color: "#aaa", fontSize: "0.95em" }}>
        窗口範圍: [{windowStart}, {windowEnd}]
      </div>
    </div>
  );
};

// Segment Tree 視覺化
export const SegmentTreeVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { array, tree, operation, queryResult, highlight = [], updated = [] } = stepData;

  // 線段樹節點渲染
  const renderTree = () => {
    if (!tree || tree.length === 0) return null;

    // 定義節點位置 (二元樹結構)
    const positions = [
      { x: 150, y: 30, index: 0 },        // 根節點
      { x: 90, y: 90, index: 1 },         // 左子樹
      { x: 210, y: 90, index: 2 },        // 右子樹
      { x: 50, y: 150, index: 3 },        // 葉節點
      { x: 130, y: 150, index: 4 },
      { x: 170, y: 150, index: 5 },
      { x: 250, y: 150, index: 6 }
    ];

    const elements = [];

    // 繪製連線
    const connections = [
      [0, 1], [0, 2], // 根到左右子樹
      [1, 3], [1, 4], // 左子樹
      [2, 5], [2, 6]  // 右子樹
    ];

    connections.forEach(([from, to]) => {
      if (tree[from] !== undefined && tree[to] !== undefined) {
        const fromPos = positions.find(p => p.index === from);
        const toPos = positions.find(p => p.index === to);
        if (fromPos && toPos) {
          const isHighlight = highlight.includes(from) && highlight.includes(to);
          elements.push(
            <line
              key={`edge-${from}-${to}`}
              x1={fromPos.x}
              y1={fromPos.y}
              x2={toPos.x}
              y2={toPos.y}
              stroke={isHighlight ? "#51cf66" : "rgba(199, 112, 240, 0.4)"}
              strokeWidth={isHighlight ? "3" : "2"}
              style={{ transition: "all 0.5s ease" }}
            />
          );
        }
      }
    });

    // 繪製節點
    positions.forEach(({ x, y, index }) => {
      if (tree[index] === undefined) return;
      
      const isHighlight = highlight.includes(index);
      const isUpdated = updated.includes(index);
      
      elements.push(
        <g key={`node-${index}`}>
          <circle
            cx={x}
            cy={y}
            r="20"
            fill={isUpdated ? "#ff6b6b" : isHighlight ? "#51cf66" : "#1a1a2e"}
            stroke={isUpdated ? "#ff6b6b" : isHighlight ? "#51cf66" : "#4ecdc4"}
            strokeWidth="2"
            style={{
              filter: isHighlight || isUpdated ? `drop-shadow(0 0 8px ${isUpdated ? "#ff6b6b" : "#51cf66"})` : "none",
              transition: "all 0.5s ease"
            }}
          />
          <text
            x={x}
            y={y + 5}
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
          >
            {tree[index]}
          </text>
          <text
            x={x}
            y={y + 35}
            textAnchor="middle"
            fill="#888"
            fontSize="10"
          >
            [{index}]
          </text>
        </g>
      );
    });

    return elements;
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <span style={{ color: "#c770f0", fontSize: "1.2em" }}>
          操作: {operation}
        </span>
        {queryResult !== undefined && (
          <span style={{ marginLeft: "20px", color: "#51cf66", fontSize: "1.1em" }}>
            結果: {queryResult}
          </span>
        )}
      </div>

      {/* 線段樹圖形 */}
      {tree.length > 0 && (
        <div style={{ position: "relative", width: "100%", paddingTop: "60%", marginBottom: "20px" }}>
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 300 200">
            {renderTree()}
          </svg>
        </div>
      )}

      {/* 原始陣列 */}
      <div style={{ marginTop: "20px", textAlign: "center", color: "#c770f0", fontSize: "0.9em" }}>
        原始陣列
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div 
            key={`array-${idx}`} 
            className="array-element"
            style={{ transition: "all 0.5s ease" }}
          >
            <div style={{ fontSize: "0.8em", color: "#aaa" }}>[{idx}]</div>
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Tree Depth 視覺化
export const TreeDepthVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { current, depth, maxDepth } = stepData;

  // 生成簡單的二元樹結構
  const renderTreeStructure = () => {
    const levels = [
      [{ val: 1, x: 150 }],
      [{ val: 2, x: 100 }, { val: 3, x: 200 }],
      [{ val: 4, x: 70 }, { val: 5, x: 130 }, null, null]
    ];

    const elements = [];
    const verticalSpacing = 60;

    // 繪製連線
    levels.forEach((level, levelIndex) => {
      if (levelIndex === levels.length - 1) return;
      level.forEach((node, nodeIndex) => {
        if (!node) return;
        const leftChildIndex = nodeIndex * 2;
        const rightChildIndex = nodeIndex * 2 + 1;
        const nextLevel = levels[levelIndex + 1];
        
        if (nextLevel[leftChildIndex]) {
          elements.push(
            <line
              key={`edge-${node.val}-left`}
              x1={node.x}
              y1={30 + levelIndex * verticalSpacing}
              x2={nextLevel[leftChildIndex].x}
              y2={30 + (levelIndex + 1) * verticalSpacing}
              stroke="rgba(199, 112, 240, 0.6)"
              strokeWidth="2"
            />
          );
        }
        
        if (nextLevel[rightChildIndex]) {
          elements.push(
            <line
              key={`edge-${node.val}-right`}
              x1={node.x}
              y1={30 + levelIndex * verticalSpacing}
              x2={nextLevel[rightChildIndex].x}
              y2={30 + (levelIndex + 1) * verticalSpacing}
              stroke="rgba(199, 112, 240, 0.6)"
              strokeWidth="2"
            />
          );
        }
      });
    });

    // 繪製節點
    levels.forEach((level, levelIndex) => {
      level.forEach((node) => {
        if (!node) return;
        const isCurrent = current === node.val;
        const nodeDepth = levelIndex;
        const isInCurrentDepth = nodeDepth === depth;
        
        elements.push(
          <g key={`node-${node.val}`}>
            <circle
              cx={node.x}
              cy={30 + levelIndex * verticalSpacing}
              r="18"
              fill={isCurrent ? "#ff6b6b" : isInCurrentDepth ? "#c770f0" : "#1a1a2e"}
              stroke={isCurrent ? "#ff6b6b" : isInCurrentDepth ? "#c770f0" : "#555"}
              strokeWidth="2"
              style={{
                filter: isCurrent ? "drop-shadow(0 0 8px #ff6b6b)" : "none",
                transition: "all 0.3s ease"
              }}
            />
            <text
              x={node.x}
              y={35 + levelIndex * verticalSpacing}
              textAnchor="middle"
              fill="white"
              fontSize="13"
              fontWeight="bold"
            >
              {node.val}
            </text>
          </g>
        );
      });
    });

    return elements;
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px" }}>
      <div style={{ marginBottom: "20px", textAlign: "center", display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
        <span style={{ color: "#c770f0", fontSize: "1.1em" }}>
          當前深度: {depth}
        </span>
        <span style={{ color: "#51cf66", fontSize: "1.1em" }}>
          最大深度: {maxDepth}
        </span>
        {current !== null && (
          <span style={{ color: "#ff6b6b", fontSize: "1.1em" }}>
            訪問: {current}
          </span>
        )}
      </div>

      <svg
        width="100%"
        height="230"
        viewBox="0 0 300 230"
        style={{ display: "block", margin: "0 auto" }}
      >
        {renderTreeStructure()}
      </svg>
    </div>
  );
};

// Subtree Size 視覺化
export const SubtreeSizeVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { tree, current } = stepData;

  const renderTree = (node, x = 50, y = 5, level = 0) => {
    if (!node) return null;

    const horizontalSpacing = Math.max(25, 80 / (level + 1.5));
    const verticalSpacing = 60;
    const elements = [];

    // 繪製左子樹連線
    if (node.left) {
      const leftX = x - horizontalSpacing;
      const leftY = y + verticalSpacing;
      elements.push(
        <line
          key={`edge-${node.val}-left`}
          x1={x}
          y1={y}
          x2={leftX}
          y2={leftY}
          stroke="rgba(199, 112, 240, 0.6)"
          strokeWidth="2"
        />
      );
      elements.push(...renderTree(node.left, leftX, leftY, level + 1));
    }

    // 繪製右子樹連線
    if (node.right) {
      const rightX = x + horizontalSpacing;
      const rightY = y + verticalSpacing;
      elements.push(
        <line
          key={`edge-${node.val}-right`}
          x1={x}
          y1={y}
          x2={rightX}
          y2={rightY}
          stroke="rgba(199, 112, 240, 0.6)"
          strokeWidth="2"
        />
      );
      elements.push(...renderTree(node.right, rightX, rightY, level + 1));
    }

    // 繪製當前節點
    const isCurrent = current === node.val;
    elements.push(
      <g key={`node-${node.val}-${x}-${y}`}>
        <circle
          cx={x}
          cy={y}
          r="18"
          fill={isCurrent ? "#ff6b6b" : "#1a1a2e"}
          stroke={isCurrent ? "#ff6b6b" : "#c770f0"}
          strokeWidth="2"
          style={{
            filter: isCurrent ? "drop-shadow(0 0 8px #ff6b6b)" : "none",
            transition: "all 0.3s ease"
          }}
        />
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fill="white"
          fontSize="13"
          fontWeight="bold"
        >
          {node.val}
        </text>
        {node.size !== undefined && node.size > 0 && (
          <text
            x={x}
            y={y + 28}
            textAnchor="middle"
            fill="#51cf66"
            fontSize="10"
          >
            ({node.size})
          </text>
        )}
      </g>
    );

    return elements;
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", overflow: "auto" }}>
      <svg
        width="100%"
        height="300"
        viewBox="0 0 300 300"
        style={{ display: "block", margin: "0 auto" }}
      >
        {renderTree(tree, 150, 30)}
      </svg>
      <div style={{ textAlign: "center", color: "#51cf66", marginTop: "10px", fontSize: "0.9em" }}>
        括號內數字為子樹大小
      </div>
    </div>
  );
};

// Meet in Middle 視覺化
export const MeetInMiddleVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { array, target, leftHalf, rightHalf, searching, found, solution } = stepData;

  return (
    <div style={{ width: "100%", maxWidth: "700px" }}>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <span style={{ color: "#c770f0", fontSize: "1.2em" }}>
          目標和: {target}
        </span>
      </div>

      <div style={{ marginBottom: "20px", textAlign: "center", color: "#c770f0" }}>
        原始陣列
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            key={`arr-${idx}`}
            className="array-element"
            style={{
              borderColor: idx < array.length / 2 ? "#4ecdc4" : "#ff6b6b",
              backgroundColor: idx < array.length / 2 ? "rgba(78, 205, 196, 0.2)" : "rgba(255, 107, 107, 0.2)"
            }}
          >
            <div style={{ fontSize: "0.8em", color: "#aaa" }}>[{idx}]</div>
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "30px", marginTop: "30px", justifyContent: "center" }}>
        {leftHalf.length > 0 && (
          <div style={{ flex: 1, maxWidth: "300px" }}>
            <div style={{ textAlign: "center", color: "#4ecdc4", marginBottom: "10px" }}>
              左半部子集和
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
              {leftHalf.map((val, idx) => (
                <div
                  key={`left-${idx}`}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "rgba(78, 205, 196, 0.3)",
                    border: "1px solid #4ecdc4",
                    borderRadius: "6px",
                    fontSize: "0.95em"
                  }}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        )}

        {rightHalf.length > 0 && (
          <div style={{ flex: 1, maxWidth: "300px" }}>
            <div style={{ textAlign: "center", color: "#ff6b6b", marginBottom: "10px" }}>
              右半部子集和
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
              {rightHalf.map((val, idx) => (
                <div
                  key={`right-${idx}`}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "rgba(255, 107, 107, 0.3)",
                    border: "1px solid #ff6b6b",
                    borderRadius: "6px",
                    fontSize: "0.95em"
                  }}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {searching && (
        <div style={{ marginTop: "20px", textAlign: "center", color: "#c770f0", fontSize: "1.1em" }}>
          {searching}
        </div>
      )}

      {found && (
        <div style={{ marginTop: "25px", textAlign: "center" }}>
          <div style={{ color: "#51cf66", fontSize: "1.3em", fontWeight: "bold", marginBottom: "10px" }}>
            ✓ 找到解答！
          </div>
          <div style={{ color: "#c770f0", fontSize: "1.1em" }}>
            {solution}
          </div>
        </div>
      )}
    </div>
  );
};

// BIT 視覺化
export const BITVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { array, bit, operation, queryResult } = stepData;

  return (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <span style={{ color: "#c770f0", fontSize: "1.2em" }}>
          操作: {operation}
        </span>
        {queryResult !== undefined && (
          <span style={{ marginLeft: "20px", color: "#51cf66", fontSize: "1.1em" }}>
            結果: {queryResult}
          </span>
        )}
      </div>

      <div style={{ marginBottom: "20px", textAlign: "center", color: "#c770f0" }}>
        原始陣列
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div key={`array-${idx}`} className="array-element">
            <div style={{ fontSize: "0.8em", color: "#aaa" }}>[{idx}]</div>
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>{value}</div>
          </div>
        ))}
      </div>

      {bit.length > 1 && (
        <>
          <div style={{ marginTop: "30px", marginBottom: "20px", textAlign: "center", color: "#4ecdc4" }}>
            BIT 陣列
          </div>
          <div className="array-container">
            {bit.map((value, idx) => (
              <div
                key={`bit-${idx}`}
                className="array-element"
                style={{ borderColor: "#4ecdc4", backgroundColor: "rgba(78, 205, 196, 0.2)" }}
              >
                <div style={{ fontSize: "0.8em", color: "#aaa" }}>[{idx}]</div>
                <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>{value}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
