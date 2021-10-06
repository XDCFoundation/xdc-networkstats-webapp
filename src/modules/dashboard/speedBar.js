import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

const data = [
  { time: 1, value: 13000 },
  { time: 2, value: 16500 },
  { time: 3, value: 14250 },
  { time: 4, value: 19000 },
  { time: 5 , value: 2500 },
  { time: 6 , value: 6500 },
  { time: 7 , value: 9000 },
  { time: 8 , value: 1000 },
  { time: 9 , value: 9300 },
  { time: 10 , value: 5400 },
  { time: 11 , value: 7000 },
  { time: 12 , value: 6000 },
  { time: 13 , value: 3000 },
  { time: 14 , value: 7000 },
  { time: 15 , value: 4600 },
  { time: 16 , value: 5000 },
  { time: 17 , value: 3000 },
  { time: 18 , value: 1000 },
  { time: 19 , value: 10000 }
];


const speedBar = () => (
  <div style={styles}>
    <div style={{ height: "120px", width: "250px"}}>
      <ResponsiveBar 
      data={data} 
      keys={["value"]} 
      indexBy="time"
      colors = {["#0093FF"]} 
      enableLabel={false}
      enableGridY={false}
      padding={0.5}
    //     axisBottom = {{
    //        legend: 'Min 1s',
    //        legendPosition: 'start',
    //       colors: "#FFFFFF"
    //    }}
    />
    </div>
  </div>
);

export default speedBar;