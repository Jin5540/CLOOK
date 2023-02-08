import React from "react";
import Maintainance from "../../assets/imgs/error/maintainance.png";

export default function CardListItemError() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-2xl leading-150 font-semibold text-brand">
        <div className="w-20 h-20">
          <img
            className="w-full h-full"
            src={Maintainance}
            alt="Maintainance"
          />
        </div>
        <span className="text-sm font-semibold leading-normal text-[#9CA3AF] md:text-lg lg:text-xl">
          점검중
        </span>
      </div>
      <div></div>
    </>
  );
}
