import React from "react";
import { getWeatherImages } from "../../util/getWeatherImages";
import * as dateUtil from "../../util/dateUtil";

export default function CurrentWeather({ toptm, topspt }) {
  return (
    <div
      className="flex flex-col items-center w-full h-[400px] mt-6 mb-5 pt-12 rounded-2xl md:flex-row md:items-center md:pt-0"
      style={{
        background: `url(${getWeatherImages("bg", topspt.background)})`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="flex flex-col justify-center items-center w-full px-8 sm:px-14 text-white md:basis-1/2">
        <div className="flex items-center my-2 mb-0 text-xl font-medium md:mb-4">
          <img
            className="w-10 h-9"
            src={getWeatherImages("icon", topspt.icon)}
            alt=""
          />
          <span className="text-base font-medium leading-150 text-shadow-4 md:text-xl">
            {dateUtil.dateFormat(toptm.fcstDate)}
          </span>
        </div>
        <div className="flex items-center justify-between w-full max-w-[16.25rem] md:flex-col md:justify-center">
          <div className="flex items-center text-5xl leading-150 font-normal md:text-8xl md:my-2">
            <span className="text-shadow-10">{topspt.t1h}</span>
            <span className="text-shadow-10">°C</span>
          </div>
          <div className="flex flex-col items-end text-base font-medium leading-150 md:flex-row md:my-2 md:text-lg">
            <div>
              최저<span className="ml-1">{Number(toptm.tmn)}</span>°C
            </div>
            <div className="md:ml-5">
              최고<span className="ml-1">{Number(toptm.tmx)}</span>°C
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-start md:basis-1/2">
        <img
          className="relative t-0 l-0 w-[179px] h-[220px] animate-slow-bounce md:w-auto md:h-[18.75rem] md:ml-5"
          src={getWeatherImages("character", topspt.character)}
          alt=""
        />
      </div>
    </div>
  );
}
