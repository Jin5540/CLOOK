import React from "react";

export default function Button({
  text,
  styles,
  onClick,
  selected,
  hover,
  disabled,
  disabledStyle,
}) {
  const basicStyles =
    "flex justify-center items-center text-[1.063rem]font-medium leading-6 px-5 py-[0.688rem] rounded-md";

  return (
    <>
      {disabled && (
        <button
          className={`${basicStyles} ${disabledStyle}`}
          disabled={disabled}
        >
          {text}
        </button>
      )}
      {!disabled && (
        <button
          onClick={onClick}
          className={`${basicStyles} ${styles} ${selected} ${
            hover && hover
          } cursor-pointer`}
        >
          {text}
        </button>
      )}
    </>
  );
}
