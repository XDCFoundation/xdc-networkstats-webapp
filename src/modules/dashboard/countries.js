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

const Label = styled.span`
  color: #667fc1;
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-top: 14px;
  padding-left: 45px;
  font: normal normal 600 16px/20px Inter;
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
padding-left: 846px;
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
                <Label>Nodes</Label>
              </Row>
              <Row>Top 10 Countries</Row>
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
            <Label>Nodes</Label>
          </Row>
          <Row>Top 10 Countries</Row>
          <Row>
            <CountryTable />
          </Row>
        </Column>
      </TabDiv>
    </>
  );
}
