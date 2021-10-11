import * as React from "react";
import { Column, Row } from "simple-flexbox";
import styled from "styled-components";
const HeaderNav = styled.nav`
  background-color: #2149b9;
  display: flex;
  justify-content: space-between;
  height: 56px;
  color: white;
  margin-right: 10px;
  width: 100%;
`;
const HeaderLogoElement = styled.img`
  padding-left: 10px;
  padding-top: 10px;
`;
const StartLogo = styled.div`
  display: inline-flex;
  margin-top: 3px;
  margin-right: 5px;
`;
const HeaderLabel = styled.span`
  padding-top: 15px;
  color: white;
`;
const StartGuidedLabel = styled.span`
  padding-top: 5px;
  color: white;
  @media (max-width: 425px)
  {
    display: none;
  }
`;
const NavbarIcon = styled.div`
  margin-right: 12px;
`;
const StartGuideTourButton = styled.button`
  margin-top: 7px;
  margin-bottom: 7px;
  color: white;
  background: #2a52c1 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  border: none;
  cursor: pointer;
`;
export default function Header() {
  return (
    <>
      <HeaderNav>
        <Row>
          <Column>
            <div>
              <HeaderLogoElement src="/images/XDC-Logo.svg" />
              <HeaderLogoElement src="/images/VerticalLine.svg" />
            </div>
          </Column>
          <Column>
            <HeaderLabel>Network Stats</HeaderLabel>
          </Column>
        </Row>
        <Row>
          <StartGuideTourButton onClick={"#"}>
            <Row>
              <Column>
                <StartLogo>
                  <img src="/images/Play.svg" alt="Start" />
                </StartLogo>
              </Column>
              <Column>
                <StartGuidedLabel>Start Guided Tour</StartGuidedLabel>
              </Column>
            </Row>
          </StartGuideTourButton>
          <Column>
            <NavbarIcon>
              <HeaderLogoElement src="/images/Hamburger.svg" />
            </NavbarIcon>
          </Column>
        </Row>
      </HeaderNav>
    </>
  );
}
