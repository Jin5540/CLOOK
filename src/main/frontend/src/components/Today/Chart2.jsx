import React, { PureComponent } from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  Line,
  LineChart,
} from "recharts";
import { getWweatherImages } from "../../util/getWweatherImages";
import { chartTimeFormat } from "../../util/timeFormat";

const time = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

const currentTime = 1;
const currentTimeIndex = time.indexOf(currentTime);

const CustomizedAxisTick = ({ props, data }) => {
  const { x, y, payload, index } = props;
  const element = data[index];
  // console.dir(props);

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
          // fontWeight: "600",
          lineHeight: "150%",
          fontWeight: "300",
        }}
      >
        {chartTimeFormat(payload.value)}
      </text>
      <image
        xlinkHref={getWweatherImages("icon", data[index].icon)}
        x={-20}
        y={5}
        textAnchor="middle"
        // height="36px"
        width="40px"
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
          // fontWeight: "600",
          lineHeight: "150%",
          fontWeight: "300",
        }}
      >
        {/* {`${payload.value}%`} */}
        {data[index].pop === "0" ? "" : `${data[index].pop}%`}
      </text>
    </g>
  );
};

const CustomizedDot = (props) => {
  const { cx, cy, index } = props;
  // console.dir(props);

  if (index === currentTimeIndex) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        stroke="#1E3A8A"
        strokeWidth={3}
        fill="white"
      />
    );
  } else {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        stroke="#93C5FD"
        strokeWidth={3}
        fill="white"
      />
    );
  }
};

export default class Chart2 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      minWidth: props.minWidth,
    };
  }

  render() {
    const {
      state: { data, minWidth },
    } = this;
    // console.log(data);

    return (
      <div className="relative w-full h-[441px] mx-4">
        <div className="absolute left-0 top-[26px] flex flex-col justify-center w-full h-[390px] overflow-y-hidden overflow-x-scroll">
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={minWidth}>
              <LineChart
                height={400}
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: -25,
                  bottom: 20,
                }}
              >
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#BFDBFE" stopOpacity={1} />
                    <stop offset="100%" stopColor="#d9d9d9" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  axisLine={false}
                  dataKey="ftime"
                  tick={(props) => (
                    <CustomizedAxisTick props={props} data={data} />
                  )}
                  tickLine={false}
                  orientation="top"
                  minTickGap="10"
                  padding={{ right: 10 }}
                />
                <YAxis
                  axisLine={false}
                  dataKey="tmp"
                  type="number"
                  domain={["dataMin", "dataMax + 10"]}
                  tick={false}
                  // tick={true}
                  tickLine={false}
                  // tickLine={true}
                  // allowDataOverflow={true}
                  // stackOffset="sign"
                  // mirror={true}
                />
                <Line
                  type="monotone"
                  dataKey="tmp"
                  dot={<CustomizedDot />}
                  stroke="#93C5FD"
                  strokeWidth={4}
                  fill="url(#colorTemp)"
                  isAnimationActive={false}
                  // style={{ margin: "10px" }}
                  // label={CustomizedLabel}
                >
                  <LabelList
                    dataKey={(props) => {
                      const value = props.tmp;
                      if (value < -10 || 10 > value) {
                        return `${value}˚`;
                      } else {
                        return `${value}˚`;
                      }
                    }}
                    position="top"
                    offset={10}
                    fill="#1E3A8A"
                    fontSize="20"
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}
