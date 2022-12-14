import React from "react";
import "./chart.css";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Page A", uv: 590, pv: 800, amt: 1400, test: -600 },
  { name: "Page B", uv: 868, pv: 967, amt: 1506, test: -600 },
  { name: "Page C", uv: 1397, pv: 1098, amt: 989, test: -600 },
  { name: "Page D", uv: 1480, pv: 1200, amt: -300, test: -600 },
  { name: "Page E", uv: 1520, pv: 1108, amt: 1100, test: -600 },
  { name: "Page F", uv: 1400, pv: 680, amt: 1700, test: -600 },
];

class LineBarAreaComposedChart extends React.Component {
  // const LineBarAreaComposedChart = React.createClass({
  render() {
    return (
      <ComposedChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Area type="monotone" dataKey="test" fill="#8884d8" stroke="#8884d8" />
        {/* <Bar dataKey="pv" barSize={20} fill="#413ea0" /> */}
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>
    );
  }
}
// });

// ReactDOM.render(
//   <LineBarAreaComposedChart />,
//   document.getElementById("container")
// );

export default function Chart3() {
  return (
    <div className="container">
      <LineBarAreaComposedChart />
    </div>
  );
}
