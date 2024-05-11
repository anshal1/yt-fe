import React from "react";
import style from "../Styles/Input.module.css";
const Input = ({
  type,
  placeholder,
  onChange,
  disabled = false,
  value,
  ...rest
}) => {
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
      {...rest}
    />
  );
};

export default Input;
