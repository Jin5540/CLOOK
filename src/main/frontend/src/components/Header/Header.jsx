import React from "react";
import Locationbar from "./Locationbar";

export default function Header({ locationInVisible }) {
  return (
    <header className="fixed flex flex-col items-center w-full h-auto px-6 py-5 z-10 bg-white lg:h-24 lg:py-4 lg:flex-row lg:justify-center">
      <div className="float-left w-full flex items-center mb-5 lg:absolute lg:top-2/4 lg:left-4 lg:translate-y-[-50%] lg:w-auto xl:left-16">
        <a href="/" className="mr-[1.25rem]">
          <img
            className="w-[57px] h-[15px] md:w-24 md:h-auto"
            src="/images/logo.png"
            alt="logo"
          />
        </a>
        <span className="flex items-center justify-center w-20 h-[1.875rem] text-base leading-150 font-semibold text-brand bg-blue-100 rounded-[1.25rem] lg:w-[7.5rem] lg:h-10 lg:text-xl">
          Beta
        </span>
      </div>
      {!locationInVisible && <Locationbar />}
    </header>
  );
}
