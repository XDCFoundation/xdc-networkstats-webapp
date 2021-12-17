import React from "react";
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
import styled from "styled-components";
import { withStyles } from "@material-ui/styles";
const TableBox = styled.div`
  width: 100%;
`;

const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 50,
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "0px 16px",
    fontWeight: "400",
  },
}))(TableCell);

export default function EnhancedTable(props) {
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
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
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
      const newSelecteds = props.content.stats.nodesArr.map((n) => n.nodeName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const isSelected = (nodeName) => selected.indexOf(nodeName) !== -1;
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
            rowCount={props.content.stats.nodesArr.length}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(
              props.content.stats.nodesArr,
              getComparator(order, orderBy)
            ).map((row, index) => {
              const isItemSelected = isSelected(row.nodeName);
              const labelId = `enhanced-table-radio-button-${index}`;
              return (
                <StyledTableRow
                  hover
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
            })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    </TableBox>
  );
}
