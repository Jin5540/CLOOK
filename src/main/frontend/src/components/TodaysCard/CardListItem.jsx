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
      <div className="flex text-xl leading-[150%] font-semibold text-brand">
        <img
          className="mr-3 my-auto"
          src={getWeatherImages("cardIcon", title)}
          alt={title}
        />
        <span>
          {title === "일출/일몰" ? "오늘" : "현재"} {title}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center text-2xl leading-[150%] font-semibold text-brand">
        {type === 1 && (
          <>
            <div>
              <span className="text-2xl leading-normal text-blue-600">
                {text1}
                {" - "}
              </span>
              <span className={`text-[1.875rem] leading-normal ${color1}`}>
                {value1}
              </span>
            </div>
            <div>
              <span className="text-2xl leading-normal text-blue-600">
                {text2}
                {" - "}
              </span>
              <span className={`text-[1.875rem] leading-normal ${color2}`}>
                {value2}
              </span>
            </div>
          </>
        )}

        {type === 2 && (
          <>
            <span className={`text-[2.25rem] leading-normal mb-2 ${color1}`}>
              {text1}
            </span>
            <span className="text-xl leading-normal text-blue-600">
              {value1}
            </span>
          </>
        )}

        {type === 3 && (
          <span className={`text-[2.25rem] leading-normal`}>{value1}</span>
        )}
      </div>

      <div className="flex justify-between items-center w-full text-base leading[1.188rem] font-normal">
        {stationName && (
          <>
            <span className="text-[#2563EB]">측정소: {stationName}</span>
            <span className="text-[#9CA3AF]">{time}</span>
          </>
        )}
        {!stationName && time && (
          <span className="w-full pr-0 text-[#9CA3AF] text-end">{time}</span>
        )}
        {!stationName && !time && <div className="h-2"></div>}
      </div>
    </div>
  );
}
