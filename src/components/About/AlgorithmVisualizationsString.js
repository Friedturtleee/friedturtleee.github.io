import React from "react";

// ========== 字串演算法視覺化組件 ==========

// KMP 視覺化
export const KMPVisualization = ({ stepData }) => {
  if (!stepData) return null;
  const { text, pattern, textIndex, patternIndex, lps, matches, phase, found } = stepData;

  return (
    <div className="algorithm-container">
      {/* LPS 陣列 */}
      {lps && lps.length > 0 && (
        <div className="array-container" style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "10px", fontSize: "14px", color: "#c770f0" }}>
            LPS 陣列 (最長前綴後綴):
          </div>
          <div className="array-display">
            {lps.map((val, i) => (
              <div key={i} className="array-element" style={{ background: i === patternIndex ? "#c770f0" : "#2a2a3e" }}>
                {val}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 文本字串 */}
      <div className="string-container" style={{ marginBottom: "15px" }}>
        <div style={{ marginBottom: "10px", fontSize: "14px", color: "#4ecdc4" }}>
          文本:
        </div>
        <div className="string-display">
          {text.split('').map((char, i) => (
            <div
              key={i}
              className="string-char"
              style={{
                background: i === textIndex ? "#ff6b6b" : matches && matches[i - (textIndex - patternIndex)] ? "#c770f0" : "#2a2a3e",
                border: found === i ? "2px solid #4ecdc4" : "1px solid #555"
              }}
            >
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* 模式字串 */}
      <div className="string-container">
        <div style={{ marginBottom: "10px", fontSize: "14px", color: "#f9ca24" }}>
          模式 (偏移 {textIndex - patternIndex}):
        </div>
        <div className="string-display" style={{ marginLeft: `${(textIndex - patternIndex) * 45}px` }}>
          {pattern.split('').map((char, i) => (
            <div
              key={i}
              className="string-char"
              style={{
                background: i === patternIndex ? "#ff6b6b" : matches && matches[i] ? "#4ecdc4" : "#2a2a3e",
                opacity: phase === "mismatch" && i === patternIndex ? 0.5 : 1
              }}
            >
              {char}
            </div>
          ))}
        </div>
      </div>

      {found !== undefined && found >= 0 && (
        <div style={{ marginTop: "20px", color: "#4ecdc4", fontSize: "16px", textAlign: "center" }}>
          ✓ 找到匹配在位置 {found}
        </div>
      )}
    </div>
  );
};

// Rabin-Karp 視覺化
export const RabinKarpVisualization = ({ stepData }) => {
  if (!stepData) return null;
  const { text, pattern, window, position, textHash, patternHash, found, phase } = stepData;

  return (
    <div className="algorithm-container">
      {/* Hash 值顯示 */}
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
        <div className="info-box" style={{ padding: "10px", background: "#2a2a3e", borderRadius: "8px" }}>
          <div style={{ color: "#c770f0", fontSize: "12px" }}>模式 Hash</div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>{patternHash || "?"}</div>
        </div>
        <div className="info-box" style={{ padding: "10px", background: "#2a2a3e", borderRadius: "8px" }}>
          <div style={{ color: "#4ecdc4", fontSize: "12px" }}>窗口 Hash</div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>{textHash || "?"}</div>
        </div>
        <div className="info-box" style={{ padding: "10px", background: "#2a2a3e", borderRadius: "8px" }}>
          <div style={{ color: textHash === patternHash && textHash !== null ? "#4ecdc4" : "#ff6b6b", fontSize: "12px" }}>
            {textHash === patternHash && textHash !== null ? "Hash 相等 ✓" : "Hash 不等 ✗"}
          </div>
        </div>
      </div>

      {/* 文本字串 */}
      <div className="string-container" style={{ marginBottom: "15px" }}>
        <div style={{ marginBottom: "10px", fontSize: "14px", color: "#4ecdc4" }}>
          文本:
        </div>
        <div className="string-display">
          {text.split('').map((char, i) => {
            const inWindow = position !== undefined && i >= position && i < position + pattern.length;
            const isFound = found && found.includes(i - pattern.length + 1);
            return (
              <div
                key={i}
                className="string-char"
                style={{
                  background: inWindow ? "#c770f0" : isFound ? "#4ecdc4" : "#2a2a3e",
                  border: isFound ? "2px solid #4ecdc4" : "1px solid #555"
                }}
              >
                {char}
              </div>
            );
          })}
        </div>
      </div>

      {/* 當前窗口 */}
      {window && (
        <div className="string-container">
          <div style={{ marginBottom: "10px", fontSize: "14px", color: "#f9ca24" }}>
            當前窗口 (位置 {position}):
          </div>
          <div className="string-display">
            {window.split('').map((char, i) => (
              <div key={i} className="string-char" style={{ background: "#c770f0" }}>
                {char}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 找到的匹配 */}
      {found && found.length > 0 && (
        <div style={{ marginTop: "20px", color: "#4ecdc4", fontSize: "14px", textAlign: "center" }}>
          已找到的匹配位置: [{found.join(", ")}]
        </div>
      )}
    </div>
  );
};

// Z-Algorithm 視覺化
export const ZAlgorithmVisualization = ({ stepData }) => {
  if (!stepData) return null;
  const { str, z, i, l, r, comparing, phase } = stepData;

  return (
    <div className="algorithm-container">
      {/* 字串顯示 */}
      <div className="string-container" style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px", fontSize: "14px", color: "#4ecdc4" }}>
          字串:
        </div>
        <div className="string-display">
          {str.split('').map((char, idx) => (
            <div
              key={idx}
              className="string-char"
              style={{
                background: idx === i ? "#ff6b6b" : (idx >= l && idx <= r) ? "#c770f0" : "#2a2a3e",
                border: idx === i ? "2px solid #ff6b6b" : "1px solid #555"
              }}
            >
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* Z 陣列 */}
      {z && z.length > 0 && (
        <div className="array-container">
          <div style={{ marginBottom: "10px", fontSize: "14px", color: "#c770f0" }}>
            Z 陣列 (最長公共前綴長度):
          </div>
          <div className="array-display">
            {z.map((val, idx) => (
              <div
                key={idx}
                className="array-element"
                style={{
                  background: idx === i ? "#ff6b6b" : val > 0 ? "#c770f0" : "#2a2a3e"
                }}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Z-box 顯示 */}
      {l !== undefined && r !== undefined && l > 0 && (
        <div style={{ marginTop: "15px", padding: "10px", background: "#2a2a3e", borderRadius: "8px" }}>
          <span style={{ color: "#f9ca24" }}>當前 Z-box:</span> [L={l}, R={r}]
        </div>
      )}

      {/* 比對資訊 */}
      {comparing && (
        <div style={{ marginTop: "15px", color: "#4ecdc4", fontSize: "14px", textAlign: "center" }}>
          正在比對: {comparing}
        </div>
      )}
    </div>
  );
};

// Manacher's Algorithm 視覺化
export const ManacherVisualization = ({ stepData }) => {
  if (!stepData) return null;
  const { original, transformed, p, center, right, i, maxLen, maxCenter, palindrome, phase } = stepData;

  return (
    <div className="algorithm-container">
      {/* 原始字串 */}
      <div className="string-container" style={{ marginBottom: "15px" }}>
        <div style={{ marginBottom: "10px", fontSize: "14px", color: "#4ecdc4" }}>
          原始字串:
        </div>
        <div className="string-display">
          {original.split('').map((char, idx) => (
            <div key={idx} className="string-char" style={{ background: "#2a2a3e" }}>
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* 轉換後的字串 */}
      {transformed && (
        <div className="string-container" style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "10px", fontSize: "14px", color: "#f9ca24" }}>
            轉換字串 (加入分隔符):
          </div>
          <div className="string-display">
            {transformed.split('').map((char, idx) => (
              <div
                key={idx}
                className="string-char"
                style={{
                  background: idx === i ? "#ff6b6b" : idx === center ? "#c770f0" : "#2a2a3e",
                  fontSize: char === '#' || char === '^' || char === '$' ? "10px" : "14px",
                  color: char === '#' || char === '^' || char === '$' ? "#888" : "#fff"
                }}
              >
                {char}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* P 陣列 (回文半徑) */}
      {p && p.length > 0 && (
        <div className="array-container" style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "10px", fontSize: "14px", color: "#c770f0" }}>
            P 陣列 (回文半徑):
          </div>
          <div className="array-display">
            {p.map((val, idx) => (
              <div
                key={idx}
                className="array-element"
                style={{
                  background: idx === i ? "#ff6b6b" : idx === maxCenter ? "#4ecdc4" : val > 0 ? "#c770f0" : "#2a2a3e"
                }}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 最長回文 */}
      {palindrome && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#2a2a3e", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#4ecdc4", fontSize: "14px", marginBottom: "8px" }}>
            最長回文子串:
          </div>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: "#c770f0" }}>
            "{palindrome}" (長度 {maxLen})
          </div>
        </div>
      )}

      {/* Center 和 Right 邊界 */}
      {center !== undefined && right !== undefined && center > 0 && (
        <div style={{ marginTop: "15px", padding: "10px", background: "#2a2a3e", borderRadius: "8px" }}>
          <span style={{ color: "#f9ca24" }}>當前中心:</span> {center}, <span style={{ color: "#f9ca24" }}>右邊界:</span> {right}
        </div>
      )}
    </div>
  );
};

// Trie 視覺化
export const TrieVisualization = ({ stepData }) => {
  if (!stepData) return null;
  const { trie, operation, word, found, path, prefix, words, phase } = stepData;

  // 簡化的 Trie 樹狀顯示
  const renderTrieNode = (node, char = "root", level = 0) => {
    if (!node) return null;
    
    const isEnd = node.isEnd;
    const hasChildren = node.children && Object.keys(node.children).length > 0;
    
    return (
      <div key={char + level} style={{ marginLeft: level * 20 + "px", marginTop: "8px" }}>
        <div
          className="tree-node"
          style={{
            display: "inline-block",
            padding: "8px 12px",
            background: isEnd ? "#4ecdc4" : "#c770f0",
            borderRadius: "50%",
            minWidth: "40px",
            textAlign: "center",
            fontSize: "14px",
            fontWeight: "bold",
            border: path && path.includes(char) ? "3px solid #f9ca24" : "none"
          }}
        >
          {char}
          {isEnd && <span style={{ fontSize: "10px", marginLeft: "4px" }}>✓</span>}
        </div>
        {hasChildren && (
          <div style={{ marginLeft: "20px", borderLeft: "2px solid #555", paddingLeft: "10px" }}>
            {Object.keys(node.children).map(childChar =>
              renderTrieNode(node.children[childChar], childChar, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="algorithm-container">
      {/* 操作資訊 */}
      <div style={{ marginBottom: "20px", padding: "10px", background: "#2a2a3e", borderRadius: "8px" }}>
        <span style={{ color: "#c770f0", fontWeight: "bold" }}>操作:</span> {operation}
        {word && <span style={{ marginLeft: "15px", color: "#4ecdc4" }}>字串: "{word}"</span>}
        {prefix && <span style={{ marginLeft: "15px", color: "#f9ca24" }}>前綴: "{prefix}"</span>}
      </div>

      {/* Trie 樹狀結構 */}
      <div className="trie-container" style={{ marginTop: "20px", padding: "20px", background: "#1a1a2e", borderRadius: "8px" }}>
        {renderTrieNode(trie, "root", 0)}
      </div>

      {/* 搜尋結果 */}
      {operation === "search" && found !== undefined && (
        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "16px" }}>
          {found ? (
            <span style={{ color: "#4ecdc4" }}>✓ 找到字串 "{word}"</span>
          ) : (
            <span style={{ color: "#ff6b6b" }}>✗ 未找到字串 "{word}"</span>
          )}
        </div>
      )}

      {/* 前綴搜尋結果 */}
      {operation === "prefix" && words && words.length > 0 && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#2a2a3e", borderRadius: "8px" }}>
          <div style={{ color: "#c770f0", fontSize: "14px", marginBottom: "10px" }}>
            以 "{prefix}" 開頭的字串:
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {words.map((w, idx) => (
              <div key={idx} style={{ padding: "5px 12px", background: "#4ecdc4", borderRadius: "5px", color: "#1a1a2e" }}>
                {w}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// LCS 視覺化
export const LCSVisualization = ({ stepData }) => {
  if (!stepData) return null;
  const { s1, s2, dp, i, j, match, lcs, length, backtrack, phase } = stepData;

  return (
    <div className="algorithm-container">
      {/* 兩個字串 */}
      <div style={{ display: "flex", gap: "30px", marginBottom: "20px", justifyContent: "center" }}>
        <div>
          <div style={{ marginBottom: "8px", fontSize: "14px", color: "#4ecdc4" }}>字串 1:</div>
          <div className="string-display">
            {s1.split('').map((char, idx) => (
              <div
                key={idx}
                className="string-char"
                style={{
                  background: idx + 1 === i ? "#ff6b6b" : "#2a2a3e"
                }}
              >
                {char}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ marginBottom: "8px", fontSize: "14px", color: "#f9ca24" }}>字串 2:</div>
          <div className="string-display">
            {s2.split('').map((char, idx) => (
              <div
                key={idx}
                className="string-char"
                style={{
                  background: idx + 1 === j ? "#ff6b6b" : "#2a2a3e"
                }}
              >
                {char}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DP 表格 */}
      {dp && dp.length > 0 && (
        <div className="dp-table-container" style={{ overflowX: "auto", marginTop: "20px" }}>
          <table className="dp-table" style={{ margin: "0 auto", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ padding: "8px", background: "#1a1a2e", border: "1px solid #555" }}></td>
                <td style={{ padding: "8px", background: "#1a1a2e", border: "1px solid #555", color: "#888" }}>ε</td>
                {s2.split('').map((char, idx) => (
                  <td key={idx} style={{ padding: "8px", background: "#1a1a2e", border: "1px solid #555", color: "#f9ca24" }}>
                    {char}
                  </td>
                ))}
              </tr>
              {dp.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td style={{ padding: "8px", background: "#1a1a2e", border: "1px solid #555", color: rowIdx === 0 ? "#888" : "#4ecdc4" }}>
                    {rowIdx === 0 ? "ε" : s1[rowIdx - 1]}
                  </td>
                  {row.map((val, colIdx) => {
                    const isBacktrack = backtrack && backtrack.some(([bi, bj]) => bi === rowIdx && bj === colIdx);
                    const isCurrent = rowIdx === i && colIdx === j;
                    return (
                      <td
                        key={colIdx}
                        className="matrix-cell"
                        style={{
                          padding: "8px",
                          background: isBacktrack ? "#4ecdc4" : isCurrent ? "#ff6b6b" : val > 0 ? "#c770f0" : "#2a2a3e",
                          border: "1px solid #555",
                          color: "#fff",
                          fontWeight: val > 0 ? "bold" : "normal",
                          minWidth: "40px",
                          textAlign: "center"
                        }}
                      >
                        {val === Infinity ? "∞" : val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 當前比對 */}
      {match !== undefined && i !== undefined && j !== undefined && i > 0 && j > 0 && (
        <div style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
          {match ? (
            <span style={{ color: "#4ecdc4" }}>✓ {s1[i-1]} = {s2[j-1]} 匹配</span>
          ) : (
            <span style={{ color: "#ff6b6b" }}>✗ {s1[i-1]} ≠ {s2[j-1]} 不匹配</span>
          )}
        </div>
      )}

      {/* LCS 結果 */}
      {lcs && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#2a2a3e", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#c770f0", fontSize: "14px", marginBottom: "8px" }}>
            最長公共子序列 (LCS):
          </div>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: "#4ecdc4" }}>
            "{lcs}" (長度 {length})
          </div>
        </div>
      )}
    </div>
  );
};
