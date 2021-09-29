import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

const data = [
  { time: 1, value: 9000 },
  { time: 2, value: 9000 },
  { time: 3, value: 9000 },
  { time: 4, value: 8800 },
  { time: 5 , value: 8700 },
  { time: 6 , value: 9000 },
  { time: 7 , value: 9000 },
  { time: 8 , value: 9000 },
  { time: 9 , value: 9300 },
  { time: 10 , value: 9000 },
  { time: 11 , value: 8500 },
  { time: 12 , value: 9000 },
  { time: 13 , value: 9000 },
  { time: 14 , value: 9000 },
  { time: 15 , value: 9000 },
  { time: 16 , value: 9000 },
  { time: 17 , value: 9000 },
  { time: 18 , value: 9000 },
  { time: 19 , value: 9000 }
];


const efficiencyBar = () => (
  <div style={styles}>
    <div style={{ height: "120px", width: "250px"}}>
      <ResponsiveBar 
      data={data} 
      keys={["value"]} 
      indexBy="time"
      colors = {["#3AF219"]} 
      enableLabel={false}
      enableGridY={false}
      padding={0.2}
    //     axisBottom = {{
    //        legend: 'Min 1s',
    //        legendPosition: 'start',
    //       colors: "#FFFFFF"
    //    }}
    />
    </div>
  </div>
);

export default efficiencyBar;