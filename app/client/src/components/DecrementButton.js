import React from "react";

export default function DecrementButton(props) {
  const handleButtonClick = () => {
    props.onDecrement("<");
  };

  return (
    <button
      onClick={handleButtonClick}
      disabled={props.disabled}
      className="waves-effect waves-light btn red darken-4"
    >
      &lt; 
    </button>
  );
}
