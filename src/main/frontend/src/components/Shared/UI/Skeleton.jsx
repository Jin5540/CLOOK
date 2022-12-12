import React from "react";

export default function Skeleton() {
  return (
    <div
      role="status"
      className="animate-pulse flex flex-col items-center w-full max-w-[992px]"
    >
      <section className="w-full bg-white mb-12">
        <div className="border border-gray-200 rounded-default flex w-full h-[400px] mt-6 mb-5">
          <div className="basis-1/2 flex flex-col justify-center items-center text-white">
            <div className="bg-gray-200 w-[158px] h-[36px] rounded-default flex items-center my-2 mb-4 text-xl font-medium"></div>
            <div className="bg-gray-200 w-[204px] h-[96px] rounded-default flex items-center my-2 text-8xl font-normal"></div>
            <div className="bg-gray-200 w-[172px] h-[28px] rounded-default flex items-center my-2 ml-3 text-lg font-medium">
              <div>
                <span className="ml-1"></span>
              </div>
              <div>
                <span className="ml-1"></span>
              </div>
            </div>
          </div>
          <div className="basis-1/2 flex flex-col justify-center items-start">
            <div
              className="bg-gray-200 w-[220px] h-[300px] rounded-default relative t-0 l-0 ml-5"
              alt=""
            ></div>
          </div>
        </div>
        <div className="border border-gray-200 relative flex items-center justify-center w-full h-20 px-6 global-shadow rounded-default">
          <div className="absolute top-1/2 left-6 -translate-y-2/4">
            <div className="bg-gray-200 w-[26px] h-[26px] rounded-full"></div>
          </div>
          <span className="text-2xl text-brand font-medium">
            <div className="bg-gray-200 w-[500px] h-[40px] rounded-default"></div>
          </span>
        </div>
      </section>
    </div>
  );
}
