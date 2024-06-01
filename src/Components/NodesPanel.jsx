import React, { useEffect, useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import "../Styles/NodePanel.css";

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

const NodesPanel = ({
  selectedNode = null,
  setSelectedNode,
  handleUpdateNodeLabel,
}) => {
  const [textValue, setTextValue] = useState(selectedNode?.data?.label || "");

  useEffect(() => {
    if (!selectedNode) return;
    setTextValue(selectedNode?.data?.label || "");
  }, [selectedNode]);

  const handleBack = () => {
    setSelectedNode(null);
  };

  const handleEditNodeLabel = () => {
    if (!selectedNode || !selectedNode || !selectedNode.id) return;
    handleUpdateNodeLabel(selectedNode.id, textValue);
  };

  const renderSelectedNodeContent = (
    <div className="selected-container">
      <div className="selected-header">
        <IoArrowBack className="back-icon" size={22} onClick={handleBack} />
        <p>Message</p>
      </div>
      <div className="input-container">
        <div className="input-header">Text</div>
        <textarea
          value={textValue}
          rows={5}
          cols={30}
          onChange={(event) => setTextValue(event.target.value)}
        />
      </div>
      <button className="btn" onClick={handleEditNodeLabel}>
        Update text
      </button>
    </div>
  );

  return (
    <div className="msg-container">
      {selectedNode ? (
        renderSelectedNodeContent
      ) : (
        <aside className="nodes-panel">
          <div
            className="dndnode input"
            onDragStart={(event) => onDragStart(event, "textNode")}
            draggable
          >
            <div>
              <BiMessageRoundedDetail size={21} />
              <br />
              <span>Message</span>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default NodesPanel;
