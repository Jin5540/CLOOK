import React from "react";

export default function TodaysWeatherSkeleton() {
  return (
    <div
      role="status"
      className="animate-pulse flex flex-col items-center w-full max-w-[992px]"
    >
      <section className=" w-full bg-white mb-14 p-3">
        <span className="bg-gray-200 w-[183px] h-[60px] rounded-default inline-block text-4xl leading-[150%] font-bold text-black mb-10"></span>

        <div className="border border-gray-200 rounded-default px-7 py-7 flex flex-col justify-between w-full h-[441px] mt-6 mb-5 cursor-default">
          <div className="bg-gray-200 rounded-default w-full h-[66px]"></div>
          <div className="bg-gray-200 rounded-default w-full h-[300px]"></div>
        </div>
      </section>
    </div>
  );
}
