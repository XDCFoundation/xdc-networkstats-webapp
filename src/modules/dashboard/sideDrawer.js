import React from "react";
import styled from "styled-components";

const Blur = styled.div`
  background: rgba(0, 0, 0, 0.7) !important;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 1;
  transition: linear;
`;

const Div = styled.div`
  height: 100%;
  max-width: 280px;
  background-color: #102e84;
  width: 100%;
  color: white;
  position: fixed;
  left: auto;
  right: 0;
  z-index: 1;
  justify-content: space-around;
  transition: linear;
  padding: 16px;
  @media (min-width: 300px) and (max-width: 767px) {
    width: 100%;
    max-width: 200px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NavLabel = styled.span`
  @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
  display: flex;
  justify-content: space-between;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: #4666c4;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 0.8rem;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 0.9rem;
  }
`;

const Content = styled.span`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap");
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  cursor: pointer;
  @media (min-width: 300px) and (max-width: 767px) {
    font-size: 0.8rem;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 0.9rem;
  }
`;

const Img = styled.img`
  width: 100%;
  max-width: 35px;
`;
const CloseImg = styled.img`
  cursor: pointer;
`;

const RowDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid #4867c1;
  height: 50px;
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 30px;
`;
export default function sideDrawer(props) {
  return (
    <div>
      <Blur></Blur>
      <Div>
        <ColumnDiv>
          <Nav>
            <NavLabel>Browse</NavLabel>

            <CloseImg
              src="/images/Group 60.svg"
              alt="close"
              onClick={() => {
                props.close(false);
              }}
            />
          </Nav>
          <ColumnContainer>
            <RowDiv>
              <Img src="/images/NetworkStat.svg" alt="Network" />
              &nbsp;&nbsp;
              <Content> Network Stats </Content>
            </RowDiv>

            <RowDiv>
              <Img src="/images/MasterNodes.svg" alt="Master" /> &nbsp;&nbsp;
              <Content
                onClick={() =>
                  (window.location.href = "https://apothem.network/#masternode")
                }
              >
                Masternodes
              </Content>
            </RowDiv>

            <RowDiv>
              <Img src="/images/BlockExplorer.svg" alt="Block" /> &nbsp;&nbsp;
              <Content
                onClick={() =>
                  (window.location.href = "https://xinfin.network/#explorer")
                }
              >
                Block Explorer
              </Content>
            </RowDiv>

            <RowDiv>
              <Img src="/images/Wallet.svg" alt="Wallet" /> &nbsp;&nbsp;
              <Content
                onClick={() =>
                  (window.location.href = "https://wallet.apothem.network/#/")
                }
              >
                Web Wallet
              </Content>
            </RowDiv>

            <RowDiv>
              <Img src="/images/Wallet.svg" alt="Pay" /> &nbsp;&nbsp;
              <Content
                onClick={() =>
                  (window.location.href =
                    "https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo")
                }
              >
                XDC Pay
              </Content>
            </RowDiv>

            <RowDiv>
              <Img src="/images/Android.svg" alt="Android" /> &nbsp;&nbsp;
              <Content
                onClick={() =>
                  (window.location.href =
                    "https://play.google.com/store/apps/details?id=com.xdcwallet")
                }
              >
                Android Wallet
              </Content>
            </RowDiv>

            <RowDiv>
              <Img src="/images/Download.svg" alt="Download" /> &nbsp;&nbsp;
              <Content
                onClick={() =>
                  (window.location.href = "https://xinfin.org/setup-masternode")
                }
              >
                One Click Installer
              </Content>
            </RowDiv>

            <RowDiv>
              <Img src="/images/Documents.svg" alt="Documents" /> &nbsp;&nbsp;
              <Content
                onClick={() =>
                  (window.location.href = "https://howto.xinfin.org/")
                }
              >
                XDC Docs
              </Content>
            </RowDiv>

            <RowDiv>
              <Img src="/images/APIs.svg" alt="Api" /> &nbsp;&nbsp;
              <Content
                onClick={() =>
                  (window.location.href =
                    "https://apidocs.xinfin.network/docs/#xinfin-apis")
                }
                c
              >
                XDC API
              </Content>
            </RowDiv>

            <RowDiv>
              <Img src="/images/Documents.svg" alt="Api Documents" />{" "}
              &nbsp;&nbsp;
              <Content
                onClick={() =>
                  (window.location.href = "https://apidocs.xinfin.network/")
                }
              >
                XDC API Docs
              </Content>
            </RowDiv>
          </ColumnContainer>
        </ColumnDiv>
      </Div>
    </div>
  );
}
