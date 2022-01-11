import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";
import _ from "lodash";

const Div = styled.div`
  width: 100%;
  max-width: 560px;
  height: 120px;

  font-family: sans-serif;
  text-align: center;
  cursor: pointer;
`;

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
      stroke: "#667FC1",
      strokeWidth: 1,
    },
  },
};

let data = [];
function EfficiencyBar(props) {
  if (!_.isEmpty(props.data) && !_.isUndefined(props.data)) {
    if (props.data.responseData.length == 7) {
      data = [
        { time: 1, Up: props.data.responseData[0].uptime, Down: 100-props.data.responseData[0].uptime },
        { time: 2, Up: props.data.responseData[1].uptime, Down: 100-props.data.responseData[1].uptime },
        { time: 3, Up: props.data.responseData[2].uptime, Down: 100-props.data.responseData[2].uptime},
        { time: 4, Up: props.data.responseData[3].uptime, Down: 100-props.data.responseData[3].uptime},
        { time: 5, Up: props.data.responseData[4].uptime, Down: 100-props.data.responseData[4].uptime },
        { time: 6, Up: props.data.responseData[5].uptime, Down: 100-props.data.responseData[5].uptime },
        { time: 7, Up: props.data.responseData[6].uptime, Down: 100-props.data.responseData[6].uptime },
      ];
    }
  

    if (props.data.responseData.length == 24) {
      data = [
        { time: 1, Up: props.data.responseData[0].upTime, Down: 100-props.data.responseData[0].upTime },
        { time: 2, Up: props.data.responseData[1].upTime, Down: 100-props.data.responseData[1].upTime },
        { time: 3, Up: props.data.responseData[2].upTime, Down: 100-props.data.responseData[2].upTime },
        { time: 4, Up: props.data.responseData[3].upTime, Down: 100-props.data.responseData[3].upTime },
        { time: 5, Up: props.data.responseData[4].upTime, Down: 100-props.data.responseData[4].upTime},
        { time: 6, Up: props.data.responseData[5].upTime, Down: 100-props.data.responseData[5].upTime },
        { time: 7, Up: props.data.responseData[6].upTime, Down: 100-props.data.responseData[6].upTime },
        { time: 8, Up: props.data.responseData[7].upTime, Down: 100-props.data.responseData[7].upTime },
        { time: 9, Up: props.data.responseData[8].upTime, Down: 100-props.data.responseData[8].upTime },
        { time: 10, Up: props.data.responseData[9].upTime, Down: 100-props.data.responseData[9].upTime },
        { time: 11, Up: props.data.responseData[10].upTime, Down: 100-props.data.responseData[10].upTime },
        { time: 12, Up: props.data.responseData[11].upTime, Down: 100-props.data.responseData[11].upTime },
        { time: 13, Up: props.data.responseData[12].upTime, Down: 100-props.data.responseData[12].upTime },
        { time: 14, Up: props.data.responseData[13].upTime, Down: 100-props.data.responseData[13].upTime },
        { time: 15, Up: props.data.responseData[14].upTime, Down: 100-props.data.responseData[14].upTime },
        { time: 16, Up: props.data.responseData[15].upTime, Down: 100-props.data.responseData[15].upTime },
        { time: 17, Up: props.data.responseData[16].upTime, Down: 100-props.data.responseData[16].upTime },
        { time: 18, Up: props.data.responseData[17].upTime, Down: 100-props.data.responseData[17].upTime },
        { time: 19, Up: props.data.responseData[18].upTime, Down: 100-props.data.responseData[18].upTime },
        { time: 20, Up: props.data.responseData[19].upTime, Down: 100-props.data.responseData[19].upTime },
        { time: 21, Up: props.data.responseData[20].upTime, Down: 100-props.data.responseData[20].upTime },
        { time: 22, Up: props.data.responseData[21].upTime, Down: 100-props.data.responseData[21].upTime },
        { time: 23, Up: props.data.responseData[22].upTime, Down: 100-props.data.responseData[22].upTime },
        { time: 24, Up: props.data.responseData[23].upTime, Down: 100-props.data.responseData[23].upTime },
      ];
    }

    if (props.data.responseData.length == 30) {
      data = [
        { time: 1, Up: props.data.responseData[0].uptime, Down: 100-props.data.responseData[0].uptime},
        { time: 2, Up: props.data.responseData[1].uptime, Down: 100-props.data.responseData[1].uptime },
        { time: 3, Up: props.data.responseData[2].uptime, Down: 100-props.data.responseData[2].uptime },
        { time: 4, Up: props.data.responseData[3].uptime, Down: 100-props.data.responseData[3].uptime },
        { time: 5, Up: props.data.responseData[4].uptime, Down: 100-props.data.responseData[4].uptime },
        { time: 6, Up: props.data.responseData[5].uptime, Down: 100-props.data.responseData[5].uptime },
        { time: 7, Up: props.data.responseData[6].uptime, Down: 100-props.data.responseData[6].uptime },
        { time: 8, Up: props.data.responseData[7].uptime, Down: 100-props.data.responseData[7].uptime },
        { time: 9, Up: props.data.responseData[8].uptime, Down: 100-props.data.responseData[8].uptime },
        { time: 10, Up: props.data.responseData[9].uptime, Down: 100-props.data.responseData[9].uptime },
        { time: 11, Up: props.data.responseData[10].uptime, Down: 100-props.data.responseData[10].uptime },
        { time: 12, Up: props.data.responseData[11].uptime, Down: 100-props.data.responseData[11].uptime},
        { time: 13, Up: props.data.responseData[12].uptime, Down: 100-props.data.responseData[12].uptime },
        { time: 14, Up: props.data.responseData[13].uptime, Down: 100-props.data.responseData[13].uptime },
        { time: 15, Up: props.data.responseData[14].uptime, Down: 100-props.data.responseData[14].uptime },
        { time: 16, Up: props.data.responseData[15].uptime, Down: 100-props.data.responseData[15].uptime },
        { time: 17, Up: props.data.responseData[16].uptime, Down: 100-props.data.responseData[16].uptime },
        { time: 18, Up: props.data.responseData[17].uptime, Down: 100-props.data.responseData[17].uptime },
        { time: 19, Up: props.data.responseData[18].uptime, Down: 100-props.data.responseData[18].uptime },
        { time: 20, Up: props.data.responseData[19].uptime, Down: 100-props.data.responseData[19].uptime },
        { time: 21, Up: props.data.responseData[20].uptime, Down: 100-props.data.responseData[20].uptime },
        { time: 22, Up: props.data.responseData[21].uptime, Down: 100-props.data.responseData[21].uptime },
        { time: 23, Up: props.data.responseData[22].uptime, Down: 100-props.data.responseData[22].uptime },
        { time: 24, Up: props.data.responseData[23].uptime, Down: 100-props.data.responseData[23].uptime },
        { time: 25, Up: props.data.responseData[24].uptime, Down: 100-props.data.responseData[24].uptime },
        { time: 26, Up: props.data.responseData[25].uptime, Down: 100-props.data.responseData[25].uptime },
        { time: 27, Up: props.data.responseData[26].uptime, Down: 100-props.data.responseData[26].uptime },
        { time: 28, Up: props.data.responseData[27].uptime, Down: 100-props.data.responseData[27].uptime },
        { time: 29, Up: props.data.responseData[28].uptime, Down: 100-props.data.responseData[28].uptime },
        { time: 30, Up: props.data.responseData[29].uptime, Down: 100-props.data.responseData[29].uptime },
      ];
    }
  }

  const keys = ["Up", "Down"];
const colors = ["#3AF219", "#E62805"];
  return (
    <Div>
      <ResponsiveBar
        yScale={{
          type: "linear",
          stacked: true,
          min: 0,
          max: 100,
        }}
        data={data}
        keys={keys}
        indexBy="time"
        colors={colors}
        enableLabel={false}
        axisBottom={false}
        enableGridY={true}
        padding={0.7}
        axisRight={null}
        axisTop={null}
        axisBottom={null}
        theme={theme}
        axisLeft={{
          tickSize: 2,
          tickValues: ["0", "50", "100"],
          tickPadding: 0
        }}
        margin={{ top: 4, bottom: 4, left: 20 }}
        gridYValues={["0"]}
        tooltip={({ id, value, color }) => (
          <div
            style={{
              color,
              background: "white",
              fontSize: "15px",
            }}
          >
            <strong>
              {id}: {value}
            </strong>
          </div>
        )}
      />
    </Div>
  );
}
export default EfficiencyBar;
