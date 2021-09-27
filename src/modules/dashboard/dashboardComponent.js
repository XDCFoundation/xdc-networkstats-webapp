import React from "react";
import Header from "../header/header";
import { Row } from "simple-flexbox";
import styled from "styled-components";

const HeaderContainer = styled.nav`
  background-color: #1c3c93;
  display: flex;
  width: 100%;
  height: 38px;
  justify-content: space-between;
`;
const SectionLabel = styled.div`
  color: #c8d1f1;
  /* margin-top: 8px;
  margin-bottom: 8px; */
  margin-left: 12px;
  display: flex;
  justify-content: space-between;
  width: 33.33%;
  border-right: 1px solid #274598;
`;
const SectionContent = styled.div`
  background-color: #102c78;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-between;
  border-right: 1px solid #274598;
`;

export default function dashboard() {
  return (
    <div>
      {/* Header nav bar */}
      <Header />
      {/* Section containers(Graph) */}
      <div>
        <Row>
          <HeaderContainer>
            <SectionLabel>Security</SectionLabel>
            <SectionLabel>Speed</SectionLabel>
            <SectionLabel>Efficiency</SectionLabel>
          </HeaderContainer>
        </Row>
        <Row>
          <SectionContent>
            <div>Hello</div>
          </SectionContent>
          <SectionContent />
          <SectionContent />
        </Row>
      </div>
      {/* Table view */}
    </div>
  );
}
