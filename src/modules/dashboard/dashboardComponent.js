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
import UpTimeTab from "./efficiencyBarTab";

const HeaderContainer = styled.div`
  background-color: #1c3c93;
  display: flex;
  width: 100%;
  height: 38px;
  justify-content: space-between;
  @media (max-width: 1025px) {
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
  font-size: 18px;
  font-family: "Inter";

  @media (max-width: 1025px) {
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
  @media (max-width: 1025px) {
    width: 1025px;
    padding-top: 5px;
    font-size: 20px;
  }
  @media (max-width: 415px) {
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
  @media (max-width: 1025px) {
    border-right: none;
    width: 100%;
    font-size: 20px;
  }
  color: white;
  font: normal normal 600 26px/31px Inter;
  font-size: 19px;
  @media (max-width: 415px) {
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
  @media (max-width: 1025px) {
    border-right: none;
    width: 100%;
  }
  @media (max-width: 415px) {
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
  font-size: 16px;
  font-family: "Inter";
  @media (max-width: 1025px) {
    font-size: 20px;
    padding-left: 40px;
  }
  @media (max-width: 415px) {
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
  @media (max-width: 1025px) {
    font-size: 20px;
    padding-top: 15px;
    padding-left: 40px;
  }
  @media (max-width: 415px) {
    padding-top: 4px;
    padding-left: 5px;
  }
`;
const SecurityLabelRight = styled.span`
  color: #667fc1;
  display: flex;
  padding-top: 12px;
  margin-left: 40px;
  font: normal normal 600 16px/20px Inter;
  @media (max-width: 1025px) {
    padding-left: 125px;
    font-size: 20px;
  }
  @media (max-width: 415px) {
    padding-top: 23px;
    padding-left: 0px;
  }
`;

const TotalNodes = styled.span`
  @media (max-width: 1025px) {
    padding-left: 37px;
  }
`;

const SecurityIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-top: 28px;
  margin-right: 12px;
  margin-left: 10px;
  @media (max-width: 1025px) {
    margin-left: 261px;
    margin-top: 19px;
    height: 23px;
    width: 232;
  }
  @media (max-width: 415px) {
    margin-left: 215px;
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
  @media (max-width: 1025px) {
    padding-top: 40px;
    font-size: 18px;
  }
  @media (max-width: 415px) {
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
  @media (max-width: 1025px) {
    font-size: 18px;
  }
  @media (max-width: 415px) {
    padding-top: 20px;
  }
`;
const SpeedLabelRight = styled.span`
  color: #667fc1;
  display: flex;
  padding-top: 12px;
  margin-left: 130px;
  font: normal normal 600 16px/20px Inter;
  @media (max-width: 1025px) {
    padding-top: 40px;
    font-size: 18px;
    padding-left: 115px;
  }
  @media (max-width: 415px) {
    margin-left: -15px;
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
  @media (max-width: 1025px) {
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
  @media (max-width: 1025px) {
    font-size: 20px;
  }
  @media (max-width: 415px) {
    padding-top: 20px;
  }
`;
const EfficiencyLabelRight = styled.span`
  color: #667fc1;
  display: flex;
  padding-top: 12px;
  margin-left: 130px;
  font: normal normal 600 16px/20px Inter;
  @media (max-width: 1025px) {
    padding-top: 35px;
    padding-left: 115px;
    font-size: 20px;
  }
  @media (max-width: 415px) {
    white-space: nowrap;
    padding-left: 15px;
  }
`;
const Speedbar = styled.div`
  margin-top: 45px;
  margin-left: 110px;
  @media (max-width: 1025px) {
    margin-left: 240px;
    margin-top: 20px;
  }
  @media (max-width: 415px) {
    margin-left: 10px;
  }
`;
const Countries = styled.span`
  padding-left: 40px;
  @media (max-width: 1025px) {
    padding-left: 170px;
  }
  @media (max-width: 415px) {
    padding-left: 45px;
  }
`;
const Blocks = styled.span`
  padding-left: 15px;
`;
const LastBlock = styled.span`
  padding-left: 130px;
  white-space: nowrap;
  @media (max-width: 1025px) {
    padding-left: 245px;
  }
  @media (max-width: 415px) {
    padding-left: 179px;
  }
`;
const BlockBarLeftLabel = styled.span`
  padding-left: 125px;
  font-size: x-small;
  @media (max-width: 1025px) {
    padding-left: 253px;
  }
  @media (max-width: 415px) {
    padding-left: 30px;
  }
`;
const BlockBarLabelColor = styled.span`
  color: #667fc1;
`;
const BlockBarRightLabel = styled.span`
  padding-left: 270px;
  font-size: x-small;
  @media (max-width: 1025px) {
    padding-left: 473px;
  }
  @media (max-width: 415px) {
    padding-left: 306px;
  }
`;
const EffiencyBar = styled.div`
  margin-top: -10px;
  margin-left: 90px;
  @media (max-width: 1025px) {
    margin-top: 5px;
    margin-left: 230px;
  }
  @media (max-width: 415px) {
    margin-left: 5px;
    margin-top: -54px;
  }
`;
const UpTime = styled.span`
  padding-left: 130px;
  @media (max-width: 1025px) {
    padding-left: 249px;
  }
  @media (max-width: 415px) {
    padding-left: 196px;
  }
`;

const ButtonDiv = styled.div`
  padding-left: 120px;
  white-space: nowrap;
  @media (max-width: 1025px) {
    padding-left: 325px;
  }
  @media (max-width: 415px) {
    padding-left: 165px;
    padding-top: 10px;
  }
`;
const Button = styled.button`
  background: #1c3c93;
  opacity: 1;
  border: none;
  border-radius: 1px;
  color: #3c70ff;
  font-size: 12px;
  width: 50px;
  height: 30px;

  :hover {
    background-color: #3c70ff;
    color: white;
  }
`;

const TableDiv = styled.div`
  background-color: #f8f8f8;
  padding-top: 50px;
  padding-bottom: 90px;
`;

const Footer = styled.div`
  background-color: white;
  color: #808080;
  text-align: center;
  padding-bottom: 20px;
  font-family: "Inter", sans-serif;
`;

const MapContainer = styled.div`
  @media (max-width: 1025px) {
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
  @media (max-width: 1025px) {
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
  @media (max-width: 1025px) {
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
  @media (min-width: 1025px) {
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
  @media (min-width: 415px) {
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
  @media (max-width: 1025px) {
    border-right: none;
    width: 100%;
    font-size: 20px;
  }
  color: white;
  font: normal normal 600 26px/31px Inter;
  font-size: 19px;
  @media (min-width: 415px) {
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
  @media (max-width: 1025px) {
    border-right: none;
    width: 100%;
  }
  color: white;
  padding-left: 15px;
  font: normal normal 600 26px/31px Inter;
  font-size: 19px;
  @media (min-width: 415px) {
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
const TOUR_STEPS = [
  {
    target: ".security",
    content:
      "Eiusmod deserunt aliquip cupidatat laborum exercitation mollit incididunt cupidatat laboris sint. Fugiat magna dolore consequat in laboris in laboris excepteur. Dolor nostrud quis do elit nulla consequat fugiat amet. Ad occaecat culpa ipsum ipsum tempor reprehenderit commodo magna veniam elit laboris dolor. Consequat laboris nostrud eiusmod incididunt commodo cillum consequat laboris veniam qui.",
    disableBeacon: true,
  },
  {
    target: ".speed",
    content:
      "Sint esse aute ad Lorem id cillum laborum exercitation ut. Dolore excepteur proident laborum proident consectetur sint ut dolor ex nisi fugiat qui. Sit commodo do est deserunt. Laboris consectetur duis labore aliquip amet enim incididunt ipsum dolor in duis culpa. Quis in ex ad ad non eu aliqua ipsum laboris nostrud id commodo dolore ipsum. Eiusmod incididunt et reprehenderit esse culpa sint dolor. Qui sunt nisi ut dolore occaecat enim ad minim anim.",
    disableBeacon: true,
  },
];

export default function Dashboard(props) {
  const { content } = props;
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
      <Joyride //Start Guided Tour
        steps={TOUR_STEPS}
        continuous={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "blue",
          },
          buttonBack: {
            marginRight: 10,
            color: "blue",
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
        {Expand === 2 ? (
          <Country expand={setCountry} location={content.stats.map} />
        ) : (
          ""
        )}
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
                      {/* {content.stats.nodes}/{content.stats.totalNodes} */}
                      <TotalNodes>{content.stats.nodes}/200</TotalNodes>
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
                        <Countries>{content.stats.countries}</Countries>
                        <Row>
                          <MapContainer>
                            <Map location={content.stats.map} />
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
                        <Row>{content.stats.nodes}/200</Row>
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
                          <Countries>{content.stats.countries}</Countries>
                        </Row>
                        <Row>
                          <MapContainer>
                            <Map />
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
                      <Blocks>#{content.stats.bestBlock}</Blocks>
                    </Row>
                    <Row>
                      <SpeedLabelMid>Avg Block Time</SpeedLabelMid>
                    </Row>
                    <Row>
                      <Blocks>{content.stats.avgBlock}Sec</Blocks>
                    </Row>
                  </Column>
                  <Column>
                    <Row>
                      <SpeedLabelRight>Last Block</SpeedLabelRight>
                    </Row>
                    <LastBlock>{content.stats.lastBlock}s ago</LastBlock>
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
                    <Blocks>#{content.stats.bestBlock}</Blocks>
                    <LastBlock>{content.stats.lastBlock}s ago</LastBlock>
                  </Row>
                  <Row>
                    <SpeedLabelMid>Avg Block Time</SpeedLabelMid>
                  </Row>
                  <Row>
                    <Blocks>{content.stats.avgBlock}Sec</Blocks>
                  </Row>
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
              </SpeedMob>
            </>
          ) : (
            ""
          )}
          {SwitchTab === 3 ? (
            <>
              <EfficiencyTab>
                {/*Efficiency Section for Tab*/}
                <Row>
                  <Column>
                    <Row>
                      <EfficiencyLabel>Gas Price</EfficiencyLabel>
                    </Row>
                    <Row>{content.stats.gasPrice}</Row>
                    <Row>
                      <EfficiencyLabelMid>
                        Avg Transaction Rate
                      </EfficiencyLabelMid>
                    </Row>
                    <Row>{content.stats.avgRate}TPS</Row>
                  </Column>
                  <Column>
                    <EfficiencyLabelRight>Up Time</EfficiencyLabelRight>
                    <Row>
                      <UpTime>{content.stats.upTime}%</UpTime>
                      <div>
                        <Row>
                          <ButtonDiv>
                            <Button>30D</Button>
                            <Button>7D</Button>
                            <Button>24H</Button>
                          </ButtonDiv>
                        </Row>
                      </div>
                    </Row>
                    <Row>
                      <EffiencyBar>
                        <UpTimeTab />
                      </EffiencyBar>
                    </Row>
                  </Column>
                </Row>
              </EfficiencyTab>
              <EfficiencyMob>
                {/*Efficiency Section for Mob*/}
                <Row>
                  <Column>
                    <Row>
                      <EfficiencyLabel>Gas Price</EfficiencyLabel>
                      <EfficiencyLabelRight>Up Time</EfficiencyLabelRight>
                    </Row>
                    <Row>
                      {content.stats.gasPrice}
                      <UpTime>{content.stats.upTime}%</UpTime>
                    </Row>
                    <Row>
                      <EfficiencyLabelMid>
                        Avg Transaction Rate
                      </EfficiencyLabelMid>
                    </Row>
                    <Row>
                      {content.stats.avgRate}TPS
                      <ButtonDiv>
                        <Button>30D</Button>
                        <Button>7D</Button>
                        <Button>24H</Button>
                      </ButtonDiv>
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
                  <Blocks>#{content.stats.bestBlock}</Blocks>
                </Row>
                <Row>
                  <SpeedLabelMid>Avg Block Time</SpeedLabelMid>
                </Row>
                <Row>
                  <Blocks>{content.stats.avgBlock}Sec</Blocks>
                </Row>
              </Column>
              <Column>
                <Row>
                  <SpeedLabelRight>Last Block</SpeedLabelRight>
                </Row>
                <LastBlock>{content.stats.lastBlock}s ago</LastBlock>
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
          <EfficiencyMain>
            {/*Efficiency Section for Main*/}
            <Row>
              <Column>
                <Row>
                  <EfficiencyLabel>Gas Price</EfficiencyLabel>
                </Row>
                <Row>{content.stats.gasPrice}</Row>
                <Row>
                  <EfficiencyLabelMid>Avg Transaction Rate</EfficiencyLabelMid>
                </Row>
                <Row>{content.stats.avgRate}TPS</Row>
              </Column>
              <Column>
                <Row>
                  <EfficiencyLabelRight>Up Time</EfficiencyLabelRight>
                </Row>
                <Row>
                  <UpTime>{content.stats.upTime}%</UpTime>
                  <div>
                    <Row>
                      <ButtonDiv>
                        <Button>30D</Button>
                        <Button>7D</Button>
                        <Button>24H</Button>
                      </ButtonDiv>
                    </Row>
                  </div>
                </Row>
                <Row>
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
        <Table content={content} />
      </TableDiv>
      <Footer>© 2021 XDC Network. All Rights Reserved.</Footer>
    </>
  );
}
