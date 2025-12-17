// ========== 演算法數據函數 ==========

// BFS
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

// DFS
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

// Dijkstra
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

// Bellman-Ford
export function getBellmanFordData() {
  return {
    description: "Bellman-Ford 演算法可以處理負權重邊的單源最短路徑問題，並能檢測負權環。進行 V-1 次鬆弛操作。",
    timeComplexity: "O(V × E)",
    spaceComplexity: "O(V)",
    steps: [
      { explanation: "初始化：起點距離為 0", distances: [0, Infinity, Infinity, Infinity], edges: [[0, 1, 4], [0, 2, 5], [1, 2, -3], [2, 3, 2]], iteration: 0 },
      { explanation: "第 1 輪鬆弛：更新邊 (0,1) 和 (0,2)", distances: [0, 4, 5, Infinity], edges: [[0, 1, 4], [0, 2, 5], [1, 2, -3], [2, 3, 2]], iteration: 1 },
      { explanation: "第 1 輪鬆弛：更新邊 (1,2)", distances: [0, 4, 1, Infinity], edges: [[0, 1, 4], [0, 2, 5], [1, 2, -3], [2, 3, 2]], iteration: 1 },
      { explanation: "第 2 輪鬆弛：更新邊 (2,3)", distances: [0, 4, 1, 3], edges: [[0, 1, 4], [0, 2, 5], [1, 2, -3], [2, 3, 2]], iteration: 2 },
      { explanation: "完成所有鬆弛操作，得到最短路徑", distances: [0, 4, 1, 3], edges: [[0, 1, 4], [0, 2, 5], [1, 2, -3], [2, 3, 2]], iteration: 3 }
    ]
  };
}

// Floyd-Warshall
export function getFloydWarshallData() {
  return {
    description: "Floyd-Warshall 演算法用於找到所有節點對之間的最短路徑。使用動態規劃，逐步考慮每個節點作為中間節點。",
    timeComplexity: "O(V³)",
    spaceComplexity: "O(V²)",
    steps: [
      { explanation: "初始化距離矩陣", matrix: [[0, 3, Infinity, 7], [8, 0, 2, Infinity], [5, Infinity, 0, 1], [2, Infinity, Infinity, 0]], k: -1 },
      { explanation: "使用節點 0 作為中間節點", matrix: [[0, 3, Infinity, 7], [8, 0, 2, 15], [5, 8, 0, 1], [2, 5, Infinity, 0]], k: 0 },
      { explanation: "使用節點 1 作為中間節點", matrix: [[0, 3, 5, 7], [8, 0, 2, 15], [5, 8, 0, 1], [2, 5, 7, 0]], k: 1 },
      { explanation: "使用節點 2 作為中間節點", matrix: [[0, 3, 5, 6], [7, 0, 2, 3], [5, 8, 0, 1], [2, 5, 7, 0]], k: 2 },
      { explanation: "使用節點 3 作為中間節點，完成", matrix: [[0, 3, 5, 6], [7, 0, 2, 3], [3, 6, 0, 1], [2, 5, 7, 0]], k: 3 }
    ]
  };
}

// Kruskal's MST
export function getKruskalData() {
  return {
    description: "Kruskal 演算法用於找到無向圖的最小生成樹 (MST)。按邊的權重從小到大排序，使用並查集 (DSU) 避免形成環。",
    timeComplexity: "O(E log E)",
    spaceComplexity: "O(V)",
    steps: [
      { explanation: "將所有邊按權重排序", edges: [{u: 0, v: 1, w: 1}, {u: 2, v: 3, w: 2}, {u: 1, v: 2, w: 3}, {u: 0, v: 3, w: 4}], selected: [], mstWeight: 0 },
      { explanation: "選擇邊 (0,1)，權重 1", edges: [{u: 0, v: 1, w: 1}, {u: 2, v: 3, w: 2}, {u: 1, v: 2, w: 3}, {u: 0, v: 3, w: 4}], selected: [{u: 0, v: 1, w: 1}], mstWeight: 1 },
      { explanation: "選擇邊 (2,3)，權重 2", edges: [{u: 0, v: 1, w: 1}, {u: 2, v: 3, w: 2}, {u: 1, v: 2, w: 3}, {u: 0, v: 3, w: 4}], selected: [{u: 0, v: 1, w: 1}, {u: 2, v: 3, w: 2}], mstWeight: 3 },
      { explanation: "選擇邊 (1,2)，權重 3", edges: [{u: 0, v: 1, w: 1}, {u: 2, v: 3, w: 2}, {u: 1, v: 2, w: 3}, {u: 0, v: 3, w: 4}], selected: [{u: 0, v: 1, w: 1}, {u: 2, v: 3, w: 2}, {u: 1, v: 2, w: 3}], mstWeight: 6 },
      { explanation: "MST 完成，總權重為 6", edges: [{u: 0, v: 1, w: 1}, {u: 2, v: 3, w: 2}, {u: 1, v: 2, w: 3}, {u: 0, v: 3, w: 4}], selected: [{u: 0, v: 1, w: 1}, {u: 2, v: 3, w: 2}, {u: 1, v: 2, w: 3}], mstWeight: 6 }
    ]
  };
}

// DSU (Disjoint Set Union)
export function getDSUData() {
  return {
    description: "並查集 (DSU) 是一種資料結構，用於處理不相交集合的合併和查詢操作。支援 Union (合併) 和 Find (查找根節點) 操作。",
    timeComplexity: "O(α(n)) ≈ O(1)",
    spaceComplexity: "O(n)",
    steps: [
      { explanation: "初始化：每個元素自成一個集合", parent: [0, 1, 2, 3, 4], rank: [0, 0, 0, 0, 0], operation: "初始化" },
      { explanation: "Union(0, 1)：合併元素 0 和 1", parent: [0, 0, 2, 3, 4], rank: [1, 0, 0, 0, 0], operation: "Union(0, 1)" },
      { explanation: "Union(2, 3)：合併元素 2 和 3", parent: [0, 0, 2, 2, 4], rank: [1, 0, 1, 0, 0], operation: "Union(2, 3)" },
      { explanation: "Union(0, 3)：合併包含 0 和 3 的集合", parent: [0, 0, 0, 2, 4], rank: [2, 0, 1, 0, 0], operation: "Union(0, 3)" },
      { explanation: "Find(3)：查找元素 3 的根節點為 0", parent: [0, 0, 0, 0, 4], rank: [2, 0, 1, 0, 0], operation: "Find(3) = 0" }
    ]
  };
}

// Bipartite Check
export function getBipartiteData() {
  return {
    description: "二分圖檢測演算法判斷圖是否可以分成兩個集合，使得每條邊的兩個端點分別屬於不同集合。使用著色法 (Coloring)。",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    steps: [
      { explanation: "從節點 0 開始，著色為紅色", colors: [0, -1, -1, -1], current: 0, isBipartite: true },
      { explanation: "節點 0 的鄰居 1 和 2 著色為藍色", colors: [0, 1, 1, -1], current: 0, isBipartite: true },
      { explanation: "節點 1 的鄰居 3 著色為紅色", colors: [0, 1, 1, 0], current: 1, isBipartite: true },
      { explanation: "檢查節點 2 的鄰居，顏色相容", colors: [0, 1, 1, 0], current: 2, isBipartite: true },
      { explanation: "圖是二分圖！", colors: [0, 1, 1, 0], current: null, isBipartite: true }
    ]
  };
}

// Dynamic Programming (以費氏數列為例)
export function getDPData() {
  return {
    description: "動態規劃 (DP) 通過將問題分解為子問題，並存儲子問題的解來避免重複計算。以費氏數列 F(n) = F(n-1) + F(n-2) 為例。",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    steps: [
      { explanation: "初始化：F(0) = 0, F(1) = 1", dp: [0, 1], n: 5, calculating: null },
      { explanation: "計算 F(2) = F(1) + F(0) = 1", dp: [0, 1, 1], n: 5, calculating: 2 },
      { explanation: "計算 F(3) = F(2) + F(1) = 2", dp: [0, 1, 1, 2], n: 5, calculating: 3 },
      { explanation: "計算 F(4) = F(3) + F(2) = 3", dp: [0, 1, 1, 2, 3], n: 5, calculating: 4 },
      { explanation: "計算 F(5) = F(4) + F(3) = 5", dp: [0, 1, 1, 2, 3, 5], n: 5, calculating: 5 },
      { explanation: "完成！F(5) = 5", dp: [0, 1, 1, 2, 3, 5], n: 5, calculating: null }
    ]
  };
}

// Modular Exponentiation
export function getModularExpData() {
  return {
    description: "模冪運算用於計算 (base^exp) % mod，透過二進制拆解指數來優化計算。例如：3^13 % 7。",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    steps: [
      { explanation: "初始化：base = 3, exp = 13 (1101₂), mod = 7", result: 1, base: 3, exp: 13, expBinary: "1101" },
      { explanation: "exp 的最低位是 1，result = (result × base) % mod = 3", result: 3, base: 3, exp: 13, expBinary: "1101" },
      { explanation: "base = (base²) % mod = 9 % 7 = 2, exp 右移", result: 3, base: 2, exp: 6, expBinary: "110" },
      { explanation: "exp 的最低位是 0，不更新 result", result: 3, base: 2, exp: 6, expBinary: "110" },
      { explanation: "base = (base²) % mod = 4, exp 右移", result: 3, base: 4, exp: 3, expBinary: "11" },
      { explanation: "exp 的最低位是 1，result = (result × base) % mod = 12 % 7 = 5", result: 5, base: 4, exp: 3, expBinary: "11" },
      { explanation: "base = (base²) % mod = 16 % 7 = 2, exp 右移", result: 5, base: 2, exp: 1, expBinary: "1" },
      { explanation: "exp 的最低位是 1，result = (result × base) % mod = 10 % 7 = 3", result: 3, base: 2, exp: 1, expBinary: "1" },
      { explanation: "完成！3^13 % 7 = 3", result: 3, base: 2, exp: 0, expBinary: "0" }
    ]
  };
}

// Prefix / Suffix
export function getPrefixSuffixData() {
  return {
    description: "前綴和/後綴和是一種預處理技巧，用於快速計算區間和。prefix[i] = sum(arr[0...i])。",
    timeComplexity: "O(n) 預處理，O(1) 查詢",
    spaceComplexity: "O(n)",
    steps: [
      { explanation: "原始陣列", array: [3, 1, 4, 1, 5, 9, 2, 6], prefix: [], calculating: -1 },
      { explanation: "計算 prefix[0] = 3", array: [3, 1, 4, 1, 5, 9, 2, 6], prefix: [3], calculating: 0 },
      { explanation: "計算 prefix[1] = prefix[0] + arr[1] = 4", array: [3, 1, 4, 1, 5, 9, 2, 6], prefix: [3, 4], calculating: 1 },
      { explanation: "計算 prefix[2] = prefix[1] + arr[2] = 8", array: [3, 1, 4, 1, 5, 9, 2, 6], prefix: [3, 4, 8], calculating: 2 },
      { explanation: "計算 prefix[3] = 9", array: [3, 1, 4, 1, 5, 9, 2, 6], prefix: [3, 4, 8, 9], calculating: 3 },
      { explanation: "計算 prefix[4] = 14", array: [3, 1, 4, 1, 5, 9, 2, 6], prefix: [3, 4, 8, 9, 14], calculating: 4 },
      { explanation: "計算 prefix[5] = 23", array: [3, 1, 4, 1, 5, 9, 2, 6], prefix: [3, 4, 8, 9, 14, 23], calculating: 5 },
      { explanation: "計算 prefix[6] = 25", array: [3, 1, 4, 1, 5, 9, 2, 6], prefix: [3, 4, 8, 9, 14, 23, 25], calculating: 6 },
      { explanation: "計算 prefix[7] = 31，完成！", array: [3, 1, 4, 1, 5, 9, 2, 6], prefix: [3, 4, 8, 9, 14, 23, 25, 31], calculating: 7 }
    ]
  };
}

// Two Pointers
export function getTwoPointersData() {
  return {
    description: "雙指標技巧使用兩個指標來遍歷陣列或序列，常用於解決配對、區間等問題。例如：在排序陣列中找到和為目標值的兩個數。",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    steps: [
      { explanation: "在排序陣列 [1, 2, 3, 4, 5, 6] 中找和為 7 的兩個數", array: [1, 2, 3, 4, 5, 6], left: 0, right: 5, target: 7, sum: null },
      { explanation: "左指標在 0，右指標在 5，sum = 1 + 6 = 7", array: [1, 2, 3, 4, 5, 6], left: 0, right: 5, target: 7, sum: 7 },
      { explanation: "找到答案！(1, 6) 的和為 7", array: [1, 2, 3, 4, 5, 6], left: 0, right: 5, target: 7, sum: 7, found: true }
    ]
  };
}

// Sliding Window
export function getSlidingWindowData() {
  return {
    description: "滑動窗口技巧用於處理連續子陣列或子字串問題。維護一個固定或可變大小的窗口，在陣列上滑動。例如：找出長度為 3 的最大子陣列和。",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    steps: [
      { explanation: "陣列：[2, 1, 5, 1, 3, 2]，窗口大小 k=3", array: [2, 1, 5, 1, 3, 2], windowStart: 0, windowEnd: 2, windowSum: 0, maxSum: 0 },
      { explanation: "初始窗口 [2, 1, 5]，和為 8", array: [2, 1, 5, 1, 3, 2], windowStart: 0, windowEnd: 2, windowSum: 8, maxSum: 8 },
      { explanation: "窗口滑動至 [1, 5, 1]，和為 7", array: [2, 1, 5, 1, 3, 2], windowStart: 1, windowEnd: 3, windowSum: 7, maxSum: 8 },
      { explanation: "窗口滑動至 [5, 1, 3]，和為 9，更新最大值", array: [2, 1, 5, 1, 3, 2], windowStart: 2, windowEnd: 4, windowSum: 9, maxSum: 9 },
      { explanation: "窗口滑動至 [1, 3, 2]，和為 6", array: [2, 1, 5, 1, 3, 2], windowStart: 3, windowEnd: 5, windowSum: 6, maxSum: 9 },
      { explanation: "完成！最大子陣列和為 9", array: [2, 1, 5, 1, 3, 2], windowStart: 3, windowEnd: 5, windowSum: 6, maxSum: 9 }
    ]
  };
}

// Segment Tree
export function getSegmentTreeData() {
  return {
    description: "線段樹是一種用於區間查詢和更新的資料結構。可在 O(log n) 時間內完成區間查詢（如求和、最小值）和單點更新。",
    timeComplexity: "O(log n) 查詢/更新",
    spaceComplexity: "O(n)",
    steps: [
      { explanation: "原始陣列 [1, 3, 5, 7, 9, 11]", array: [1, 3, 5, 7, 9, 11], tree: [], operation: "初始化" },
      { explanation: "建立線段樹", array: [1, 3, 5, 7, 9, 11], tree: [36, 16, 20, 4, 12, 9, 11, 1, 3, 5, 7], operation: "建樹" },
      { explanation: "查詢區間 [1, 3] 的和", array: [1, 3, 5, 7, 9, 11], tree: [36, 16, 20, 4, 12, 9, 11, 1, 3, 5, 7], operation: "查詢 [1,3]", queryResult: 15 },
      { explanation: "更新 index 2 的值為 6", array: [1, 3, 6, 7, 9, 11], tree: [37, 17, 20, 4, 13, 9, 11, 1, 3, 6, 7], operation: "更新 [2] = 6" }
    ]
  };
}

// Tree Depth
export function getTreeDepthData() {
  return {
    description: "樹的深度是從根節點到最遠葉節點的最長路徑。可使用 DFS 或 BFS 計算。",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) h 為樹高",
    steps: [
      { explanation: "從根節點開始", tree: {val: 1, left: {val: 2, left: {val: 4}, right: {val: 5}}, right: {val: 3}}, current: 1, depth: 0, maxDepth: 0 },
      { explanation: "訪問左子樹節點 2，深度 = 1", tree: {val: 1, left: {val: 2, left: {val: 4}, right: {val: 5}}, right: {val: 3}}, current: 2, depth: 1, maxDepth: 1 },
      { explanation: "訪問節點 4，深度 = 2", tree: {val: 1, left: {val: 2, left: {val: 4}, right: {val: 5}}, right: {val: 3}}, current: 4, depth: 2, maxDepth: 2 },
      { explanation: "回溯，訪問節點 5，深度 = 2", tree: {val: 1, left: {val: 2, left: {val: 4}, right: {val: 5}}, right: {val: 3}}, current: 5, depth: 2, maxDepth: 2 },
      { explanation: "回溯到根，訪問右子樹節點 3，深度 = 1", tree: {val: 1, left: {val: 2, left: {val: 4}, right: {val: 5}}, right: {val: 3}}, current: 3, depth: 1, maxDepth: 2 },
      { explanation: "完成！樹的最大深度為 2", tree: {val: 1, left: {val: 2, left: {val: 4}, right: {val: 5}}, right: {val: 3}}, current: null, depth: 0, maxDepth: 2 }
    ]
  };
}

// Subtree Size
export function getSubtreeSizeData() {
  return {
    description: "子樹大小是指以某個節點為根的子樹包含的節點數量。可透過 DFS 後序遍歷計算。",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    steps: [
      { explanation: "計算每個節點的子樹大小", tree: {val: 1, size: 0, left: {val: 2, size: 0, left: {val: 4, size: 0}}, right: {val: 3, size: 0}}, current: null },
      { explanation: "節點 4 是葉節點，size = 1", tree: {val: 1, size: 0, left: {val: 2, size: 0, left: {val: 4, size: 1}}, right: {val: 3, size: 0}}, current: 4 },
      { explanation: "節點 2 的子樹大小 = 1 (節點4) + 1 (自己) = 2", tree: {val: 1, size: 0, left: {val: 2, size: 2, left: {val: 4, size: 1}}, right: {val: 3, size: 0}}, current: 2 },
      { explanation: "節點 3 是葉節點，size = 1", tree: {val: 1, size: 0, left: {val: 2, size: 2, left: {val: 4, size: 1}}, right: {val: 3, size: 1}}, current: 3 },
      { explanation: "根節點 1 的子樹大小 = 2 + 1 + 1 = 4", tree: {val: 1, size: 4, left: {val: 2, size: 2, left: {val: 4, size: 1}}, right: {val: 3, size: 1}}, current: 1 }
    ]
  };
}

// Meet in Middle
export function getMeetInMiddleData() {
  return {
    description: "Meet in Middle 是一種優化技巧，將搜索空間分成兩半分別處理，然後合併結果。將 O(2^n) 優化為 O(2^(n/2))。例如：在陣列中找和為目標值的子集。",
    timeComplexity: "O(2^(n/2))",
    spaceComplexity: "O(2^(n/2))",
    steps: [
      { explanation: "陣列 [1, 2, 3, 4]，目標和 = 6", array: [1, 2, 3, 4], target: 6, leftHalf: [], rightHalf: [] },
      { explanation: "左半部 [1, 2]，生成所有子集和：{0, 1, 2, 3}", array: [1, 2, 3, 4], target: 6, leftHalf: [0, 1, 2, 3], rightHalf: [] },
      { explanation: "右半部 [3, 4]，生成所有子集和：{0, 3, 4, 7}", array: [1, 2, 3, 4], target: 6, leftHalf: [0, 1, 2, 3], rightHalf: [0, 3, 4, 7] },
      { explanation: "在右半部中尋找 6 - 左側和的值", array: [1, 2, 3, 4], target: 6, leftHalf: [0, 1, 2, 3], rightHalf: [0, 3, 4, 7], searching: "6-3=3 in right" },
      { explanation: "找到！左側和 3 + 右側和 3 = 6", array: [1, 2, 3, 4], target: 6, leftHalf: [0, 1, 2, 3], rightHalf: [0, 3, 4, 7], found: true, solution: "[1,2] + [3]" }
    ]
  };
}

// BIT (Binary Indexed Tree / Fenwick Tree)
export function getBITData() {
  return {
    description: "Binary Indexed Tree (BIT) 或稱 Fenwick Tree，用於高效處理前綴和查詢和單點更新，時間複雜度為 O(log n)。",
    timeComplexity: "O(log n) 查詢/更新",
    spaceComplexity: "O(n)",
    steps: [
      { explanation: "原始陣列 [3, 2, -1, 6, 5, 4]", array: [3, 2, -1, 6, 5, 4], bit: [0, 0, 0, 0, 0, 0, 0], operation: "初始化" },
      { explanation: "建立 BIT", array: [3, 2, -1, 6, 5, 4], bit: [0, 3, 5, -1, 10, 5, 9], operation: "建樹" },
      { explanation: "查詢前綴和 prefix(3) = 3 + 2 + (-1) + 6 = 10", array: [3, 2, -1, 6, 5, 4], bit: [0, 3, 5, -1, 10, 5, 9], operation: "查詢 prefix(3)", queryResult: 10 },
      { explanation: "更新 index 2，值加 3 (-1 變成 2)", array: [3, 2, 2, 6, 5, 4], bit: [0, 3, 5, 2, 13, 5, 12], operation: "更新 [2] += 3" },
      { explanation: "查詢區間和 [1, 3] = prefix(3) - prefix(0) = 13 - 3 = 10", array: [3, 2, 2, 6, 5, 4], bit: [0, 3, 5, 2, 13, 5, 12], operation: "查詢 [1,3]", queryResult: 10 }
    ]
  };
}

// ========== 字串演算法 ==========

// KMP (Knuth-Morris-Pratt)
export function getKMPData() {
  return {
    description: "KMP 演算法是一種高效的字串匹配演算法，透過預處理模式串建立失敗函數 (failure function)，避免不必要的字元比對。",
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(m)",
    steps: [
      { explanation: "文本：ABABCABABA，模式：ABABA", text: "ABABCABABA", pattern: "ABABA", textIndex: 0, patternIndex: 0, lps: [], phase: "init" },
      { explanation: "建立 LPS 陣列 (最長前綴後綴)：[0,0,1,2,3]", text: "ABABCABABA", pattern: "ABABA", textIndex: 0, patternIndex: 0, lps: [0,0,1,2,3], phase: "lps" },
      { explanation: "比對第 0 位：A = A ✓", text: "ABABCABABA", pattern: "ABABA", textIndex: 0, patternIndex: 0, lps: [0,0,1,2,3], matches: [true], phase: "match" },
      { explanation: "比對第 1 位：B = B ✓", text: "ABABCABABA", pattern: "ABABA", textIndex: 1, patternIndex: 1, lps: [0,0,1,2,3], matches: [true,true], phase: "match" },
      { explanation: "比對第 2 位：A = A ✓", text: "ABABCABABA", pattern: "ABABA", textIndex: 2, patternIndex: 2, lps: [0,0,1,2,3], matches: [true,true,true], phase: "match" },
      { explanation: "比對第 3 位：B = B ✓", text: "ABABCABABA", pattern: "ABABA", textIndex: 3, patternIndex: 3, lps: [0,0,1,2,3], matches: [true,true,true,true], phase: "match" },
      { explanation: "比對第 4 位：C ≠ A ✗，使用 LPS[3]=2 跳轉", text: "ABABCABABA", pattern: "ABABA", textIndex: 4, patternIndex: 4, lps: [0,0,1,2,3], matches: [true,true,true,true,false], phase: "mismatch" },
      { explanation: "從 pattern[2] 繼續比對：C ≠ A ✗", text: "ABABCABABA", pattern: "ABABA", textIndex: 4, patternIndex: 2, lps: [0,0,1,2,3], matches: [], phase: "mismatch" },
      { explanation: "移動到下一個位置，從頭開始匹配", text: "ABABCABABA", pattern: "ABABA", textIndex: 5, patternIndex: 0, lps: [0,0,1,2,3], matches: [], phase: "continue" },
      { explanation: "找到匹配！位置 5", text: "ABABCABABA", pattern: "ABABA", textIndex: 5, patternIndex: 5, lps: [0,0,1,2,3], matches: [true,true,true,true,true], found: 5, phase: "found" }
    ]
  };
}

// Rabin-Karp
export function getRabinKarpData() {
  return {
    description: "Rabin-Karp 演算法使用滾動雜湊 (rolling hash) 來快速比對字串，適合多模式匹配。使用 hash 值快速過濾，再進行精確比對。",
    timeComplexity: "平均 O(n + m)，最壞 O(nm)",
    spaceComplexity: "O(1)",
    steps: [
      { explanation: "文本：ABCABCABC，模式：ABC，使用簡單多項式 hash", text: "ABCABCABC", pattern: "ABC", base: 256, mod: 101, textHash: null, patternHash: null, phase: "init" },
      { explanation: "計算模式 hash：(A×256² + B×256 + C) mod 101 = 67", text: "ABCABCABC", pattern: "ABC", base: 256, mod: 101, textHash: null, patternHash: 67, phase: "pattern-hash" },
      { explanation: "計算第一個窗口 hash：ABC = 67", text: "ABCABCABC", pattern: "ABC", window: "ABC", position: 0, textHash: 67, patternHash: 67, phase: "window-hash" },
      { explanation: "Hash 相等！驗證字串：ABC = ABC ✓ 找到匹配 at 0", text: "ABCABCABC", pattern: "ABC", window: "ABC", position: 0, textHash: 67, patternHash: 67, found: [0], phase: "verify" },
      { explanation: "滾動 hash：移除 A，加入 C，新窗口 BCA", text: "ABCABCABC", pattern: "ABC", window: "BCA", position: 1, textHash: 42, patternHash: 67, found: [0], phase: "rolling" },
      { explanation: "Hash 不等，繼續滾動：窗口 CAB", text: "ABCABCABC", pattern: "ABC", window: "CAB", position: 2, textHash: 53, patternHash: 67, found: [0], phase: "rolling" },
      { explanation: "滾動到位置 3：窗口 ABC，hash = 67", text: "ABCABCABC", pattern: "ABC", window: "ABC", position: 3, textHash: 67, patternHash: 67, found: [0], phase: "rolling" },
      { explanation: "Hash 相等！驗證：ABC = ABC ✓ 找到匹配 at 3", text: "ABCABCABC", pattern: "ABC", window: "ABC", position: 3, textHash: 67, patternHash: 67, found: [0,3], phase: "verify" },
      { explanation: "繼續搜尋，找到所有匹配：[0, 3, 6]", text: "ABCABCABC", pattern: "ABC", window: "ABC", position: 6, textHash: 67, patternHash: 67, found: [0,3,6], phase: "complete" }
    ]
  };
}

// Z-Algorithm
export function getZAlgorithmData() {
  return {
    description: "Z 演算法計算字串每個位置與整個字串的最長公共前綴長度。用於字串匹配、週期性檢測等。Z[i] = 從位置 i 開始與字串的最長匹配長度。",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    steps: [
      { explanation: "字串：aabcaabxaaz", str: "aabcaabxaaz", z: [], l: 0, r: 0, phase: "init" },
      { explanation: "Z[0] = 11 (整個字串)", str: "aabcaabxaaz", z: [11], i: 0, l: 0, r: 0, phase: "computing" },
      { explanation: "Z[1]：比對 a = a ✓，b ≠ a ✗，Z[1] = 1", str: "aabcaabxaaz", z: [11,1], i: 1, l: 1, r: 1, comparing: "a vs a", phase: "computing" },
      { explanation: "Z[2]：b ≠ a ✗，Z[2] = 0", str: "aabcaabxaaz", z: [11,1,0], i: 2, l: 1, r: 1, comparing: "b vs a", phase: "computing" },
      { explanation: "Z[3]：c ≠ a ✗，Z[3] = 0", str: "aabcaabxaaz", z: [11,1,0,0], i: 3, l: 1, r: 1, phase: "computing" },
      { explanation: "Z[4]：aa ✓，ab ✓，ac ≠ bc ✗，Z[4] = 3，更新窗口 [4,6]", str: "aabcaabxaaz", z: [11,1,0,0,3], i: 4, l: 4, r: 6, comparing: "aab vs aab", phase: "computing" },
      { explanation: "Z[5]：i=5 在窗口內，使用 Z[5-4]=Z[1]=1，再擴展", str: "aabcaabxaaz", z: [11,1,0,0,3,1], i: 5, l: 4, r: 6, phase: "reuse" },
      { explanation: "Z[6] = 0，Z[7] = 0", str: "aabcaabxaaz", z: [11,1,0,0,3,1,0,0], i: 7, phase: "computing" },
      { explanation: "Z[8]：aa ✓，Z[8] = 2", str: "aabcaabxaaz", z: [11,1,0,0,3,1,0,0,2], i: 8, l: 8, r: 9, comparing: "aa vs aa", phase: "computing" },
      { explanation: "Z[9]：a ✓，Z[9] = 1", str: "aabcaabxaaz", z: [11,1,0,0,3,1,0,0,2,1], i: 9, phase: "computing" },
      { explanation: "Z[10]：z ≠ a ✗，Z[10] = 0，完成！", str: "aabcaabxaaz", z: [11,1,0,0,3,1,0,0,2,1,0], i: 10, phase: "complete" }
    ]
  };
}

// Manacher's Algorithm
export function getManacherData() {
  return {
    description: "Manacher 演算法用於線性時間內找到字串的最長回文子串。透過在字元間插入特殊字元，統一處理奇偶長度回文。",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    steps: [
      { explanation: "原字串：babad", original: "babad", transformed: "", p: [], phase: "init" },
      { explanation: "轉換字串：^#b#a#b#a#d#$（加入邊界和分隔符）", original: "babad", transformed: "^#b#a#b#a#d#$", p: [0,0,0,0,0,0,0,0,0,0,0,0], center: 0, right: 0, phase: "transform" },
      { explanation: "從左到右計算每個位置的回文半徑 p[i]", original: "babad", transformed: "^#b#a#b#a#d#$", p: [0,0,1,0,3,0,1,0,1,0,1,0], center: 4, right: 7, i: 1, phase: "computing" },
      { explanation: "p[4] = 3，對應原字串的回文 'bab'（長度 3）", original: "babad", transformed: "^#b#a#b#a#d#$", p: [0,0,1,0,3,0,1,0,1,0,1,0], center: 4, right: 7, i: 4, maxLen: 3, maxCenter: 4, phase: "found" },
      { explanation: "繼續擴展：p[6] = 1", original: "babad", transformed: "^#b#a#b#a#d#$", p: [0,0,1,0,3,0,5,0,1,0,1,0], center: 6, right: 11, i: 6, phase: "computing" },
      { explanation: "更新最大值：p[6] = 5，對應原字串的回文 'ababa'（長度 5）", original: "babad", transformed: "^#b#a#b#a#d#$", p: [0,0,1,0,3,0,5,0,1,0,1,0], center: 6, right: 11, i: 6, maxLen: 5, maxCenter: 6, palindrome: "ababa", phase: "complete" }
    ]
  };
}

// Trie (Prefix Tree)
export function getTrieData() {
  return {
    description: "Trie（字典樹）是一種樹狀資料結構，用於高效存儲和搜尋字串。每個節點代表一個字元，從根到葉的路徑形成一個字串。",
    timeComplexity: "O(m) m 為字串長度",
    spaceComplexity: "O(總字元數)",
    steps: [
      { explanation: "初始化空的 Trie", trie: {children: {}, isEnd: false}, operation: "init", phase: "init" },
      { explanation: "插入 'cat'：c -> a -> t", trie: {children: {c: {children: {a: {children: {t: {children: {}, isEnd: true}}, isEnd: false}}, isEnd: false}}, isEnd: false}, operation: "insert", word: "cat", phase: "insert" },
      { explanation: "插入 'car'：重用 c -> a，新增 r", trie: {children: {c: {children: {a: {children: {t: {children: {}, isEnd: true}, r: {children: {}, isEnd: true}}, isEnd: false}}, isEnd: false}}, isEnd: false}, operation: "insert", word: "car", phase: "insert" },
      { explanation: "插入 'dog'：d -> o -> g", trie: {children: {c: {children: {a: {children: {t: {children: {}, isEnd: true}, r: {children: {}, isEnd: true}}, isEnd: false}}, isEnd: false}, d: {children: {o: {children: {g: {children: {}, isEnd: true}}, isEnd: false}}, isEnd: false}}, isEnd: false}, operation: "insert", word: "dog", phase: "insert" },
      { explanation: "搜尋 'car'：找到路徑 c -> a -> r ✓", trie: {children: {c: {children: {a: {children: {t: {children: {}, isEnd: true}, r: {children: {}, isEnd: true}}, isEnd: false}}, isEnd: false}, d: {children: {o: {children: {g: {children: {}, isEnd: true}}, isEnd: false}}, isEnd: false}}, isEnd: false}, operation: "search", word: "car", found: true, path: ["c","a","r"], phase: "search" },
      { explanation: "搜尋 'can'：路徑 c -> a 存在，但 n 不存在 ✗", trie: {children: {c: {children: {a: {children: {t: {children: {}, isEnd: true}, r: {children: {}, isEnd: true}}, isEnd: false}}, isEnd: false}, d: {children: {o: {children: {g: {children: {}, isEnd: true}}, isEnd: false}}, isEnd: false}}, isEnd: false}, operation: "search", word: "can", found: false, path: ["c","a"], phase: "search" },
      { explanation: "前綴搜尋 'ca'：找到前綴 ✓，對應單字：cat, car", trie: {children: {c: {children: {a: {children: {t: {children: {}, isEnd: true}, r: {children: {}, isEnd: true}}, isEnd: false}}, isEnd: false}, d: {children: {o: {children: {g: {children: {}, isEnd: true}}, isEnd: false}}, isEnd: false}}, isEnd: false}, operation: "prefix", prefix: "ca", found: true, words: ["cat","car"], phase: "complete" }
    ]
  };
}

// LCS (Longest Common Subsequence)
export function getLCSData() {
  return {
    description: "最長公共子序列 (LCS) 是找到兩個序列的最長公共子序列。使用動態規劃，dp[i][j] 表示 s1[0..i] 和 s2[0..j] 的 LCS 長度。",
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n)",
    steps: [
      { explanation: "字串1：ABCDGH，字串2：AEDFHR", s1: "ABCDGH", s2: "AEDFHR", dp: [], phase: "init" },
      { explanation: "初始化 DP 表格（7×7）", s1: "ABCDGH", s2: "AEDFHR", dp: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]], i: 0, j: 0, phase: "dp-init" },
      { explanation: "dp[1][1]：A = A ✓，dp[1][1] = dp[0][0] + 1 = 1", s1: "ABCDGH", s2: "AEDFHR", dp: [[0,0,0,0,0,0,0],[0,1,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]], i: 1, j: 1, match: true, phase: "filling" },
      { explanation: "dp[1][2]：A ≠ E，dp[1][2] = max(dp[0][2], dp[1][1]) = 1", s1: "ABCDGH", s2: "AEDFHR", dp: [[0,0,0,0,0,0,0],[0,1,1,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]], i: 1, j: 2, match: false, phase: "filling" },
      { explanation: "繼續填充表格...", s1: "ABCDGH", s2: "AEDFHR", dp: [[0,0,0,0,0,0,0],[0,1,1,1,1,1,1],[0,1,1,1,1,1,1],[0,1,1,1,1,1,1],[0,1,1,2,2,2,2],[0,1,1,2,2,2,2],[0,1,1,2,2,3,3]], i: 3, j: 3, phase: "filling" },
      { explanation: "dp[4][3]：D = D ✓，dp[4][3] = dp[3][2] + 1 = 2", s1: "ABCDGH", s2: "AEDFHR", dp: [[0,0,0,0,0,0,0],[0,1,1,1,1,1,1],[0,1,1,1,1,1,1],[0,1,1,1,1,1,1],[0,1,1,2,2,2,2],[0,1,1,2,2,2,2],[0,1,1,2,2,3,3]], i: 4, j: 3, match: true, phase: "filling" },
      { explanation: "dp[6][6]：H = R ✗，dp[6][6] = max(dp[5][6], dp[6][5]) = 3", s1: "ABCDGH", s2: "AEDFHR", dp: [[0,0,0,0,0,0,0],[0,1,1,1,1,1,1],[0,1,1,1,1,1,1],[0,1,1,1,1,1,1],[0,1,1,2,2,2,2],[0,1,1,2,2,2,2],[0,1,1,2,2,3,3]], i: 6, j: 6, phase: "filling" },
      { explanation: "回溯找出 LCS：ADH（長度 3）", s1: "ABCDGH", s2: "AEDFHR", dp: [[0,0,0,0,0,0,0],[0,1,1,1,1,1,1],[0,1,1,1,1,1,1],[0,1,1,1,1,1,1],[0,1,1,2,2,2,2],[0,1,1,2,2,2,2],[0,1,1,2,2,3,3]], lcs: "ADH", length: 3, backtrack: [[1,1],[4,3],[6,6]], phase: "complete" }
    ]
  };
}
