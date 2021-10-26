import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import { visuallyHidden } from "@mui/utils";
import TableGraph from "./tableGraph";
import styled from "styled-components";
import { withStyles } from "@material-ui/styles";

const TableBox = styled.div`
  width: 1800px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1025px) {
    width: 910px;
  }

  @media (max-width: 415px) {
    width: 370px;
  }
`;

const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 65,
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "0px 16px",
    fontWeight: "900",
  },
}))(TableCell);




export default function EnhancedTable(props) {

// const contents = props.content;
  // console.log("table", props.data)
//  let name = props.data.id;
//  console.log("name", name ) 
function createData(
  nodeName,
  type,
  latency,
  peers,
  pendingTxn,
  lastBlock,
  graph,
  upTime
) {
  return {
    nodeName,
    type,
    latency,
    peers,
    pendingTxn,
    lastBlock,
    graph,
    upTime,
  };
}


// const [, Setrows] = useState([])


const [tableRows, setRows] = useState([{
  nodeName: "",
  type: "",
  latency: "",
    peers: "",
    pendingTxn: "",
    lastBlock: "",
    graph: "",
    upTime: "",
  
}
]);
const rows = [
  
  createData(
    `${props.name}`,
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.10",
    `${props.latency}ms`,
    `${props.peers}`,
    0,
    `#${props.lastblock}`,
    <TableGraph />, 
    `${props.uptime}%`
  ),
  
  createData(
    `${props.name}`,
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.6",
    `${props.latency}ms`,
    `${props.peers}`,
    0,
    `#${props.lastblock}`,
    <TableGraph />,    
    `${props.uptime}%`
  ), 
     ];
  // createData(
  //   `${props.name}`,
  //   "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.6",
  //   `${props.latency}ms`,
  //   `${props.peers}`,
  //   0,
  //   "#526,481",
  //   <TableGraph />,
  //   `${props.uptime}%`
  // ),
  
  // createData(
  //   "Bitrue_22",
  //   "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
  //   "45ms",
  //   8,
  //   0,  
  //   "#526,481",
  //   <TableGraph />,
  //   "100%"
  // ),
  // createData(
  //   "Bitrue_22_XF",
  //   "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
  //   "45ms",
  //   8,
  //   0,
  //   "#526,481",
  //   <TableGraph />,
  //   "100%"
  // ),
  // createData(
  //   "Bitrue_22_XF_1",
  //   "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
  //   "45ms",
  //   8,
  //   0,
  //   "#526,481",
  //   <TableGraph />,
  //   "100%"
  // ),
  // createData(
  //   "Bitrue_22_XF_1610",
  //   "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
  //   "45ms",
  //   8,
  //   0,
  //   "#526,481",
  //   <TableGraph />,
  //   "100%"
  // ),
  // createData(
  //   "Bitrue_22_XF_1618",
  //   "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
  //   "45ms",
  //   8,
  //   0,
  //   "#526,481",
  //   <TableGraph />,
  //   "100%"
  // ),
  // createData(
  //   "Bitrue_22_XF_161.97",
  //   "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
  //   "45ms",
  //   8,
  //   0,
  //   "#526,481",
  //   <TableGraph />,
  //   "100%"
  // ),
  // createData(
  //   "Bitrue_22_XF_161.97.1",
  //   "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
  //   "45ms",
  //   8,
  //   0,
  //   "#526,481",
  //   <TableGraph />,
  //   "100%"
  // ),
  // createData(
  //   "Bitrue_22_XF_161.97.12",
  //   "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
  //   "45ms",
  //   8,
  //   0,
  //   "#526,481",
  //   <TableGraph />,
  //   "100%"
  // ),
  // createData(
  //   "Bitrue_22_XF_161.97.128",
  //   "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
  //   "45ms",
  //   8,
  //   0,
  //   "#526,481",
  //   <TableGraph />,
  //   "100%"
  // ),
  // createData(
  //   "Bitrue_22_XF_161.97.128.2",
  //   "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
  //   "45ms",
  //   8,
  //   0,
  //   "#526,481",
  //   <TableGraph />,
  //   "100%"
  // ),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "nodeName",
    disablePadding: true,
    label: "Node Name",
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

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="radio">
          <Radio
            control={<Radio />}
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            // style={{fontWeight: 1000}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{
                fontSize: "12px",
                lineHeight: "15px",
                fontFamily: "Inter",
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(" ");
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.nodeName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, nodeName) => {
    const selectedIndex = selected.indexOf(nodeName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, nodeName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1)); 
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (nodeName) => selected.indexOf(nodeName) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  return (
    <TableBox sx={{ width: "auto", backgroundColor: "#F8F8F8" }}>
      <Paper sx={{ width: "auto" }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  // console.log("asdfg", row)
                  
                  
                  // let node = row.nodeName;
                  // let peers = row.peers;
                  // let latency  = row.latency;
                  // let time = row.uptime;
                  const isItemSelected = isSelected(row.nodeName);
                  const labelId = `enhanced-table-radio-button-${index}`;
                  // if(index!==0)
                  return (
                    <StyledTableRow
                      hover 
                      //onClick={(event) => handleClick(event, row.nodeName)}
                      role="radio"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.nodeName}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="radio">
                        <Radio
                          control={<Radio />}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        id={labelId}
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
                        }}
                      >
                        {row.upTime}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </TableBox>
  );
}
