import React from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import Skeleton from "../Shared/UI/Skeleton";
import NotFound from "../Shared/NotFound/NotFound";
import useWeather from "../../hooks/useWeather";
import Card from "../Shared/Card/Card";
import Icon from "../Shared/Icon/Icon";
import CurrentWeather from "./CurrentWeather";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { timeFormat } from "../../util/timeFormat";

export default function Main() {
  const { location } = useLocationContext();
  // const { toptm, topspt } = useWeather(location);
  const { toptm } = useWeather(location);

  // const isLoading = (toptm && toptm.isLoading) || (topspt && topspt.isLoading);
  // const isError = (toptm && toptm.isError) || (topspt && topspt.isError);
  // const isSuccess = (toptm && toptm.isSuccess) || (topspt && topspt.isSuccess);
  // console.log(toptm, topspt);
  // console.log(`time: ${toptm.data.time} / message: ${toptm.data.message}`);

  const topspt = {
    data: {
      sky: "1",
      t1h: 12,
      pty: "0",
      tmpl: 0,
      background: "구름없는낮",
      icon: "해",
      character: "1",
      fcstTime: "1000",
      ftime: 0,
    },
  };
  const isLoading = toptm.isLoading;
  const isError = toptm.isError;
  const isSuccess = toptm.isSuccess;

  return (
    <>
      {isLoading && <Skeleton />}
      {isError && <NotFound />}
      {!isError && !isLoading && isSuccess && (
        <section className="w-full bg-white mb-12">
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
                      return `${timeFormat(item)} ${toptm.data.message[index]}${
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
        </section>
      )}
    </>
  );
}
