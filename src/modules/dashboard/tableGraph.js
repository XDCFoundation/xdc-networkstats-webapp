import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

const data = [
  { time: 1, value: 6 },
  { time: 2, value: 5 },
  { time: 3, value: 4 },
  { time: 4, value: 4 },
  { time: 5, value: 2 },
  { time: 6, value: 6 },
  { time: 7, value: 5 },
  { time: 8, value: 1 },
  { time: 9, value: 2 },
  { time: 1, value: 4 },
  { time: 11, value: 7 },
  { time: 12, value: 1 },
  { time: 13, value: 3 },
  { time: 14, value: 5 },
  { time: 15, value: 2 },
  { time: 16, value: 1 },
  { time: 17, value: 2 },
  { time: 18, value: 2 },
  { time: 19, value: 5 },
  { time: 20, value: 4 },
  { time: 21, value: 1 },
  { time: 22, value: 2 },
  { time: 23, value: 3 },
  { time: 24, value: 1 },
  { time: 25, value: 6 },
  { time: 26, value: 1 },
  { time: 27, value: 2 },
  { time: 28, value: 4 },
  { time: 29, value: 1 },
  { time: 30, value: 6 },
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
        padding={0.6}
      />
    </div>
  </div>
);

export default tableBar;
