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
  const changeShowTab = (value) => {
    setShow(value);
  };

  return (
    // <>
    //   {/* Header nav bar */}
    //   <Joyride //Start Guided Tour
    //     steps={TOUR_STEPS}
    //     callback={handleJoyrideCallback}
    //     continuous={true}
    //     styles={{
    //       tooltipContainer: {
    //         textAlign: "left",
    //       },
    //       buttonNext: {
    //         backgroundColor: "#2358E5",
    //         border: "none",
    //         width: 70,
    //         borderRadius: 0,
    //         fontSize: 13,
    //       },
    //       buttonBack: {
    //         marginRight: 10,
    //         color: "#2256DF",
    //         fontSize: 13,
    //       },
    //     }}
    //     spotlightPadding={0}
    //     run={joyrideRun}
    //   />
    //   <>
    //     <Header
    //       setJoyrideRun={setJoyrideRun}
    //       changeSide={changeSide}
    //       SwitchSide={SwitchSide}
    //     />
    //     {Expand === 2 ? (
    //       <Country
    //         expand={setCountry}
    //         location={content.stats.map}
    //         content={content}
    //       />
    //     ) : (
    //       ""
    //     )}
    //   </>
    //   {/* Section containers(Graph) */}
    //   <Div>
    //     {/* <Row style={{ width: "100%" }}> */}
    //     {/*Header for Tab and Mobile response*/}
    //     <HeaderCustom>
    //       <SectionLabel onClick={() => changeTab(1)}>Security</SectionLabel>
    //       <SectionLabel onClick={() => changeTab(2)}>Speed</SectionLabel>
    //       <SectionLabel onClick={() => changeTab(3)}>Efficiency</SectionLabel>
    //     </HeaderCustom>
    //     {/*Header for PC view*/}
    //     <HeaderContainer>
    //       <SectionLabel>Security</SectionLabel>
    //       <SectionLabel>Speed</SectionLabel>
    //       <SectionLabel>Efficiency</SectionLabel>
    //     </HeaderContainer>
    //     {/* </Row> */}
    //     <Row>
    //       {/*Switching of Tabs*/}
    //       {SwitchTab === 1 ? (
    //         <>
    //           <SecurityMain className="security">
    //             {" "}
    //             {/*Security Section for Main,Tab*/}
    //             <Row>
    //               <Column>
    //                 <Row>
    //                   <SecurityLabel>Heading</SecurityLabel>
    //                 </Row>
    //                 <Row>
    //                   {/* {content.stats.Heading}/{content.stats.totalHeading} */}
    //                   <TotalHeading>{content.stats.Heading}/200</TotalHeading>
    //                 </Row>
    //                 <Row>
    //                   <SecurityLabelMid>Node History (7 Days)</SecurityLabelMid>
    //                 </Row>
    //                 <Row>
    //                   <NodeGraph data={content} />
    //                 </Row>
    //               </Column>
    //               <Column>
    //                 <Row>
    //                   <Column>
    //                     <Row>
    //                       <SecurityLabelRight>Countries</SecurityLabelRight>
    //                     </Row>
    //                     <Countries>{content.stats.countries}</Countries>
    //                     <Row>
    //                       <MapContainer>
    //                         <Map location={content.stats.map} />
    //                       </MapContainer>
    //                     </Row>
    //                   </Column>
    //                   <Column>
    //                     <SecurityIcon
    //                       src="/images/Expand.svg"
    //                       onClick={() => changeExpand(2)}
    //                     />
    //                   </Column>
    //                 </Row>
    //               </Column>
    //             </Row>
    //           </SecurityMain>
    //           <SecurityMobDiv className="security">
    //             <>
    //               <Column>
    //                 <Row>
    //                   <HeaderMob onClick={() => changeMob(4)}>Heading</HeaderMob>
    //                   <HeaderMob onClick={() => changeMob(5)}>
    //                     Countries
    //                   </HeaderMob>
    //                   <SecurityIcon
    //                     src="/images/Expand.svg"
    //                     onClick={() => changeExpand(2)}
    //                   />
    //                 </Row>
    //                 {SwitchMob === 4 ? (
    //                   <>
    //                     <Row>
    //                       <SecurityLabel>Heading</SecurityLabel>
    //                     </Row>
    //                     <Row>{content.stats.Heading}/200</Row>
    //                     <Row>
    //                       <SecurityLabelMid>
    //                         Node History (7 Days)
    //                       </SecurityLabelMid>
    //                     </Row>
    //                     <Row>
    //                       <NodeGraph />
    //                     </Row>
    //                   </>
    //                 ) : (
    //                   ""
    //                 )}
    //                 {SwitchMob === 5 ? (
    //                   <>
    //                     <Row>
    //                       <SecurityLabelRight>Countries</SecurityLabelRight>
    //                     </Row>
    //                     <Row>
    //                       <Countries>{content.stats.countries}</Countries>
    //                     </Row>
    //                     <Row>
    //                       <MapContainer>
    //                         <Map />
    //                       </MapContainer>
    //                     </Row>
    //                   </>
    //                 ) : (
    //                   ""
    //                 )}

    //                 {/* <Column>
    //                 <SecurityIcon src="/images/Expand.svg" />
    //               </Column> */}
    //               </Column>
    //             </>
    //           </SecurityMobDiv>
    //         </>
    //       ) : (
    //         ""
    //       )}
    //       {SwitchTab === 2 ? (
    //         <>
    //           <SpeedTab className="speed">
    //             {" "}
    //             {/*Speed Section for Tab */}
    //             <Row>
    //               <Column>
    //                 <Row>
    //                   <SpeedLabel>Best Block</SpeedLabel>
    //                 </Row>
    //                 <Row>
    //                   <Blocks>
    //                     #
    //                     <NumberFormat
    //                       value={content.stats.bestBlock}
    //                       displayType={"text"}
    //                       thousandSeparator={true}
    //                     />
    //                   </Blocks>
    //                 </Row>
    //                 <Row>
    //                   <SpeedLabelMid>Avg Block Time</SpeedLabelMid>
    //                 </Row>
    //                 <Row>
    //                   <Blocks>{content.stats.avgBlock}Sec</Blocks>
    //                 </Row>
    //               </Column>
    //               <Column>
    //                 <Row>
    //                   <SpeedLabelRight>Last Block</SpeedLabelRight>
    //                 </Row>
    //                 <LastBlock>{content.stats.lastBlock}s ago</LastBlock>
    //                 <Row>
    //                   <Speedbar>
    //                     <LastBlockBar content={content} />
    //                   </Speedbar>
    //                 </Row>
    //                 <Row>
    //                   <Column>
    //                     <BlockBarLeftLabel>
    //                       <BlockBarLabelColor>Min</BlockBarLabelColor>
    //                       1s
    //                     </BlockBarLeftLabel>
    //                   </Column>
    //                   <Column>
    //                     <BlockBarRightLabel>
    //                       <BlockBarLabelColor>Max</BlockBarLabelColor>
    //                       26s
    //                     </BlockBarRightLabel>
    //                   </Column>
    //                 </Row>
    //               </Column>
    //             </Row>
    //           </SpeedTab>
    //           <SpeedMob className="speed">
    //             {" "}
    //             {/*Speed Section for Mob */}
    //             <Column>
    //               <Row>
    //                 <SpeedLabel>Best Block</SpeedLabel>
    //                 <SpeedLabelRight>Last Block</SpeedLabelRight>
    //               </Row>
    //               <Row>
    //                 <Blocks>#{content.stats.bestBlock}</Blocks>
    //                 <LastBlock>{content.stats.lastBlock}s ago</LastBlock>
    //               </Row>
    //               <Row>
    //                 <SpeedLabelMid>Avg Block Time</SpeedLabelMid>
    //               </Row>
    //               <Row>
    //                 <Blocks>{content.stats.avgBlock}Sec</Blocks>
    //               </Row>
    //               <Row>
    //                 <Speedbar>
    //                   <LastBlockBar content={content} />
    //                 </Speedbar>
    //               </Row>
    //               <Row>
    //                 <Column>
    //                   <BlockBarLeftLabel>
    //                     <BlockBarLabelColor>Min</BlockBarLabelColor>
    //                     1s
    //                   </BlockBarLeftLabel>
    //                 </Column>
    //                 <Column>
    //                   <BlockBarRightLabel>
    //                     <BlockBarLabelColor>Max</BlockBarLabelColor>
    //                     26s
    //                   </BlockBarRightLabel>
    //                 </Column>
    //               </Row>
    //             </Column>
    //           </SpeedMob>
    //         </>
    //       ) : (
    //         ""
    //       )}
    //       {SwitchTab === 3 ? (
    //         <>
    //           <EfficiencyTab>
    //             {/*Efficiency Section for Tab*/}
    //             <Row>
    //               <Column>
    //                 <Row>
    //                   <EfficiencyLabel>Gas Price</EfficiencyLabel>
    //                 </Row>
    //                 <Row>{content.stats.gasPrice}</Row>
    //                 <Row>
    //                   <EfficiencyLabelMid>
    //                     Avg Transaction Rate
    //                   </EfficiencyLabelMid>
    //                 </Row>
    //                 <Row>{content.stats.avgRate}TPS</Row>
    //               </Column>
    //               <Column>
    //                 <EfficiencyLabelRight>Up Time</EfficiencyLabelRight>
    //                 <Row>
    //                   <UpTime>{content.stats.upTime}%</UpTime>
    //                   <div>
    //                     <Row>
    //                       <ButtonDiv>
    //                         <Button>30D</Button>
    //                         <Button>7D</Button>
    //                         <Button>24H</Button>
    //                       </ButtonDiv>
    //                     </Row>
    //                   </div>
    //                 </Row>
    //                 <Row>
    //                   <EffiencyBar>
    //                     <UpTimeTab />
    //                   </EffiencyBar>
    //                 </Row>
    //               </Column>
    //             </Row>
    //           </EfficiencyTab>
    //           <EfficiencyMob>
    //             {/*Efficiency Section for Mob*/}
    //             <Row>
    //               <Column>
    //                 <Row>
    //                   <EfficiencyLabel>Gas Price</EfficiencyLabel>
    //                   <EfficiencyLabelRight>Up Time</EfficiencyLabelRight>
    //                 </Row>
    //                 <Row>
    //                   {content.stats.gasPrice}
    //                   <UpTime>{content.stats.upTime}%</UpTime>
    //                 </Row>
    //                 <Row>
    //                   <EfficiencyLabelMid>
    //                     Avg Transaction Rate
    //                   </EfficiencyLabelMid>
    //                 </Row>
    //                 <Row>
    //                   {content.stats.avgRate}TPS
    //                   <ButtonDiv>
    //                     <Button>30D</Button>
    //                     <Button>7D</Button>
    //                     <Button>24H</Button>
    //                   </ButtonDiv>
    //                 </Row>
    //                 <Row>
    //                   <EffiencyBar>
    //                     <UpTimeBar></UpTimeBar>
    //                   </EffiencyBar>
    //                 </Row>
    //               </Column>
    //             </Row>
    //           </EfficiencyMob>
    //         </>
    //       ) : (
    //         ""
    //       )}
    //       <SpeedMain className="speed">
    //         {" "}
    //         {/*Speed Section for Main*/}
    //         <Row>
    //           <Column>
    //             <Row>
    //               <SpeedLabel>Best Block</SpeedLabel>
    //             </Row>
    //             <Row>
    //               <Blocks>
    //                 #
    //                 <NumberFormat
    //                   value={content.stats.bestBlock}
    //                   displayType={"text"}
    //                   thousandSeparator={true}
    //                 />
    //               </Blocks>
    //             </Row>
    //             <Row>
    //               <SpeedLabelMid>Avg Block Time</SpeedLabelMid>
    //             </Row>
    //             <Row>
    //               <Blocks>{content.stats.avgBlock}Sec</Blocks>
    //             </Row>
    //           </Column>
    //           <Column>
    //             <Row>
    //               <SpeedLabelRight>Last Block</SpeedLabelRight>
    //             </Row>
    //             <LastBlock>{content.stats.lastBlock}s ago</LastBlock>
    //             <Row>
    //               <Speedbar>
    //                 <LastBlockBar content={content} />
    //               </Speedbar>
    //             </Row>
    //             <Row>
    //               <Column>
    //                 <BlockBarLeftLabel>
    //                   <BlockBarLabelColor>Min &nbsp;</BlockBarLabelColor>
    //                   1s
    //                 </BlockBarLeftLabel>
    //               </Column>
    //               <Column>
    //                 <BlockBarRightLabel>
    //                   <BlockBarLabelColor>Max &nbsp;</BlockBarLabelColor>
    //                   26s
    //                 </BlockBarRightLabel>
    //               </Column>
    //             </Row>
    //           </Column>
    //         </Row>
    //       </SpeedMain>
    //       <EfficiencyMain className="efficiency">
    //         {/*Efficiency Section for Main*/}
    //         <Row>
    //           <Column>
    //             <Row>
    //               <EfficiencyLabel>Gas Price</EfficiencyLabel>
    //             </Row>
    //             <Row>{content.stats.gasPrice}</Row>
    //             <Row>
    //               <EfficiencyLabelMid>Avg Transaction Rate</EfficiencyLabelMid>
    //             </Row>
    //             <Row>{content.stats.avgRate}TPS</Row>
    //           </Column>
    //           <Column>
    //             <Row>
    //               <EfficiencyLabelRight>Up Time</EfficiencyLabelRight>
    //             </Row>
    //             <Row>
    //               <UpTime>{content.stats.upTime}%</UpTime>
    //               <div>
    //                 <Row>
    //                   <ButtonDiv>
    //                     <Button>30D</Button>
    //                     <Button>7D</Button>
    //                     <Button>24H</Button>
    //                   </ButtonDiv>
    //                 </Row>
    //               </div>
    //             </Row>
    //             <Row>
    //               <Column>
    //                 <EffiencyBar>
    //                   <UpTimeBar> </UpTimeBar>
    //                 </EffiencyBar>
    //               </Column>
    //             </Row>
    //           </Column>
    //         </Row>
    //       </EfficiencyMain>
    //     </Row>
    //   </Div>
    //   {/* Table view */}
    //   <TableDiv>
    //     <Table content={content} />
    //   </TableDiv>
    //   <Footer>© 2021 XDC Network. All Rights Reserved.</Footer>
    // </>
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
          <Security
            onClick={() => {
              changeShowTab(1);
            }}
          >
            Security
          </Security>
          <Speed
            onClick={() => {
              changeShowTab(2);
            }}
          >
            Speed
          </Speed>
          <Efficiency
            onClick={() => {
              changeShowTab(3);
            }}
          >
            Efficiency
          </Efficiency>
        </Container>

        <ContentParent>
          {show <= 1 ? (
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
          {show === 2 ? (
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
          {show === 3 ? (
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
                  <UpTimeBar> </UpTimeBar>
                </Speedbar>
              </CountryData>
            </ContentEfficiency>
          ) : (
            ""
          )}
        </ContentParent>
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
const Container = styled.div`
  background: #1c3c93 0% 0% no-repeat padding-box;
  width: 100%;
  display: flex;
  padding: 15px;
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
    /* display: ${(props) => (props.show == 1 ? `block` : `none`)}; */
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
    /* display: ${(props) => (props.show == 2 ? `none` : `block`)}; */
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
    /* display: ${(props) => (props.show == 3 ? `none` : `block`)}; */
  }
`;
const ContentParent = styled.div`
  display: flex;
  width: 100%;
`;
const Heading = styled.div`
  color: #667fc1;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
`;
const ContentData = styled.div`
  width: 100%;

  @media (min-width: 300px) and (max-width: 767px) {
    width: 100%;
    max-width: 478px;
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
  width: 100%;
  max-width: 282px;
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
