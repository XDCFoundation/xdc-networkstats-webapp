import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};


function tableBar(props){
const data = [
  { time: 1, value: props.content[0] },
  { time: 2, value: props.content[1] },
  { time: 3, value: props.content[2] },
  { time: 4, value: props.content[3] },
  { time: 5, value: props.content[4] },
  { time: 6, value: props.content[5] },
  { time: 7, value: props.content[6] },
  { time: 8, value: props.content[7] },
  { time: 9, value: props.content[8] },
  { time: 10, value: props.content[9] },
  { time: 11, value: props.content[10] },
  { time: 12, value: props.content[11] },
  { time: 13, value: props.content[12] },
  { time: 14, value: props.content[13] },
  { time: 15, value: props.content[14] },
  { time: 16, value: props.content[15] },
  { time: 17, value: props.content[16] },
  { time: 18, value: props.content[17] },
  { time: 19, value: props.content[18] },
  { time: 20, value: props.content[19] },

  { time: 21, value: props.content[20] },
  { time: 22, value: props.content[21] },
  { time: 23, value: props.content[22] },
  { time: 24, value: props.content[23] },
  { time: 25, value: props.content[24] },
  { time: 26, value: props.content[25] },
  { time: 27, value: props.content[26] },
  { time: 28, value: props.content[27] },
  { time: 29, value: props.content[28] },
  { time: 30, value: props.content[29] },

  { time: 31, value: props.content[30] },
  { time: 32, value: props.content[31] },
  { time: 33, value: props.content[32] },
  { time: 34, value: props.content[33] },
  { time: 35, value: props.content[34] },
  { time: 36, value: props.content[35] },
  { time: 37, value: props.content[36] },
  { time: 38, value: props.content[37] },
  { time: 39, value: props.content[38] },
  { time: 40, value: props.content[39] },

  
];

  return (
  <div style={styles}>
    <div style={{ height: "50px", width: "100px", cursor: "pointer" }}>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="time"
        colors={["#E62805"]}
        enableLabel={false}
        enableGridY={false}
        padding={0.6}
      />
    </div>
  </div>
);}

export default tableBar;
