import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import styled from "styled-components";
import { withStyles } from "@material-ui/styles";
import Tooltip from '@mui/material/Tooltip';

const TableBox = styled.div`
  width: 100%;
  overflow: scroll;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
`;

const Label = styled.span`
font-size: 12px;
line-height: 15px;
font-family: 'Inter';
`;

const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 50,
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "0px 8px",
    fontWeight: "400",
  },
}))(TableCell);


export default function EnhancedTable(props) {
  function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: "nodeName",
      disablePadding: true,
      label: <><Label>Node Name</Label><Tooltip title="qwert"><img src="/images/HelpSelected.svg" alt=" " /></Tooltip></>
    },
    {
      id: "type",
      numeric: true,
      disablePadding: false,
      label: "Type",
    },
    {
      id: "latency",
      numeric: true,
      disablePadding: false,
      label: "Latency",
    },
    {
      id: "peers",
      numeric: true,
      disablePadding: false,
      label: "Peers",
    },
    {
      id: "pendingTxn",
      numeric: true,
      disablePadding: false,
      label: "Pending Txn",
    },
    {
      id: "lastBlock",
      numeric: true,
      disablePadding: false,
      label: "Last Block",
    },
    {
      id: "graph",
      numeric: true,
      disablePadding: false,
      label: " ",
    },
    {
      id: "upTime",
      numeric: true,
      disablePadding: false,
      label: "Up Time",
    },
  ];

  function EnhancedTableHead() {

    return (
      <TableHead>
        <StyledTableRow>
          <StyledTableCell/>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              padding={headCell.disablePadding ? "none" : "normal"}
            >
              <TableSortLabel
                active={false}
                hideSortIcon={true}
                style={{
                  fontSize: "12px",
                  lineHeight: "15px",
                  fontFamily: "Inter",
                }}
              >
                {headCell.label}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </StyledTableRow>
      </TableHead>
    );
  }

  return (
    <TableBox sx={{ width: "auto", backgroundColor: "#F8F8F8" }}>
      <Paper sx={{ width: "auto" }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
            />
            <TableBody>
              {stableSort(
                props.content.stats.nodesArr).map((row) => {
                return (
                  <StyledTableRow>
                    <StyledTableCell padding="radio">
                      <Radio
                        control={<Radio />}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      scope="row"
                      padding="none"
                      style={{
                        fontSize: "12px",
                        color: "#393939",
                        fontFamily: "Inter",
                        fontWeight: "400",
                      }}
                    >
                      {row.nodeName}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        fontSize: "12px",
                        color: "#393939",
                        fontFamily: "Inter",
                        fontWeight: "400",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.type}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        fontSize: "12px",
                        color: "#393939",
                        fontFamily: "Inter",
                        fontWeight: "400",
                        columnWidth: "70px",
                      }}
                    >
                      {row.latency}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        fontSize: "12px",
                        color: "#393939",
                        fontFamily: "Inter",
                        fontWeight: "400",
                        columnWidth: "70px",
                      }}
                    >
                      {row.peers}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        fontSize: "12px",
                        color: "#393939",
                        fontFamily: "Inter",
                        fontWeight: "400",
                        columnWidth: "70px",
                      }}
                    >
                      {row.pendingTxn}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        fontSize: "12px",
                        color: "#393939",
                        fontFamily: "Inter",
                        fontWeight: "400",
                        columnWidth: "70px",
                      }}
                    >
                      {row.lastBlock}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        fontSize: "12px",
                        color: "#393939",
                        fontFamily: "Inter",
                        fontWeight: "400",
                      }}
                    >
                      {row.graph}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        fontSize: "12px",
                        color: "#393939",
                        fontFamily: "Inter",
                        fontWeight: "400",
                        columnWidth: "50px",
                      }}
                    >
                      {row.upTime}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </TableBox>
  );
}
