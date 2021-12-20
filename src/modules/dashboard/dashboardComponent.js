import React, { useState } from "react";

import styled from "styled-components";
import Map from "./map";
import LastBlockBar from "./speedBar";
import UpTimeBar from "./efficiencyBar";
import Table from "./table";
import NodeGraph from "./nodeHistoryGraph";
import Country from "./countries";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import Header from "../header/header";

import NumberFormat from "react-number-format";
import utility from "../../utility";
import NodesService from "../../services/nodes";
import { eventConstants } from "../../constants";
import store from "../../store";

import SideDrawer from "./sideDrawer";
import BackDrop from "./backDrop";

const Footer = styled.div`
  background-color: white;
  color: #808080;
  text-align: center;
  padding-bottom: 20px;
  padding-top: 10px;
  font-family: "Inter", sans-serif;
`;

const TOUR_STEPS = [
  {
    target: ".security",
    content:
      "View the number of active Heading, their history and geolocation of all the active Heading on the blockchain.",
    disableBeacon: true,
  },
  {
    target: ".speed",
    content:
      "Explore the best block, average block time, and the last block created on-chain.",
    disableBeacon: true,
  },
  {
    target: ".efficiency",
    content:
      "Ensure the efficiency of the blockchain with zero downtime, negligible gas price, and average transaction rate displayed transparently.",
    disableBeacon: true,
  },
];

export default function Dashboard(props) {
  const { content } = props;

  const [SwitchSide, setSide] = React.useState(false);
  const changeSide = (value) => {
    setSide(value);
  };

  const [Expand, setCountry] = React.useState(false);
  const changeExpand = (value) => {
    setCountry(value);
  };

  const [joyrideRun, setJoyrideRun] = useState(false);

  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setJoyrideRun(false);
    }
  };
  const [showSideDrop, setShowSideDrop] = useState(false);

  const [show, setShow] = useState(0);
  let timeData = [];
  const [mobileTab, setMobileTab] = useState(0);
  const [tabResponsive, setTabResponsive] = useState(0);
  const [uptime, setUpTime] = useState([]);
  async function fetchTime(value) {
    const [error, res] = await utility.parseResponse(
      NodesService.getUpTime(value)
    );
    store.dispatch({ type: eventConstants.UPDATE_EFFICIENCY, data: res });
  }

  return (
    <Div>
      <Joyride
        steps={TOUR_STEPS}
        callback={handleJoyrideCallback}
        continuous={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "#2358E5",
            border: "none",
            width: 70,
            borderRadius: 0,
            fontSize: 13,
          },
          buttonBack: {
            marginRight: 10,
            color: "#2256DF",
            fontSize: 13,
          },
        }}
        spotlightPadding={0}
        run={joyrideRun}
      />
      <Header
        setJoyrideRun={setJoyrideRun}
        showSideDrop={showSideDrop}
        setShowSideDrop={setShowSideDrop}
      />
      {showSideDrop ? (
        <div>
          <SideDrawer
            showSideDrop={showSideDrop}
            setShowSideDrop={setShowSideDrop}
          />
          <BackDrop />
        </div>
      ) : null}

      {Expand === 2 ? (
        <Country
          expand={setCountry}
          location={content.stats.markers}
          content={content}
        />
      ) : (
        ""
      )}
      <MainContainer>
        <Container>
          <Title>Security</Title>
          <Title>Speed</Title>
          <Title>Efficiency</Title>
        </Container>
        <MobileContainer>
          <MobileTitle
            onClick={() => {
              setShow(1);
            }}
          >
            Security
          </MobileTitle>
          <MobileTitle
            onClick={() => {
              setShow(2);
            }}
          >
            Speed
          </MobileTitle>
          <MobileTitle
            onClick={() => {
              setShow(3);
            }}
          >
            Efficiency
          </MobileTitle>
        </MobileContainer>
        <TabContainer>
          <TabTitle
            onClick={() => {
              setTabResponsive(1);
            }}
          >
            Security
          </TabTitle>
          <TabTitle
            onClick={() => {
              setTabResponsive(2);
            }}
          >
            Speed
          </TabTitle>
          <TabTitle
            onClick={() => {
              setTabResponsive(3);
            }}
          >
            Efficiency
          </TabTitle>
        </TabContainer>
        <FullScreen>
          <ContentParent>
            <ContentSecurity className="security">
              <ContentData>
                <Heading>Nodes</Heading>
                <DataCount>
                  {content.stats.nodes}/{content.stats.totalNodes}
                </DataCount>
                <NodeHistory>Node History (7 Days)</NodeHistory>
                <NodeGraph data={content} />
              </ContentData>
              <CountryData>
                <SpaceBetween>
                  <div>
                    <Countries>Countries</Countries>
                    <CountriesData>{content.stats.countries}</CountriesData>
                  </div>
                  <Image
                    src="/images/Expand.svg"
                    onClick={() => changeExpand(2)}
                  />
                </SpaceBetween>
                <Map location={content.stats.markers} />
              </CountryData>
            </ContentSecurity>

            <ContentSpeed className="speed">
              <ContentData>
                <Heading>Best Block</Heading>
                <DataCount>
                  #{" "}
                  <NumberFormat
                    value={content.stats.bestBlock}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </DataCount>
                <NodeHistory>Avg Block Time</NodeHistory>
                <BlockTime>{content.stats.avgBlock + " "}Sec</BlockTime>
              </ContentData>

              <CountryData>
                <SpaceBetween>
                  <div>
                    <Countries>Last Block</Countries>
                    <CountriesData>{content.stats.lastBlock}</CountriesData>
                  </div>
                </SpaceBetween>
                <Speedbar>
                  <LastBlockBar content={content} />
                </Speedbar>
              </CountryData>
            </ContentSpeed>
            <ContentEfficiency className="efficiency">
              <ContentData>
                <Heading>Gas Price (USD)</Heading>
                <DataCount>{content.stats.gasPrice}</DataCount>
                <NodeHistory>Avg Transaction Rate</NodeHistory>
                <BlockTime>{content.stats.avgRate + " "}TPS</BlockTime>
              </ContentData>
              <CountryData>
                <SpaceBetween>
                  <div>
                    <Countries>UP Time</Countries>
                    <CountriesData>{content.stats.upTime}%</CountriesData>
                  </div>
                  <ButtonDiv>
                    <Button onClick={() => fetchTime(30)}>30D</Button>
                    <Button onClick={() => fetchTime(7)}>7D</Button>
                    <Button onClick={() => fetchTime(1)}>24H</Button>
                  </ButtonDiv>
                </SpaceBetween>
                <Speedbar>
                  <UpTimeBar data={content.stats.efficiency}></UpTimeBar>
                </Speedbar>
              </CountryData>
            </ContentEfficiency>
          </ContentParent>
        </FullScreen>
        <TabScreen>
          <ContentParent>
            {tabResponsive <= 1 ? (
              <ContentSecurity className="security">
                <ContentData>
                  <Heading>Nodes</Heading>
                  <DataCount>
                    {content.stats.nodes}/{content.stats.totalNodes}
                  </DataCount>
                  <NodeHistory>Node History (7 Days)</NodeHistory>
                  <NodeGraph data={content} />
                </ContentData>
                <CountryData>
                  <SpaceBetween>
                    <div>
                      <Countries>Countries</Countries>
                      <CountriesData>{content.stats.countries}</CountriesData>
                    </div>
                    <Image
                      src="/images/Expand.svg"
                      onClick={() => changeExpand(2)}
                    />
                  </SpaceBetween>
                  <MapDiv>
                    <Map location={content.stats.markers} />
                  </MapDiv>
                </CountryData>
              </ContentSecurity>
            ) : (
              ""
            )}
            {tabResponsive === 2 ? (
              <ContentSpeed className="speed">
                <ContentData>
                  <Heading>Best Block</Heading>
                  <DataCount>
                    #{" "}
                    <NumberFormat
                      value={content.stats.bestBlock}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </DataCount>
                  <NodeHistory>Avg Block Time</NodeHistory>
                  <BlockTime>{content.stats.avgBlock + " "}Sec</BlockTime>
                </ContentData>

                <CountryData>
                  <SpaceBetween>
                    <div>
                      <Countries>Last Block</Countries>
                      <CountriesData>{content.stats.lastBlock}</CountriesData>
                    </div>
                  </SpaceBetween>
                  <Speedbar>
                    <LastBlockBar content={content} />
                  </Speedbar>
                </CountryData>
              </ContentSpeed>
            ) : (
              ""
            )}
            {tabResponsive === 3 ? (
              <ContentEfficiency className="efficiency">
                <ContentData>
                  <Heading>Gas Price (USD)</Heading>
                  <DataCount>{content.stats.gasPrice}</DataCount>
                  <NodeHistory>Avg Transaction Rate</NodeHistory>
                  <BlockTime>{content.stats.avgRate + " "}TPS</BlockTime>
                </ContentData>
                <CountryData>
                  <SpaceBetween>
                    <div>
                      <Countries>UP Time</Countries>
                      <CountriesData>{content.stats.upTime}%</CountriesData>
                    </div>
                    <ButtonDiv>
                      <Button onClick={() => fetchTime(30)}>30D</Button>
                      <Button onClick={() => fetchTime(7)}>7D</Button>
                      <Button onClick={() => fetchTime(1)}>24H</Button>
                    </ButtonDiv>
                  </SpaceBetween>
                  <Speedbar>
                    <UpTimeBar data={content.stats.efficiency}></UpTimeBar>
                  </Speedbar>
                </CountryData>
              </ContentEfficiency>
            ) : (
              ""
            )}
          </ContentParent>
        </TabScreen>
        <MobileContentParent>
          {show <= 1 ? (
            <ContentSecurityMobile>
              <SpaceBetween>
                <div style={{ display: "flex", marginBottom: "8px" }}>
                  <Heading
                    onClick={() => {
                      setMobileTab(1);
                    }}
                  >
                    Nodes
                  </Heading>
                  &nbsp;&nbsp;&nbsp;
                  <Countries
                    onClick={() => {
                      setMobileTab(2);
                    }}
                  >
                    Countries
                  </Countries>
                </div>
                <Image
                  src="/images/Expand.svg"
                  onClick={() => changeExpand(2)}
                />
              </SpaceBetween>
              {mobileTab <= 1 ? (
                <ContentData>
                  <Heading>Nodes</Heading>
                  <DataCount>
                    {content.stats.nodes}/{content.stats.totalNodes}
                  </DataCount>
                  <NodeHistory>Node History (7 Days)</NodeHistory>
                  <MobileGraphDiv>
                    <NodeGraph data={content} />
                  </MobileGraphDiv>
                </ContentData>
              ) : (
                ""
              )}
              {mobileTab === 2 ? (
                <CountryData>
                  <SpaceBetween>
                    <div>
                      <Countries>Countries</Countries>
                      <BestBlockData>{content.stats.countries}</BestBlockData>
                    </div>
                  </SpaceBetween>
                  <MapWidth>
                    <Map location={content.stats.markers} />
                  </MapWidth>
                </CountryData>
              ) : (
                ""
              )}
            </ContentSecurityMobile>
          ) : (
            ""
          )}
          {show === 2 ? (
            <MobileSpeedBlock>
              <SpaceBetween>
                <div>
                  <BestBlock>BestBlock</BestBlock>
                  <BestBlockData>
                    #{" "}
                    <NumberFormat
                      value={content.stats.bestBlock}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </BestBlockData>
                </div>
                <div>
                  <LastBlock>LastBlock</LastBlock>
                  <LastBLockData> {content.stats.lastBlock}</LastBLockData>
                </div>
              </SpaceBetween>
              <MobileAverageBlock>Avg Block Time</MobileAverageBlock>
              <MobileAverageBlockData>
                {content.stats.avgBlock + " "}Sec
              </MobileAverageBlockData>
              <MobileGraphDiv>
                <LastBlockBar content={content} />
              </MobileGraphDiv>
            </MobileSpeedBlock>
          ) : (
            ""
          )}
          {show === 3 ? (
            <MobileSpeedBlock>
              <SpaceBetween>
                <div>
                  <BestBlock>Gas Price (USD)</BestBlock>
                  <BestBlockData>{content.stats.gasPrice}</BestBlockData>
                </div>
                <div>
                  <LastBlock>UP Time</LastBlock>
                  <LastBLockData> {content.stats.upTime}%</LastBLockData>
                </div>
              </SpaceBetween>
              <SpaceBetween>
                <div>
                  <MobileAverageBlock>Avg Transaction Rate</MobileAverageBlock>
                  <MobileAverageBlockData>
                    {content.stats.avgRate + " "}TPS
                  </MobileAverageBlockData>
                </div>
                <ButtonDiv>
                  <Button onClick={() => fetchTime(30)}>30D</Button>
                  <Button onClick={() => fetchTime(7)}>7D</Button>
                  <Button onClick={() => fetchTime(1)}>24H</Button>
                </ButtonDiv>
              </SpaceBetween>
              <MobileGraphDiv>
                <UpTimeBar data={content.stats.efficiency}> </UpTimeBar>
              </MobileGraphDiv>
            </MobileSpeedBlock>
          ) : (
            ""
          )}
        </MobileContentParent>
      </MainContainer>
      <TableDiv>
        <Table content={content} />
      </TableDiv>
      <Footer>© 2021 XDC Network. All Rights Reserved.</Footer>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
`;

const MainContainer = styled.div`
  width: 100%;
`;
const Title = styled.div`
  color: #c8d1f1;
  width: 33.33%;
  font-size: 1rem;
  font-weight: 600;
  border-right: 1px solid #274598;
  padding: 8px 6px 8px 16px;
`;
const TabTitle = styled.div`
  color: #c8d1f1;
  width: 33.33%;
  font-size: 1rem;
  font-weight: 600;
  border-right: 2px solid #274598;
  padding: 8px 6px 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  :hover {
    background-color: #4065cb;
    color: white;
    cursor: pointer;
  }
`;
const MobileTitle = styled.div`
  color: #c8d1f1;
  width: 33.33%;
  font-size: 1rem;
  font-weight: 600;
  border-right: 2px solid #274598;
  padding: 8px 6px 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  :hover {
    background-color: #4065cb;
    color: white;
    cursor: pointer;
  }
`;
// const Security = styled.div`
//   color: #c8d1f1;
//   width: 33.33%;
//   font-size: 1rem;
//   font-weight: 600;
//   border-right: 1px solid #274598;
//   padding: 8px 6px 8px 16px;
// `;
// const Speed = styled.div`
//   width: 33.33%;
//   font-size: 1rem;
//   font-weight: 600;
//   border-right: 1px solid #274598;
//   color: #c8d1f1;
//   padding: 8px 6px 8px 16px;
// `;
// const Efficiency = styled.div`
//   width: 33.33%;
//   font-size: 1rem;
//   font-weight: 600;
//   border-right: 1px solid #274598;
//   color: #c8d1f1;
//   padding: 8px 6px 8px 16px;
// `;
const ContentSecurity = styled.div`
  background-color: #102c78;
  height: 300px;
  width: 33.33%;
  padding: 15px;
  display: flex;
  border-right: 1px solid #274598;

  @media (min-width: 300px) and (max-width: 1024px) {
    width: 100%;
    height: 250px;
  }
`;
const ContentSecurityMobile = styled.div`
  background-color: #102c78;
  height: 300px;
  width: 33.33%;
  padding: 15px;
  border-right: 1px solid #274598;
  @media (min-width: 300px) and (max-width: 1024px) {
    width: 100%;
    height: 300px;
  }
`;
const ContentSpeed = styled.div`
  background-color: #102c78;
  height: 300px;
  width: 33.33%;
  padding: 15px;
  display: flex;
  border-right: 1px solid #274598;
  @media (min-width: 300px) and (max-width: 1024px) {
    width: 100%;
    height: 250px;
  }
`;
const ContentEfficiency = styled.div`
  background-color: #102c78;
  height: 300px;
  width: 33.33%;
  padding: 15px;
  display: flex;
  border-right: 1px solid #274598;
  @media (min-width: 300px) and (max-width: 1024px) {
    width: 100%;
    height: 250px;
  }
`;
const ContentParent = styled.div`
  display: flex;
  width: 100%;
  @media (min-width: 300px) and (max-width: 767px) {
    display: none;
  }
`;
const TabScreen = styled.div`
  @media (min-width: 300px) and (max-width: 767px) {
    display: none;
  }
  @media (min-width: 1024px) {
    display: none;
  }
`;
const MobileContentParent = styled.div`
  display: flex;
  width: 100%;
  @media (min-width: 767px) {
    display: none;
  }
`;
const Heading = styled.div`
  color: #667fc1;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
`;
const ContentData = styled.div`
  width: 50%;

  @media (min-width: 300px) and (max-width: 767px) {
    width: 100%;
  }
`;
const DataCount = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
`;
const NodeHistory = styled.div`
  color: #667fc1;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 15px;
  white-space: nowrap;
`;
const CountryData = styled.div`
  width: 50%;
`;
const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Countries = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #667fc1;
`;
const CountriesData = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
`;
const Image = styled.img`
  width: 20px;
`;
const BlockTime = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
`;
const Speedbar = styled.div`
  margin-top: 10px;
  width: 100%;
  max-width: 500px;
`;
const TableDiv = styled.div`
  background: #f8f8f8;
  border-radius: 4px;
  padding: 50px;
`;

const ButtonDiv = styled.div`
  white-space: nowrap;
  cursor: pointer;
`;
const Button = styled.button`
  background: #1c3c93;
  opacity: 1;
  border: none;
  border-radius: 1px;
  color: #3c70ff;
  font-size: 0.8rem;
  height: 30px;
  cursor: pointer;

  :hover {
    background-color: #3c70ff;
    color: white;
  }
`;

const BestBlock = styled.div`
  font: normal normal 600 16px/20px Inter;
  letter-spacing: 0px;
  color: #667fc1;
  white-space: nowrap;
`;
const BestBlockData = styled.div`
  font-size: 15px;
  font-weight: 600;
  font-family: Inter;
  color: #ffffff;
  margin-top: 8px;
`;
const MobileSpeedBlock = styled.div`
  background-color: #102c78;
  height: 300px;
  width: 100%;
  padding: 15px;
  border-right: 1px solid #274598;
`;
const LastBlock = styled.div`
  color: #667fc1;
  font-weight: 600;
  font-size: 16px;
  font-family: Inter;
`;
const LastBLockData = styled.div`
  font-size: 15px;
  font-weight: 600;
  font-family: Inter;
  color: #ffffff;
  margin-top: 8px;
`;
const MobileAverageBlock = styled.div`
  color: #667fc1;
  font-weight: 600;
  font-size: 16px;
  font-family: Inter;
`;
const MobileAverageBlockData = styled.div`
  font-size: 15px;
  font-weight: 600;
  font-family: Inter;
  color: #ffffff;
  margin-top: 8px;
`;
const MobileGraphDiv = styled.div`
  width: 100%;
`;
const MapWidth = styled.div`
  width: 100%;
`;
const TabContainer = styled.div`
  background: #1c3c93 0% 0% no-repeat padding-box;
  width: 100%;
  display: none;

  @media (min-width: 768px) and (max-width: 1024px) {
    display: flex;
  }
`;
const MobileContainer = styled.div`
  background: #1c3c93 0% 0% no-repeat padding-box;
  width: 100%;
  display: flex;

  @media (min-width: 767px) {
    display: none;
  }
`;
const Container = styled.div`
  background: #1c3c93 0% 0% no-repeat padding-box;
  width: 100%;
  display: flex;

  @media (max-width: 1024px) {
    display: none;
  }
`;
const FullScreen = styled.div`
  @media (min-width: 100px) and (max-width: 1024px) {
    display: none;
  }
`;

const MapDiv = styled.div`
  @media (min-width: 100px) and (max-width: 1024px) {
    padding-left: 105px;
  }
`;
