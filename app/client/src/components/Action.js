import React from "react";

export default function Action({type, onActionClick }) {
  const handleIconClick = () => {
    onActionClick(type);
  };
  return (
    <span
      className="material-icons"
      style={{ cursor: "pointer" }}
      onClick={handleIconClick}
    >
      {type}
    </span>
  );
}
