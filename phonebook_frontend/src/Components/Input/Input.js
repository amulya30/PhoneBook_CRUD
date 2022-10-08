import React from "react";

function Input(props) {
  return (
    <div>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        pattern={props.pattern}
      />
    </div>
  );
}

export default Input;
