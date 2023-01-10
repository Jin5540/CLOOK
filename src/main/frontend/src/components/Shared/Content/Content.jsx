import React, { useEffect } from "react";
import Main from "../../Main/Main";
import ClothesByTime from "../../ClothesByTime/ClothesByTime";
import TodaysWeather from "../../TodaysWeather/TodaysWeather";
import TodaysCard from "../../TodaysCard/TodaysCard";
import useLocation from "../../../hooks/useLocation";
import MainSkeleton from "../UI/MainSkeleton";
import ClothesByTimeSkeleton from "../UI/ClothesByTimeSkeleton";
import TodaysWeatherSkeleton from "../UI/TodaysWeatherSkeleton";
import TodaysCardSkeleton from "../UI/TodaysCardSkeleton";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import SectionError from "../Error/SectionError";

export default function Content() {
  const { locationQuery } = useLocation();
  const { isLoading, status } = locationQuery;

  const { reset } = useQueryErrorResetBoundary();

  return (
    <div className="flex flex-col items-center w-full max-w-[62.125rem] mt-[119px]">
      {isLoading && (
        <>
          <MainSkeleton />
          <ClothesByTimeSkeleton />
          <TodaysWeatherSkeleton />
          <TodaysCardSkeleton />
        </>
      )}
      {!isLoading && (
        <>
          <ErrorBoundary onReset={reset} FallbackComponent={SectionError}>
            <Main />
          </ErrorBoundary>
          <ErrorBoundary onReset={reset} FallbackComponent={SectionError}>
            <ClothesByTime />
          </ErrorBoundary>
          <ErrorBoundary onReset={reset} FallbackComponent={SectionError}>
            <TodaysWeather />
          </ErrorBoundary>
          <ErrorBoundary onReset={reset} FallbackComponent={SectionError}>
            <TodaysCard />
          </ErrorBoundary>
        </>
      )}
    </div>
  );
}
