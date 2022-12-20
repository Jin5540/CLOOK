import React from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import useWeather from "../../hooks/useWeather";
import Section from "../Shared/Section/Section";
import TodaySkeleton from "../Shared/UI/TodaySkeleton";
import XScrollContainer from "../Shared/ScrollConteiner/XScrollContainer";
import Card from "./Card";
import CardItem from "./CardItem";
import fakeData from "./clothesData.json";

export default function ClothesByTime() {
  // const { location } = useLocationContext();
  // const queryResults = useWeather(["clothes"], location, "");
  // const { isLoading, status, data } = queryResults[0];

  const data = fakeData;
  const isLoading = false;
  const status = "success";

  return (
    <Section>
      {isLoading && <TodaySkeleton />}
      {!isLoading && status === "success" && (
        <>
          <span className="inline-block text-4xl leading-[150%] font-bold text-black mb-10">
            시간대별 옷차림
          </span>
          <div className=" w-full h-[315px] px-3">
            <XScrollContainer styles="pr-3">
              {data.map((item, index) => (
                <Card key={index} item={item} />
              ))}
            </XScrollContainer>
          </div>
        </>
      )}
    </Section>
  );
}
