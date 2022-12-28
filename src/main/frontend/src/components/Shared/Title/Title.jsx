import React from "react";

export default function Title({ title }) {
  return (
    <span className="inline-block text-4xl leading-[3.75rem] font-bold text-black mb-2">
      {title}
    </span>
  );
}
