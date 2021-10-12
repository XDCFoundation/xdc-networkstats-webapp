import React from "react";
import { Column, Row } from "simple-flexbox";
import styled from "styled-components";

const Div = styled.div`
  background-color: #102e84;
  width: 383px;
  color: white;
  height: 1080px;
  position: absolute;
  left: 1138px;
  z-index: 1;
  justify-content: space-around;
  transition: linear;
  @media (max-width: 768px) {
    left: 425px;
    width: 340px;
  }
  @media (max-width: 425px) {
    left: 220px;
    width: 200px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  margin-bottom: 30px;
`;
const NavLabel = styled.span`
  display: flex;
  justify-content: space-between;
  color: #4666c4;
  padding-left: 10px;
`;

const Content = styled.span`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  font-size: 20px;
  margin-bottom: 15px;
`;

const Img = styled.img`
  padding-left: 10px;
`;
const CloseImg = styled.img`
  padding-left: 10px;
  cursor: pointer;
`;

export default function sideDrawer(props) {
  return (
    <Div>
      <Column>
        <Nav>
          <NavLabel>Browser</NavLabel>
          <Column>
            <CloseImg src="/images/Group 60.svg" alt="close" onClick={()=>{props.close(false)}}/>
          </Column>
        </Nav>
        <Column>
          <Row>
            <Img src="/images/NetworkStat.svg" alt="Network" />
            <Content> Network Stats </Content>
          </Row>
          <Row>
            <Img src="/images/MasterNodes.svg" alt="Master" />
            <Content>Masternodes</Content>
          </Row>
          <Row>
            <Img src="/images/Wallet.svg" alt="Wallet" />
            <Content>Web Wallet</Content>
          </Row>
          <Row>
            <Img src="/images/Wallet.svg" alt="Pay" />
            <Content>XinPay</Content>
          </Row>
          <Row>
            <Img src="/images/Android.svg" alt="Android" />
            <Content>Android Wallet</Content>
          </Row>
          <Row>
            <Img src="/images/Download.svg" alt="Download" />
            <Content>One Click Installer</Content>
          </Row>
          <Row>
            <Img src="/images/Documents.svg" alt="Documents" />
            <Content>XDC Docs</Content>
          </Row>
          <Row>
            <Img src="/images/APIs.svg" alt="Api" />
            <Content>XDC API</Content>
          </Row>
          <Row>
            <Img src="/images/Documents.svg" alt="Api Documents" />
            <Content>XDC API Docs</Content>
          </Row>
        </Column>
      </Column>
    </Div>
  );
}
