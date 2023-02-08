import React from "react";
import Card from "../Shared/Card/Card";
import CardItem from "./CardItem";
import * as tscFormat from "../../util/todaysCardFormat";

export default function CardList({ card, uv, air, sun }) {
  const data = tscFormat.compoundCardData(card, uv, air, sun);

  return (
    <div className="grid grid-cols-1 gap-x-1 gap-y-3 justify-items-center xs:grid-cols-2 xs:gap-x-4 xs:gap-y-5 sm:grid-cols-3 sm:gap-x-4 lg:gap-x-9 lg:gap-y-10">
      {data.map((item, index) => (
        <Card
          key={index}
          styles="w-full h-[12.5rem] max-w-[200px] p-[0.938rem] xs:max-w-full md:min-w-[15rem] lg:min-w-[19.313rem] lg:h-[15rem] lg:p-5"
        >
          <CardItem item={item} />
        </Card>
      ))}
    </div>
  );
}
