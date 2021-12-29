import React, { useState, useEffect } from "react";
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
import _ from "lodash";
import SideDrawer from "./sideDrawer";
import BackDrop from "./backDrop";
import { makeStyles } from "@material-ui/styles";

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

const use = makeStyles(() => ({
  arrow: {
    "&:before": {
      backgroundColor: "white",
    },
  },
  tooltip: {
    color: "#2a2a2a",
    backgroundColor: "white",
    padding: "9px",
    fontSize: "12px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.42",
    letterSpacing: "0.46px",
  },
}));
export default function Dashboard(props) {
  const { content } = props;
  const classes = use();

  const [SwitchSide, setSide] = React.useState(false);
  const changeSide = (value) => {
    setSide(value);
  };

  const [Expand, setCountry] = React.useState(false);
  const changeExpand = (value) => {
    setCountry(value);
  };
  const [joyrideRun, setJoyrideRun] = useState(false);
  const [joyrideStyle, setJoyrideStyle] = useState({});
  const [step, setStep] = useState();
  const handleJoyrideCallback = (data) => {
    const { status, type, action, index } = data;
    console.log("state", data);
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (action === "close") {
      setJoyrideRun(false);
      setStep(0);
    }
    if (index === 2) {
      setJoyrideStyle({
        tooltipContainer: {
          textAlign: "left",
        },
        buttonNext: {
          display: "none",
        },
        buttonBack: {
          marginRight: 10,
          color: "#2256DF",
          fontSize: 13,
        },
        buttonClose: {
          size: 1,
          padding: 10,
        },
        buttonLast: {
          display: "none",
        },
      });
    } else {
      setJoyrideStyle({
        tooltipContainer: {
          textAlign: "left",
        },
        buttonNext: {
          backgroundColor: "#2358E5",
          border: "none",
          width: 70,
          borderRadius: 0,
          fontSize: 13,
          borderRadius: "3px",
        },
        buttonBack: {
          marginRight: 10,
          color: "#2256DF",
          fontSize: 13,
        },
        buttonClose: {
          size: 1,
          padding: 10,
        },
        buttonLast: {
          display: "none",
        },
      });
    }
    if (action === "update") {
      console.log("now");
    }
    if (finishedStatuses.includes(status)) {
      setJoyrideRun(false);
    }
  };
  const [showSideDrop, setShowSideDrop] = useState(false);

  const [show, setShow] = useState(1);
  const [mobileTab, setMobileTab] = useState(0);
  const [gasUsd, setGasUsd] = useState(0);
  const [Eth, setEth] = useState(0);
  const [tabResponsive, setTabResponsive] = useState(0);

  async function fetchTime(value = 1) {
    const [error, res] = await utility.parseResponse(
      NodesService.getUpTime(value)
    );
    store.dispatch({ type: eventConstants.UPDATE_EFFICIENCY, data: res });

    const [err, resp] = await utility.parseResponse(NodesService.getEth());
    let EthVal = `${
      Math.round(
        ((resp.normal.usd - content.stats.gasPrice) / resp.normal.usd) *
          100 *
          100000
      ) / 100000
    }%`;
    setEth(EthVal);
  }
  useEffect(() => {
    fetchTime();
    setGasUsd(content.stats.gasPrice.toFixed(6));
  }, [content.stats.gasPrice]);
  const [showTabJoyRide, setShowTabJoyRide] = useState(false);

  const buttonTour = () => {
    setShow(show + 1);
    showSetText(setText + 1);
    if (show > 2) setShow(0);
    if (setText > 1) showSetText(0);
    console.log("setText", setText);
    console.log("show", show);
  };

  const [setText, showSetText] = useState(0);
  const [showBackButton, setShowBackButton] = useState(true);
  const [showBackCount, setShowBackCount] = useState(0);

  const backButtonTour = () => {
    setShow(show - 1);
    showSetText(setText - 1);
    console.log("showBackCount", showBackCount);
  };
  const [activeButton, setActiveButton] = React.useState("General");
  const handleViewClick = (e) => {
    setActiveButton(e.target.id);
  };
  return (
    <Div>
      <Joyride
        steps={TOUR_STEPS}
        callback={handleJoyrideCallback}
        continuous={true}
        styles={joyrideStyle}
        spotlightPadding={0}
        run={joyrideRun}
        stepIndex={step}
        disableScrolling={true}
        floaterProps={{ disableAnimation: true }}
      />

      {showTabJoyRide && (
        <CustomerJoyRide>
          <CrossButton onClick={() => setShowTabJoyRide(false)}>X</CrossButton>
          <JoyrideTextContainer>
            {TOUR_STEPS[setText].content}
          </JoyrideTextContainer>
          <JoyrideNextButton onClick={() => buttonTour()}>
            Next
          </JoyrideNextButton>
          {showBackButton && showBackCount >= 1 ? (
            <JoyrideBackButton onClick={() => backButtonTour()}>
              Back
            </JoyrideBackButton>
          ) : (
            ""
          )}
        </CustomerJoyRide>
      )}
      <Header
        setJoyrideRun={setJoyrideRun}
        setShowTabJoyRide={setShowTabJoyRide}
        showTabJoyRide={showTabJoyRide}
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
        />
      ) : (
        <>
          <MainContainer>
            <Container>
              <Title>Security</Title>
              <Title>Speed</Title>
              <Title>Efficiency</Title>
            </Container>
            <MobileContainer>
              <MobileTitleSecurity
                show={show}
                onClick={() => {
                  setShow(1);
                }}
              >
                Security
              </MobileTitleSecurity>
              <MobileTitleSpeed
                show={show}
                onClick={() => {
                  setShow(2);
                }}
              >
                Speed
              </MobileTitleSpeed>
              <MobileTitleEfficiency
                show={show}
                onClick={() => {
                  setShow(3);
                }}
              >
                Efficiency
              </MobileTitleEfficiency>
            </MobileContainer>
            <TabContainer>
              <TabSecurity
                show={tabResponsive}
                onClick={() => {
                  setTabResponsive(1);
                }}
              >
                Security
              </TabSecurity>
              <TabSpeed
                show={tabResponsive}
                onClick={() => {
                  setTabResponsive(2);
                }}
              >
                Speed
              </TabSpeed>
              <TabEfficiency
                show={tabResponsive}
                onClick={() => {
                  setTabResponsive(3);
                }}
              >
                Efficiency
              </TabEfficiency>
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
                    <NodeGraph/>
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
                    <Map/>
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
                    <LastBlockBar/>
                    </Speedbar>
                    <DisplayFlex>
                      <FlexStyled>
                        Min &nbsp;<Span>1s</Span>
                      </FlexStyled>
                      <FlexStyledOne>
                        Max &nbsp;<Span>26s</Span>
                      </FlexStyledOne>
                    </DisplayFlex>
                  </CountryData>
                </ContentSpeed>

                <ContentEfficiency className="efficiency">
                  <ContentData>
                    <Heading>Gas Price (USD)</Heading>
                    <DataCount>{gasUsd}</DataCount>
                    <EthDiv>
                      <img src="/images/DownArrow.svg" alt=" " />
                      {" " + Eth} than Ethereum
                    </EthDiv>
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
                      {content.stats.efficiency.length!==0 ? <UpTimeBar data={content.stats.efficiency}></UpTimeBar> : <div></div> }
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
                          <CountriesData>
                            {content.stats.countries}
                          </CountriesData>
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
                          <CountriesData>
                            {content.stats.lastBlock}
                          </CountriesData>
                        </div>
                      </SpaceBetween>
                      <Speedbar>
                        <LastBlockBar content={content} />
                      </Speedbar>
                      <DisplayFlex>
                        <FlexStyled>
                          Min &nbsp;<Span>1s</Span>
                        </FlexStyled>
                        <FlexStyledOne>
                          Max &nbsp;<Span>26s</Span>
                        </FlexStyledOne>
                      </DisplayFlex>
                    </CountryData>
                  </ContentSpeed>
                ) : (
                  ""
                )}
                {tabResponsive === 3 ? (
                  <ContentEfficiency className="efficiency">
                    <ContentData>
                      <Heading>Gas Price (USD)</Heading>
                      <DataCount>{gasUsd}</DataCount>
                      <EthDiv>
                        <img src="/images/DownArrow.svg" alt=" " />
                        {" " + Eth} than Ethereum
                      </EthDiv>
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
                      <ColorDivNodes
                        mobileTab={mobileTab}
                        onClick={() => {
                          setMobileTab(1);
                        }}
                      >
                        Nodes
                      </ColorDivNodes>
                      &nbsp;&nbsp;&nbsp;
                      <ColorDivCountries
                        mobileTab={mobileTab}
                        onClick={() => {
                          setMobileTab(2);
                        }}
                      >
                        Countries
                      </ColorDivCountries>
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
                          <BestBlockData>
                            {content.stats.countries}
                          </BestBlockData>
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
                  <DisplayFlex>
                    <FlexStyled>
                      Min &nbsp;<Span>1s</Span>
                    </FlexStyled>
                    <FlexStyledOne>
                      Max &nbsp;<Span>26s</Span>
                    </FlexStyledOne>
                  </DisplayFlex>
                </MobileSpeedBlock>
              ) : (
                ""
              )}
              {show === 3 ? (
                <MobileSpeedBlock>
                  <SpaceBetween>
                    <div>
                      <BestBlock>Gas Price (USD)</BestBlock>
                      <BestBlockData>{gasUsd}</BestBlockData>
                      <EthDiv>
                        <img src="/images/DownArrow.svg" alt=" " />
                        {" " + Eth} than Ethereum
                      </EthDiv>
                    </div>
                    <div>
                      <LastBlock>UP Time</LastBlock>
                      <LastBLockData> {content.stats.upTime}%</LastBLockData>
                    </div>
                  </SpaceBetween>
                  <SpaceBetween>
                    <div>
                      <MobileAverageBlock>
                        Avg Transaction Rate
                      </MobileAverageBlock>
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
            <Table/>
          </TableDiv>
          <Footer>© 2021 XDC Network. All Rights Reserved.</Footer>
        </>
      )}
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
`;

const CustomerJoyRide = styled.div`
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const JoyrideTextContainer = styled.div`
  top: 48%;
  position: absolute;
  background: white;
  width: 80%;
  height: 200px;
  z-index: 100;
  border-radius: 10px;
  padding: 15px 45px 15px 15px;
  display: flex;
`;

const JoyrideNextButton = styled.button`
  background-color: #007bff;
  outline: none;
  border: none;
  width: 100%;
  max-width: 63px;
  color: white;
  border-radius: 4px;
  padding: 4px;
  z-index: 200;
  position: absolute;
  bottom: 30%;
  right: 13%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const JoyrideBackButton = styled.div`
  font-size: 1rem;
  font-family: Inter;
  font-weight: 600;
  color: #2256df;
  border-radius: 4px;
  padding: 4px;
  z-index: 200;
  position: absolute;
  bottom: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 27%;
  @media (min-width: 300px) and (max-width: 560px) {
    margin-right: 20px;
  }
`;
const CrossButton = styled.div`
  position: absolute;
  z-index: 200;
  left: 86%;
  top: 50%;
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
const Span = styled.div`
  font-size: 10px;
  font-weight: 600;
  font-family: Inter;
  color: #ffffff;
`;
const DisplayFlex = styled.div`
  display: flex;
  color: #ffffff;
  align-items: center;
  text-align: center;
  margin-top: 8px;
`;
const FlexStyled = styled.div`
  flex: 1;
  font-size: 12px;
  color: #c8d1f1;
  display: flex;
  align-items: center;
  text-align: center;
`;
const FlexStyledOne = styled.div`
  color: #c8d1f1;
  display: flex;
  align-items: center;
  font-size: 12px;
  text-align: center;
`;
const TabSecurity = styled.div`
  color: #c8d1f1;
  width: 33.33%;
  font-size: 1rem;
  font-weight: 600;
  border-right: 2px solid #274598;
  border: none;
  padding: 8px 6px 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(props) => (props.show === 1 ? "#4065cb" : "#1c3c93")};
  :hover {
    background-color: #4065cb;
    color: white;
    cursor: pointer;
  }
`;
const TabSpeed = styled.div`
  color: #c8d1f1;
  width: 33.33%;
  font-size: 1rem;
  font-weight: 600;
  border-right: 2px solid #274598;
  border: none;
  padding: 8px 6px 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(props) => (props.show === 2 ? "#4065cb" : "#1c3c93")};
  :hover {
    background-color: #4065cb;
    color: white;
    cursor: pointer;
  }
`;
const TabEfficiency = styled.div`
  color: #c8d1f1;
  width: 33.33%;
  font-size: 1rem;
  font-weight: 600;
  border-right: 2px solid #274598;
  border: none;
  padding: 8px 6px 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(props) => (props.show === 3 ? "#4065cb" : "#1c3c93")};
  :hover {
    background-color: #4065cb;
    color: white;
    cursor: pointer;
  }
`;

const MobileTitleSecurity = styled.div`
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
  border: none;
  background: ${(props) => (props.show === 1 ? "#4065cb" : "#1c3c93")};
  :hover {
    background-color: #4065cb;
    color: white;
    cursor: pointer;
  }
`;
const MobileTitleSpeed = styled.div`
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
  border: none;
  background: ${(props) => (props.show === 2 ? "#4065cb" : "#1c3c93")};
  :hover {
    background-color: #4065cb;
    color: white;
    cursor: pointer;
  }
`;
const MobileTitleEfficiency = styled.div`
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
  border: none;
  background: ${(props) => (props.show === 3 ? "#4065cb" : "#1c3c93")};
  :hover {
    background-color: #4065cb;
    color: white;
    cursor: pointer;
  }
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
const ColorDivNodes = styled.div`
  color: #667fc1;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  border-bottom: ${(props) =>
    props.mobileTab === 1 ? "2px solid #ffffff" : ""};
`;
const ColorDivCountries = styled.div`
  color: #667fc1;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  border-bottom: ${(props) =>
    props.mobileTab === 2 ? "2px solid #ffffff" : ""};
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
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 15px;
  }
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
  @media (min-width: 300px) and (max-width: 1024px) {
    padding: 30px;
  }
  @media (min-width: 300px) and (max-width: 767px) {
    padding: 15px;
  }
`;

const ButtonDiv = styled.div`
  white-space: nowrap;
  cursor: pointer;
  border-radius: 6px;
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
  /* margin-top: 8px; */
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
  /* margin-top: 8px; */
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
  /* margin-top: 8px; */
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
const EthDiv = styled.div`
  font-size: 14px;
  font-family: "Inter";
  color: #3af219;
  margin-bottom: 45px;
`;
