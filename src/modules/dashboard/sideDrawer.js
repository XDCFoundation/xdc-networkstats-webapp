import React from "react";

import { Column, Row } from "simple-flexbox";
import styled from "styled-components";

const Blur = styled.div`
  background: rgba(0, 0, 0, 0.7) !important;
  /* width: 1537px;
  height: 1080px; */
  position: fixed;
  z-index: 1;
  transition: linear;
  /* @media (max-width: 1025px) {
    width: 700px;
  }
  @media (max-width: 415px) {
    width: 270px;
  } */
`;

const Div = styled.div`
  background-color: #102e84;
  /* width: 383px; */
  color: white;
  /* height: 1080px; */
  position: fixed;
  left: 1537px;
  z-index: 1;
  justify-content: space-around;
  transition: linear;

  /* @media (max-width: 1025px) {
    left: 685px;
    width: 340px;
  }
  @media (max-width: 415px) {
    left: 220px;
    width: 200px;
  } */
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  /* padding-top: 10px;
  padding-bottom: 50px; */
`;
const NavLabel = styled.span`
  display: flex;
  justify-content: space-between;
  color: #4666c4;
  /* padding-left: 10px;
  padding-top: 15px; */
`;

const Content = styled.span`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  font-size: 18px;
  margin-top: 5px;
  cursor: pointer;
`;

const Img = styled.img`
  padding-left: 10px;
  margin-bottom: -10px;
`;
const CloseImg = styled.img`
  cursor: pointer;
  padding-right: 15px;
  padding-top: 15px;
`;

const Line = styled.hr`
  border: 1px solid #4867c1;
  height: 0px;
  width: 350px;
  opacity: 1;
  margin-bottom: 5px;
  @media (max-width: 1025px) {
    width: 300px;
  }
  @media (max-width: 415px) {
    width: 150px;
  }
`;

export default function sideDrawer(props) {
  return (
    <>
      <Blur />
      <Div>
        <Column>
          <Nav>
            <NavLabel>Browser</NavLabel>
            <Column>
              <CloseImg
                src="/images/Group 60.svg"
                alt="close"
                onClick={() => {
                  props.close(false);
                }}
              />
            </Column>
          </Nav>
          <Column>
            <Row>
              <Img src="/images/NetworkStat.svg" alt="Network" />
              <Content> Network Stats </Content>
            </Row>
            <Line />
            <Row>
              <Img src="/images/MasterNodes.svg" alt="Master" />
              <Content
                onClick={() =>
                  (window.location.href = "https://apothem.network/#masternode")
                }
              >
                Masternodes
              </Content>
            </Row>
            <Line />
            <Row>
              <Img src="/images/BlockExplorer.svg" alt="Block" />
              <Content
                onClick={() =>
                  (window.location.href = "https://xinfin.network/#explorer")
                }
              >
                Block Explorer
              </Content>
            </Row>
            <Line />
            <Row>
              <Img src="/images/Wallet.svg" alt="Wallet" />
              <Content
                onClick={() =>
                  (window.location.href = "https://wallet.apothem.network/#/")
                }
              >
                Web Wallet
              </Content>
            </Row>
            <Line />
            <Row>
              <Img src="/images/Wallet.svg" alt="Pay" />
              <Content
                onClick={() =>
                  (window.location.href =
                    "https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo")
                }
              >
                XDC Pay
              </Content>
            </Row>
            <Line />
            <Row>
              <Img src="/images/Android.svg" alt="Android" />
              <Content
                onClick={() =>
                  (window.location.href =
                    "https://play.google.com/store/apps/details?id=com.xdcwallet")
                }
              >
                Android Wallet
              </Content>
            </Row>
            <Line />
            <Row>
              <Img src="/images/Download.svg" alt="Download" />
              <Content
                onClick={() =>
                  (window.location.href = "https://xinfin.org/setup-masternode")
                }
              >
                One Click Installer
              </Content>
            </Row>
            <Line />
            <Row>
              <Img src="/images/Documents.svg" alt="Documents" />
              <Content
                onClick={() =>
                  (window.location.href = "https://howto.xinfin.org/")
                }
              >
                XDC Docs
              </Content>
            </Row>
            <Line />
            <Row>
              <Img src="/images/APIs.svg" alt="Api" />
              <Content
                onClick={() =>
                  (window.location.href =
                    "https://apidocs.xinfin.network/docs/#xinfin-apis")
                }
                c
              >
                XDC API
              </Content>
            </Row>
            <Line />
            <Row>
              <Img src="/images/Documents.svg" alt="Api Documents" />
              <Content
                onClick={() =>
                  (window.location.href = "https://apidocs.xinfin.network/")
                }
              >
                XDC API Docs
              </Content>
            </Row>
            <Line />
          </Column>
        </Column>
      </Div>
    </>
  );
}
