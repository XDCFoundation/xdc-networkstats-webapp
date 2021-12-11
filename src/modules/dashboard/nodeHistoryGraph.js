import React from "react";
import { ResponsiveLine } from "@nivo/line";
import styled from "styled-components";
import { linearGradientDef } from "@nivo/core";

const Div = styled.div`
  width: 250px;
  height: 150px;
  padding-bottom: 10px;
  @media (max-width: 1024px) {
    width: 450px;
    height: 200px;
    padding-left: 40px;
  }
  @media (max-width: 415px) {
    width: 300px;
    height: 170px;
  }
`;

function NodeGraph(props) {
  const data = [
    {
      id: "Stats",
      data: [
        {
          x: "0",
          y: 150,
        },
        {
          x: "1",
          y: 160,
        },
        {
          x: "2",
          y: 140,
        },
        {
          x: "3",
          y: 130,
        },
        {
          x: "4",
          y: 150,
        },
        {
          x: "5",
          y: 180,
        },
        {
          x: "6",
          y: 160,
        },
      ],
    },
  ];

  const theme = {
    axis: {
      ticks: {
        text: {
          fill: "#667FC1",
        },
      },
    },
    grid: {
      line: {
        stroke: "#4E6AB580",
        strokeWidth: 0.9,
        strokeDasharray: "1 1",
        
      },
    },
  };

  return (
    <Div>
      <ResponsiveLine
        data={data}
        theme={theme}
        key={"Stats"}
        margin={{
          top: 30,
          right: 30,
          bottom: 30,
          left: 30,
        }}
        yScale={{
          type: "linear",
          stacked: true,
          min: 0,
          max: 200,
        }}
        pointColor="#7299FF"
        tickSize
        pointSize={4}
        lineWidth="1px"
        enableArea={true}
        enableGridX={false}
        enableGridY={true}
        enableDotLabel={false}
        gridYValues={["0", "100", "200"]}
        axisLeft={{
          tickSize: 0,
          tickValues: ["0", "100", "200"],
        }}
        axisBottom={false}
        // curve="monotoneX"
        colors={["#275FF5"]}
        areaOpacity={0.3}
        defs={[
          linearGradientDef("gradientA", [
            { offset: 55, color: "#275FF5" },
            { offset: 100, color: "#102C78" },
          ]),
        ]}
        fill={[{ match: { id: "Stats" }, id: "gradientA" }]}
      />
    </Div>
  );
}

export default NodeGraph;
