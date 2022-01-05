import React, { useState } from "react";
import styled from "styled-components";
import SideDrawer from "../dashboard/sideDrawer";
import Side from "../dashboard/sideDrawer";

const HeaderLogoElement = styled.img`
  cursor: pointer;
`;

const StartGuidedLabel = styled.span`
  color: white;
  font-weight: 400;
  font-family: "Inter";
  font-size: 1rem;
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
  width: 100%;
  max-width: 186px;
  padding: 6px 5px 8px 6px;
  @media (min-width: 100px) and (max-width: 767px) {
    display: none;
  }
`;
export default function Header(props) {
  return (
    <DivRow>
      <SpaceBetween>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/images/XDC-Logo.svg" />
          <img src="/images/VerticalLine.svg" />
          <NetworkStats>Network Stats</NetworkStats>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <StartGuideTourButton
            onClick={() => {
              props.setJoyrideRun(true);
              props.setShowTabJoyRide(true);
              props.expand(false);
              props.tab(1);
            }}
          >
            <img src="/images/Play.svg" alt="Start" />
            <StartGuidedLabel>Start Guided Tour</StartGuidedLabel>&nbsp;
          </StartGuideTourButton>
          <StartGuideTourButtonTab
            onClick={() => {
              props.setShowTabJoyRide(true);
              props.expand(false);
              props.mobile(1);
            }}
          >
            <PlayImage src="/images/Play.svg" alt="Start" />
          </StartGuideTourButtonTab>
          &emsp;
          <HeaderLogoElement
            src="/images/Hamburger.svg"
            onClick={() => props.setShowSideDrop(true)}
          />
        </div>
      </SpaceBetween>
    </DivRow>
  );
}
const DivRow = styled.div`
  background: #2149b9 0% 0% no-repeat padding-box;
  width: 100%;
  padding: 8px;
  white-space: nowrap;
`;
const NetworkStats = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  font-family: Inter;
  color: #ffffff;
  white-space: nowrap;
  margin-left: 9px;
`;
const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StartGuideTourButtonTab = styled.div`
  color: white;
  background: #2a52c1 0% 0% no-repeat padding-box;
  border-radius: 4px;
  align-items: center;
  text-align: center;
  display: flex;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  width: 100%;
  max-width: 186px;
  padding: 6px 5px 8px 6px;
  @media (min-width: 767px) {
    display: none;
  }
  @media (min-width: 300px) and (max-width: 767px) {
    margin-right: -12px;
    padding: 4px;
  }
`;
const PlayImage = styled.img`
  width: 20px;
`;
