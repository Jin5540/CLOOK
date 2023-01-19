import React from "react";

export default function TodaysCardSkeleton() {
  const cards = new Array(6).fill().map((value, index) => index);

  return (
    <section
      role="status"
      className="animate-pulse text-gray-200 w-full min-w-[17rem] mb-14 md:mb-10"
    >
      <div className="grid grid-cols-1 gap-x-1 gap-y-3 justify-items-center xs:grid-cols-2 xs:gap-x-4 xs:gap-y-5 sm:grid-cols-3 sm:gap-x-4 lg:gap-x-9 lg:gap-y-10">
        {cards.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 w-full h-[12.5rem] max-w-[200px] p-[0.938rem] rounded-default xs:max-w-full md:min-w-[15rem] lg:min-w-[19.313rem] lg:h-[15rem] lg:p-5"
          >
            <div className="flex flex-col justify-between w-full h-full">
              <div className="flex flex-row items-center text-base leading-150 font-semibold text-brand md:text-lg xl:text-xl">
                <span className="rounded-[50%] bg-gray-200 w-8 h-6 mr-2 my-auto md:mr-3"></span>
                <span className="rounded-default bg-gray-200 w-full h-7 text-transparent"></span>
              </div>

              <div className="rounded-default bg-gray-200 flex flex-col items-center justify-center my-0 mx-auto w-1/2 h-14"></div>

              <div className="rounded-default bg-gray-200 flex flex-col justify-between items-center w-full h-7 text-xs leading[1.188rem] font-normal md:flex-row md:text-base"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
