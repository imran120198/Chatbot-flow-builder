import React from "react";
import { Handle, Position } from "reactflow";
import { FaWhatsapp, FaCommentDots } from "react-icons/fa";
import "../Styles/TextNode.css";

const TextNode = () => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="node-text-container">
        <div className="node-header">
          <FaCommentDots className="msg-icon" />
          <span>Send Message</span>
          <FaWhatsapp className="whatsapp-icon" />
        </div>
        <div className="node-text-body">
          {/* <p>{data?.label}</p> */}
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
};

export default TextNode;
