import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import styled from "styled-components";

const Div = styled.div`
  fill: #103aaa;
  /* transform: scale(1.8); */
  width: 1000px;
  height: auto;
  margin-top: 70px;
  margin-left: 100px;
  @media (max-width: 1025px) {
    margin-left: -40px;
  }
  @media (max-width: 415px) {
    width: 400px;
    margin-left: -10px;
  }
`;

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = () => (
  <Div>
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      <Marker coordinates={[-74.006, 40.7128]}>
        <circle r={12} fill="#3AF219" />
      </Marker>
    </ComposableMap>
  </Div>
);

export default Map;
