import React from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import useWeather from "../../hooks/useWeather";
import Card from "../Shared/Card/Card";
import Section from "../Shared/Section/Section";
import TodaySkeleton from "../Shared/UI/TodaySkeleton";
import ChartContainer from "./ChartContainer";
import fakeData from "./todayData.json";

export default function Today() {
  const { location } = useLocationContext();
  const queryResults = useWeather(["today"], location, "");
  const { isLoading, status, data } = queryResults[0];

  return (
    <Section>
      {isLoading && <TodaySkeleton />}
      {!isLoading && status === "success" && (
        <>
          <span className="inline-block text-4xl leading-[150%] font-bold text-black mb-10">
            오늘의 날씨
          </span>
          <Card height="h-[441px]" styles="cursor-default">
            <ChartContainer data={data} />
            {/* <ChartContainer data={fakeData} /> */}
          </Card>
        </>
      )}
    </Section>
  );
}
