import React from "react";

function Button(props) {
  return (
    <div>
      <button
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onClick={props.onClick}
        className={props.className}
      >
        {props.text}
      </button>
    </div>
  );
}

export default Button;
