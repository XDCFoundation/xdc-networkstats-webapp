import React from 'react';
import Dashboard from './dashboardComponent';
import styled from "styled-components";
import Table from "./table";


const TableDiv = styled.div`
  background: #f8f8f8;
  border-radius: 4px;
  padding: 50px;
  @media (min-width: 300px) and (max-width: 1024px) {
    padding: 30px;
  }
  @media (min-width: 300px) and (max-width: 767px) {
    padding: 15px;
  }
`;

const Footer = styled.div`
  background-color: white;
  color: #808080;
  text-align: center;
  padding-bottom: 20px;
  padding-top: 10px;
  font-family: "Inter", sans-serif;
`;

export default function Main() {
    return (
    <>
    <Dashboard/>
    <TableDiv>
    <Table/>
    </TableDiv>
    <Footer>© 2022 XDC Network. All Rights Reserved.</Footer>
    </>
    )
}
