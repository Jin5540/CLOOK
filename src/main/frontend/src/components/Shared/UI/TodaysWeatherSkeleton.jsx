import React from "react";
import Icon from "../Icon/Icon";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

export default function TodaysWeatherSkeleton() {
  return (
    <section
      role="status"
      className="animate-pulse text-gray-200 w-full min-w-[17rem] mb-14 md:mb-10"
    >
      <span className="mt-1 rounded-default bg-gray-200 inline-block text-2xl leading-150 font-bold text-transparent mb-2 md:text-3xl md:mb-0 xl:text-4xl">
        오늘의 날씨
      </span>
      <div className="flex justify-end mb-[0.625rem]">
        <span className="rounded-default bg-gray-200 text-transparent text-base font-bold leading-[1.375rem] cursor-pointer md:mt-1 md:ml-1">
          ⓘ 데이터 안내
        </span>
      </div>
      <div className="rounded-default border border-gray-200 flex flex-col items-center justify-between h-[18.75rem] p-6 md:h-[22.5rem] md:p-7 lg:h-[27.5rem] lg:p-7">
        <div className="rounded-default bg-gray-200 flex items-center justify-center w-full h-full">
          <Icon
            icon={faChartLine}
            styles="text-3xl text-gray-100 md:text-5xl"
          />
        </div>
      </div>
    </section>
  );
}
