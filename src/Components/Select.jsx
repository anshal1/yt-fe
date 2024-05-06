import React, { useState } from "react";
import style from "../Styles/Select.module.css";
const Select = ({ options, onChange, value }) => {
  const [ShowOptions, setShowOptions] = useState(false);
  const [SelectedOption, setSelecteOption] = useState(value || "");
  return (
    <div className={style["select-container"]}>
      <div
        className={style["selected"]}
        onClick={() => {
          setShowOptions(!ShowOptions);
        }}
      >
        <p className={style["selected-option"]}>
          {SelectedOption || (
            <span className={style["place-holder"]}>Please Select</span>
          )}{" "}
        </p>
      </div>
      <div className={style[ShowOptions ? "options" : "options-hide"]}>
        {options?.length === 0 || !options ? (
          <div className={style["no-option"]}>No Options</div>
        ) : (
          <ul>
            {options?.map((option) => {
              return (
                <li
                  onClick={() => {
                    setSelecteOption(option?.value);
                    onChange(option?.value);
                  }}
                  key={option?.label}
                >
                  {option?.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
