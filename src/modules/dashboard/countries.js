import React from "react";
import styled from "styled-components";
import CountryMap from "./countryMap";
import CountryTable from "./countryTable";

const DesktopDiv = styled.div`
  background-color: #102e84;
  display: block;
  width: 1920px;
  color: white;
  height: 2000px;
  position: absolute;
  z-index: 1;
  justify-content: space-around;
  transition: linear;
  font-size: 20px;
  padding-left: 10px;
  @media (max-width: 1025px) {
    display: none;
  }
`;

const Label1 = styled.span`
  color: #667fc1;
  width: 50%;
  margin-top: 60px;
  padding-left: 45px;
`;
const Label2 = styled.span`
  width: 50%;
  padding-left: 45px;
  font-size: 30px;
  margin-bottom: 10px;
`;

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

export default function countries(props) {
  return (
    <Div>
      <Divvv>
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
      <CountryTable />
      </TableDiv>
      <MapDiv>
      <CountryMap marker={props.location}/>
      </MapDiv>
      </MainContainer>
      </Divvv>
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
      <CountryTable />
      </TableDiv>
      </TabDiv>
    </Div>
  );
}

const Div = styled.div`
  background-color: #102e84;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
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
  padding-left: 0px;
  }
`;

const Label = styled.div`
  font-size: 26px;
  color: white;
  
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
  padding-left: 0px;
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

const Divvv = styled.div`
@media (min-width: 300px) and (max-width: 1024px) {
  display: none;
}
`;
