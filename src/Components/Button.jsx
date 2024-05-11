import React from "react";
import style from "../Styles/Button.module.css";
const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      className={style["button"]}
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
