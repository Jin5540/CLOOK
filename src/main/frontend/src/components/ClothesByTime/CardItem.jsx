import React from "react";
import useSVGComponent from "../../hooks/useSVGComponent";

export default function CardItem({ clothes, selected }) {
  return (
    <>
      <div className="flex flex-col items-center w-[91px]">
        {useSVGComponent(clothes, "80px", selected)}
        <span className="mt-3">{clothes}</span>
      </div>
    </>
  );
}
