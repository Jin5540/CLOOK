import React from "react";
import Icon from "../Icon/Icon";
import { faMountainSun } from "@fortawesome/free-solid-svg-icons";

export default function ClothesByTimeSkeleton() {
  const cards = new Array(3).fill().map((value, index) => index);

  return (
    <section
      role="status"
      className="animate-pulse text-gray-200 w-full min-w-[17rem] mb-14 pt-1 md:mb-10"
    >
      <span className="mt-1 rounded-default bg-gray-200 inline-block text-2xl leading-150 font-bold text-transparent mb-2 md:text-3xl md:mb-0 xl:text-4xl">
        시간대별 옷차림
      </span>
      <div className="w-full h-[11.25rem] md:h-[15.375rem] lg:h-[19.688rem]">
        <div className="relative w-full h-full overflow-hidden">
          <div
            className={`absolute left-0 top-0 flex flex-row items-center justify-between gap-5 w-auto h-full pr-3 md:gap-7 xl:gap-9`}
          >
            {cards.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 flex flex-col items-center justify-between w-[19rem] h-[10rem] px-6 pt-[0.688rem] pb-5 rounded-default md:min-w-[22.563rem] md:h-[13.125rem] lg:min-w-[24.563rem] lg:h-[16.25rem] lg:px-10 lg:pt-6 lg:pb-8"
              >
                {index === 0 ? (
                  <span className="bg-gray-200 w-[4.438rem] h-6 flex items-center justify-center rounded-[1.25rem] md:w-[7rem] md:h-8 lg:h-10"></span>
                ) : (
                  <span className="bg-gray-200 w-[8.125rem] h-6 flex items-center justify-center rounded-[1.25rem] md:w-[9.375rem] md:h-8 lg:h-10"></span>
                )}
                <div className="flex justify-between items-center gap-2 w-full md:gap-5">
                  {cards.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center w-20 h-20 md:w-[91px] md:h-[116px]"
                    >
                      <div className="rounded-default bg-gray-200 flex justify-center items-center w-full h-full">
                        <Icon
                          icon={faMountainSun}
                          styles="text-sm text-gray-100 md:text-base"
                        />
                      </div>
                    </div>
                    // <div className="flex flex-col items-center w-20 h-20 md:w-[91px] md:h-[116px]">
                    //   <div className="rounded-default bg-gray-200 flex justify-center items-center w-full h-[3.125rem] md:h-[4.5rem]">
                    //     <Icon
                    //       icon={faMountainSun}
                    //       styles="text-sm text-gray-100 md:text-base"
                    //     />
                    //   </div>
                    //   <span className="rounded-default bg-gray-200 w-full h-6 text-base font-medium leading-150 mt-[6px] md:text-lg md:mt-4 lg:text-xl"></span>
                    // </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
