import React from "react";
import { getWeatherImages } from "../../util/getWeatherImages";
import * as dateUtil from "../../util/dateUtil";

export default function CurrentWeather({ toptm, topspt }) {
  return (
    <div
      className="flex w-full h-[400px] mt-6 mb-5 rounded-2xl"
      style={{
        backgroundImage: `url(${getWeatherImages("bg", topspt.background)})`,
      }}
    >
      <div className="basis-1/2 flex flex-col justify-center items-center text-white">
        <div className="flex items-center my-2 mb-4 text-xl font-medium">
          <img
            className="w-10 h-9"
            src={getWeatherImages("icon", topspt.icon)}
            alt=""
          />
          <span className="text-shadow-4">
            {dateUtil.dateFormat(toptm.fcstDate)}
          </span>
        </div>
        <div className="flex items-center my-2 text-8xl font-normal">
          <span className="text-shadow-10">{topspt.t1h}</span>
          <span className="text-shadow-10">°C</span>
        </div>
        <div className="flex items-center my-2 text-lg font-medium">
          <div>
            최저<span className="ml-1">{Number(toptm.tmn)}</span>°C
          </div>
          <div className="ml-5">
            최고<span className="ml-1">{Number(toptm.tmx)}</span>°C
          </div>
        </div>
      </div>
      <div className="basis-1/2 flex flex-col justify-center items-start">
        <img
          className="relative t-0 l-0 ml-5 h-[18.75rem] animate-slow-bounce"
          src={getWeatherImages("character", topspt.character)}
          alt=""
        />
      </div>
    </div>
  );
}
