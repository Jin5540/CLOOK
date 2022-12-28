import React from "react";

export default function ClothesByTimeSkeleton() {
  return (
    <div
      role="status"
      className="animate-pulse flex flex-col items-center w-full max-w-[992px]"
    >
      <section className=" w-full bg-white mb-14 p-3">
        <span className="bg-gray-200 w-[183px] h-[60px] rounded-default inline-block text-4xl leading-[150%] font-bold text-black mb-10"></span>

        <div className="border border-gray-200 rounded-default w-full h-[315px] pl-3">
          <div className="flex flex-row items-center justify-between gap-9 w-full h-full">
            <div className="bg-gray-200 flex min-w-[308px] h-[260px] rounded-default"></div>
            <div className="bg-gray-200 flex min-w-[308px] h-[260px] rounded-default"></div>
            <div className="bg-gray-200 flex shrink-1 w-[308px] h-[260px] round rounded-tl-default rounded-bl-default"></div>

            {/* <div className="border border-gray-200 flex flex-col items-center justify-between h-[260px] min-w-[308px] px-10 pt-6 pb-8 rounded-default cursor-pointer">
              <span className="inline-block bg-gray-200 rounded-[20px] w-[160px] h-10"></span>
              <div className="flex justify-between items-center gap-5 w-full">
                <div className="bg-gray-200 rounded-default w-[85px] h-[120px]"></div>
                <div className="bg-gray-200 rounded-default w-[85px] h-[120px]"></div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
