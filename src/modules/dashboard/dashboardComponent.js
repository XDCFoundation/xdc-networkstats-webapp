import React, { useState } from "react";
import { Column, Row } from "simple-flexbox";
import styled from "styled-components";
import Map from "./map";
import LastBlockBar from "./speedBar";
import UpTimeBar from "./efficiencyBar";
import Table from "./table";
import NodeGraph from "./nodeHistoryGraph";
import Country from "./countries";
import Joyride from "react-joyride";
import Header from "../header/header";


const HeaderContainer = styled.div`
  background-color: #1c3c93; 
  display: flex;
  width: 100%;
  height: 38px;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SectionLabel = styled.div`
  color: #c8d1f1;
  padding-left: 12px;
  display: flex;
  justify-content: space-between;
  width: 33.33%;
  border-right: 1px solid #274598;
  padding-top: 8px;

  @media (max-width: 768px) {
    justify-content: center;
    :hover {
      background-color: #3c70ff;
      color: white;
      cursor: pointer;
    }
  }
`;

const SecurityMain = styled.div`
  background-color: #102c78;
  width: 33.33%;
  height: 300px;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #274598;
  @media (max-width: 768px) {
    width: 100%;
    padding-top: 5px;
    font-size: 20px;
  }
  @media (max-width: 425px) {
    padding-left: 10px;
    width: 100%;
    display: none;
  }
  color: white;
  padding-left: 15px;
  font: normal normal 600 26px/31px Inter;
  font-size: 19px;
`;
const SpeedTab = styled.div`
  background-color: #102c78;
  height: 300px;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #274598;
  @media (max-width: 768px) {
    border-right: none;
    width: 100%;
    font-size: 20px;
  }
  color: white;
  font: normal normal 600 26px/31px Inter;
  font-size: 19px;
  @media (max-width: 425px) {
    padding-left: 10px;
    width: 100%;
    display: none;
  }
`;
const EfficiencyTab = styled.div`
  background-color: #102c78;
  height: 300px;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #274598;
  @media (max-width: 768px) {
    border-right: none;
    width: 100%;
  }
  @media (max-width: 425px) {
    padding-left: 10px;
    width: 100%;
    display: none;
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
  font: normal normal 600 16px/20px Inter;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 425px) {
    padding-left: 5px;
  }
`;
const SecurityLabelMid = styled.span`
  color: #667fc1;
  display: flex;
  flex-direction: column;
  padding-top: 66px;
  padding-left: 2px;
  font: normal normal 600 16px/20px Inter;
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 425px) {
    padding-top: 44px;
    padding-left: 5px;
  }
`;
const SecurityLabelRight = styled.span`
  color: #667fc1;
  display: flex;
  padding-top: 12px;
  margin-left: 130px;
  font: normal normal 600 16px/20px Inter;
  @media (max-width: 768px) {
    padding-left: 120px;
    font-size: 20px;
  }
  @media (max-width: 425px) {
    padding-top: 23px;
    padding-left: 0px;
  }
`;

const SecurityIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-top: 28px;
  margin-right: 12px;
  margin-left: 30px;
  @media (max-width: 768px) {
    margin-left: 261px;
    margin-top: 19px;
    height: 23px;
    width: 232;
  }
  @media (max-width: 425px) {
    margin-left: 230px;
  }
  cursor: pointer;
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
  @media (max-width: 768px) {
    padding-top: 40px;
    font-size: 18px;
  }
  @media (max-width: 425px) {
    padding-top: 20px;
  }
`;
const SpeedLabelMid = styled.span`
  color: #667fc1;
  display: flex;
  justify-content: space-between;
  padding-top: 80px;
  padding-left: 15px;
  font: normal normal 600 16px/20px Inter;
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 425px) {
    padding-top: 20px;
  }
`;
const SpeedLabelRight = styled.span`
  color: #667fc1;
  display: flex;
  padding-top: 12px;
  margin-left: 130px;
  font: normal normal 600 16px/20px Inter;
  @media (max-width: 768px) {
    padding-top: 40px;
    font-size: 18px;
  }
  @media (max-width: 425px) {
    margin-left: 93px;
    padding-top: 20px;
  }
`;
const EfficiencyLabel = styled.span`
  color: #667fc1;
  display: flex;
  justify-content: space-between;
  width: 50%;
  padding-top: 14px;
  font: normal normal 600 16px/20px Inter;
  white-space: nowrap;
  @media (max-width: 768px) {
    padding-top: 35px;
    font-size: 20px;
  }
`;
const EfficiencyLabelMid = styled.span`
  color: #667fc1;
  display: flex;
  justify-content: space-between;
  padding-top: 90px;
  font: normal normal 600 16px/20px Inter;
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 425px) {
    padding-top: 20px;
  }
`;
const EfficiencyLabelRight = styled.span`
  color: #667fc1;
  display: flex;
  padding-top: 12px;
  margin-left: 90px;
  font: normal normal 600 16px/20px Inter;
  @media (max-width: 768px) {
    padding-top: 35px;
    margin-left: 130px;
    font-size: 20px;
  }
  @media (max-width: 425px) {
    padding-left: 20px;
    white-space: nowrap;
  }
`;
const Speedbar = styled.div`
  margin-top: 45px;
  margin-left: 110px;
  @media (max-width: 768px) {
    margin-left: 170px;
    margin-top: 20px;
  }
  @media (max-width: 425px) {
    margin-left: 20px;
  }
`;
const Countries = styled.span`
  padding-left: 130px;
  @media (max-width: 768px) {
    padding-left: 162px;
  }
  @media (max-width: 425px) {
    padding-left: 45px;
  }
`;
const Blocks = styled.span`
  padding-left: 15px;
`;
const LastBlock = styled.span`
  padding-left: 130px;
  @media (max-width: 425px) {
    padding-left: 227px;
  }
`;
const BlockBarLeftLabel = styled.span`
  padding-left: 125px;
  font-size: x-small;
  @media (max-width: 768px) {
    padding-left: 185px;
  }
  @media (max-width: 425px) {
    padding-left: 37px;
  }
`;
const BlockBarLabelColor = styled.span`
  color: #667fc1;
`;
const BlockBarRightLabel = styled.span`
  padding-left: 270px;
  font-size: x-small;
  @media (max-width: 768px) {
    padding-left: 330px;
  }
  @media (max-width: 425px) {
    padding-left: 306px;
  }
`;
const EffiencyBar = styled.div`
  margin-top: 45px;
  margin-left: -5px;
  @media (max-width: 768px) {
    margin-top: 25px;
    margin-left: 120px;
  }
  @media (max-width: 425px) {
    margin-left: 5px;
    margin-top: 15px;
  }
`;
const UpTime = styled.span`
  padding-left: 90px;
  @media (max-width: 768px) {
    padding-left: 130px;
  }
  @media (max-width: 425px) {
    padding-left: 279px;
  }
`;
const EfficiencyButton1 = styled.button`
  background: #1c3c93 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  border: none;
  color: #3c70ff;
  margin-left: 210px;
  white-space: nowrap;
  font-size: 12px;
  
  :hover {
    background-color: #3c70ff;
    color: white;
  }
  @media (max-width: 768px) {
    margin-left: 240px;
    margin-top: -17px;
  }
  @media (max-width: 425px) {
    margin-left: 300px;
  }
`;
const EfficiencyButton2 = styled.button`
  background: #1c3c93 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  border: none;
  color: #3c70ff;
  margin-left: 0px;
  white-space: nowrap;
  font-size: 12px;
  :hover {
    background-color: #3c70ff;
    color: white;
  }
  @media (max-width: 768px) {
    margin-top: -17px;
  }
`;
const EfficiencyButton3 = styled.button`
  background: #1c3c93 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  border: none;
  color: #3c70ff;
  margin-left: 0px;
  white-space: nowrap;
  font-size: 12px;
  :hover {
    background-color: #3c70ff;
    color: white;
  }
  @media (max-width: 768px) {
    margin-top: -17px;
  }
`;
const TableDiv = styled.table`
  background-color: "#F8F8F8";
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 80px;
`;

const Footer = styled.div`
  background-color: white;
  color: #808080;
  text-align: center;
  padding-bottom: 20px;
`;

const MapContainer = styled.div`
  padding-left: 90px;
  @media (max-width: 768px) {
    width: 70px;
    height: 40px;
    padding-left: 30px;
  }
`;

const SpeedMain = styled.div`
  background-color: #102c78;
  width: 33.33%;
  height: 300px;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #274598;
  @media (max-width: 768px) {
    border-right: none;
    display: none;
  }
  color: white;
  font: normal normal 600 26px/31px Inter;
  font-size: 19px;
`;

const EfficiencyMain = styled.div`
  background-color: #102c78;
  width: 33.33%;
  height: 300px;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #274598;
  @media (max-width: 768px) {
    border-right: none;
    display: none;
  }
  color: white;
  padding-left: 15px;
  font: normal normal 600 26px/31px Inter;
  font-size: 19px;
`;

const HeaderCustom = styled.div`
  background-color: #1c3c93;
  display: flex;
  width: 100%;
  height: 38px;
  justify-content: space-between;
  @media (min-width: 768px) {
    display: none;
  }
`;

const SecurityMobDiv = styled.div`
  background-color: #102c78;
  height: 300px;
  width: 100%;
  display: flex;
  border-right: 1px solid #274598;
  color: white;
  padding-left: 10px;
  @media (min-width: 425px) {
    width: 100%;
    display: none;
  }
  font: normal normal 600 20px/35px Inter;
`;

const SpeedMob = styled.div`
  background-color: #102c78;
  height: 300px;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #274598;
  @media (max-width: 768px) {
    border-right: none;
    width: 100%;
    font-size: 20px;
  }
  color: white;
  font: normal normal 600 26px/31px Inter;
  font-size: 19px;
  @media (min-width: 425px) {
    width: 100%;
    display: none;
  }
`;

const EfficiencyMob = styled.div`
  background-color: #102c78;
  height: 300px;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #274598;
  @media (max-width: 768px) {
    border-right: none;
    width: 100%;
  }
  color: white;
  padding-left: 15px;
  font: normal normal 600 26px/31px Inter;
  font-size: 19px;
  @media (min-width: 425px) {
    width: 100%;
    display: none;
  }
`;

const HeaderMob = styled.span`
  background-color: #102c78;
  display: flex;
  width: 100%;
  height: 38px;
  color: #667fc1;

  :hover {
    color: white;
    text-decoration: underline;
  }
`;

const EfficiencyBarLabel = styled.span`
  color: #667fc1;
  font-size: 10px;
  padding-left: 113px;
  padding-top: 53px;
  `;

const EfficiencyBarLabelMid = styled.span`
color: #667fc1;
font-size: 10px;
padding-left: 113px;
padding-top: 10px;
`;

const EfficiencyBarLabelEnd = styled.span`
color: #667fc1;
font-size: 10px;
padding-left: 113px;
padding-top: 10px;
`;

const TOUR_STEPS = [
  {
    target: ".security",
    content:
      "Quis cupidatat voluptate commodo ullamco. Proident elit ullamco ad tempor voluptate non consectetur duis eiusmod nulla.",
    disableBeacon: true,
  },
  {
    target: ".speed",
    content:
      "Sit ut tempor reprehenderit ullamco pariatur adipisicing laboris consectetur labore aute pariatur labore consequat. m.",
  },
  {
    target: ".efficiency",
    content:
      "Esse in velit ad pariatur mollit aute nostrud laborum. Nostrud laboris amet elit Lorem labore sit duis nisi magna adipis.",
  },
  {
    target: ".tour-policy",
    content: "We accept returns after 14 days max",
  },
];

const Dashboard = (props) => {
  const { state } = props;
  const [SwitchTab, setTab] = React.useState(1);
  const changeTab = (value) => {
    setTab(value);
  };
  const [SwitchMob, setMob] = React.useState(4);
  const changeMob = (value) => {
    setMob(value);
  };
  const [SwitchSide, setSide] = React.useState(false);
  const changeSide = (value) => {
    setSide(value);
  };

  const [Expand, setCountry] = React.useState(false);
  const changeExpand = (value) => {
    setCountry(value);
  };

  const [joyrideRun, setJoyrideRun] = useState(false);

  return (
    <>
      {/* Header nav bar */}
      <Joyride
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "blue",
          },
          buttonBack: {
            marginRight: 10,
          },
        }}
        run={joyrideRun}
      />
      <>
        <Header
          setJoyrideRun={setJoyrideRun}
          changeSide={changeSide}
          SwitchSide={SwitchSide} 
        />
        {Expand === 2 ? <Country expand={setCountry} /> : ""}
      </>
      {/* Section containers(Graph) */}
      <div>
        <Row>
          {/*Header for Tab and Mobile response*/}
          <HeaderCustom>
            <SectionLabel onClick={() => changeTab(1)}>Security</SectionLabel>
            <SectionLabel onClick={() => changeTab(2)}>Speed</SectionLabel>
            <SectionLabel onClick={() => changeTab(3)}>Efficiency</SectionLabel>
          </HeaderCustom>
          {/*Header for PC view*/}
          <HeaderContainer>
            <SectionLabel>Security</SectionLabel>
            <SectionLabel>Speed</SectionLabel>
            <SectionLabel>Efficiency</SectionLabel>
          </HeaderContainer>
        </Row>
        <Row>
          {/*Switching of Tabs*/}
          {SwitchTab === 1 ? (
            <>
              <SecurityMain className="security">
                {" "}
                {/*Security Section for Main,Tab*/}
                <Row>
                  <Column>
                    <Row>
                      <SecurityLabel>Nodes</SecurityLabel>
                    </Row>
                    <Row>
                      {state.nodes}/{state.totalNodes}
                    </Row>
                    <Row>
                      <SecurityLabelMid>Node History (7 Days)</SecurityLabelMid>
                    </Row>
                    <Row>
                      <NodeGraph />
                    </Row>
                  </Column>
                  <Column>
                    <Row>
                      <Column>
                        <Row>
                          <SecurityLabelRight>Countries</SecurityLabelRight>
                        </Row>
                        <Countries>{state.countries}</Countries>
                        <Row>
                          <MapContainer>
                            <Map />
                          </MapContainer>
                        </Row>
                      </Column>
                      <Column>
                        <SecurityIcon
                          src="/images/Expand.svg"
                          onClick={() => changeExpand(2)}
                        />
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </SecurityMain>
              <SecurityMobDiv className="security">
                <>
                  <Column>
                    <Row>
                      <HeaderMob onClick={() => changeMob(4)}>Nodes</HeaderMob>
                      <HeaderMob onClick={() => changeMob(5)}>
                        Countries
                      </HeaderMob>
                      <SecurityIcon
                        src="/images/Expand.svg"
                        onClick={() => changeExpand(2)}
                      />
                    </Row>
                    {SwitchMob === 4 ? (
                      <>
                        <Row>
                          <SecurityLabel>Nodes</SecurityLabel>
                        </Row>
                        <Row>
                          {state.nodes}/{state.totalNodes}
                        </Row>
                        <Row>
                          <SecurityLabelMid>
                            Node History (7 Days)
                          </SecurityLabelMid>
                        </Row>
                        <Row>
                          <NodeGraph />
                        </Row>
                      </>
                    ) : (
                      ""
                    )}
                    {SwitchMob === 5 ? (
                      <>
                        <Row>
                          <SecurityLabelRight>Countries</SecurityLabelRight>
                        </Row>
                        <Row>
                          <Countries>{state.countries}</Countries>
                        </Row>
                        <Row>
                          <MapContainer>
                            <Map/>
                          </MapContainer>
                        </Row>
                      </>
                    ) : (
                      ""
                    )}

                    {/* <Column>
                    <SecurityIcon src="/images/Expand.svg" />
                  </Column> */}
                  </Column>
                </>
              </SecurityMobDiv>
            </>
          ) : (
            ""
          )}
          {SwitchTab === 2 ? (
            <>
              <SpeedTab className="speed">
                {" "}
                {/*Speed Section for Tab */}
                <Row>
                  <Column>
                    <Row>
                      <SpeedLabel>Best Block</SpeedLabel>
                    </Row>
                    <Row>
                      <Blocks>#{state.bestBlock}</Blocks>
                    </Row>
                    <Row>
                      <SpeedLabelMid>Avg Block Time</SpeedLabelMid>
                    </Row>
                    <Row>
                      <Blocks>{state.avgTime}Sec</Blocks>
                    </Row>
                  </Column>
                  <Column>
                    <Row>
                      <SpeedLabelRight>Last Block</SpeedLabelRight>
                    </Row>
                    <LastBlock>{state.lastBlock}s ago</LastBlock>
                    <Row>
                      <Speedbar>
                        <LastBlockBar></LastBlockBar>
                      </Speedbar>
                    </Row>
                    <Row>
                      <Column>
                        <BlockBarLeftLabel>
                          <BlockBarLabelColor>Min</BlockBarLabelColor>
                          1s
                        </BlockBarLeftLabel>
                      </Column>
                      <Column>
                        <BlockBarRightLabel>
                          <BlockBarLabelColor>Max</BlockBarLabelColor>
                          26s
                        </BlockBarRightLabel>
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </SpeedTab>
              <SpeedMob className="speed">
                {" "}
                {/*Speed Section for Mob */}
                <Column>
                  <Row>
                    <SpeedLabel>Best Block</SpeedLabel>
                    <SpeedLabelRight>Last Block</SpeedLabelRight>
                  </Row>
                  <Row>
                    <Blocks>#{state.bestBlock}</Blocks>
                    <LastBlock>{state.lastBlock}s ago</LastBlock>
                  </Row>
                  <Row>
                    <SpeedLabelMid>Avg Block Time</SpeedLabelMid>
                  </Row>
                  <Row>
                    <Blocks>{state.avgTime}Sec</Blocks>
                  </Row>
                  <Row>
                    <Speedbar>
                      <LastBlockBar></LastBlockBar>
                    </Speedbar>
                    <Column>
                      <BlockBarLeftLabel>
                        <BlockBarLabelColor>Min</BlockBarLabelColor>
                        1s
                      </BlockBarLeftLabel>
                    </Column>
                    <Column>
                      <BlockBarRightLabel>
                        <BlockBarLabelColor>Max</BlockBarLabelColor>
                        26s
                      </BlockBarRightLabel>
                    </Column>
                  </Row>
                </Column>
              </SpeedMob>
            </>
          ) : (
            ""
          )}
          {SwitchTab === 3 ? (
            <>
              <EfficiencyTab className="efficiency">
                {/*Efficiency Section for Tab*/}
                <Row>
                  <Column>
                    <Row>
                      <EfficiencyLabel>Gas Price (USD)</EfficiencyLabel>
                    </Row>
                    <Row>{state.gasPrice}</Row>
                    <Row>
                      <EfficiencyLabelMid>
                        Avg Transaction Rate
                      </EfficiencyLabelMid>
                    </Row>
                    <Row>{state.avgTime}TPS</Row>
                  </Column>
                  <Column>
                    <Row>
                      <EfficiencyLabelRight>Up Time</EfficiencyLabelRight>
                    </Row>
                    <Row>
                      <UpTime>{state.upTime}%</UpTime>
                      <div>
                        <Row>
                          <Column>
                            <EfficiencyButton1>30D</EfficiencyButton1>
                          </Column>
                          <Column>
                            <EfficiencyButton2>7D</EfficiencyButton2>
                          </Column>
                          <Column>
                            <EfficiencyButton3>24H</EfficiencyButton3>
                          </Column>
                        </Row>
                      </div>
                    </Row>
                    <Row>
                      <EffiencyBar>
                        <UpTimeBar></UpTimeBar>
                      </EffiencyBar>
                    </Row>
                  </Column>
                </Row>
              </EfficiencyTab>
              <EfficiencyMob className="efficiency">
                {/*Efficiency Section for Mob*/}
                <Row>
                  <Column>
                    <Row>
                      <EfficiencyLabel>Gas Price (USD)</EfficiencyLabel>
                      <EfficiencyLabelRight>Up Time</EfficiencyLabelRight>
                    </Row>
                    <Row>
                      {state.gasPrice}
                      <UpTime>{state.upTime}%</UpTime>
                    </Row>
                    <Row>
                      <EfficiencyLabelMid>
                        Avg Transaction Rate
                      </EfficiencyLabelMid>
                    </Row>
                    <Row>{state.avgTime}TPS</Row>
                    <Row>
                      <Column>
                        <EfficiencyButton1>30D</EfficiencyButton1>
                      </Column>
                      <Column>
                        <EfficiencyButton2>7D</EfficiencyButton2>
                      </Column>
                      <Column>
                        <EfficiencyButton3>24H</EfficiencyButton3>
                      </Column>
                    </Row>
                    <Row>
                      <EffiencyBar>
                        <UpTimeBar></UpTimeBar>
                      </EffiencyBar>
                    </Row>
                  </Column>
                </Row>
              </EfficiencyMob>
            </>
          ) : (
            ""
          )}
          <SpeedMain className="speed">
            {" "}
            {/*Speed Section for Main*/}
            <Row>
              <Column>
                <Row>
                  <SpeedLabel>Best Block</SpeedLabel>
                </Row>
                <Row>
                  <Blocks>#{state.bestBlock}</Blocks>
                </Row>
                <Row>
                  <SpeedLabelMid>Avg Block Time</SpeedLabelMid>
                </Row>
                <Row>
                  <Blocks>{state.avgTime}Sec</Blocks>
                </Row>
              </Column>
              <Column>
                <Row>
                  <SpeedLabelRight>Last Block</SpeedLabelRight>
                </Row>
                <LastBlock>{state.lastBlock}s ago</LastBlock>
                <Row>
                  <Speedbar>
                    <LastBlockBar></LastBlockBar>
                  </Speedbar>
                </Row>
                <Row>
                  <Column>
                    <BlockBarLeftLabel>
                      <BlockBarLabelColor>Min</BlockBarLabelColor>
                      1s
                    </BlockBarLeftLabel>
                  </Column>
                  <Column>
                    <BlockBarRightLabel>
                      <BlockBarLabelColor>Max</BlockBarLabelColor>
                      26s
                    </BlockBarRightLabel>
                  </Column>
                </Row>
              </Column>
            </Row>
          </SpeedMain>
          <EfficiencyMain className="efficiency">
            {/*Efficiency Section for Main*/}
            <Row>
              <Column>
                <Row>
                  <EfficiencyLabel>Gas Price (USD)</EfficiencyLabel>
                </Row>
                <Row>{state.gasPrice}</Row>
                <Row>
                  <EfficiencyLabelMid>Avg Transaction Rate</EfficiencyLabelMid>
                </Row>
                <Row>{state.avgTime}TPS</Row>
              </Column>
              <Column>
                <Row>
                  <EfficiencyLabelRight>Up Time</EfficiencyLabelRight>
                </Row>
                <Row>
                  <UpTime>{state.upTime}%</UpTime>
                  <div>
                    <Row>
                      <Column>
                        <EfficiencyButton1>30D</EfficiencyButton1>
                      </Column>
                      <Column>
                        <EfficiencyButton2>7D</EfficiencyButton2>
                      </Column>
                      <Column>
                        <EfficiencyButton3>24H</EfficiencyButton3>
                      </Column>
                    </Row>
                  </div>
                </Row>
                <Row>
                  <Column>
                  <Row>
                  <EfficiencyBarLabel>100</EfficiencyBarLabel>
                  </Row>
                  <Row>
                  <EfficiencyBarLabelMid>50</EfficiencyBarLabelMid>
                  </Row>
                  <Row>
                  <EfficiencyBarLabelEnd>0</EfficiencyBarLabelEnd>
                  </Row>
                  </Column>
                  <Column>
                  <EffiencyBar>
                    <UpTimeBar> </UpTimeBar>
                  </EffiencyBar>
                  </Column>
                </Row>
              </Column>
            </Row>
          </EfficiencyMain>
        </Row>
      </div>
      {/* Table view */}
      <TableDiv>
        <Table />
      </TableDiv>
      <Footer>© 2021 XDC Network. All Rights Reserved.</Footer>
    </>
  );
};

export default Dashboard;
