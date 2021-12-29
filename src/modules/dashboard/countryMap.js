import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import styled from "styled-components";
import {dispatchAction} from "../../utility";
import {connect} from "react-redux";

const Div = styled.div`
  fill: #103aaa;
  width: 100%;
`;

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function CountryMap(props) {
  const [node, setNode] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props?.stats.markers && props?.stats.markers?.length >= 1) {
      (props?.stats.markers).map((item, index) => {
        setData(item);
      });
      async function fetchData() {
        setNode(props.stats.markers);
      }
      fetchData();
    }
  }, [props?.stats.markers]);

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


const mapStateToProps = (state) => {
  return {stats: state.stats}
};

export default connect(mapStateToProps, {dispatchAction})(CountryMap);
