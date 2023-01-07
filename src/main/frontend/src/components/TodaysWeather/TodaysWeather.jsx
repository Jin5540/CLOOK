import React, { useState } from "react";
import useWeather from "../../hooks/useWeather";
import Title from "../Shared/Title/Title";
import Section from "../Shared/Section/Section";
import TodaysWeatherSkeleton from "../Shared/UI/TodaysWeatherSkeleton";
import DataGuideModal from "../Modal/DataGuideModal";
import Card from "../Shared/Card/Card";
import ChartContainer from "./ChartContainer";
import fakeToday from "../../json/today.json";

export default function TodaysWeather() {
  const [isOpen, setIsOpen] = useState(false);
  const queryResults = useWeather(["today"], "");
  const { isLoading, status, data: today } = queryResults[0];

  // const today = fakeToday;
  // const isLoading = false;
  // const status = "success";

  return (
    <Section>
      {isLoading && <TodaysWeatherSkeleton />}
      {!isLoading && status === "success" && (
        <>
          <Title title="오늘의 날씨" />
          <div className="flex justify-end mb-[0.625rem]">
            <span
              className="text-base font-bold leading-[1.375rem] mt-1 ml-1 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              ⓘ 데이터 안내
            </span>
          </div>
          {isOpen && (
            <DataGuideModal
              onCloseModal={() => setIsOpen(false)}
              custom="true"
              bgType={false}
              position="middle"
              styles="w-auto"
            />
          )}
          <Card styles="flex items-center justify-center h-[27.563rem] p-6">
            <ChartContainer data={today} />
          </Card>
        </>
      )}
    </Section>
  );
}
