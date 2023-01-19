import React from "react";
import Card from "../Shared/Card/Card";
import CardListItem from "./CardListItem";
import * as tscFormat from "../../util/todaysCardFormat";
import CardListItemError from "./CardListItemError";

export default function CardList({ card, uv, air, sun }) {
  // card - 바람 방향: vec / 풍속: wsd
  // card - 습도: reh
  // card - 강수량: rn1
  // card - 바람,습도,강수량 업데이트 시간: fcstTime
  // sun - 일출: sunrise / 일몰: sunset
  // air - 미세먼지: pm10Grade1h / 초미세: pm25Grade1h
  // air - 측정소: stationName / 시간: dataTime
  // uv - 자외선: h0~h24

  const data = tscFormat.compoundCardData(card, uv, air, sun);

  return (
    <div className="grid grid-cols-1 gap-x-1 gap-y-3 justify-items-center xs:grid-cols-2 xs:gap-x-4 xs:gap-y-5 sm:grid-cols-3 sm:gap-x-4 lg:gap-x-9 lg:gap-y-10">
      {data.map((item, index) => (
        <Card
          key={index}
          styles="w-full h-[12.5rem] max-w-[200px] p-[0.938rem] xs:max-w-full md:min-w-[15rem] lg:min-w-[19.313rem] lg:h-[15rem] lg:p-5"
        >
          {item.title === "미세먼지" && (!item.value1 || !item.value2) ? (
            <CardListItemError />
          ) : (
            <CardListItem
              type={item.type}
              title={item.title}
              text1={item.text1}
              value1={item.value1}
              text2={item.text2}
              value2={item.value2}
              color1={item.color1}
              color2={item.color2}
              stationName={item.stationName}
              time={item.time}
            />
          )}
        </Card>
      ))}
    </div>
  );
}
