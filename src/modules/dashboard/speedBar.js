import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";


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

const Div = styled.div`
width: 360px;
height: 120px;
font-family: sans-serif;
text-align: center;
@media(max-width: 768px){
  height: 150px;
  width: 420px;
}
@media (max-width : 425px) {
  height: 100px;
  width: 400px;
}
`;

const speedBar = () => (
  
      <Div>
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
    </Div>
);

export default speedBar;