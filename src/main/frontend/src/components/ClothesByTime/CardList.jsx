import React from "react";
import Card from "../Shared/Card/Card";
import CardItem from "./CardItem";
import * as dateUtil from "../../util/dateUtil";

export default function CardList({ item }) {
  const { m, clothes1, clothes2 } = item;
  const subClothes = item.hasOwnProperty("item1")
    ? item.item1
    : item.hasOwnProperty("item2")
    ? item.item2
    : item.item3;
  const selected = m === "지금" ? true : false;

  return (
    <Card
      styles={`flex flex-col items-center justify-between h-[260px] min-w-[308px] px-10 pt-6 pb-8`}
      selected={selected}
    >
      <span className="min-w-[160px] h-10 flex items-center justify-center text-xl font-semibold text-brand bg-blue-100 rounded-[20px]">
        {selected && "지금"}
        {!selected && dateUtil.clothesTime(m)}
      </span>
      <div className="flex justify-between items-center gap-5 w-full">
        {clothes1 && <CardItem clothes={clothes1} selected={selected} />}
        {clothes2 && <CardItem clothes={clothes2} selected={selected} />}
        {subClothes && <CardItem clothes={subClothes} selected={selected} />}
      </div>
    </Card>
  );
}
