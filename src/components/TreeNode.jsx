import React, { useState } from "react";

function TreeNode({ nodeKey, data, searchText }) {
  const [expanded, setExpanded] = useState(true);

  const isObject = typeof data === "object" && data !== null;
  const isArray = Array.isArray(data);
  const hasChildren = isObject || isArray;

  const highlight =
    nodeKey.toLowerCase().includes(searchText) ||
    (typeof data === "string" &&
      data.toLowerCase().includes(searchText) &&
      searchText !== "");

  return (
    <div className="tree-node">
      <div
        className={`node-box ${hasChildren ? "object" : "value"} ${
          highlight ? "highlight" : ""
        }`}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren && (
          <span className="toggle-icon">{expanded ? "▼" : "▶"}</span>
        )}
        <strong>{nodeKey}</strong>
        {!hasChildren && <span className="value-box"> → {String(data)}</span>}
      </div>

      {hasChildren && (
        <div
          className="children"
          style={{
            maxHeight: expanded ? "1000px" : "0px",
            opacity: expanded ? 1 : 0,
          }}
        >
          {Object.entries(data).map(([key, val], i) => (
            <div key={i} className="branch">
              <div className="line"></div>
              <TreeNode
                nodeKey={key}
                data={val}
                searchText={searchText}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeNode;
