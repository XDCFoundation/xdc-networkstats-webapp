import React from "react";
import Header from "../header/header";
import { Column, Row } from "simple-flexbox";
import styled from "styled-components";
import Map from "./map";
import "../../assets/styles/custom.css";

const HeaderContainer = styled.nav`
  background-color: #1c3c93;
  display: flex;
  width: 100%;
  height: 38px;
  justify-content: space-between;
`;
const SectionLabel = styled.div`
  color: #c8d1f1;
  margin-left: 12px;
  display: flex;
  justify-content: space-between;
  width: 33.33%;
  border-right: 1px solid #274598;
  padding-top: 8px;
`;
const SecurityContent = styled.div`
  background-color: #102c78;
  width: 33.33%;
  height: 300px;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #274598;
  @media (max-width: 768px) {
    border-right: none;
  }
`;
const SpeedContent = styled.div`
  background-color: #102c78;
  width: 33.33%;
  height: 300px;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #274598;
  @media (max-width: 768px) {
    border-right: none;
  }
`;
const EfficiencyContent = styled.div`
  background-color: #102c78;
  width: 33.33%;
  height: 300px;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #274598;
  @media (max-width: 768px) {
    border-right: none;
  }
`;
const SecurityLabel = styled.span`
  color: #667fc1;
  display: flex;
  justify-content: space-between;
  width: 50%;
  padding-top: 12px;
  padding-left: 7px;
  font: normal normal 600 16px/20px Inter; ;
`;
const SecurityLabelMid = styled.span`
  color: #667fc1;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  padding-left: 9px;
  font: normal normal 600 16px/20px Inter;
  white-space: nowrap;
`;
const SecurityLabelRight = styled.span`
  color: #667fc1;
  display: flex;
  padding-top: 12px;
  margin-left: 40px;
  font: normal normal 600 16px/20px Inter;
`;

const SecurityIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-top: 28px;
  margin-right: 12px;
  margin-left: 5px;
`;
const SpeedLabel = styled.span`
  color: #667fc1;
  display: flex;
  justify-content: space-between;
  width: 50%;
  padding-top: 14px;
  padding-left: 13px;
  font: normal normal 600 16px/20px Inter;
  white-space: nowrap;
`;
const SpeedLabelMid = styled.span`
  color: #667fc1;
  display: flex;
  justify-content: space-between;
  padding-top: 130px;
  padding-left: 9px;
  font: normal normal 600 16px/20px Inter;
  white-space: nowrap;
`;
const SpeedLabelRight = styled.span`
  color: #667fc1;
  display: flex;
  padding-top: 12px;
  margin-left: 130px;
  font: normal normal 600 16px/20px Inter;
`;
const EfficiencyLabel = styled.span`
  color: #667fc1;
  display: flex;
  justify-content: space-between;
  width: 50%;
  padding-top: 14px;
  padding-left: 13px;
  font: normal normal 600 16px/20px Inter;
  white-space: nowrap;
`;
const EfficiencyLabelMid = styled.span`
  color: #667fc1;
  display: flex;
  justify-content: space-between;
  padding-top: 130px;
  padding-left: 9px;
  font: normal normal 600 16px/20px Inter;
  white-space: nowrap;
`;
const EfficiencyLabelRight = styled.span`
  color: #667fc1;
  display: flex;
  padding-top: 12px;
  margin-left: 90px;
  font: normal normal 600 16px/20px Inter;
`;
export default function dashboard(props) {
  const { state } = props;
  return (
    <div>
      {/* Header nav bar */}
      <Header />
      {/* Section containers(Graph) */}
      <div>
        <Row>
          <HeaderContainer>
            <SectionLabel>Security</SectionLabel>
            <SectionLabel>Speed</SectionLabel>
            <SectionLabel>Efficiency</SectionLabel>
          </HeaderContainer>
        </Row>
        <Row>
          <SecurityContent>
            <Row>
              <Column>
                <Row>
                  <SecurityLabel>
                    Nodes
                    <br />
                    {state.nodes}/{state.totalNodes}
                  </SecurityLabel>
                </Row>
                <Row>
                  <SecurityLabelMid>Node History(7 Days)</SecurityLabelMid>
                </Row>
              </Column>
              <Column>
                <Row>
                  <Column>
                    <SecurityLabelRight>
                      Countries
                      <br />
                      {state.countries}
                    </SecurityLabelRight>
                    <Map></Map>
                  </Column>
                  <Column>
                    <SecurityIcon src="/images/Expand.svg" />
                  </Column>
                </Row>
              </Column>
            </Row>
          </SecurityContent>
          <SpeedContent>
            <Row>
              <Column>
                <Row>
                  <SpeedLabel>
                    Best Block
                    <br/>#
                    {state.bestBlock}
                  </SpeedLabel>
                </Row>
                <Row>
                  <SpeedLabelMid>
                    Avg Block Time
                    <br />
                    {state.avgTime}Sec
                  </SpeedLabelMid>
                </Row>
              </Column>
              <Column>
                <Row>
                  <SpeedLabelRight>
                    Last Block
                    <br />
                    {state.lastBlock}s Ago
                  </SpeedLabelRight>
                </Row>
              </Column>
            </Row>
          </SpeedContent>
          <EfficiencyContent>
            <Row>
              <Column>
                <Row>
                  <EfficiencyLabel>
                    Gas Price (USD)
                    <br />
                    {state.gasPrice}
                  </EfficiencyLabel>
                </Row>
                <Row>
                  <EfficiencyLabelMid>
                    Avg Transaction Rate
                    <br />
                    {state.avgTime}TPS
                  </EfficiencyLabelMid>
                </Row>
              </Column>
              <Column>
                <Row>
                  <EfficiencyLabelRight>
                    Up Time
                    <br />
                    {state.upTime}%
                  </EfficiencyLabelRight>
                </Row>
              </Column>
            </Row>
          </EfficiencyContent>
        </Row>
      </div>
      {/* Table view */}
    </div>
  );
}
