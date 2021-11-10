import React from "react";
import { Bar } from "@nivo/bar";

const data = [
  { time: 1, value: 90 },
  { time: 2, value: 90 },
  { time: 3, value: 90 },
  { time: 4, value: 88 },
  { time: 5, value: 87 },
  { time: 6, value: 90 },
  { time: 7, value: 90 },
  { time: 8, value: 90 },
  { time: 9, value: 93 },
  { time: 10, value: 90 },
  { time: 11, value: 85 },
  { time: 12, value: 90 },
  { time: 13, value: 90 },
  { time: 14, value: 90 },
  { time: 15, value: 90 },
  { time: 16, value: 90 },
  { time: 17, value: 90 },
  { time: 18, value: 90 },
  { time: 19, value: 90 },
];

const EfficiencyBarTab = () => (
  <div>
    <Bar
      width={540}
      height={210}
      margin={{ top: 60, bottom: 20, left: 40 }}
      data={data}
      keys={["value"]}
      indexBy="time"
      colors={["#3AF219"]}
      enableLabel={false}
      axisBottom={false}
      enableGridY={false}
      padding={0.2}
      axisLeft={{
        tickSize: 5,
        tickValues: ["0", "50", "100"],
      }}
      theme={{
        axis: {
          ticks: {
            text: {
              fill: "#667FC1",
            },
          },
        },
      }}
      tooltip={({ id, value, color }) => (
        <div
            style={{
                color,
                background: "white",
                fontSize: "15px"
            }}
        >
            <strong>
                {id}: {value}
            </strong>
        </div>
    )}
    />
  </div>
);

export default EfficiencyBarTab;
