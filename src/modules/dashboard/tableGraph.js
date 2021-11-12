import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

const data = [
  { time: 1, value: 6000 },
  { time: 2, value: 5000 },
  { time: 3, value: 4250 },
  { time: 4, value: 4000 },
  { time: 5, value: 2500 },
  { time: 6, value: 6500 },
  { time: 7, value: 5000 },
  { time: 8, value: 1000 },
  { time: 9, value: 2300 },
  { time: 10, value: 4400 },
  { time: 11, value: 7000 },
  { time: 12, value: 1000 },
  { time: 13, value: 3000 },
  { time: 14, value: 5000 },
  { time: 15, value: 2600 },
  { time: 16, value: 1000 },
  { time: 17, value: 2000 },
  { time: 18, value: 2000 },
  { time: 19, value: 5000 },
];

const tableBar = () => (
  <div style={styles}>
    <div style={{ height: "50px", width: "100px", cursor: "pointer" }}>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="time"
        colors={["#E62805"]}
        enableLabel={false}
        enableGridY={false}
        padding={0.7}
      />
    </div>
  </div>
);

export default tableBar;
