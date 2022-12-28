import React from "react";
import Section from "../Shared/Section/Section";
import { useLocationContext } from "../../contexts/LocationContext";
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
  // const { location } = useLocationContext();
  // const queryResults = useWeather(["toptm", "topspt"], location, "");
  // const toptm = queryResults[0].data;
  // const topspt = queryResults[1].data;

  // const isLoading = queryResults?.some((query) => query.isLoading);
  // const isSuccess = queryResults.every((query) => query.status === "success");

  const toptm = fakeToptm;
  const topspt = fakeTopspt;
  const isLoading = false;
  const isSuccess = true;

  return (
    <>
      {/* <MainSkeleton /> */}
      {isLoading && <MainSkeleton />}
      {!isLoading && isSuccess && (
        <Section>
          {toptm && topspt && (
            <>
              <CurrentWeather toptm={toptm} topspt={topspt} />
              {toptm.hasOwnProperty("time") &&
                toptm.hasOwnProperty("message") && (
                  <Card styles="relative flex items-center justify-center w-full h-20">
                    <div className="absolute top-1/2 left-10 -translate-y-2/4">
                      <Icon icon={faBell} size={26} />
                    </div>
                    <span className="text-2xl text-brand font-medium">
                      {toptm.time.map((item, index) => {
                        return `${formatUtil.sentenceFormat(item)} ${
                          toptm.message[index]
                        }${
                          toptm.time.length - 1 === index
                            ? " 소식이 있어요."
                            : ", "
                        }`;
                      })}
                    </span>
                  </Card>
                )}
            </>
          )}
        </Section>
      )}
    </>
  );
}
