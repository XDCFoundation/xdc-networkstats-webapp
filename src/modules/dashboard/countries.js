import React from "react";
import styled from "styled-components";
import CountryMap from "./countryMap";
import CountryTable from "./countryTable";


const TabDiv = styled.div`
  width: 100%;
  height: 100%;
  
   @media (min-width: 1025px) {
    display: none;
  }
`;
const Img = styled.div`
width: 2%;
@media (min-width: 300px) and (max-width: 767px) {
padding-right: 30px;
}
@media (min-width: 300px) and (max-width: 1024px) {
padding-right: 30px;
}
`;

export default function Countries(props) {

  return (
    <Div>
      <DesktopDiv>
      <SpaceBetween>
        <LeftDiv>
          Nodes
          <Label>Top 10 Countries</Label>
        </LeftDiv>
        <div>
          <img
            src="/images/Collapse.svg"
            alt="close"
            onClick={() => {
              props.expand(false);
            }}
          />
        </div>
      </SpaceBetween>
      <MainContainer>
      <TableDiv>
      <CountryTable data={props.content.stats.expandedCountry} />
      </TableDiv>
      <MapDiv>
      <CountryMap marker={props.location}/>
      </MapDiv>
      </MainContainer>
      </DesktopDiv>
      <TabDiv>
      <SpaceBetween>
      <MapDiv>
      <CountryMap marker={props.location}/>
      </MapDiv>
      <Img>
      <img
            src="/images/Collapse.svg"
            alt="close"
            onClick={() => {
              props.expand(false);
            }}
          />
          </Img>
      </SpaceBetween>
      <LeftDiv>
          Nodes
          <Label>Top 10 Countries</Label>
        </LeftDiv>
      <TableDiv>
      <CountryTable data={props.content.stats.expandedCountry}/>
      </TableDiv>
      </TabDiv>
    </Div>
  );
}

const Div = styled.div`
  background-color: #102e84;
  width: 100%;
  height: 120%;
  padding: 15px;
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftDiv = styled.div`
  padding-left: 47px;
  padding-top: 57px;
  color: #667fc1;
  font-size: 16px;
  @media (min-width: 300px) and (max-width: 1024px) {
  padding-left: 47px;
  }
  @media (min-width: 300px) and (max-width: 767px) {
  padding-left: 47px;
  }
`;

const Label = styled.div`
  font-size: 26px;
  color: white;
  font-family: "Inter";
  
`;

const MainContainer = styled.div`
height: 100%;
width: 100%;
display: flex;
`;

const TableDiv = styled.div`
height: 100%;
width: 40%;
padding-top: 40px;
padding-left: 40px;
@media (min-width: 300px) and (max-width: 1024px) {
  width: 100%;
  padding: 40px;
}
`;

const MapDiv = styled.div`
height: 100%;
width: 60%;
padding-right: 40px;
@media (min-width: 300px) and (max-width: 1024px) {
  width: 100%;
  padding-right: 0px;
}
@media (min-width: 300px) and (max-width: 767px) {
  width: 100%;
  padding-right: 0px;
  padding-top: 20px;
}
`;

const DesktopDiv = styled.div`
@media (min-width: 300px) and (max-width: 1024px) {
  display: none;
}
`;
