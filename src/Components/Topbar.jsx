import React from "react";
import "../Styles/Topbar.css";

const Topbar = ({ handleSave }) => {
  return (
    <div className="header">
      <div>
        <h2>React Flow</h2>
      </div>
      <div className="save-btn-container">
        <button className="btn btn-save" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Topbar;
