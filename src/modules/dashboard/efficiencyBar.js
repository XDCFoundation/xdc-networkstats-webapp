import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";

const Div = styled.div`
width: 320px;
height: 120px;
font-family: sans-serif;
text-align: center;
@media(max-width: 768px){
  height: 150px;
  width: 420px;
}
@media (max-width: 425px){
  height: 100px;
  width: 400px;
}
`;

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

const theme = {
  axis: {
    fontSize: "5px",

    ticks: {
      line: {
        stroke: "#555555"
      },
      text: {
        fill: "#ffffff"
      }
    },
    legend: {
      text: {
        fill: "#aaaaaa"
      }
    }
  }}

const efficiencyBar = () => (
      <Div>
      <ResponsiveBar 
      data={data} 
      keys={["value"]} 
      indexBy="time"
      colors = {["#3AF219"]} 
      enableLabel={false}
      enableGridY={false}
      theme={theme}
      padding={0.2}
      
    />
    </Div>
);

export default efficiencyBar;