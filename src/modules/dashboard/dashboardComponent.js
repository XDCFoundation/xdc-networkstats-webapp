import React from "react";
import Header from "../header/header";
import { Column, Row } from "simple-flexbox";
import styled from "styled-components";
import Map from "./map";
import "../../assets/styles/custom.css";
import LastBlockBar from "./speedBar";
import UpTimeBar from "./efficiencyBar";

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
  color: white;
  padding-left: 15px;
  font: normal normal 600 26px/31px Inter;
  font-size: 19px;
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
  color: white;
  font: normal normal 600 26px/31px Inter;
  font-size: 19px;
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
  color: white;
  padding-left: 15px;
  font: normal normal 600 26px/31px Inter;
  font-size: 19px;
`;
const SecurityLabel = styled.span`
  color: #667fc1;
  display: flex;
  justify-content: space-between;
  width: 50%;
  padding-top: 12px;
  padding-left: 1 px;
  font: normal normal 600 16px/20px Inter; ;
`;
const SecurityLabelMid = styled.span`
  color: #667fc1;
  display: flex;
  flex-direction: column;
  padding-top: 66px;
  padding-left: 2px;
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
  margin-left: -9px;
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
  padding-top: 80px;
  padding-left: 15px;
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
  font: normal normal 600 16px/20px Inter;
  white-space: nowrap;
`;
const EfficiencyLabelMid = styled.span`
  color: #667fc1;
  display: flex;
  justify-content: space-between;
  padding-top: 90px;
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
const Speedbar = styled.div`
margin-top: 45px;
margin-left: 110px;
`;
const Countries = styled.span`
padding-left: 42px;
`;
const Blocks = styled.span`
padding-left: 15px;
`;
const LastBlock = styled.span`
padding-left: 130px;
`;
const BlockBarLeftLabel = styled.span`
padding-left: 125px;
font-size: x-small;
`;
const BlockBarLabelColor = styled.span`
color: #667fc1;
`;
const BlockBarRightLabel = styled.span`
padding-left: 155px;
font-size: x-small;
`;
const EffiencyBar = styled.div`
margin-top: 45px;     
margin-left: 50px;
`;
const UpTime = styled.span`
padding-left: 90px;
`;
const EfficiencyButton1 = styled.button`
background: #1C3C93 0% 0% no-repeat padding-box;
border-radius: 4px;
opacity: 1;
border: none;
color: #3C70FF;
margin-left: 90px;
white-space: nowrap;
font-size: 12px;
:hover {
  background-color: #3C70FF;
} 
`;
const EfficiencyButton2 = styled.button`
background: #1C3C93 0% 0% no-repeat padding-box;
border-radius: 4px;
opacity: 1;
border: none;
color: #3C70FF;
margin-left: -3px;
white-space: nowrap;
font-size: 12px;
:hover {
  background-color: #3C70FF;
} 
`;
const EfficiencyButton3 = styled.button`
background: #1C3C93 0% 0% no-repeat padding-box;
border-radius: 4px;
opacity: 1;
border: none;
color: #3C70FF;
margin-left: -3px;
white-space: nowrap;
font-size: 12px;
:hover {
  background-color: #3C70FF;
} 
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
                  </SecurityLabel>
                </Row>
                <Row>
                {state.nodes}/{state.totalNodes}
                  </Row>
                <Row>
                  <SecurityLabelMid>Node History (7 Days)</SecurityLabelMid>
                </Row>
              </Column>
              <Column>
                <Row>
                  <Column>
                  <Row>
                    <SecurityLabelRight>
                      Countries
                    </SecurityLabelRight>
                    </Row>
                    <Countries>
                    {state.countries}
                    </Countries>
                    <Row>
                    <Map></Map>
                    </Row> 
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
                  </SpeedLabel>
                  </Row>
                  <Row>
                  <Blocks>#{state.bestBlock}</Blocks>
                  </Row>
                <Row>
                  <SpeedLabelMid>
                    Avg Block Time
                  </SpeedLabelMid>
                </Row>
                <Row>
                <Blocks>
                {state.avgTime}Sec
                </Blocks>
                </Row>
              </Column>
              <Column>
                <Row>
                  <SpeedLabelRight>
                    Last Block
                  </SpeedLabelRight>
                </Row>
                <LastBlock>
                {state.lastBlock}s ago
                </LastBlock>
                <Row>
                  <Speedbar>
                <LastBlockBar></LastBlockBar>
                </Speedbar>   
                </Row>
                <Row>
                <Column>
                <BlockBarLeftLabel>
                <BlockBarLabelColor>
                Min
                </BlockBarLabelColor>
                1s
                </BlockBarLeftLabel>
                </Column>
                <Column>
                <BlockBarRightLabel>
                <BlockBarLabelColor>
                Max
                </BlockBarLabelColor>
                26s
                </BlockBarRightLabel>
                </Column>
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
                  </EfficiencyLabel>
                </Row>
                <Row>
                {state.gasPrice}
                  </Row>
                <Row>
                  <EfficiencyLabelMid>
                    Avg Transaction Rate
                  </EfficiencyLabelMid>
                </Row>
                <Row>
                {state.avgTime}TPS
                </Row>
              </Column>
              <Column>
                <Row>
                  <EfficiencyLabelRight>
                    Up Time
                  </EfficiencyLabelRight>
                </Row>
                <Row>
                <UpTime>
                {state.upTime}%
                </UpTime>
                <div>
                  <Row>
                  <Column><EfficiencyButton1>30D</EfficiencyButton1></Column>
                  <Column><EfficiencyButton2>7D</EfficiencyButton2></Column>
                  <Column><EfficiencyButton3>24H</EfficiencyButton3></Column>
                  </Row>
                </div>
                </Row>
                <Row>
                <EffiencyBar>
                  <UpTimeBar> </UpTimeBar>
                </EffiencyBar>
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
