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

  @media (min-width: 300px) and (max-width: 767px) {
    fill: #103aaa;
    width: 310px;
    margin-left: -30px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    fill: #103aaa;
    width: 100%;
    max-width: 290px;
    margin-left: 44px;
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

  const getNodesColor = (active, peers) => {
    if(!active)
      return '#dc3545';

    return (peers <= 1 ? '#dc3545' : (peers > 1 && peers < 4 ? '#ffc107' : '#3AF219'));
  }

  return (
    <Div>
      {
        node.length === 0 ? (
            <div className="center-parent-div position-relative top-50px">
              <div className="dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
        ) : (
            <div></div>
        )
      }
      <ComposableMap
       width={800}
       height={450}
      //  style={{ width: "84%" }} 
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {node.map((items, index) => (
          <Marker key={index} coordinates={items.coords}>
            <circle r={12} fill={getNodesColor(items.active, items.peers)} />
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
