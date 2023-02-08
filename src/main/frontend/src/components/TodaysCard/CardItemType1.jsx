import React from "react";

export default function CardItemType1({ item }) {
  const {
    id,
    text1,
    text2,
    value1,
    value2,
    color1,
    color2,
    stationName,
    time,
  } = item;

  return (
    <>
      <div className="flex flex-col items-center justify-center text-2xl leading-150 font-semibold text-brand">
        {id === "sun" && (
          <>
            <div className="flex flex-col text-center lg:flex-row">
              <span className="flex justify-center text-sm leading-normal text-blue-600 md:text-xl lg:text-2xl">
                {text1}
                <span className="hidden md:mx-1 lg:flex">-</span>
              </span>
              <span
                className={`text-xl leading-normal ${color1} md:text-2xl lg:text-[1.875rem]`}
              >
                {value1}
              </span>
            </div>
            <div className="flex flex-col text-center lg:flex-row">
              <span className="flex justify-center text-sm leading-normal text-blue-600 md:text-xl lg:text-2xl">
                {text2}
                <span className="hidden md:mx-1 lg:flex">-</span>
              </span>
              <span
                className={`text-xl leading-normal ${color2} md:text-2xl lg:text-[1.875rem]`}
              >
                {value2}
              </span>
            </div>
          </>
        )}

        {id !== "sun" && (
          <>
            <div>
              <span className="text-sm leading-normal text-blue-600 md:text-xl lg:text-2xl">
                {text1}
                <span className="mx-1">-</span>
              </span>
              <span
                className={`text-xl leading-normal ${color1} md:text-2xl lg:text-[1.875rem]`}
              >
                {value1}
              </span>
            </div>
            <div>
              <span className="text-sm leading-normal text-blue-600 md:text-xl lg:text-2xl">
                {text2}
                <span className="mx-1">-</span>
              </span>
              <span
                className={`text-xl leading-normal ${color2} md:text-2xl lg:text-[1.875rem]`}
              >
                {value2}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col justify-between items-center w-full text-xs leading[1.188rem] font-normal md:flex-row md:text-base">
        {stationName && (
          <>
            <span className="text-[#2563EB]">측정소: {stationName}</span>
            <span className="text-[#9CA3AF]">{time}</span>
          </>
        )}
        {!stationName && <div className="h-2"></div>}
      </div>
    </>
  );
}
