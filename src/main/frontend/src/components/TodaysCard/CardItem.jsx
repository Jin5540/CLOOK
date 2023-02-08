import React from "react";
import CardItemError from "./CardItemError";
import CardItemType1 from "./CardItemType1";
import CardItemType2 from "./CardItemType2";
import CardItemType3 from "./CardItemType3";
import { getWeatherImages } from "../../util/getWeatherImages";

export default function CardItem({ item }) {
  const { type, id, name, titleIcon, title } = item;

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex text-base leading-150 font-semibold text-brand md:text-lg xl:text-xl">
        {titleIcon && (
          <img
            className="h-5 mt-[1px] md:h-6"
            src={getWeatherImages("cardIcon", name)}
            alt={name}
          />
        )}
        {!titleIcon && <span className="font-extrabold uppercase">{id}</span>}
        <span className="ml-2 md:ml-3">{title}</span>
      </div>
      {type === 0 && <CardItemError item={item} />}
      {type === 1 && <CardItemType1 item={item} />}
      {type === 2 && <CardItemType2 item={item} />}
      {type === 3 && <CardItemType3 item={item} />}
    </div>
  );
}
