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
import ReactTooltip from "react-tooltip";

const Div = styled.div`
  fill: #103aaa;
  width: 100%;
  max-width: 965px;
`;

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function CountryMap(props) {
  const [node, setNode] = useState([]);
  const [data, setData] = useState([]);
  const [tooltip, setTooltip] = useState("");
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

  const getNodesColor = (active, peers) => {
    if(!active)
      return '#dc3545';

    return (peers <= 1 ? '#dc3545' : (peers > 1 && peers < 4 ? '#ffc107' : '#3AF219'));
  }
  return (
    <Div>
      <ComposableMap data-tip="">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {node.map((items, index) => (
          <Marker key={index} coordinates={items.coords} onMouseEnter={()=>{
          setTooltip(items.id);
          }} onMouseLeave={() => {
            setTooltip("");
          }}>
            <circle r={6} fill={getNodesColor(items.active, items.peers)} />
          </Marker>
        ))}
      </ComposableMap>
      <ReactTooltip backgroundColor="white" textColor="black">{tooltip}</ReactTooltip>
    </Div>
  );
}


const mapStateToProps = (state) => {
  return {stats: state.stats}
};

export default connect(mapStateToProps, {dispatchAction})(CountryMap);
