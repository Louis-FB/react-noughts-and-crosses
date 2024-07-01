import React from "react";

export default function Footer(props) {
  return (
    <div className="footer">
      <button onClick={() => props.onReset()} className="footer-btn">
        Reset
      </button>
    </div>
  );
}
