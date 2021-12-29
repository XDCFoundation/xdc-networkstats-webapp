import React, {useEffect, useState} from "react";
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
import {dispatchAction} from "../../utility";
import {connect} from "react-redux";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const TableBox = styled.div`
  width: 100%;
  overflow: scroll;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
`;

const SearchBox = styled.input`
  background-image: url("/images/DownArrow.svg");
  background-repeat: no-repeat;
  background-position: 0.5rem;
  padding-left: 2rem;
  background-size: 0.875rem;
  position: relative;
  background-color: #ffffff;
  border: none;
  border-radius: 4px;
  width: 100%;
  max-width: 17.75rem;
  white-space: nowrap;
  height: 2.5rem;
  font-size: 0.875rem;
  margin-bottom: 20px;
  outline: none;
  color: #BEBEBE;
`;


const Label = styled.div`
  font-size: 12px;
  line-height: 15px;
  font-family: "Inter";
  color: #393939;
  font-weight: 600;
`;
const DisplayFlex = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;
const Img = styled.img`
  display: flex;
  align-items: center;
  text-align: center;
`;
const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 50,
  },
}))(TableRow);

const CustomiseTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "pink",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 3px 6px #00000029",
    border: "1px solid #F2F2F2",
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "Inter",
    color: "#1F1F1F",
    justifyContent: "center",
    display: "flex",
    whiteSpace: "nowrap",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "0px 8px",
    fontWeight: "400",
  },
}))(TableCell);


 function EnhancedTable(props) {
  function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    return stabilizedThis.map((el) => el[0]);
  }

  const [rows, setRows] = useState([]);
  useEffect(()=>{
   setRows(props.stats.nodesArr)
  },[props.stats.nodesArr]);
  const requestSearch = (searchedVal) => {
    const filteredRows = props.stats.nodesArr.filter((row) => {
      return row.nodeName.toLowerCase().includes(searchedVal);
    });
    setRows(filteredRows);
  };

  const headCells = [
    {
      id: "nodeName",

      disablePadding: true,

      label: (
        <DisplayFlex>
          <Label>Node Name</Label>&nbsp;
          <CustomiseTooltip title="Name of the specified node">
            <Img src="/images/Help.svg" alt=" " />
          </CustomiseTooltip>
        </DisplayFlex>
      ),
    },
    {
      id: "type",

      disablePadding: false,
      label: (
        <DisplayFlex>
          <Label>Type</Label>&nbsp;
          <CustomiseTooltip title="Type of node with the architecture and version details">
            <Img src="/images/Help.svg" alt=" " />
          </CustomiseTooltip>
        </DisplayFlex>
      ),
    },
    {
      id: "latency",
      numeric: true,
      disablePadding: false,
      label: (
        <DisplayFlex>
          <Label>Latency</Label>&nbsp;
          <CustomiseTooltip title="Delay in acceptance of a transaction">
            <Img src="/images/Help.svg" alt=" " />
          </CustomiseTooltip>
        </DisplayFlex>
      ),
    },
    {
      id: "peers",
      numeric: true,
      disablePadding: false,
      label: (
        <DisplayFlex>
          <Label>Peers</Label>&nbsp;
          <CustomiseTooltip title="Number of peers sharing the ledger">
            <Img src="/images/Help.svg" alt=" " />
          </CustomiseTooltip>
        </DisplayFlex>
      ),
    },
    {
      id: "pendingTxn",
      numeric: true,
      disablePadding: false,
      label: (
        <DisplayFlex>
          <Label>Pending Txn</Label>&nbsp;
          <CustomiseTooltip title="Number of incomplete transactions">
            <Img src="/images/Help.svg" alt=" " />
          </CustomiseTooltip>
        </DisplayFlex>
      ),
    },
    {
      id: "lastBlock",
      numeric: true,
      disablePadding: false,
      label: (
        <DisplayFlex>
          <Label>Last Block</Label>&nbsp;
          <CustomiseTooltip title="Latest block associated with the node">
            <Img src="/images/Help.svg" alt=" " />
          </CustomiseTooltip>
        </DisplayFlex>
      ),
    },
    {
      id: "graph",
      numeric: true,
      disablePadding: false,
    },
    {
      id: "upTime",
      numeric: true,
      disablePadding: false,
      label: (
        <DisplayFlex>
          <Label>Up Time</Label>&nbsp;
          <CustomiseTooltip title="Total available and working time of the network">
            <Img src="/images/Help.svg" alt=" " />
          </CustomiseTooltip>
        </DisplayFlex>
      ),
    },
  ];

  function EnhancedTableHead() {
    return (
      <TableHead>
        <StyledTableRow>
          <StyledTableCell />
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
    <>
    <SearchBox placeholder="Search"  
    // value={searched}
    onChange={(searchVal) => requestSearch(searchVal)}
    />
    <TableBox sx={{ width: "auto", backgroundColor: "#F8F8F8" }}>
      <Paper sx={{ width: "auto" }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead />
            <TableBody>
              {stableSort(rows).map((row) => {
                return (
                  <StyledTableRow>
                    <StyledTableCell padding="radio">
                      <Radio control={<Radio />} />
                    </StyledTableCell>
                    <StyledTableCell
                      scope="row"
                      padding="none"
                      style={{
                        fontSize: "12px",
                        color: "#393939",
                        fontFamily: "Inter",
                        fontWeight: "400",
                        width: "450px",
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
                        width: "450px",
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {stats: state.stats}
};

export default connect(mapStateToProps, {dispatchAction})(EnhancedTable);
