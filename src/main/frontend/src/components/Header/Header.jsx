import React from "react";
import Locationbar from "./Locationbar";

export default function Header({ locationInVisible }) {
  return (
    <header className="fixed flex flex-col items-start w-full h-auto px-6 py-5 z-10 bg-white md:flex-row md:justify-center md:h-24 md:py-4">
      <a
        href="/"
        className="mb-5 md:absolute md:top-2/4 md:left-16 md:translate-y-[-50%]"
      >
        <img
          className="w-[57px] h-[15px] md:w-24 md:h-auto"
          src="/images/logo.png"
          alt="logo"
        />
      </a>
      {!locationInVisible && <Locationbar />}
    </header>
  );
}
