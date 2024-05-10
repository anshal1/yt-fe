import React, { useEffect, useRef, useState } from "react";
import style from "../Styles/Select.module.css";
const Select = ({ options = [], onChange, value = "", placeholder }) => {
  const [ShowOptions, setShowOptions] = useState(false);
  const [SelectedOption, setSelecteOption] = useState(value || "");
  const [Style, setStyle] = useState({
    bottom: "0px",
  });
  const container = useRef();
  useEffect(() => {
    const selectedOption = options?.find((option) => {
      return option?.value === value;
    });
    setSelecteOption(selectedOption);
  }, [value]);
  useEffect(() => {
    const heigthOfOption = 10 * 16;
    const selectHeight = container?.current?.offsetTop + heigthOfOption;

    const diff = Math.abs(selectHeight - window.innerHeight);
    console.log(diff);
    if (diff <= 100) {
      setStyle({ bottom: "41px" });
    } else {
      setStyle({
        top: "41px",
      });
    }
  }, []);
  return (
    <div className={style["select-container"]} ref={container}>
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
      <div
        className={style[ShowOptions ? "options" : "options-hide"]}
        style={Style}
      >
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
