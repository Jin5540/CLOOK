import React from "react";

export default function TodaysCardSkeleton() {
  return (
    <div
      role="status"
      className="animate-pulse flex flex-col items-center w-full max-w-[992px]"
    >
      <section className=" w-full bg-white mb-14 p-3">
        <div className="flex flex-row flex-wrap justify-center items-center gap-4">
          <div className="bg-gray-200 w-[19.313rem] h-[15rem] p-5 rounded-default"></div>
          <div className="bg-gray-200 w-[19.313rem] h-[15rem] p-5 rounded-default"></div>
          <div className="bg-gray-200 w-[19.313rem] h-[15rem] p-5 rounded-default"></div>
          <div className="bg-gray-200 w-[19.313rem] h-[15rem] p-5 rounded-default"></div>
          <div className="bg-gray-200 w-[19.313rem] h-[15rem] p-5 rounded-default"></div>
          <div className="bg-gray-200 w-[19.313rem] h-[15rem] p-5 rounded-default"></div>
        </div>
      </section>
    </div>
  );
}
