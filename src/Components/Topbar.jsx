import React from "react";
import "../Styles/Topbar.css";

const Topbar = () => {
  return (
    <div className="header">
      <div>
        <h2>React Flow</h2>
      </div>
      <div className="save-btn-container">
        <button className="btn btn-save">Save Changes</button>
      </div>
    </div>
  );
};

export default Topbar;
