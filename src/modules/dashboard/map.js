import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import styled from "styled-components";

const Div = styled.div`

  fill: #103aaa;

  width: 100%;

  max-width: 240px;

  margin-left: 0px;



  @media (min-width: 300px) and (max-width: 767px) {

    fill: #103aaa;

    width: 100%;

    max-width: unset;

  }

`;

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export default function CountryMap(props) {
  const [node, setNode] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props?.marker && props?.marker?.length >= 1) {
      (props?.marker).map((item, index) => {
        setData(item);
      });
      async function fetchData() {
        setNode(props.marker);
      }
      fetchData();
    }
  }, [props?.marker]);

  return (
    <Div>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {node.map((items, index) => (
          <Marker key={index} coordinates={items.coords}>
            <circle r={12} fill="#3AF219" />
          </Marker>
        ))}
      </ComposableMap>
    </Div>
  );
}
