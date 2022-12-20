import React from "react";

export default function Card({ onClick, selected, height, styles, children }) {
  return (
    <div
      className={`flex items-center justify-center w-full ${
        height ? height : "h-20"
      } px-6 global-shadow rounded-default cursor-pointer ${styles} ${
        selected ? "text-white bg-brand" : "text-brand bg-white"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
