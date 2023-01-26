import React from "react";
import Card from "../Shared/Card/Card";
import CardItem from "./CardItem";
import * as dateUtil from "../../util/dateUtil";

export default function CardList({ item }) {
  const { m, clothes1, clothes2, item1, item2, item3 } = item;
  const selected = m === "지금" ? true : false;

  return (
    <Card
      styles={`flex flex-col items-center justify-between w-auto h-[10rem] my-2 px-6 pt-[0.688rem] pb-5 md:h-[13.125rem] lg:min-w-[19.25rem] lg:h-[16.25rem] lg:px-10 lg:pt-6 lg:pb-8`}
      selected={selected}
    >
      <span
        className={`${
          selected ? "px-[1.375rem] md:px-10" : "px-7 md:px-8"
        } h-6 flex items-center justify-center text-base font-semibold text-brand bg-blue-100 rounded-[1.25rem] md:h-8 md:text-lg lg:h-10 lg:text-xl`}
      >
        {selected && "지금"}
        {!selected && dateUtil.clothesTime(m)}
      </span>
      <div
        className={`flex ${
          item1 || item2 || item3 ? "justify-between" : "justify-around"
        } items-center gap-2 w-full md:gap-5`}
      >
        {clothes1 && <CardItem clothes={clothes1} selected={selected} />}
        {clothes2 && <CardItem clothes={clothes2} selected={selected} />}
        {item1 && <CardItem clothes={item1} selected={selected} />}
        {item2 && <CardItem clothes={item2} selected={selected} />}
        {item3 && <CardItem clothes={item3} selected={selected} />}
      </div>
    </Card>
  );
}
