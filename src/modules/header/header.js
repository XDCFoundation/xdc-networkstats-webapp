import * as React from "react";
import { Column, Row } from "simple-flexbox";
import styled from "styled-components";
import Side from "../dashboard/sideDrawer";

const HeaderNav = styled.nav`
  background-color: #2149b9;
  display: flex;
  justify-content: space-between;
  height: 56px;
  color: white;

  width: 100%;
`;
const HeaderLogoElement = styled.img`
  padding-left: 10px;
  padding-top: 10px;
  cursor: pointer;
`;
const StartLogo = styled.div`
  display: inline-flex;
  margin-top: 3px;
  margin-right: 5px;
`;
const HeaderLabel = styled.span`
  padding-top: 15px;
  color: white;
  padding-left: 10px;
  font-family: "Inter";
`;
const StartGuidedLabel = styled.span`
  padding-top: 5px;
  color: white;
  font-weight: 400;
  font-family: "Inter";
  @media (max-width: 425px) {
    display: none;
  }
`;
const NavbarIcon = styled.div`
  margin-right: 12px;
`;
const StartGuideTourButton = styled.button`
  color: white;
  background: #2a52c1 0% 0% no-repeat padding-box;
  border-radius: 4px;
  align-items: center;
  text-align: center;
  display: flex;
  border: none;
  cursor: pointer;
  white-space: nowrap;
`;
export default function Header(props) {
  return (
    // <>
    //   <HeaderNav>
    //     <Row>
    //       <Column>
    //         <div>
    //           <HeaderLogoElement src="/images/XDC-Logo.svg" />
    //           <HeaderLogoElement src="/images/VerticalLine.svg" />
    //         </div>
    //       </Column>
    //       <Column>
    //         <HeaderLabel>Network Stats</HeaderLabel>
    //       </Column>
    //     </Row>
    //     <Row>
    //       <StartGuideTourButton
    //         onClick={() => {
    //           props.setJoyrideRun(true);
    //         }}
    //       >
    //         <Row>
    //           <Column>
    //             <StartLogo>
    //               <img src="/images/Play.svg" alt="Start" />
    //             </StartLogo>
    //           </Column>
    //           <Column>
    //             <StartGuidedLabel>Start Guided Tour</StartGuidedLabel>
    //           </Column>
    //         </Row>
    //       </StartGuideTourButton>
    //       <Column>
    //         <NavbarIcon onClick={() => props.changeSide(true)}>
    //           <HeaderLogoElement src="/images/Hamburger.svg" />
    //         </NavbarIcon>
    //       </Column>
    //     </Row>
    //     {props.SwitchSide === true ? <Side close={props.changeSide} /> : ""}
    //   </HeaderNav>
    // </>

    <DivRow>
      <SpaceBetween>
        <div style={{ display: "flex", alignItems: "center" }}>
          {" "}
          <img src="/images/XDC-Logo.svg" />
          <img src="/images/VerticalLine.svg" />
          <NetworkStats>Network Stats</NetworkStats>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <StartGuideTourButton
            onClick={() => {
              props.setJoyrideRun(true);
            }}
          >
            <StartLogo>
              <img src="/images/Play.svg" alt="Start" />
            </StartLogo>

            <StartGuidedLabel>Start Guided Tour</StartGuidedLabel>
          </StartGuideTourButton>
          <NavbarIcon onClick={() => props.changeSide(true)}>
            <HeaderLogoElement src="/images/Hamburger.svg" />
          </NavbarIcon>
        </div>
      </SpaceBetween>
      {props.SwitchSide === true ? <Side close={props.changeSide} /> : ""}
    </DivRow>
  );
}
const DivRow = styled.div`
  background: #2149b9 0% 0% no-repeat padding-box;
  width: 100%;
  padding: 10px;
  white-space: nowrap;
`;
const NetworkStats = styled.div`
  font-size: 1rem;
  font-weight: 600;
  font-family: Inter;
  color: #ffffff;
  white-space: nowrap;
`;
const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;
