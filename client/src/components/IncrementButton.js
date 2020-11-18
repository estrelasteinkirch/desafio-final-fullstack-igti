import React from "react";

export default function IncrementButton(props) {
  const handleButtonClick = () => {
    props.onIncrement(">");
  };

  return (
    <button
      onClick={handleButtonClick}
      disabled={props.disabled}
      className="waves-effect btn teal lighten-1"
    >
      &gt;
    </button>
  );
}
