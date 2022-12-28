import React from "react";
import Locationbar from "./Locationbar";

export default function Header() {
  return (
    <div className="absolute top-0 left-0 w-full max-w-[1440px]">
      <header className="fixed flex items-center justify-center w-full max-w-[1440px] h-24 py-4 z-10 bg-white">
        <a href="/" className="absolute top-2/4 left-16 translate-y-[-50%]">
          <img className="w-24" src="/images/logo.png" alt="logo" />
        </a>
        <Locationbar />
      </header>
    </div>
  );
}
