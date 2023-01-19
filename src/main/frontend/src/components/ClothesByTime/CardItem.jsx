import React from "react";
import useSVGComponent from "../../hooks/useSVGComponent";

export default function CardItem({ clothes, selected }) {
  return (
    <>
      <div className="flex flex-col items-center w-20 h-20 md:w-[91px] md:h-[116px]">
        {useSVGComponent(clothes, "100%", selected)}
        <span className="text-base font-medium leading-150 mt-[6px] md:text-lg md:mt-4 lg:text-xl">
          {clothes}
        </span>
      </div>
    </>
  );
}
