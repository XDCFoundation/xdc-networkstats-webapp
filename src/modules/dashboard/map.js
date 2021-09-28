import React from "react";
import { ComposableMap, Geographies, Geography} from "react-simple-maps";
import styled from "styled-components";


const Div = styled.div`
fill: #103AAA;
/* transform: scale(1.8); */
width: 300px;
height: 169px;
margin-top: -20px;
`;


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = () => (
  <Div>
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
    </ComposableMap>
  </Div>
);
export default Map;