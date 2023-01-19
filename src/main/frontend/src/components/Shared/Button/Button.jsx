import React from "react";

export default function Button({
  text,
  basicStyles,
  styles,
  onClick,
  selected,
  hover,
  disabled,
  disabledStyle,
}) {
  return (
    <>
      {disabled && (
        <button
          className={`${
            basicStyles
              ? basicStyles
              : "flex justify-center items-center text-[1.063rem] font-medium leading-6 p-[0.625rem] rounded-md"
          } ${disabledStyle}`}
          disabled={disabled}
        >
          {text}
        </button>
      )}
      {!disabled && (
        <button
          onClick={onClick}
          className={`cursor-pointer ${basicStyles} ${styles} ${selected} ${hover}`}
        >
          {text}
        </button>
      )}
    </>
  );
}
