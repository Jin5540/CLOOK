import React from "react";
import XScrollContainer from "../Shared/ScrollConteiner/XScrollContainer";
import Chart from "./Chart";
import * as chartUtil from "../../util/chartUtil";
import * as dateUtil from "../../util/dateUtil";

export default function ChartContainer({ data }) {
  // "pop" property 추가
  let newData = chartUtil.addPropertyToObj(data, "pop", 0);

  // "tmp" property Number 타입으로 변환
  newData = chartUtil.changePropertyType(newData, "tmp", "number");

  // Array: pop
  const popArray = chartUtil.getPropertyIntoArray(newData, "pop");
  // Array: icon
  const iconArray = chartUtil.getPropertyIntoArray(newData, "icon");

  // max, min, chart width
  const { max, min } = chartUtil.getMaxMin(newData, "tmp");

  // 차트 데이터 형식으로 변환
  const chartData = chartUtil.chartDataFormat(newData, "ftime", "tmp");
  // console.log(chartData);

  // 현재 시간 + 1
  const nextHour = dateUtil.currentHour() + 1;

  return (
    <div className="w-full h-full">
      <XScrollContainer>
        <Chart
          data={chartData}
          popArray={popArray}
          iconArray={iconArray}
          max={max}
          min={min}
          standardHour={nextHour}
        />
      </XScrollContainer>
    </div>
  );
}
