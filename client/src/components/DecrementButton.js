import React from "react";

export default function DecrementButton(props) {
  const handleButtonClick = () => {
    props.onDecrement("<");
  };

  return (
    <button
      onClick={handleButtonClick}
      disabled={props.disabled}
      className="waves-effect btn teal lighten-1"
    >
      &lt; 
    </button>
  );
}
