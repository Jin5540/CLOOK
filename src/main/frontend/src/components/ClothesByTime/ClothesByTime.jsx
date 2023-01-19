import React from "react";
import useWeather from "../../hooks/useWeather";
import Section from "../Shared/Section/Section";
import XScrollContainer from "../Shared/ScrollConteiner/XScrollContainer";
import Title from "../Shared/Title/Title";
import CardList from "./CardList";
import ClothesByTimeSkeleton from "../Shared/UI/ClothesByTimeSkeleton";
import fakeClothes from "../../json/clothes.json";

export default function ClothesByTime() {
  const queryResults = useWeather(["clothes"], "");
  const { isLoading, status, data: clothes } = queryResults[0];

  // const clothes = fakeClothes;
  // const isLoading = false;
  // const status = "success";

  return (
    <Section styles="pt-1">
      {isLoading && <ClothesByTimeSkeleton />}
      {!isLoading && status === "success" && (
        <>
          <Title title="시간대 별 옷차림" />
          <div className="w-full h-[11.875rem] md:h-[15.375rem] lg:h-[19.688rem]">
            <XScrollContainer styles="pr-3">
              {clothes.map((item, index) => (
                <CardList key={index} item={item} />
              ))}
            </XScrollContainer>
          </div>
        </>
      )}
    </Section>
  );
}
