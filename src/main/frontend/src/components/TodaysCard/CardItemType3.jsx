import React from "react";

export default function CardItemType3({ item }) {
  const { value1, time } = item;

  return (
    <>
      <div className="flex flex-col items-center justify-center text-2xl leading-150 font-semibold text-brand">
        <span
          className={`text-2xl font-semibold leading-normal md:text-[1.875rem] lg:text-[2.25rem]`}
        >
          {value1}
        </span>
      </div>
      <div className="flex flex-col justify-between items-center w-full text-xs leading[1.188rem] font-normal md:flex-row md:text-base">
        <span className="w-full pr-0 text-[#9CA3AF] text-center lg:text-end">
          {time}
        </span>
      </div>
    </>
  );
}
