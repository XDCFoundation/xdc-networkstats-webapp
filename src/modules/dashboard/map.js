import _ from "lodash";
import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import styled from "styled-components";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";

const Div = styled.div`
  fill: #103aaa;
  width: 100%;
  margin-top: -15px;

  @media (min-width: 300px) and (max-width: 767px) {
    fill: #103aaa;
    width: 70vw;
    max-width: 300px;
  }
  @media (min-width: 300px) and (max-width: 1024px) {
    fill: #103aaa;
    width: 100%auto;
    max-width: 280px;
    margin-left: 80px
  }
`;

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function Map(props) {
  const [node, setNode] = useState([]);
  useEffect(() => {
    if (
      !_.isUndefined(props.stats.markers) &&
      !_.isEmpty(props.stats.markers)
    ) {
      setNode(props.stats.markers);
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

const mapStateToProps = (state) => {
  return { stats: state.stats };
};

export default connect(mapStateToProps, { dispatchAction })(Map);
