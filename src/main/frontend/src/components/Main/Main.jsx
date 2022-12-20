import React from "react";
import Section from "../Shared/Section/Section";
import { useLocationContext } from "../../contexts/LocationContext";
import MainSkeleton from "../Shared/UI/MainSkeleton";
import NotFound from "../Shared/Error/NotFound";
import useWeather from "../../hooks/useWeather";
import Card from "../Shared/Card/Card";
import Icon from "../Shared/Icon/Icon";
import CurrentWeather from "./CurrentWeather";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import * as formatUtil from "../../util/formatUtil";

export default function Main() {
  const { location } = useLocationContext();

  const queryResults = useWeather(["toptm", "topspt"], location, "");
  const toptm = queryResults.length > 0 ? queryResults[0] : null;
  const topspt = queryResults.length > 0 ? queryResults[1] : null;

  const isLoading = queryResults?.some((query) => query.isLoading);
  const isError = queryResults.some((query) => query.isError);
  const isSuccess = queryResults.every((query) => query.isSuccess);

  return (
    <>
      {isLoading && <MainSkeleton />}
      {isError && <NotFound />}
      {!isError && !isLoading && isSuccess && (
        <Section>
          {toptm && topspt && (
            <>
              <CurrentWeather toptm={toptm.data} topspt={topspt.data} />
              {toptm.hasOwnProperty("time") && toptm.hasOwnProperty("time") && (
                <Card styles="relative">
                  <div className="absolute top-1/2 left-6 -translate-y-2/4">
                    <Icon icon={faBell} size={26} />
                  </div>
                  <span className="text-2xl text-brand font-medium">
                    {toptm.data.time.map((item, index) => {
                      return `${formatUtil.sentenceFormat(item)} ${
                        toptm.data.message[index]
                      }${
                        toptm.data.time.length - 1 === index
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
