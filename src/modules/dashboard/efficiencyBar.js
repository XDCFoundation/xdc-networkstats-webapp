import React from "react";
import { Bar } from "@nivo/bar";
import styled from "styled-components";
import _ from "lodash";

const Div = styled.div`
  cursor: pointer;
  width: 100%;
`;

let data = [];
function EfficiencyBar(props) {
  if (!_.isEmpty(props.data) && !_.isUndefined(props.data)) {
    if (props.data.responseData.length == 7) {
      data = [
        { time: 1, value: props.data.responseData[0].uptime },
        { time: 2, value: props.data.responseData[1].uptime },
        { time: 3, value: props.data.responseData[2].uptime },
        { time: 4, value: props.data.responseData[3].uptime },
        { time: 5, value: props.data.responseData[4].uptime },
        { time: 6, value: props.data.responseData[5].uptime },
        { time: 7, value: props.data.responseData[6].uptime },
      ];
    }

    if (props.data.responseData.length == 24) {
      data = [
        { time: 1, value: props.data.responseData[0].upTime },
        { time: 2, value: props.data.responseData[1].upTime },
        { time: 3, value: props.data.responseData[2].upTime },
        { time: 4, value: props.data.responseData[3].upTime },
        { time: 5, value: props.data.responseData[4].upTime },
        { time: 6, value: props.data.responseData[5].upTime },
        { time: 7, value: props.data.responseData[6].upTime },
        { time: 8, value: props.data.responseData[7].upTime },
        { time: 9, value: props.data.responseData[8].upTime },
        { time: 10, value: props.data.responseData[9].upTime },
        { time: 11, value: props.data.responseData[10].upTime },
        { time: 12, value: props.data.responseData[11].upTime },
        { time: 13, value: props.data.responseData[12].upTime },
        { time: 14, value: props.data.responseData[13].upTime },
        { time: 15, value: props.data.responseData[14].upTime },
        { time: 16, value: props.data.responseData[15].upTime },
        { time: 17, value: props.data.responseData[16].upTime },
        { time: 18, value: props.data.responseData[17].upTime },
        { time: 19, value: props.data.responseData[18].upTime },
        { time: 20, value: props.data.responseData[19].upTime },
        { time: 21, value: props.data.responseData[20].upTime },
        { time: 22, value: props.data.responseData[21].upTime },
        { time: 23, value: props.data.responseData[22].upTime },
        { time: 24, value: props.data.responseData[23].upTime },
      ];
    }

    if (props.data.responseData.length == 30) {
      data = [
        { time: 1, value: props.data.responseData[0].uptime },
        { time: 2, value: props.data.responseData[1].uptime },
        { time: 3, value: props.data.responseData[2].uptime },
        { time: 4, value: props.data.responseData[3].uptime },
        { time: 5, value: props.data.responseData[4].uptime },
        { time: 6, value: props.data.responseData[5].uptime },
        { time: 7, value: props.data.responseData[6].uptime },
        { time: 8, value: props.data.responseData[7].uptime },
        { time: 9, value: props.data.responseData[8].uptime },
        { time: 10, value: props.data.responseData[9].uptime },
        { time: 11, value: props.data.responseData[10].uptime },
        { time: 12, value: props.data.responseData[11].uptime },
        { time: 13, value: props.data.responseData[12].uptime },
        { time: 14, value: props.data.responseData[13].uptime },
        { time: 15, value: props.data.responseData[14].uptime },
        { time: 16, value: props.data.responseData[15].uptime },
        { time: 17, value: props.data.responseData[16].uptime },
        { time: 18, value: props.data.responseData[17].uptime },
        { time: 19, value: props.data.responseData[18].uptime },
        { time: 20, value: props.data.responseData[19].uptime },
        { time: 21, value: props.data.responseData[20].uptime },
        { time: 22, value: props.data.responseData[21].uptime },
        { time: 23, value: props.data.responseData[22].uptime },
        { time: 24, value: props.data.responseData[23].uptime },
        { time: 25, value: props.data.responseData[24].uptime },
        { time: 26, value: props.data.responseData[25].uptime },
        { time: 27, value: props.data.responseData[26].uptime },
        { time: 28, value: props.data.responseData[27].uptime },
        { time: 29, value: props.data.responseData[28].uptime },
        { time: 30, value: props.data.responseData[29].uptime },
      ];
    }
  }
  return (
    <Div>
      <Bar
        width={300}
        maxWidth={500}
        height={120}
        data={data}
        keys={["value"]}
        indexBy="time"
        colors={["#3AF219"]}
        enableLabel={false}
        axisBottom={false}
        enableGridY={false}
        padding={0.7}
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
