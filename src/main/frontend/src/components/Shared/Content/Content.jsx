import React from "react";
import Main from "../../Main/Main";
import ClothesByTime from "../../ClothesByTime/ClothesByTime";
import TodaysWeather from "../../TodaysWeather/TodaysWeather";
import TodaysCard from "../../TodaysCard/TodaysCard";
import { useLocationContext } from "../../../contexts/LocationContext";
import useLocation from "../../../hooks/useLocation";
import MainSkeleton from "../UI/MainSkeleton";
import ClothesByTimeSkeleton from "../UI/ClothesByTimeSkeleton";
import TodaysWeatherSkeleton from "../UI/TodaysWeatherSkeleton";
import TodaysCardSkeleton from "../UI/TodaysCardSkeleton";
import Fetch from "../../../Fetch";

export default function Content() {
  const { location } = useLocationContext();
  const { locationQuery } = useLocation(location);
  const { status, isLoading } = locationQuery;

  // const status = "success";
  // const isLoading = false;

  return (
    <div className="flex flex-col items-center w-full mt-[119px]">
      {isLoading && (
        <div>
          <MainSkeleton />
          <ClothesByTimeSkeleton />
          <TodaysWeatherSkeleton />
          <TodaysCardSkeleton />
        </div>
      )}
      {status === "success" && (
        <>
          <Main />
          <ClothesByTime />
          <TodaysWeather />
          <TodaysCard />
        </>
      )}
      {/* <Fetch /> */}
    </div>
  );
}
