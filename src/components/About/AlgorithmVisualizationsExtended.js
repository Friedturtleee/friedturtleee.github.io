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
      
      {/* 計算流程圖 */}
      {calculating !== null && calculating >= 2 && (
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <svg width="300" height="120" viewBox="0 0 300 120">
            {/* F(i-2) */}
            <g>
              <circle cx="50" cy="60" r="25" fill="#4ecdc4" stroke="#4ecdc4" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
              <text x="50" y="50" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">F({calculating-2})</text>
              <text x="50" y="68" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{dp[calculating-2] || 0}</text>
            </g>
            
            {/* F(i-1) */}
            <g>
              <circle cx="150" cy="60" r="25" fill="#f9ca24" stroke="#f9ca24" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
              <text x="150" y="50" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">F({calculating-1})</text>
              <text x="150" y="68" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{dp[calculating-1] || 0}</text>
            </g>
            
            {/* F(i) */}
            <g>
              <circle cx="250" cy="60" r="28" fill="#ff6b6b" stroke="#ff6b6b" strokeWidth="2" style={{ filter: "drop-shadow(0 0 8px #ff6b6b)", transition: "all 0.5s ease" }} />
              <text x="250" y="50" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">F({calculating})</text>
              <text x="250" y="68" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{dp[calculating] || "?"}</text>
            </g>
            
            {/* 箭頭和加號 */}
            <line x1="75" y1="60" x2="120" y2="60" stroke="#c770f0" strokeWidth="2" markerEnd="url(#arrow-dp1)" style={{ transition: "all 0.5s ease" }} />
            <line x1="175" y1="60" x2="220" y2="60" stroke="#c770f0" strokeWidth="2" markerEnd="url(#arrow-dp2)" style={{ transition: "all 0.5s ease" }} />
            <text x="100" y="50" textAnchor="middle" fill="#51cf66" fontSize="18" fontWeight="bold">+</text>
            
            <defs>
              <marker id="arrow-dp1" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#c770f0" />
              </marker>
              <marker id="arrow-dp2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#c770f0" />
              </marker>
            </defs>
          </svg>
        </div>
      )}
      
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
      {/* 流程圖 */}
      <div style={{ marginBottom: "25px", display: "flex", justifyContent: "center" }}>
        <svg width="400" height="100" viewBox="0 0 400 100">
          {/* Base */}
          <g>
            <rect x="20" y="30" width="80" height="50" rx="10" fill="#4ecdc4" stroke="#4ecdc4" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
            <text x="60" y="48" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Base</text>
            <text x="60" y="65" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">{base}</text>
          </g>
          
          {/* 指數符號 */}
          <text x="120" y="50" textAnchor="middle" fill="#f9ca24" fontSize="24" fontWeight="bold">^</text>
          
          {/* Exponent */}
          <g>
            <rect x="150" y="30" width="80" height="50" rx="10" fill="#ff6b6b" stroke="#ff6b6b" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
            <text x="190" y="48" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Exp</text>
            <text x="190" y="65" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">{exp}</text>
          </g>
          
          {/* 箭頭 */}
          <line x1="250" y1="55" x2="290" y2="55" stroke="#c770f0" strokeWidth="3" markerEnd="url(#arrow-mod)" style={{ transition: "all 0.5s ease" }} />
          
          {/* Result */}
          <g>
            <rect x="300" y="25" width="85" height="55" rx="10" fill="#c770f0" stroke="#c770f0" strokeWidth="2" style={{ filter: "drop-shadow(0 0 8px #c770f0)", transition: "all 0.5s ease" }} />
            <text x="342" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Result</text>
            <text x="342" y="65" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">{result}</text>
          </g>
          
          <defs>
            <marker id="arrow-mod" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#c770f0" />
            </marker>
          </defs>
        </svg>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div style={{ color: "#c770f0", marginBottom: "10px", fontSize: "1.1em" }}>指數的二進位表示</div>
        <div style={{ 
          fontSize: "1.5em", 
          fontFamily: "monospace", 
          color: "#51cf66",
          padding: "12px 20px",
          backgroundColor: "rgba(81, 207, 102, 0.15)",
          borderRadius: "8px",
          border: "2px solid #51cf66",
          letterSpacing: "3px"
        }}>
          {expBinary || "完成"}
        </div>
        <div style={{ marginTop: "10px", color: "#aaa", fontSize: "0.9em" }}>
          使用二進位快速冪，時間複雜度 O(log n)
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
    <div style={{ width: "100%", maxWidth: "700px" }}>
      {/* 計算過程圖 */}
      {calculating !== null && calculating > 0 && (
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
          <svg width="300" height="100" viewBox="0 0 300 100">
            {/* prefix[i-1] */}
            <g>
              <rect x="40" y="30" width="70" height="45" rx="8" fill="#4ecdc4" stroke="#4ecdc4" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
              <text x="75" y="48" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">prefix[{calculating-1}]</text>
              <text x="75" y="65" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">{prefix[calculating-1] || 0}</text>
            </g>
            
            {/* 加號 */}
            <text x="135" y="55" textAnchor="middle" fill="#51cf66" fontSize="22" fontWeight="bold">+</text>
            
            {/* array[i] */}
            <g>
              <rect x="160" y="30" width="70" height="45" rx="8" fill="#c770f0" stroke="#c770f0" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
              <text x="195" y="48" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">array[{calculating}]</text>
              <text x="195" y="65" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">{array[calculating]}</text>
            </g>
            
            {/* 等於符號 */}
            <line x1="20" y1="85" x2="280" y2="85" stroke="#aaa" strokeWidth="1" />
            <text x="150" y="95" textAnchor="middle" fill="#aaa" fontSize="12">prefix[{calculating}] = {(prefix[calculating-1] || 0) + array[calculating]}</text>
          </svg>
        </div>
      )}
      
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
    <div style={{ width: "100%", maxWidth: "600px" }}>
      {/* 指標示意圖 */}
      {left !== undefined && right !== undefined && (
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
          <svg width="100%" height="100" viewBox="0 0 400 100">
            {/* Left pointer */}
            <g>
              <circle cx="100" cy="40" r="22" fill="#4ecdc4" stroke="#4ecdc4" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
              <text x="100" y="36" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Left</text>
              <text x="100" y="48" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{array[left]}</text>
              <path d="M 100 65 L 100 85" stroke="#4ecdc4" strokeWidth="2" markerEnd="url(#arrow-left)" />
            </g>
            
            {/* 加號 */}
            <text x="200" y="45" textAnchor="middle" fill="#51cf66" fontSize="24" fontWeight="bold">+</text>
            
            {/* Right pointer */}
            <g>
              <circle cx="300" cy="40" r="22" fill="#ff6b6b" stroke="#ff6b6b" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
              <text x="300" y="36" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Right</text>
              <text x="300" y="48" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{array[right]}</text>
              <path d="M 300 65 L 300 85" stroke="#ff6b6b" strokeWidth="2" markerEnd="url(#arrow-right)" />
            </g>
            
            {/* 結果 */}
            <text x="200" y="95" textAnchor="middle" fill={sum === target ? "#51cf66" : "#aaa"} fontSize="13" fontWeight="bold">
              Sum = {sum} {sum === target ? "= Target!" : `(Target: ${target})`}
            </text>
            
            <defs>
              <marker id="arrow-left" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#4ecdc4" />
              </marker>
              <marker id="arrow-right" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#ff6b6b" />
              </marker>
            </defs>
          </svg>
        </div>
      )}
      
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
  const windowSize = windowEnd - windowStart + 1;

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      {/* 窗口示意圖 */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
        <svg width="100%" height="100" viewBox="0 0 350 100">
          {/* 窗口框架 */}
          <rect x="75" y="25" width="200" height="50" rx="8" fill="none" stroke="#4ecdc4" strokeWidth="3" strokeDasharray="5,5" style={{ transition: "all 0.5s ease" }} />
          <text x="175" y="20" textAnchor="middle" fill="#4ecdc4" fontSize="12" fontWeight="bold">窗口大小: {windowSize}</text>
          
          {/* 窗口內容 */}
          <text x="175" y="55" textAnchor="middle" fill="#4ecdc4" fontSize="16" fontWeight="bold">窗口和: {windowSum}</text>
          
          {/* 最大值 */}
          <g>
            <rect x="285" y="30" width="60" height="40" rx="6" fill="#51cf66" stroke="#51cf66" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
            <text x="315" y="45" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">最大和</text>
            <text x="315" y="60" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{maxSum}</text>
          </g>
          
          {/* 箭頭 */}
          <line x1="5" y1="50" x2="65" y2="50" stroke="#ff6b6b" strokeWidth="2" markerEnd="url(#arrow-win-start)" style={{ transition: "all 0.5s ease" }} />
          <text x="35" y="45" textAnchor="middle" fill="#ff6b6b" fontSize="11">start</text>
          
          <line x1="285" y1="50" x2="345" y2="50" stroke="#ff6b6b" strokeWidth="2" markerStart="url(#arrow-win-end)" style={{ transition: "all 0.5s ease" }} />
          <text x="315" y="90" textAnchor="middle" fill="#ff6b6b" fontSize="11">end</text>
          
          <defs>
            <marker id="arrow-win-start" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ff6b6b" />
            </marker>
            <marker id="arrow-win-end" markerWidth="8" markerHeight="8" refX="3" refY="3" orient="auto">
              <path d="M9,0 L9,6 L0,3 z" fill="#ff6b6b" />
            </marker>
          </defs>
        </svg>
      </div>
      
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
    const verticalSpacing = 55;

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
        height="200"
        viewBox="0 0 300 200"
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
    <div style={{ width: "100%", maxWidth: "500px" }}>
      <svg
        width="100%"
        height="220"
        viewBox="0 0 300 220"
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
  const mid = Math.floor(array.length / 2);

  return (
    <div style={{ width: "100%", maxWidth: "650px" }}>
      {/* 分解示意圖 */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
        <svg width="100%" height="120" viewBox="0 0 450 120">
          {/* 左半部 */}
          <rect x="30" y="20" width="150" height="50" rx="8" fill="rgba(78, 205, 196, 0.3)" stroke="#4ecdc4" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
          <text x="105" y="42" textAnchor="middle" fill="#4ecdc4" fontSize="12" fontWeight="bold">左半部</text>
          <text x="105" y="58" textAnchor="middle" fill="#4ecdc4" fontSize="11">2^{mid} 個子集</text>
          
          {/* 右半部 */}
          <rect x="270" y="20" width="150" height="50" rx="8" fill="rgba(255, 107, 107, 0.3)" stroke="#ff6b6b" strokeWidth="2" style={{ transition: "all 0.5s ease" }} />
          <text x="345" y="42" textAnchor="middle" fill="#ff6b6b" fontSize="12" fontWeight="bold">右半部</text>
          <text x="345" y="58" textAnchor="middle" fill="#ff6b6b" fontSize="11">2^{mid} 個子集</text>
          
          {/* 中間線 */}
          <line x1="225" y1="10" x2="225" y2="80" stroke="#c770f0" strokeWidth="2" strokeDasharray="5,5" />
          <text x="225" y="95" textAnchor="middle" fill="#c770f0" fontSize="11">分解點</text>
          
          {/* 搜尋符號 */}
          {leftHalf.length > 0 && rightHalf.length > 0 && (
            <g>
              <line x1="185" y1="45" x2="265" y2="45" stroke="#51cf66" strokeWidth="2" />
              <circle cx="225" cy="45" r="15" fill="#51cf66" stroke="#51cf66" strokeWidth="2" />
              <text x="225" y="50" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">✓</text>
              <text x="225" y="110" textAnchor="middle" fill="#51cf66" fontSize="10" fontWeight="bold">匹配中...</text>
            </g>
          )}
        </svg>
      </div>
      
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
          <div style={{ flex: 1, maxWidth: "280px" }}>
            <div style={{ textAlign: "center", color: "#4ecdc4", marginBottom: "10px" }}>
              左半部子集和
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", maxHeight: "120px", overflowY: "auto" }}>
              {leftHalf.slice(0, 16).map((val, idx) => (
                <div
                  key={`left-${idx}`}
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "rgba(78, 205, 196, 0.3)",
                    border: "1px solid #4ecdc4",
                    borderRadius: "5px",
                    fontSize: "0.9em"
                  }}
                >
                  {val}
                </div>
              ))}
              {leftHalf.length > 16 && <div style={{ color: "#aaa", fontSize: "0.85em" }}>...{leftHalf.length} 個</div>}
            </div>
          </div>
        )}

        {rightHalf.length > 0 && (
          <div style={{ flex: 1, maxWidth: "280px" }}>
            <div style={{ textAlign: "center", color: "#ff6b6b", marginBottom: "10px" }}>
              右半部子集和
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", maxHeight: "120px", overflowY: "auto" }}>
              {rightHalf.slice(0, 16).map((val, idx) => (
                <div
                  key={`right-${idx}`}
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "rgba(255, 107, 107, 0.3)",
                    border: "1px solid #ff6b6b",
                    borderRadius: "5px",
                    fontSize: "0.9em"
                  }}
                >
                  {val}
                </div>
              ))}
              {rightHalf.length > 16 && <div style={{ color: "#aaa", fontSize: "0.85em" }}>...{rightHalf.length} 個</div>}
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

  // BIT 樹狀結構視覺化
  const renderBITTree = () => {
    if (bit.length <= 1) return null;
    
    const positions = [
      { idx: 1, x: 150, y: 30 },
      { idx: 2, x: 100, y: 90 },
      { idx: 3, x: 200, y: 90 },
      { idx: 4, x: 70, y: 150 },
      { idx: 5, x: 130, y: 150 },
      { idx: 6, x: 170, y: 150 },
      { idx: 7, x: 230, y: 150 }
    ];
    
    const elements = [];
    
    // 繪製邊
    const edges = [
      [1, 2], [1, 3], [2, 4], [2, 5], [3, 6], [3, 7]
    ];
    
    edges.forEach(([from, to]) => {
      if (from < bit.length && to < bit.length) {
        const posFrom = positions.find(p => p.idx === from);
        const posTo = positions.find(p => p.idx === to);
        if (posFrom && posTo) {
          elements.push(
            <line
              key={`edge-${from}-${to}`}
              x1={posFrom.x}
              y1={posFrom.y}
              x2={posTo.x}
              y2={posTo.y}
              stroke="rgba(78, 205, 196, 0.5)"
              strokeWidth="2"
              style={{ transition: "all 0.5s ease" }}
            />
          );
        }
      }
    });
    
    // 繪製節點
    positions.forEach(({ idx, x, y }) => {
      if (idx < bit.length) {
        elements.push(
          <g key={`node-${idx}`}>
            <circle
              cx={x}
              cy={y}
              r="22"
              fill="#4ecdc4"
              stroke="#4ecdc4"
              strokeWidth="2"
              style={{ transition: "all 0.5s ease" }}
            />
            <text x={x} y={y - 5} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
              [{idx}]
            </text>
            <text x={x} y={y + 8} textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
              {bit[idx]}
            </text>
          </g>
        );
      }
    });
    
    return elements;
  };

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

      {/* BIT 樹狀結構 */}
      {bit.length > 1 && (
        <div style={{ marginBottom: "25px" }}>
          <div style={{ marginBottom: "15px", textAlign: "center", color: "#4ecdc4", fontSize: "1.1em" }}>
            BIT 樹狀結構
          </div>
          <svg width="100%" height="200" viewBox="0 0 300 200" style={{ display: "block", margin: "0 auto" }}>
            {renderBITTree()}
          </svg>
          <div style={{ textAlign: "center", color: "#aaa", fontSize: "0.85em", marginTop: "10px" }}>
            每個節點儲存特定區間的和
          </div>
        </div>
      )}

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
