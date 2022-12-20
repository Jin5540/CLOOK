import React from "react";
import CardItem from "./CardItem";
import * as dateUtil from "../../util/dateUtil";

export default function Card({ item }) {
  const { m, clothes1, clothes2 } = item;
  const selected = m === "현재" ? true : false;

  return (
    <div
      className={`flex flex-col items-center justify-between h-[260px] min-w-[308px] px-10 pt-6 pb-8 global-shadow rounded-default cursor-pointer ${
        selected ? "text-white bg-brand" : "text-brand bg-white"
      }`}
    >
      <span className="min-w-[160px] h-10 flex items-center justify-center text-xl font-semibold text-brand bg-blue-100 rounded-[20px]">
        {selected && "현재"}
        {!selected && dateUtil.clothesTime(m)}
      </span>
      <div className="flex justify-between items-center gap-5 w-full">
        {clothes1 && <CardItem clothes={clothes1} selected={selected} />}
        {clothes2 && <CardItem clothes={clothes2} selected={selected} />}
        {item.clothes3 && (
          <CardItem clothes={item.clothes3} selected={selected} />
        )}
      </div>
    </div>
  );
}
