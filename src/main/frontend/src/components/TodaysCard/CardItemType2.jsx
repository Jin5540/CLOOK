import React from "react";

export default function CardItemType2({ item }) {
  const { text1, value1, color1, time } = item;

  return (
    <>
      <div className="flex flex-col items-center justify-center text-2xl leading-150 font-semibold text-brand">
        <span
          className={`text-2xl leading-normal mb-2 ${color1} md:text-[1.875rem] lg:text-[2.25rem]`}
        >
          {text1}
        </span>
        <span className="text-sm leading-normal text-blue-600 md:text-lg lg:text-xl">
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
