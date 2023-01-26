import React from "react";
import useWeather from "../../hooks/useWeather";
import Section from "../Shared/Section/Section";
import CurrentWeather from "./CurrentWeather";
import OneSentence from "./OneSentence";
import MainSkeleton from "../Shared/UI/MainSkeleton";
import fakeToptm from "../../json/toptm.json";
import fakeTopspt from "../../json/topspt.json";
import fakeMsg from "../../json/msg.json";

export default function Main() {
  const queryResults = useWeather(["toptm", "topspt"], "");
  const queryResult = useWeather(["msg"], "");

  const toptm = queryResults[0]?.data;
  const topspt = queryResults[1]?.data;
  const { isSuccess: msgIsSucc, data: msg } = queryResult[0];

  const isLoading = queryResults?.some((query) => query?.isLoading);
  const isSuccess = queryResults?.every((query) => query?.status === "success");

  // const toptm = fakeToptm;
  // const topspt = fakeTopspt;
  // const msg = fakeMsg;
  // const isLoading = false;
  // const isSuccess = true;
  // const msgIsSucc = true;

  return (
    <>
      {(isLoading || !isSuccess) && <MainSkeleton />}
      {!isLoading && isSuccess && (
        <Section>
          {toptm && topspt && (
            <>
              <CurrentWeather toptm={toptm} topspt={topspt} />
              {msgIsSucc && msg.hasOwnProperty("message") && (
                <OneSentence msg={msg} />
              )}
            </>
          )}
        </Section>
      )}
    </>
  );
}
