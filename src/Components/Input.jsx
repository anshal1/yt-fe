import React from "react";
import style from "../Styles/Input.module.css";
const Input = ({ type, placeholder, onChange, disabled = false, value }) => {
  return (
    <input
      type={type || "text"}
      placeholder={placeholder || "Enter"}
      onChange={(e) => {
        onChange(e);
      }}
      value={value}
      disabled={disabled}
      className={style["input"]}
    />
  );
};

export default Input;
