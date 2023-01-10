import React, { Suspense } from "react";
import Section from "../Shared/Section/Section";
import MainSkeleton from "../Shared/UI/MainSkeleton";
import useWeather from "../../hooks/useWeather";
import Card from "../Shared/Card/Card";
import Icon from "../Shared/Icon/Icon";
import CurrentWeather from "./CurrentWeather";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import * as formatUtil from "../../util/formatUtil";
import fakeToptm from "../../json/toptm.json";
import fakeTopspt from "../../json/topspt.json";

export default function Main() {
  const queryResults = useWeather(["toptm", "topspt"], "");
  const toptm = queryResults[0]?.data;
  const topspt = queryResults[1]?.data;

  const isLoading = queryResults?.some((query) => query?.isLoading);
  const isSuccess = queryResults?.every((query) => query?.status === "success");

  // const toptm = fakeToptm;
  // const topspt = fakeTopspt;
  // const isLoading = false;
  // const isSuccess = true;

  return (
    <>
      {(isLoading || !isSuccess) && <MainSkeleton />}
      {!isLoading && isSuccess && (
        <Section>
          {toptm && topspt && (
            <>
              <CurrentWeather toptm={toptm} topspt={topspt} />
              {toptm.hasOwnProperty("time") &&
                toptm.hasOwnProperty("message") && (
                  <Card styles="relative flex items-center justify-center w-full h-20 pl-[106px]">
                    <div className="absolute top-1/2 left-10 -translate-y-2/4">
                      <Icon icon={faBell} size={26} />
                    </div>
                    <div className="absolute top-0 left-0 flex items-center w-full h-full">
                      <span className="w-full text-2xl text-brand font-medium ml-[106px] pr-6">
                        {/* 3시간내 비, 내일 오전 11시에 눈 소식이 있어요. */}
                        {formatUtil.sentenceFormat(toptm)}
                      </span>
                    </div>
                  </Card>
                )}
            </>
          )}
        </Section>
      )}
    </>
  );
}
