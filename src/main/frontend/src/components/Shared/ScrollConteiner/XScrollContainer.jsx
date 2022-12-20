import React from "react";

export default function XScrollContainer({ styles, children }) {
  return (
    <div className="relative w-full h-full overflow-y-hidden overflow-x-scroll">
      <div
        className={`absolute left-0 top-0 flex flex-row items-center justify-between gap-9 w-auto h-full ${
          styles ? styles : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
