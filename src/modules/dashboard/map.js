import _ from "lodash";
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
    width: 70vw;
    max-width: 300px;
  }
  @media (min-width: 300px) and (max-width: 1024px) {
    fill: #103aaa;
    width: 100vw;
    max-width: 240px;
  }
`;

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export default function Map(props) {
  const [node, setNode] = useState([]);
  useEffect(() => {
    if (!_.isUndefined(props.location) && !_.isEmpty(props.location)) {
      setNode(props.location);
    }
  });
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
