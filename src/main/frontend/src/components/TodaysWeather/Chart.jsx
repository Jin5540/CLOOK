import React from "react";
import { ResponsiveLine } from "@nivo/line";
// import { Line } from "@nivo/line";
import * as dateUtil from "../../util/dateUtil";
import * as chartUtil from "../../util/chartUtil";
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
  const minBottom = min > 0 ? 0 : min - 3;
  const maxTop = max + 10;
  // console.log(minBottom, maxTop);

  const CustomPointLabel = (props) => {
    return `${props.y}˚`;
  };

  const CustomSymbol = (props) => {
    const x = props.datum.x;

    let circle = null;
    if (x === standardHour) {
      circle = (
        <g>
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
            fontSize: "20px",
            lineHeight: "150%",
            fontWeight: "300",
          }}
        >
          {dateUtil.TimeFormat(value)}
        </text>
        <image
          xlinkHref={getWeatherImages("icon", icon)}
          x={icon === "해" ? -23 : -20}
          y={5}
          textAnchor="middle"
          width={icon === "해" ? "45px" : "40px"}
        />
        <text
          x={0}
          y={70}
          textAnchor="middle"
          stroke="#2563EB"
          fill="#2563EB"
          style={{
            fontFamily: "Pretendard",
            fontSize: "20px",
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
    <div className="w-[2200px] h-full">
      <svg className="absolute">
        <defs>
          {/* <linearGradient id="someGradientId" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#d9d9d9" stopOpacity={0.79} />
            <stop offset="50%" stopColor="#BFDBFE" stopOpacity={1} />
          </linearGradient> */}
          <linearGradient id="someGradientId" x1="0" y1="0" x2="0" y2="1">
            <stop offset="25%" stopColor="#BFDBFE" stopOpacity={1} />
            <stop offset="100%" stopColor="#d9d9d9" stopOpacity={0.79} />
          </linearGradient>
        </defs>
      </svg>
      <ResponsiveLine
        theme={{
          fontSize: 20,
        }}
        // width="2200"
        data={data}
        margin={{
          top: 40,
          right: 50,
          bottom: 10,
          left: 50,
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
        // axisLeft={{
        //   orient: "left",
        //   tickSize: 0,
        //   tickRotation: 0,
        // }}
        enablePointLabel={true} // 점 위에 값 나오는 것.
        pointLabel={CustomPointLabel}
        pointLabelYOffset={-12} // 점 위에 값 y 위치 조정
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
  );
}
