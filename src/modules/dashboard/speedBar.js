import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";



const Div = styled.div`
  width: 360px;
  height: 120px;
  font-family: sans-serif;
  text-align: center;
  @media (max-width: 1025px) {
    height: 150px;
    width: 570px;
  }
  @media (max-width: 425px) {
    height: 100px;
    width: 400px;
  }
`;

function speedBar(props) {

  const data = [
    { time: 1, value: props.content.stats.blockTime[0] },
    { time: 2, value: props.content.stats.blockTime[1] },
    { time: 3, value: props.content.stats.blockTime[2] },
    { time: 4, value: props.content.stats.blockTime[3] },
    { time: 5, value: props.content.stats.blockTime[4] },
    { time: 6, value: props.content.stats.blockTime[5] },
    { time: 7, value: props.content.stats.blockTime[6] },
    { time: 8, value: props.content.stats.blockTime[7] },
    { time: 9, value: props.content.stats.blockTime[8] },
    { time: 10, value: props.content.stats.blockTime[9] },
    { time: 11, value: props.content.stats.blockTime[10] },
    { time: 12, value: props.content.stats.blockTime[11] },
    { time: 13, value: props.content.stats.blockTime[12] },
    { time: 14, value: props.content.stats.blockTime[13] },
    { time: 15, value: props.content.stats.blockTime[14] },
    { time: 16, value: props.content.stats.blockTime[15] },
    { time: 17, value: props.content.stats.blockTime[16] },
    { time: 18, value: props.content.stats.blockTime[17] },
    { time: 19, value: props.content.stats.blockTime[18] },
    { time: 20, value: props.content.stats.blockTime[19] },
    { time: 21, value: props.content.stats.blockTime[20] },
    { time: 22, value: props.content.stats.blockTime[21] },
    { time: 23, value: props.content.stats.blockTime[22] },
    { time: 24, value: props.content.stats.blockTime[23] },
    { time: 25, value: props.content.stats.blockTime[24] },
    { time: 26, value: props.content.stats.blockTime[25] },
    { time: 27, value: props.content.stats.blockTime[26] },
    { time: 28, value: props.content.stats.blockTime[27] },
    { time: 29, value: props.content.stats.blockTime[28] },
    { time: 30, value: props.content.stats.blockTime[29] },
    { time: 31, value: props.content.stats.blockTime[30] },
    { time: 32, value: props.content.stats.blockTime[31] },
    { time: 33, value: props.content.stats.blockTime[32] },
    { time: 34, value: props.content.stats.blockTime[33] },
    { time: 35, value: props.content.stats.blockTime[34] },
    { time: 36, value: props.content.stats.blockTime[35] },
    { time: 37, value: props.content.stats.blockTime[36] },
    { time: 38, value: props.content.stats.blockTime[37] },
    { time: 39, value: props.content.stats.blockTime[38] },
    { time: 40, value: props.content.stats.blockTime[39] },
    
  ];

  const theme = {
    grid: {
      line: {
        stroke: "#667FC1",
        strokeWidth: 0.5,
        strokeDasharray: "1 1"
        
      }
    }
  };

  return (
  <Div>
    <ResponsiveBar
      data={data}
      keys={["value"]}
      indexBy="time"
      colors={["#0093FF"]}
      enableLabel={false}
      enableGridY={true}
      gridYValues={["0", "1"]}
      theme={theme}
      padding={0.5}
    />
  </Div>
);
  }
export default speedBar;
