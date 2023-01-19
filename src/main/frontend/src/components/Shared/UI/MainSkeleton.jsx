import React from "react";
import Icon from "../Icon/Icon";
import { faMountainSun } from "@fortawesome/free-solid-svg-icons";

export default function MainSkeleton() {
  return (
    <section
      role="status"
      className="animate-pulse text-gray-200 w-full min-w-[17rem] mb-14 md:mb-10"
    >
      <div className="bg-gray-200 flex items-center justify-center w-full h-[400px] mt-6 mb-5 rounded-2xl md:hidden">
        <Icon icon={faMountainSun} styles="text-5xl text-gray-100" />
      </div>
      <div className="hidden border border-gray-200 flex-col items-center w-full h-[400px] mt-6 mb-5 pt-12 rounded-2xl md:flex md:flex-row md:items-center md:pt-0">
        <div className="flex flex-col justify-center items-center w-full px-8 sm:px-14 md:basis-1/2">
          <div className="mb-1 rounded-default bg-gray-200 flex items-center my-2 text-xl font-medium md:mb-4">
            <div className="w-10 h-9">{/* img */}</div>
            <span className="text-base font-medium leading-150 text-shadow-4 md:text-xl">
              00월 00일 (일)
            </span>
          </div>
          <div className="mb-1 rounded-default bg-gray-200 flex items-center justify-between w-full max-w-[16.25rem] md:flex-col md:justify-center md:bg-transparent">
            <div className="rounded-default bg-gray-200 flex items-center text-5xl leading-150 font-normal md:text-8xl md:my-2 md:">
              <span className="text-shadow-10">10</span>
              <span className="text-shadow-10">°C</span>
            </div>
            <div className="rounded-default bg-gray-200 flex flex-col items-end h-full text-base font-medium leading-150 md:flex-row md:my-2 md:text-lg md:rounded-default">
              <div>
                최저<span className="ml-1">-10</span>°C
              </div>
              <div className="md:ml-5">
                최고<span className="ml-1">-10</span>°C
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start md:basis-1/2">
          <div className="border rounded-default bg-gray-200 relative t-0 l-0 flex items-center justify-center w-[179px] h-[200px] md:w-[18.75rem] md:h-[18.75rem] md:ml-5">
            <Icon
              icon={faMountainSun}
              styles="text-3xl text-gray-100 md:text-5xl"
            />
          </div>
        </div>
      </div>

      <div className="rounded-default border border-gray-200 relative flex items-center justify-center w-full min-h-[80px] py-[10px]">
        <div className="absolute top-1/2 left-10 -translate-y-2/4">
          <div className="rounded-[50%] bg-gray-200 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7">
            {/* icon */}
          </div>
        </div>
        <div className="rounded-default bg-gray-200 flex justify-center items-center w-full h-full ml-[80px] mr-[60px]">
          <span className="h-[2.4rem] text-base font-medium leading-140 text-transparent md:text-xl lg:text-[1.375rem] xl:text-2xl"></span>
        </div>
      </div>
    </section>
  );
}
