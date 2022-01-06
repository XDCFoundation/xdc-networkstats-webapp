import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Map from "./map";
import LastBlockBar from "./speedBar";
import UpTimeBar from "./efficiencyBar";
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
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";

const TOUR_STEPS = [
  {
    target: ".security",
    content:
      "View the number of active nodes, their history and geolocation of all the active Heading on the blockchain.",
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
      "Ensure the efficiency of the blockchain with zero downtime, negligible gas price, and average transaction speed displayed transparently.",
    disableBeacon: true,
  },
];

function Dashboard(props) {
  const { content } = props;

  const [Expand, setCountry] = React.useState(false);
  const changeExpand = (value) => {
    setCountry(value);
  };
  const [joyrideRun, setJoyrideRun] = useState(false);
  const [joyrideStyle, setJoyrideStyle] = useState({});
  const [step, setStep] = useState();
  const handleJoyrideCallback = (data) => {
    const { status, type, action, index } = data;
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
          padding: "10px",
          width: 10,
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
          width: 10,
        },
        buttonLast: {
          display: "none",
        },
      });
    }
    if (action === "update") {
    }
    if (finishedStatuses.includes(status)) {
      setJoyrideRun(false);
    }
  };
  const [showSideDrop, setShowSideDrop] = useState(false);
  const [show, setShow] = useState(1);
  const [mobileTab, setMobileTab] = useState(1);
  const [gasUsd, setGasUsd] = useState(0);
  const [Eth, setEth] = useState(0);
  const [tabResponsive, setTabResponsive] = useState(1);
  const [buttonToggle, setButtonToggle] = useState(3);

  async function fetchTime(value = 1) {
    const [error, res] = await utility.parseResponse(
      NodesService.getUpTime(value)
    );
    store.dispatch({ type: eventConstants.UPDATE_EFFICIENCY, data: res });

    const [err, resp] = await utility.parseResponse(NodesService.getEth());
    let EthVal = `${
      Math.round(
        ((resp.normal.usd - props.stats.gasPrice) / resp.normal.usd) *
          100 *
          100000
      ) / 100000
    }%`;
    setEth(EthVal);
  }
  useEffect(() => {
    fetchTime();
    setGasUsd(props.stats.gasPrice.toFixed(6));
  }, [props.stats.gasPrice]);
  const [showTabJoyRide, setShowTabJoyRide] = useState(false);

  document.body.style.overflow = showTabJoyRide ? "hidden" : "unset";

  const buttonTour = () => {
    setShow(show + 1);
    showSetText(setText + 1);
    setTabResponsive(tabResponsive + 1);
    console.log("");
    if (show > 2) setShow(0);
    if (setText > 1) showSetText(0);
    if (tabResponsive > 2) setTabResponsive(0);
  };

  const [setText, showSetText] = useState(0);
  const [showBackButton, setShowBackButton] = useState(true);
  const [showBackCount, setShowBackCount] = useState(1);

  const backButtonTour = () => {
    setShow(show - 1);
    showSetText(setText - 1);
    setTabResponsive(tabResponsive - 1);
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
        <BackDropStyle>
          <div class="flex">
            <div class="tooltip">
              <div class="flex-img">
                <Img
                  src="/images/Close.svg"
                  onClick={() => {
                    setShowTabJoyRide(false);
                    setShow(1);
                    showSetText(0);
                  }}
                />
              </div>
              <JoyrideTextContainer>
                {TOUR_STEPS[setText].content}
              </JoyrideTextContainer>
              <div class="flex-condition">
                {showBackButton ? (
                  <JoyrideBackButton
                    showBackCount={setText}
                    onClick={() => backButtonTour()}
                  >
                    Back
                  </JoyrideBackButton>
                ) : (
                  ""
                )}
                <JoyrideNextButton
                  onClick={() => buttonTour()}
                  showBackCount={setText}
                >
                  Next
                </JoyrideNextButton>
              </div>
            </div>
          </div>
        </BackDropStyle>
      )}

      <Header
        setJoyrideRun={setJoyrideRun}
        setShowTabJoyRide={setShowTabJoyRide}
        showTabJoyRide={showTabJoyRide}
        showSideDrop={showSideDrop}
        setShowSideDrop={setShowSideDrop}
        expand={setCountry}
        mobile={setShow}
        tab={setTabResponsive}
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
        <Country expand={setCountry} />
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
                      {props.stats.nodes}/{props.stats.totalNodes}
                    </DataCount>
                    <NodeHistory>Node History (7 Days)</NodeHistory>
                    <NodeGraph />
                  </ContentData>
                  <CountryData>
                    <SpaceBetween>
                      <div>
                        <Countries>Countries</Countries>
                        <CountriesData>{props.stats.countries}</CountriesData>
                      </div>
                      <Image
                        src="/images/Expand.svg"
                        onClick={() => changeExpand(2)}
                      />
                    </SpaceBetween>
                    <Map />
                  </CountryData>
                </ContentSecurity>

                <ContentSpeed className="speed">
                  <ContentData>
                    <Heading>Best Block</Heading>
                    <DataCount>
                      #{" "}
                      <NumberFormat
                        value={props.stats.bestBlock}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </DataCount>
                    <DesktopAvgBlockTime>Avg Block Time</DesktopAvgBlockTime>
                    <BlockTime>{props.stats.avgBlock + " "}Sec</BlockTime>
                  </ContentData>

                  <CountryData>
                    <SpaceBetween>
                      <div>
                        <Countries>Last Block</Countries>
                        <CountriesData>{props.stats.lastBlock}</CountriesData>
                      </div>
                    </SpaceBetween>
                    <Speedbar>
                      <LastBlockBar />
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
                      <img src="/images/Down.svg" alt=" " />
                      {" " + Eth} than Ethereum
                    </EthDiv>
                    <NodeHistory>Avg Transaction Speed</NodeHistory>
                    <BlockTime>{props.stats.avgRate + " "}TPS</BlockTime>
                  </ContentData>
                  <CountryData>
                    <SpaceBetween>
                      <div>
                        <Countries>UP Time</Countries>
                        <CountriesData>{props.stats.upTime}%</CountriesData>
                      </div>

                      <SelectionDiv>
                        <SelectionDivStyle
                          onClick={() => {
                            fetchTime(30);
                            setButtonToggle(1);
                          }}
                          buttonToggle={buttonToggle}
                        >
                          30D
                        </SelectionDivStyle>

                        <SelectionDivStyleTwo
                          buttonToggle={buttonToggle}
                          onClick={() => {
                            fetchTime(7);
                            setButtonToggle(2);
                          }}
                          style={{ borderRadius: "0px" }}
                        >
                          7D
                        </SelectionDivStyleTwo>
                        <SelectionDivStyleThree
                          buttonToggle={buttonToggle}
                          onClick={() => {
                            fetchTime(1);
                            setButtonToggle(3);
                          }}
                          style={{
                            borderRight: "none",
                            borderRadius: "0px 4px 4px 0px",
                          }}
                        >
                          24H
                        </SelectionDivStyleThree>
                      </SelectionDiv>
                    </SpaceBetween>
                    <Speedbar>
                      {props.stats.efficiency.length !== 0 ? (
                        <UpTimeBar data={props.stats.efficiency}></UpTimeBar>
                      ) : (
                        <div></div>
                      )}
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
                        {props.stats.nodes}/{props.stats.totalNodes}
                      </DataCount>
                      <NodeHistory>Node History (7 Days)</NodeHistory>
                      <NodeGraph />
                    </ContentData>
                    <CountryData>
                      <SpaceBetween>
                        <div>
                          <Countries>Countries</Countries>
                          <CountriesData>{props.stats.countries}</CountriesData>
                        </div>
                        <Image
                          src="/images/Expand.svg"
                          onClick={() => changeExpand(2)}
                        />
                      </SpaceBetween>
                      <MapDiv>
                        <Map />
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
                          value={props.stats.bestBlock}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </DataCount>
                      <div style={{ marginTop: "55px" }}></div>
                      <NodeHistory>Avg Block Time</NodeHistory>
                      <BlockTime>{props.stats.avgBlock + " "}Sec</BlockTime>
                    </ContentData>

                    <CountryData>
                      <SpaceBetween>
                        <div>
                          <Countries>Last Block</Countries>
                          <CountriesData>{props.stats.lastBlock}</CountriesData>
                        </div>
                      </SpaceBetween>
                      <Speedbar>
                        <LastBlockBar />
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
                        <img src="/images/Down.svg" alt=" " />
                        {" " + Eth} than Ethereum
                      </EthDiv>
                      <NodeHistory>Avg Transaction Speed</NodeHistory>
                      <BlockTime>{props.stats.avgRate + " "}TPS</BlockTime>
                    </ContentData>
                    <CountryData>
                      <SpaceBetween>
                        <div>
                          <Countries>UP Time</Countries>
                          <CountriesData>{props.stats.upTime}%</CountriesData>
                        </div>
                        <SelectionDiv>
                          <SelectionDivStyle
                            onClick={() => {
                              fetchTime(30);
                              setButtonToggle(1);
                            }}
                            buttonToggle={buttonToggle}
                          >
                            30D
                          </SelectionDivStyle>

                          <SelectionDivStyleTwo
                            buttonToggle={buttonToggle}
                            onClick={() => {
                              fetchTime(7);
                              setButtonToggle(2);
                            }}
                            style={{ borderRadius: "0px" }}
                          >
                            7D
                          </SelectionDivStyleTwo>
                          <SelectionDivStyleThree
                            buttonToggle={buttonToggle}
                            onClick={() => {
                              fetchTime(1);
                              setButtonToggle(3);
                            }}
                            style={{
                              borderRight: "none",
                              borderRadius: "0px 4px 4px 0px",
                            }}
                          >
                            24H
                          </SelectionDivStyleThree>
                        </SelectionDiv>
                      </SpaceBetween>
                      <Speedbar>
                        <UpTimeBar data={props.stats.efficiency}></UpTimeBar>
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
                        {props.stats.nodes}/{props.stats.totalNodes}
                      </DataCount>
                      <NodeHistory>Node History (7 Days)</NodeHistory>
                      <MobileGraphDiv>
                        <NodeGraph />
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
                          <BestBlockData>{props.stats.countries}</BestBlockData>
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
                          value={props.stats.bestBlock}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </BestBlockData>
                    </div>
                    <div>
                      <LastBlock>LastBlock</LastBlock>
                      <LastBLockData> {props.stats.lastBlock}</LastBLockData>
                    </div>
                  </SpaceBetween>
                  <MobileAverageBlock>Avg Block Time</MobileAverageBlock>
                  <MobileAverageBlockData>
                    {props.stats.avgBlock + " "}Sec
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
                        <img src="/images/Down.svg" alt=" " />
                        {" " + Eth} than Ethereum
                      </EthDiv>
                    </div>
                    <div>
                      <LastBlock>UP Time</LastBlock>
                      <LastBLockData> {props.stats.upTime}%</LastBLockData>
                    </div>
                  </SpaceBetween>
                  <SpaceBetween>
                    <div>
                      <MobileAverageBlock>
                        Avg Transaction Speed
                      </MobileAverageBlock>
                      <MobileAverageBlockData>
                        {props.stats.avgRate + " "}TPS
                      </MobileAverageBlockData>
                    </div>
                    <SelectionDiv>
                      <SelectionDivStyle
                        onClick={() => {
                          fetchTime(30);
                          setButtonToggle(1);
                        }}
                        buttonToggle={buttonToggle}
                      >
                        30D
                      </SelectionDivStyle>

                      <SelectionDivStyleTwo
                        buttonToggle={buttonToggle}
                        onClick={() => {
                          fetchTime(7);
                          setButtonToggle(2);
                        }}
                        style={{ borderRadius: "0px" }}
                      >
                        7D
                      </SelectionDivStyleTwo>
                      <SelectionDivStyleThree
                        buttonToggle={buttonToggle}
                        onClick={() => {
                          fetchTime(1);
                          setButtonToggle(3);
                        }}
                        style={{
                          borderRight: "none",
                          borderRadius: "0px 4px 4px 0px",
                        }}
                      >
                        24H
                      </SelectionDivStyleThree>
                    </SelectionDiv>
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
        </>
      )}
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
`;

const JoyrideTextContainer = styled.div`
  background: white;
  border-radius: 10px;
  display: flex;
  font-size: 1rem !important;
  color: #1f1f1f !important;
  font-family: "Inter" !important;
  width: 100%;
`;

const JoyrideNextButton = styled.button`
  background-color: #2358e5;
  outline: none;
  border: none;
  width: 100%;
  max-width: 63px;
  color: white;
  border-radius: 2px;
  padding: 4px;
  font-size: 0.8rem;

  display: ${(props) => (props.showBackCount === 2 ? "none" : "flex")};
  justify-content: center;
  align-items: center;
`;
const BackDropStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  top: 392px;
  right: 0;
  @media (min-width: 1024px) {
    display: none;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    top: 348px;
  }
`;
const JoyrideBackButton = styled.div`
  font-size: 0.8rem;
  font-family: Inter;
  font-weight: 600;
  color: #2256df;
  border-radius: 4px;
  padding: 4px;

  align-items: center;
  justify-content: center;
  margin-right: 14px;
  display: ${(props) => (props.showBackCount === 0 ? "none" : "flex")};
`;

const Img = styled.img`
  display: flex;
  justify-content: flex-end;
`;

const MainContainer = styled.div`
  width: 100%;
`;
const Title = styled.div`
  color: #c8d1f1;
  width: 33.33%;
  font-size: 1.1rem;
  font-weight: 600;
  border-right: 1px solid #274598;
  padding: 8px 6px 8px 16px;
`;
const Span = styled.div`
  font-size: 10px;
  font-weight: 600;
  font-family: Inter;
  color: #ffffff;
  margin-top: 4px;
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
  font-size: 0.9rem;
  font-weight: 600;
  border-right: 2px solid #274598;

  padding: 4px 11px 4px 11px;
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
  font-size: 0.9rem;
  font-weight: 600;
  border-right: 2px solid #274598;
  padding: 4px 11px 4px 11px;
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

  font-size: 0.9rem;
  font-weight: 600;
  border-right: 2px solid #274598;
  padding: 4px 11px 4px 11px;
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
  height: 270px;
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
  height: 270px;
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
  height: 270px;
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
  @media (min-width: 1025px) {
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
  font-size: 1rem;
  font-weight: 600;
  height: 27px;
  white-space: nowrap;
  border-bottom: ${(props) =>
    props.mobileTab === 1 ? "2px solid #ffffff" : ""};
  color: ${(props) => (props.mobileTab === 1 ? "white" : "#667fc1")};
`;
const ColorDivCountries = styled.div`
  font-size: 1rem;
  height: 27px;
  font-weight: 600;
  white-space: nowrap;
  border-bottom: ${(props) =>
    props.mobileTab === 2 ? "2px solid #ffffff" : ""};
  color: ${(props) => (props.mobileTab === 2 ? "white" : "#667fc1")};
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
const DesktopAvgBlockTime = styled.div`
  color: #667fc1;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 68px;
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
  width: 25px;
  padding-bottom: 25px;
  @media (min-width: 767px) and (max-width: 1024px) {
    width: 25px;
  }
`;
const BlockTime = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
`;
const Speedbar = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 500px;
  margin-left: -4px;
  @media (min-width: 100px) and (max-width: 1024px) {
    margin-top: 18px;
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
  height: 33px;
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
  margin-left: -38px;
`;
const EthDiv = styled.div`
  font-size: 14px;
  font-family: "Inter";
  color: #3af219;
  margin-bottom: 45px;
`;
const SelectionDiv = styled.div`
  display: flex;
  width: 100%;

  max-width: 133px;
  border-radius: 4px;
  height: 28px;
  align-items: center;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
  background-color: #1c3c93;
  margin-right: 20px;
`;
const SelectionDivStyle = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-family: Inter;

  padding: 6px;
  height: 28px;
  width: 100%;
  border-radius: 4px 0px 0px 4px;
  border-right: 0.5px solid #3c70ff;
  cursor: pointer;

  color: ${(props) => (props.buttonToggle === 1 ? "#ffffff" : "#3C70FF")};

  background-color: ${(props) =>
    props.buttonToggle === 1 ? "#3c70ff" : "#1C3C93"};
  /* 
  :hover {
    background-color: #3c70ff;
  } */
`;
const SelectionDivStyleTwo = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-family: Inter;

  padding: 6px;
  width: 100%;
  height: 28px;
  border-radius: 4px 0px 0px 4px;
  border-right: 0.5px solid #3c70ff;
  cursor: pointer;
  color: ${(props) => (props.buttonToggle === 2 ? "#ffffff" : "#3C70FF")};

  background-color: ${(props) =>
    props.buttonToggle === 2 ? "#3c70ff" : "#1C3C93"};

  /* :hover {
    background-color: #3c70ff;
  } */
`;
const SelectionDivStyleThree = styled.div`
  font-size: 12px;
  font-weight: 600;
  font-family: Inter;

  padding: 6px;
  height: 28px;
  width: 100%;
  border-radius: 4px 0px 0px 4px;
  border-right: 0.5px solid #3c70ff;
  cursor: pointer;
  color: ${(props) => (props.buttonToggle === 3 ? "#ffffff" : "#3C70FF")};

  background-color: ${(props) =>
    props.buttonToggle === 3 ? "#3c70ff" : "#1C3C93"};

  /* :hover {
    background-color: #3c70ff;
  } */
`;

const mapStateToProps = (state) => {
  return { stats: state.stats };
};

export default connect(mapStateToProps, { dispatchAction })(Dashboard);
