import React from "react";
import { Column, Row } from "simple-flexbox";
import styled from "styled-components";
import CountryMap from "./countryMap";
import CountryTable from "./countryTable";

const DesktopDiv = styled.div`
  background-color: #102e84;
  display: block;
  width: 1900px;
  color: white;
  height: 2000px;
  position: absolute;
  z-index: 1;
  justify-content: space-around;
  transition: linear;
  font-size: 20px;
  padding-left: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Label1 = styled.span`
  color: #667fc1;
  width: 50%;
  margin-top: 105px;
  padding-left: 45px;
`;
const Label2 = styled.span`
  width: 50%;
  padding-left: 45px;
`;

const TabDiv = styled.div`
  background-color: #102e84;
  display: block;
  width: 768px;
  color: white;
  height: 2000px;
  position: absolute;
  z-index: 1;
  justify-content: space-around;
  transition: linear;
  font-size: 20px;
  padding-left: 10px;
  @media (min-width: 768px) {
    display: none;
  }
  @media (max-width: 425px) {
    width: 425px;
  }
`;
const Img = styled.img`
padding-top: 36px;
padding-left: 1110px;
cursor: pointer;
@media (max-width: 768px){
  padding-left: 700px;
}
@media (max-width: 425px){
  padding-left: 370px;
}
`;


export default function countries(props) {
  return (
    <>
      <DesktopDiv>
        <Column>
          <Row>
            <Column>
              <Row>
                <Label1>Nodes</Label1>
              </Row>
              <Label2>Top 10 Countries</Label2>
              <Row>
                <CountryTable />
              </Row>
            </Column>
            <Column>
            <Row>
            <Img src="/images/Collapse.svg" alt="close" onClick={()=>{props.expand(false)}} />
            </Row>
            <Row>
              <CountryMap />
              </Row>
            </Column>
          </Row>
        </Column>
      </DesktopDiv>
      <TabDiv>
        <Column>
        <Row>
        <Img src="/images/Collapse.svg" alt="close" onClick={()=>{props.expand(false)}} />
        </Row>
          <Row>
            <CountryMap />
          </Row>
          <Row>
            <Label1>Nodes</Label1>
          </Row>
          <Label2>Top 10 Countries</Label2>
          <Row>
            <CountryTable />
          </Row>
        </Column>
      </TabDiv>
    </>
  );
}
