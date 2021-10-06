import React from "react";
import { ComposableMap, Geographies, Geography, Marker} from "react-simple-maps";
import styled from "styled-components";


const Div = styled.div`
fill: #103AAA;
/* transform: scale(1.8); */
width: 300px;
height: 169px;
margin-top: -20px;
@media (max-width: 768px) {
    height: 180px;
    width: 400px;
    margin-top: -40px;
    margin-left: 70px;
  }
@media (max-width: 425px) {
    height: 150px;
    width: 300px;
    margin-left: 40px;
}
`;

 
 const geoUrl =
   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
 
 const Map = () => (
   <Div>
   <ComposableMap >
       <Geographies geography={geoUrl}>
         {({ geographies }) =>
           geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
         }
       </Geographies>
     <Marker coordinates={[-74.006, 40.7128]}>
       <circle r={12} fill="#3AF219" />
     </Marker>
     </ComposableMap>
   </Div>
 );

export default Map;