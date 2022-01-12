import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";
import {dispatchAction} from "../../utility";
import {connect} from "react-redux";

const Div = styled.div`
  width: 100%;
  max-width: 560px;
  height: 120px;

  font-family: sans-serif;
  text-align: center;
  cursor: pointer;
`;

function SpeedBar(props) {
  const data = [
    { time: 1, value: props.stats.blockTime[0] },
    { time: 2, value: props.stats.blockTime[1] },
    { time: 3, value: props.stats.blockTime[2] },
    { time: 4, value: props.stats.blockTime[3] },
    { time: 5, value: props.stats.blockTime[4] },
    { time: 6, value: props.stats.blockTime[5] },
    { time: 7, value: props.stats.blockTime[6] },
    { time: 8, value: props.stats.blockTime[7] },
    { time: 9, value: props.stats.blockTime[8] },
    { time: 10, value: props.stats.blockTime[9] },
    { time: 11, value: props.stats.blockTime[10] },
    { time: 12, value: props.stats.blockTime[11] },
    { time: 13, value: props.stats.blockTime[12] },
    { time: 14, value: props.stats.blockTime[13] },
    { time: 15, value: props.stats.blockTime[14] },
    { time: 16, value: props.stats.blockTime[15] },
    { time: 17, value: props.stats.blockTime[16] },
    { time: 18, value: props.stats.blockTime[17] },
    { time: 19, value: props.stats.blockTime[18] },
    { time: 20, value: props.stats.blockTime[19] },
    { time: 21, value: props.stats.blockTime[20] },
    { time: 22, value: props.stats.blockTime[21] },
    { time: 23, value: props.stats.blockTime[22] },
    { time: 24, value: props.stats.blockTime[23] },
    { time: 25, value: props.stats.blockTime[24] },
    { time: 26, value: props.stats.blockTime[25] },
    { time: 27, value: props.stats.blockTime[26] },
    { time: 28, value: props.stats.blockTime[27] },
    { time: 29, value: props.stats.blockTime[28] },
    { time: 30, value: props.stats.blockTime[29] },
    { time: 31, value: props.stats.blockTime[30] },
    { time: 32, value: props.stats.blockTime[31] },
    { time: 33, value: props.stats.blockTime[32] },
    { time: 34, value: props.stats.blockTime[33] },
    { time: 35, value: props.stats.blockTime[34] },
    { time: 36, value: props.stats.blockTime[35] },
    { time: 37, value: props.stats.blockTime[36] },
    { time: 38, value: props.stats.blockTime[37] },
    { time: 39, value: props.stats.blockTime[38] },
    { time: 40, value: props.stats.blockTime[39] },
  ];

  const theme = {
    grid: {
      line: {
        stroke: "#667FC1",
        strokeWidth: 1.5,
        strokeDasharray: "1",
      },
    },
  };

  return (
    <Div>
      {
        !data[0].value ? (
            <div className="center-parent-div position-relative top-50px">
              <div className="dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
        ) : (
                <div></div>
            )
      }
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

const mapStateToProps = (state) => {
  return {stats: state.stats}
};

export default connect(mapStateToProps, {dispatchAction})(SpeedBar);