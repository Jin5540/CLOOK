import React from "react";
import { ResponsiveLine } from "@nivo/line";
import * as dateUtil from "../../util/dateUtil";
import { getWeatherImages } from "../../util/getWeatherImages";

// Nivo 차트
export default function Chart({
  data,
  popArray,
  iconArray,
  max,
  min,
  standardHour,
}) {
  // const minBottom = min > 0 ? 0 : min - 3;
  const minBottom = min - 3;
  const maxTop = max + 10;
  // console.log(minBottom, maxTop);

  const CustomSymbol = (props) => {
    const x = props.datum.x;

    let circle = null;
    if (x === standardHour) {
      circle = (
        <g>
          <text
            x={2}
            y={-20}
            textAnchor="middle"
            stroke="#1E3A8A"
            fill="#1E3A8A"
            style={{
              fontFamily: "Pretendard",
              lineHeight: "150%",
              fontWeight: "300",
            }}
          >{`${props.datum.y}˚`}</text>
          <circle
            r={6}
            strokeWidth={3}
            stroke="#1E3A8A"
            fill="#FFFFFF"
            fillOpacity={1}
          />
        </g>
      );
    } else {
      circle = (
        <g>
          <text
            x={2}
            y={-20}
            textAnchor="middle"
            stroke="#9CA3AF"
            fill="#9CA3AF"
            style={{
              fontFamily: "Pretendard",
              lineHeight: "150%",
              fontWeight: "300",
            }}
          >{`${props.datum.y}˚`}</text>
          <circle
            r={6}
            strokeWidth={3}
            stroke="#93C5FD"
            fill="#FFFFFF"
            fillOpacity={1}
          />
        </g>
      );
    }

    return circle;
  };

  const CustomTick = (props) => {
    const { value, x, y } = props;

    const chartData = data[0].data;
    let idx = -1;
    chartData.forEach((item, index) => {
      if (item.x === value) {
        idx = index;
      }
    });

    const pop = popArray[idx];
    const icon = iconArray[idx];

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={-2}
          textAnchor="middle"
          stroke="#1E3A8A"
          fill="#1E3A8A"
          style={{
            fontFamily: "Pretendard",
            lineHeight: "150%",
            fontWeight: "300",
          }}
        >
          {dateUtil.TimeFormat(value)}
        </text>
        <image
          xlinkHref={getWeatherImages("icon", icon)}
          x={icon === "해" ? -20 - 2 : -20}
          y={icon === "해" ? 3 : 5}
          textAnchor="middle"
          width={`${icon === "해" ? 40 + 5 : 40}px`}
        />
        <text
          x={0}
          y={70}
          textAnchor="middle"
          stroke="#2563EB"
          fill="#2563EB"
          style={{
            fontFamily: "Pretendard",
            lineHeight: "150%",
            fontWeight: "300",
          }}
        >
          {pop > 0 ? `${pop}%` : ""}
        </text>
      </g>
    );
  };

  return (
    <>
      <svg className="absolute">
        <defs>
          <linearGradient id="someGradientId" x1="0" y1="0" x2="0" y2="1">
            <stop offset="40%" stopColor="#C2DCFD" stopOpacity={1} />
            <stop offset="100%" stopColor="#d9d9d9" stopOpacity={0.79} />
          </linearGradient>
        </defs>
      </svg>
      <div className="w-[1800px] h-full text-sm md:w-[2000px] md:text-[1.125rem] lg:w-[2200px] lg:text-xl">
        <ResponsiveLine
          data={data}
          margin={{
            top: 30,
            right: 40,
            bottom: 10,
            left: 45,
          }}
          lineWidth={2}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
            min: minBottom,
            max: maxTop,
            stacked: true,
            reverse: false,
          }}
          stacked={true}
          curve="linear"
          axisRight={null}
          axisBottom={null}
          axisTop={{
            orient: "top",
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            renderTick: CustomTick,
          }}
          axisLeft={null}
          pointSize={10}
          pointColor="white"
          pointBorderWidth={3}
          pointBorderColor="#93C5FD"
          pointSymbol={CustomSymbol}
          enableArea={true}
          areaBaselineValue={minBottom} // 0 라인 바꾸는거
          areaOpacity={0.3}
          colors={["url(#someGradientId)"]}
          borderColor="#ff0000"
          useMesh={false}
          animate={false}
          enableGridX={false}
          enableGridY={false}
          isInteractive={false}
        />
      </div>
    </>
  );
}
