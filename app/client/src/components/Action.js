import React from "react";

export default function Action({ _id, type, onActionClick }) {
  const handleIconClick = () => {
    onActionClick(_id, type);
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
