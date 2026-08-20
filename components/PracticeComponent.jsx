import React from "react";

export default function PracticeComponent(props) {
  return (
    <div className="formGroup">
      <span style={{ color: "white" }}>{props.label}</span>
      <input
        className="input"
        type="text"
        onChange={(e) => props.handleChange(e.target.value)}
      />
    </div>
  );
}
