import React from 'react';
import { Row } from "simple-flexbox";
import styled from "styled-components";

const HeaderContainer = styled.nav`
background-color: #1C3C93;
display: flex;
width: 100%;
height: 38px;
justify-content: space-between; 
`;
const SectionLabel = styled.div`
color: #C8D1F1;
margin-top: 8px;
margin-bottom: 8px;
margin-left: 12px;
display: flex;
justify-content: space-between;
width: 33.33%;
`;
const SectionContent = styled.div`
background-color: #102C78;
width: 100%;
height: 300px;
display: flex;
justify-content: space-between;
`;
const Line = styled.line`
border: 1px solid #274598;
height: 300px;
width: 33.33%;
`;
const HeaderLine = styled.line`
border: 1px solid #274598;
height: 300px;
`;
export default function sectionHeader() {
    return (
        <div>
        <Row>
        <HeaderContainer>
        <SectionLabel>Security</SectionLabel>
        <HeaderLine/>
        <SectionLabel>Speed</SectionLabel>
        <HeaderLine/>
        <SectionLabel>Efficiency</SectionLabel> 
        </HeaderContainer>
        </Row>  
        <Row>
        <SectionContent>
        <Line/>
        <Line/>
        </SectionContent>
        </Row>
        </div>
    )
}
