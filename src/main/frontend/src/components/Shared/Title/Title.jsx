import React from "react";

export default function Title({ title }) {
  return (
    <span className="inline-block text-2xl leading-150 font-bold text-black mb-2 md:text-3xl md:mb-0 xl:text-4xl">
      {title}
    </span>
  );
}
