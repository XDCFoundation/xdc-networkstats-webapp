import React, { useState } from "react";
import { Column, Row } from "simple-flexbox";
import styled from "styled-components";
import Map from "./map";
import LastBlockBar from "./speedBar";
import UpTimeBar from "./efficiencyBar";
import Table from "./table";
import NodeGraph from "./nodeHistoryGraph";
import Country from "./countries";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import Header from "../header/header";
import UpTimeTab from "./efficiencyBarTab";
import NumberFormat from "react-number-format";

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

  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setJoyrideRun(false);
    }
  };

  const [show, setShow] = useState(0);

  const [mobileTab, setMobileTab] = useState(0);
  const [tabResponsive, setTabResponsive] = useState(0);
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
        changeSide={changeSide}
        SwitchSide={SwitchSide}
      />
      {Expand === 2 ? (
        <Country
          expand={setCountry}
          location={content.stats.map}
          content={content}
        />
      ) : (
        ""
      )}
      <MainContainer>
        <Container>
          <Security>Security</Security>
          <Speed>Speed</Speed>
          <Efficiency>Efficiency</Efficiency>
        </Container>
        <MobileContainer>
          <Security
            onClick={() => {
              setShow(1);
            }}
          >
            Security
          </Security>
          <Speed
            onClick={() => {
              setShow(2);
            }}
          >
            Speed
          </Speed>
          <Efficiency
            onClick={() => {
              setShow(3);
            }}
          >
            Efficiency
          </Efficiency>
        </MobileContainer>
        <TabContainer>
          <Security
            onClick={() => {
              setTabResponsive(1);
            }}
          >
            Security
          </Security>
          <Speed
            onClick={() => {
              setTabResponsive(2);
            }}
          >
            Speed
          </Speed>
          <Efficiency
            onClick={() => {
              setTabResponsive(3);
            }}
          >
            Efficiency
          </Efficiency>
        </TabContainer>
        <FullScreen>
          <ContentParent>
            <ContentSecurity>
              <ContentData>
                <Heading>Nodes</Heading>
                <DataCount>{content.stats.nodes}/200</DataCount>
                <NodeHistory>Node History (7 Days)</NodeHistory>
                <NodeGraph data={content} />
              </ContentData>
              <CountryData>
                <SpaceBetween>
                  <div>
                    <Countries>Countries</Countries>
                    <CountriesData>{content.stats.countries}</CountriesData>
                  </div>
                  <Image src="/images/Expand.svg" />
                </SpaceBetween>
                <Map />
              </CountryData>
            </ContentSecurity>

            <ContentSpeed>
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
                <BlockTime>{content.stats.avgBlock}Sec</BlockTime>
              </ContentData>

              <CountryData>
                <SpaceBetween>
                  <div>
                    <Countries>Last Block</Countries>
                    <CountriesData>
                      {content.stats.lastBlock}s ago
                    </CountriesData>
                  </div>
                </SpaceBetween>
                <Speedbar>
                  <LastBlockBar content={content} />
                </Speedbar>
              </CountryData>
            </ContentSpeed>

            <ContentEfficiency>
              <ContentData>
                <Heading>Gas Price (USD)</Heading>
                <DataCount>{content.stats.gasPrice}</DataCount>
                <NodeHistory>Avg Transaction Rate</NodeHistory>
                <BlockTime>{content.stats.avgRate}TPS</BlockTime>
              </ContentData>
              <CountryData>
                <SpaceBetween>
                  <div>
                    <Countries>UP Time</Countries>
                    <CountriesData>{content.stats.upTime}%</CountriesData>
                  </div>
                  <ButtonDiv>
                    <Button>30D</Button>
                    <Button>7D</Button>
                    <Button>24H</Button>
                  </ButtonDiv>
                </SpaceBetween>
                <Speedbar>
                  <UpTimeBar></UpTimeBar>
                </Speedbar>
              </CountryData>
            </ContentEfficiency>
          </ContentParent>
        </FullScreen>
        <TabScreen>
          <ContentParent>
            {tabResponsive <= 1 ? (
              <ContentSecurity>
                <ContentData>
                  <Heading>Nodes</Heading>
                  <DataCount>{content.stats.nodes}/200</DataCount>
                  <NodeHistory>Node History (7 Days)</NodeHistory>
                  <NodeGraph data={content} />
                </ContentData>
                <CountryData>
                  <SpaceBetween>
                    <div>
                      <Countries>Countries</Countries>
                      <CountriesData>{content.stats.countries}</CountriesData>
                    </div>
                    <Image src="/images/Expand.svg" />
                  </SpaceBetween>
                  <Map />
                </CountryData>
              </ContentSecurity>
            ) : (
              ""
            )}
            {tabResponsive === 2 ? (
              <ContentSpeed>
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
                  <BlockTime>{content.stats.avgBlock}Sec</BlockTime>
                </ContentData>

                <CountryData>
                  <SpaceBetween>
                    <div>
                      <Countries>Last Block</Countries>
                      <CountriesData>
                        {content.stats.lastBlock}s ago
                      </CountriesData>
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
              <ContentEfficiency>
                <ContentData>
                  <Heading>Gas Price (USD)</Heading>
                  <DataCount>{content.stats.gasPrice}</DataCount>
                  <NodeHistory>Avg Transaction Rate</NodeHistory>
                  <BlockTime>{content.stats.avgRate}TPS</BlockTime>
                </ContentData>
                <CountryData>
                  <SpaceBetween>
                    <div>
                      <Countries>UP Time</Countries>
                      <CountriesData>{content.stats.upTime}%</CountriesData>
                    </div>
                    <ButtonDiv>
                      <Button>30D</Button>
                      <Button>7D</Button>
                      <Button>24H</Button>
                    </ButtonDiv>
                  </SpaceBetween>
                  <Speedbar>
                    <UpTimeBar></UpTimeBar>
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
                <Image src="/images/Expand.svg" />
              </SpaceBetween>
              {mobileTab <= 1 ? (
                <ContentData>
                  <Heading>Nodes</Heading>
                  <DataCount>{content.stats.nodes}/200</DataCount>
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
                    <Map />
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
                  <LastBLockData> {content.stats.lastBlock}s ago</LastBLockData>
                </div>
              </SpaceBetween>
              <MobileAverageBlock>Avg Block Time</MobileAverageBlock>
              <MobileAverageBlockData>
                {content.stats.avgBlock}Sec
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
                    {content.stats.avgRate}TPS
                  </MobileAverageBlockData>
                </div>
                <ButtonDiv>
                  <Button>30D</Button>
                  <Button>7D</Button>
                  <Button>24H</Button>
                </ButtonDiv>
              </SpaceBetween>
              <MobileGraphDiv>
                <UpTimeBar> </UpTimeBar>
              </MobileGraphDiv>
            </MobileSpeedBlock>
          ) : (
            ""
          )}
        </MobileContentParent>
      </MainContainer>
      <TableDiv>
        <Table content={content} />
        <Footer>© 2021 XDC Network. All Rights Reserved.</Footer>
      </TableDiv>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
`;

const MainContainer = styled.div`
  width: 100%;
`;
const Security = styled.div`
  color: #c8d1f1;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  border-right: 1px solid #274598;
`;
const Speed = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  border-right: 1px solid #274598;
  color: #c8d1f1;
`;
const Efficiency = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  border-right: 1px solid #274598;
  color: #c8d1f1;
`;
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
    /* max-width: 478px; */
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
  /* max-width: 282px; */
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
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  margin-top: 40px;
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
  padding: 15px;

  @media (min-width: 768px) and (max-width: 1024px) {
    display: flex;
  }
`;
const MobileContainer = styled.div`
  background: #1c3c93 0% 0% no-repeat padding-box;
  width: 100%;
  display: flex;
  padding: 15px;

  @media (min-width: 767px) {
    display: none;
  }
`;
const Container = styled.div`
  background: #1c3c93 0% 0% no-repeat padding-box;
  width: 100%;
  display: flex;
  padding: 15px;
  @media (max-width: 1024px) {
    display: none;
  }
`;
const FullScreen = styled.div`
  @media (min-width: 100px) and (max-width: 1024px) {
    display: none;
  }
`;
