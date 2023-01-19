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
              className="text-base font-bold leading-[1.375rem] cursor-pointer md:mt-1 md:ml-1"
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
              styles="px-5 w-full lg:px-0 lg:w-auto"
            />
          )}
          <Card styles="flex items-center justify-center h-[18.75rem] p-4 md:h-[22.5rem] md:p-5 lg:h-[27.5rem] lg:p-6">
            <ChartContainer data={today} />
          </Card>
        </>
      )}
    </Section>
  );
}
