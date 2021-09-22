import * as React from "react";
// import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
// import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import {Row,Column} from "simple-flexbox";
const Navbar = styled.nav`
background-color: #2149B9;
display: flex;
justify-content: space-between;
height: 56px;
color: white;
`;
const Logo =styled.img`
padding-left: 10px;
padding-top: 10px;
`;
export default function Header() {
  return (
    <div>
        <Navbar>
            <div>
            <div>
            <Logo src="/images/XDC-Logo.svg"/>
            <Logo src="/images/VerticalLine.svg"/>
            </div>
            <span>Network Stats</span>
            </div>
            <div>
            <Logo src="/images/Play.svg"/>
            Start Guided Tour
            <Logo src="/images/Hamburger.svg"/>
            </div>
        </Navbar>
    </div>
  );
}
