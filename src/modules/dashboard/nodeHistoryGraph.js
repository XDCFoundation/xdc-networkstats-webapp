import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

const data = {
    labels: ["0", "1", "2", "3", "4", "5"],
    datasets: [
      {
        data: [100,95,97,95,96,98],
        fill: true,
        backgroundColor: "#275FF5",
        borderColor: "#7299FF"
      }
    ]
  };
  
  const lineOptions = {
    scales: {
      x: {
          display: false,
      },
      gridLines: {
          display: false,
        },

        y: {
            display: false,
        },
        // gridLines: {
        //     display: true,
        //   },
          
    },
    tooltips: {
      enabled: false,
    },
    label: {
        display: true,
    },

    plugins: {
        legend: {
            display: false,
        }
    }

  };
const Div = styled.div`   
width: 150px;
height: 500px;
@media (max-width: 425px){
padding-left: 10px;

}
`;


export default function NodeHistory() {
  return (
      <Div> 
      <Line data={data} 
      options={lineOptions} 
      height={110}
      width={150}
      
      />
      </Div>
  );
}
