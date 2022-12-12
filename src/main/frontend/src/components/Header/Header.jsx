import React from "react";
import Locationbar from "./Locationbar";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 flex items-center justify-center w-full h-24 py-4 z-10 bg-white">
      <a href="/" className="absolute top-2/4 left-16 translate-y-[-50%]">
        <img className="w-24" src="/images/logo.png" alt="logo" />
      </a>
      <Locationbar />
    </header>
  );
}
