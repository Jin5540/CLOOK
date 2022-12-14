import React from "react";
import { useLocationContext } from "../../contexts/LocationContext";
import useWeather from "../../hooks/useWeather";
import Card from "../Shared/Card/Card";
import Section from "../Shared/Section/Section";
import Skeleton from "../Shared/UI/Skeleton";
import Chart from "./Chart";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";
import Chart4 from "./Chart4";
import * as sort from "../../util/sort";

export default function Today() {
  const { location } = useLocationContext();

  // const queryResults = useWeather(["today"], location, "");
  // const { isLoading, isSuccess, data: today } = queryResults[0];
  // console.log(queryResults[0].data?.length);

  // Fake Data
  const isLoading = false;
  const isSuccess = true;
  const today = [
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "-2",
      icon: "해",
      fcstDate: "20221211",
      ftime: 800,
    },
    {
      pop: "30",
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "0",
      icon: "해",
      fcstDate: "20221211",
      ftime: 900,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "1",
      icon: "해",
      fcstDate: "20221211",
      ftime: 1000,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "3",
      icon: "해",
      fcstDate: "20221211",
      ftime: 1100,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "4",
      icon: "해",
      fcstDate: "20221211",
      ftime: 1200,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "5",
      icon: "해",
      fcstDate: "20221211",
      ftime: 1300,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "6",
      icon: "해",
      fcstDate: "20221211",
      ftime: 1400,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "6",
      icon: "해",
      fcstDate: "20221211",
      ftime: 1500,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "6",
      icon: "해",
      fcstDate: "20221211",
      ftime: 1600,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "4",
      icon: "해",
      fcstDate: "20221211",
      ftime: 1700,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "3",
      icon: "달",
      fcstDate: "20221211",
      ftime: 1800,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "2",
      icon: "달",
      fcstDate: "20221211",
      ftime: 1900,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "2",
      icon: "달",
      fcstDate: "20221211",
      ftime: 2000,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "1",
      icon: "달",
      fcstDate: "20221211",
      ftime: 2100,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "0",
      icon: "달",
      fcstDate: "20221211",
      ftime: 2200,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "0",
      icon: "달",
      fcstDate: "20221211",
      ftime: 2300,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "0",
      icon: "달",
      fcstDate: "20221212",
      ftime: 0,
    },
    {
      sky: "1",
      t1h: 0,
      pty: "0",
      tmp: "-1",
      icon: "달",
      fcstDate: "20221212",
      ftime: 100,
    },
    {
      sky: "3",
      t1h: 0,
      pty: "0",
      tmp: "-1",
      icon: "달구름",
      fcstDate: "20221212",
      ftime: 200,
    },
    {
      sky: "4",
      t1h: 0,
      pty: "0",
      tmp: "-1",
      icon: "구름",
      fcstDate: "20221212",
      ftime: 300,
    },
    {
      sky: "3",
      t1h: 0,
      pty: "0",
      tmp: "0",
      icon: "달구름",
      fcstDate: "20221212",
      ftime: 400,
    },
    {
      sky: "3",
      t1h: 0,
      pty: "0",
      tmp: "-1",
      icon: "달구름",
      fcstDate: "20221212",
      ftime: 500,
    },
    {
      sky: "4",
      t1h: 0,
      pty: "0",
      tmp: "-1",
      icon: "구름",
      fcstDate: "20221212",
      ftime: 600,
    },
    {
      sky: "3",
      t1h: 0,
      pty: "0",
      tmp: "-1",
      icon: "달구름",
      fcstDate: "20221212",
      ftime: 700,
    },
  ];

  let sortData = today;
  if (today) {
    // 오름차순 정렬
    sortData = sort.objValueSort("asc", today, "ftime");
    // pop key 추가
    sortData.map((item) => {
      if (!item.hasOwnProperty("pop")) {
        item.pop = "0";
      }
      if (item.hasOwnProperty("tmp")) {
        item.tmp = Number(item.tmp);
      }
    });
  }
  // console.log(sortData);

  return (
    <Section>
      {isLoading && <Skeleton />}
      {isSuccess && today && (
        <>
          <span className="block text-4xl leading-[150%] font-bold text-black mb-10">
            오늘의 날씨
          </span>
          <Card height="h-[441px]" styles="cursor-default">
            <Chart data={sortData} minWidth="2200px" />
          </Card>
          <Chart2 data={sortData} minWidth="2200px" />
          {/* <Chart3 />
          <Chart4 /> */}
        </>
      )}
    </Section>
  );
}

// Question is how to fill bottom part of a chart? It should fill everything under 0 on y-axis. Area should go all the way to the bottom
