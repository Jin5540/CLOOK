import React from "react";
import { getWeatherImages } from "../../util/getWeatherImages";

export default function CardListItem({
  type,
  title,
  text1,
  value1,
  text2,
  value2,
  color1,
  color2,
  stationName,
  time,
}) {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex items-center text-base leading-150 font-semibold text-brand md:text-lg xl:text-xl">
        {title === "미세먼지" || title === "자외선" ? (
          <img
            className="w-5 h-[0.875rem] mr-2 md:w-6 md:h-4 md:mr-3"
            src={getWeatherImages("cardIcon", title)}
            alt={title}
          />
        ) : (
          <img
            className="h-5 mr-2 my-auto md:h-6 md:mr-3"
            src={getWeatherImages("cardIcon", title)}
            alt={title}
          />
        )}
        <span>
          {title === "일출/일몰" ? "오늘" : "현재"} {title}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center text-2xl leading-150 font-semibold text-brand">
        {type === 1 && (
          <>
            {title === "일출/일몰" && (
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
            {title !== "일출/일몰" && (
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
          </>
        )}

        {type === 2 && (
          <>
            <span
              className={`text-2xl leading-normal mb-2 ${color1} md:text-[1.875rem] lg:text-[2.25rem]`}
            >
              {text1}
            </span>
            <span className="text-sm leading-normal text-blue-600 md:text-lg lg:text-xl">
              {value1}
            </span>
          </>
        )}

        {type === 3 && (
          <span
            className={`text-2xl font-semibold leading-normal md:text-[1.875rem] lg:text-[2.25rem]`}
          >
            {value1}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between items-center w-full text-xs leading[1.188rem] font-normal md:flex-row md:text-base">
        {stationName && (
          <>
            <span className="text-[#2563EB]">측정소: {stationName}</span>
            <span className="text-[#9CA3AF]">{time}</span>
          </>
        )}
        {!stationName && time && (
          <span className="w-full pr-0 text-[#9CA3AF] text-center lg:text-end">
            {time}
          </span>
        )}
        {!stationName && !time && <div className="h-2"></div>}
      </div>
    </div>
  );
}
