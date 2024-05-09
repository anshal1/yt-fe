import React, { useEffect, useState } from "react";
import style from "../Styles/Select.module.css";
const Select = ({ options = [], onChange, value = "", placeholder }) => {
  const [ShowOptions, setShowOptions] = useState(false);
  const [SelectedOption, setSelecteOption] = useState(value || "");
  useEffect(() => {
    const selectedOption = options?.find((option) => {
      return option?.value === value;
    });
    setSelecteOption(selectedOption);
  }, [value]);
  return (
    <div className={style["select-container"]}>
      <div
        className={style["selected"]}
        onClick={() => {
          setShowOptions(!ShowOptions);
        }}
      >
        <p className={style["selected-option"]}>
          {SelectedOption?.label || (
            <span className={style["place-holder"]}>
              {placeholder || "Please Select"}
            </span>
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
                    setSelecteOption(option);
                    onChange(option?.value);
                    setShowOptions(false);
                  }}
                  key={option?.label}
                  className={
                    style[
                      SelectedOption?.value === option?.value
                        ? "selected-options"
                        : ""
                    ]
                  }
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
