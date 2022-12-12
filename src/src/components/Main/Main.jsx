import React from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Card from "../Shared/Card/Card";
import Icon from "../Shared/Icon/Icon";
import CurrentWeather from "./CurrentWeather";

// 메인 카드 컴포넌트로 만들기 (재사용 - 날씨에 따라 배경이랑 텍스트만 바꿔주면됨)

export default function MainWeather({ toptm, topspt }) {
  console.log(toptm.time);
  console.log(toptm.message);

  return (
    <section className="w-full bg-white mb-12">
      {toptm && topspt && (
        <>
          <CurrentWeather toptm={toptm} topspt={topspt} />
          <Card styles="relative">
            <div className="absolute top-1/2 left-6 -translate-y-2/4">
              <Icon icon={faBell} size={26} />
            </div>
            <span className="text-2xl text-brand font-medium">
              {toptm.hasOwnProperty("time") && toptm.hasOwnProperty("time")
                ? `${toptm.time[0] === "0000" ? "" : toptm.time[0]} ${
                    toptm.message[0]
                  } 소식이 있어요.`
                : "ex 5시간 뒤에 비 소식이 있어요."}
            </span>
          </Card>
        </>
      )}
    </section>
  );
}
