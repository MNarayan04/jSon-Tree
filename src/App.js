import React, { useState, useRef } from "react";
import TreeNode from "./components/TreeNode";
import html2canvas from "html2canvas";
import "./App.css";
function App() {
  const [jsonText, setJsonText] = useState("");
  const [treeData, setTreeData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const treeRef = useRef(null);

  const handleGenerate = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setTreeData(parsed);
    } catch {
      alert("⚠️ Invalid JSON. Please check your input.");
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const downloadTree = () => {
    if (treeRef.current) {
      html2canvas(treeRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "json_tree.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <div className="header">
          <h2>🌳 JSON Tree Visualizer</h2>

          <div className="mode-toggle">
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider"></span>
            </label>
            {/* <span>{darkMode ? "Dark Mode" : "Light Mode"}</span> */}
          </div>
        </div>

        <div className="content">
          <div className="input-section">
            <textarea
              placeholder="Paste your JSON here..."
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
            ></textarea>

            <div className="buttons">
              <button onClick={handleGenerate}>Generate Tree</button>
              <button onClick={downloadTree}>Download Tree</button>
            </div>

            <div className="search-section">
              <input
                type="text"
                placeholder="Search in JSON..."
                value={searchText}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="tree-section">
            <div ref={treeRef} className="tree-display">
              {treeData ? (
                <TreeNode
                  nodeKey="root"
                  data={treeData}
                  searchText={searchText}
                />
              ) : (
                <p className="placeholder">
                  Paste your JSON and click “Generate Tree” 🌱
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
