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

  const { array, tree, operation, queryResult } = stepData;

  return (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <div style={{ marginBottom: "15px", textAlign: "center" }}>
        <span style={{ color: "#c770f0", fontSize: "1.2em" }}>
          操作: {operation}
        </span>
        {queryResult !== undefined && (
          <span style={{ marginLeft: "20px", color: "#51cf66", fontSize: "1.1em" }}>
            查詢結果: {queryResult}
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

      {tree.length > 0 && (
        <>
          <div style={{ marginTop: "30px", marginBottom: "20px", textAlign: "center", color: "#4ecdc4" }}>
            線段樹（部分節點）
          </div>
          <div className="array-container">
            {tree.slice(0, Math.min(15, tree.length)).map((value, idx) => (
              <div
                key={`tree-${idx}`}
                className="array-element"
                style={{ borderColor: "#4ecdc4", backgroundColor: "rgba(78, 205, 196, 0.2)" }}
              >
                <div style={{ fontSize: "0.7em", color: "#aaa" }}>節點{idx}</div>
                <div style={{ fontSize: "1.1em", fontWeight: "bold" }}>{value}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Tree Depth 視覺化
export const TreeDepthVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { current, depth, maxDepth } = stepData;

  return (
    <div style={{ width: "100%", maxWidth: "500px" }}>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <span style={{ color: "#c770f0", fontSize: "1.2em", marginRight: "20px" }}>
          當前深度: {depth}
        </span>
        <span style={{ color: "#51cf66", fontSize: "1.2em" }}>
          最大深度: {maxDepth}
        </span>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <div style={{ color: "#aaa", marginBottom: "15px" }}>樹結構</div>
        <pre style={{ 
          color: "#c770f0", 
          fontSize: "1.1em", 
          backgroundColor: "rgba(199, 112, 240, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #c770f0",
          fontFamily: "monospace"
        }}>
{`      1
     / \\
    2   3
   / \\
  4   5`}
        </pre>
        {current !== null && (
          <div style={{ marginTop: "15px", color: "#ff6b6b", fontSize: "1.1em" }}>
            當前訪問節點: {current}
          </div>
        )}
      </div>
    </div>
  );
};

// Subtree Size 視覺化
export const SubtreeSizeVisualization = ({ stepData }) => {
  if (!stepData) return null;

  const { tree, current } = stepData;

  const renderTree = (node, x = 250, y = 40, level = 0) => {
    if (!node) return null;

    const offset = 80 / (level + 1);
    const elements = [];

    // 繪製當前節點
    elements.push(
      <div
        key={`node-${node.val}-${x}-${y}`}
        className={`tree-node ${current === node.val ? "current" : ""}`}
        style={{ left: `${x}px`, top: `${y}px` }}
      >
        <div>{node.val}</div>
        {node.size !== undefined && node.size > 0 && (
          <div style={{ fontSize: "0.7em", color: "#51cf66", marginTop: "2px" }}>
            ({node.size})
          </div>
        )}
      </div>
    );

    // 繪製左子樹
    if (node.left) {
      const leftX = x - offset;
      const leftY = y + 70;
      elements.push(
        <div
          key={`edge-${node.val}-left`}
          className="tree-edge"
          style={{
            left: `${x}px`,
            top: `${y + 20}px`,
            width: `${Math.sqrt((leftX - x) ** 2 + (leftY - y - 20) ** 2)}px`,
            transform: `rotate(${Math.atan2(leftY - y - 20, leftX - x) * (180 / Math.PI)}deg)`
          }}
        />
      );
      elements.push(...renderTree(node.left, leftX, leftY, level + 1));
    }

    // 繪製右子樹
    if (node.right) {
      const rightX = x + offset;
      const rightY = y + 70;
      elements.push(
        <div
          key={`edge-${node.val}-right`}
          className="tree-edge"
          style={{
            left: `${x}px`,
            top: `${y + 20}px`,
            width: `${Math.sqrt((rightX - x) ** 2 + (rightY - y - 20) ** 2)}px`,
            transform: `rotate(${Math.atan2(rightY - y - 20, rightX - x) * (180 / Math.PI)}deg)`
          }}
        />
      );
      elements.push(...renderTree(node.right, rightX, rightY, level + 1));
    }

    return elements;
  };

  return (
    <div style={{ position: "relative", width: "500px", height: "280px" }}>
      {renderTree(tree)}
      <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", textAlign: "center", color: "#51cf66" }}>
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
