import React from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Main from "../Main/Main";
import ClothesByTime from "../ClothesByTime/ClothesByTime";
import TodaysWeather from "../TodaysWeather/TodaysWeather";
import TodaysCard from "../TodaysCard/TodaysCard";
import useLocation from "../../hooks/useLocation";
import MainSkeleton from "../Shared/UI/MainSkeleton";
import ClothesByTimeSkeleton from "../Shared/UI/ClothesByTimeSkeleton";
import TodaysWeatherSkeleton from "../Shared/UI/TodaysWeatherSkeleton";
import TodaysCardSkeleton from "../Shared/UI/TodaysCardSkeleton";
import SectionError from "../Shared/Error/SectionError";

export default function Content() {
  const { locationQuery } = useLocation();
  const { isLoading, isSuccess } = locationQuery;

  const { reset } = useQueryErrorResetBoundary();

  return (
    <div className="flex flex-col items-center w-full max-w-994 px-6 mt-[136px] md:mt-[119px] lg:px-0">
      {isLoading && (
        <>
          <MainSkeleton />
          <ClothesByTimeSkeleton />
          <TodaysWeatherSkeleton />
          <TodaysCardSkeleton />
        </>
      )}
      {!isLoading && isSuccess && (
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
