import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import styled from "styled-components";
import utility from "../../utility";
import { LocationService } from "../../services";

const Div = styled.div`
  fill: #103aaa;
  width: 100%;
  max-width: 240px;
  margin-left: 0px;
`;

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export default function Map(props) {
  const [node, setNode] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props?.location && props?.location?.length >= 1) {
      (props?.location).map((item, index) => {
        setData(item);
      });
      async function fetchData() {
        const [error, res] = await utility.parseResponse(
          LocationService.getLocation(data)
        );
        if (error) return;
        var nodes = node;
        nodes.push({ coords: [res.lon, res.lat] });
        setNode(nodes);
      }
      fetchData();
    }
  }, [props?.location]);

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
