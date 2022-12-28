import React from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import useWeather from "../../hooks/useWeather";
import Section from "../Shared/Section/Section";
import CardList from "./CardList";
import TodaysCardSkeleton from "../Shared/UI/TodaysCardSkeleton";
import fakeCard from "../../json/card.json";
import fakeUv from "../../json/uv.json";
import fakeAir from "../../json/air.json";
import fakeSun from "../../json/sun.json";

export default function TodaysCard() {
  // const { location } = useLocationContext();
  // const queryResults = useWeather(["card", "uv", "air", "sun"], location, "");
  // const card = queryResults[0].data;
  // const uv = queryResults[1].data;
  // const air = queryResults[2].data;
  // const sun = queryResults[3].data;

  // const isLoading = queryResults?.some((query) => query.isLoading);
  // const isSuccess = queryResults.every((query) => query.status === "success");

  const card = fakeCard;
  const uv = fakeUv;
  const air = fakeAir;
  const sun = fakeSun;
  const isLoading = false;
  const isSuccess = true;

  return (
    <>
      {isLoading && <TodaysCardSkeleton />}
      {!isLoading && isSuccess && (
        <Section styles="px-0">
          {/* <div className="flex flex-row flex-wrap justify- items-center gap-4"> */}
          <CardList card={card} uv={uv} air={air} sun={sun} />
        </Section>
      )}
    </>
  );
}
