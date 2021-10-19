import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import styled from "styled-components";

const TableBox = styled.div`
  padding-top: 41px;
  padding-left: 38px;
  width: 700px;
  height: auto;
  @media (max-width: 1025px) {
    width: 1000px;

    @media (max-width: 415px) {
      width: 380px;
    }
  }
`;

function createData(id, countries, last24h, last24, last7) {
  return {
    id,
    countries,
    last24h,
    last24,
    last7,
  };
}

const rows = [
  createData("1", "USA", "64(25.57%)", "3.56%", "5.56%"),
  createData("2", "USA", "64(25.57%)", "3.56%", "5.56%"),
  createData("3", "USA", "64(25.57%)", "3.56%", "5.56%"),
  createData("4", "USA", "64(25.57%)", "3.56%", "5.56%"),
  createData("5", "USA", "64(25.57%)", "3.56%", "5.56%"),
  createData("6", "USA", "64(25.57%)", "3.56%", "5.56%"),
  createData("7", "USA", "64(25.57%)", "3.56%", "5.56%"),
  createData("8", "USA", "64(25.57%)", "3.56%", "5.56%"),
  createData("9", "USA", "64(25.57%)", "3.56%", "5.56%"),
];

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
    id: "id",
    disablePadding: true,
    label: "#",
  },
  {
    id: "countries",
    disablePadding: true,
    label: "Countries",
  },
  {
    id: "last24h",
    numeric: true,
    disablePadding: true,
    label: "Last 24 Hrs",
  },
  {
    id: "last24",
    numeric: true,
    disablePadding: true,
    label: "Last 24 Hrs",
  },
  {
    id: "last7",
    numeric: true,
    disablePadding: true,
    label: "Last 7 Days",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              color: "white",
              columnWidth: "70px",
              whiteSpace: "nowrap",
              alignContent: "start",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
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

export default function EnhancedTable() {
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
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  return (
    <TableBox sx={{ width: "auto" }}>
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
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell style={{ color: "white" }}>{row.id}</TableCell>
                    <TableCell style={{ color: "white" }}>
                      {row.countries}
                    </TableCell>
                    <TableCell style={{ color: "white" }}>
                      {row.last24h}
                    </TableCell>
                    <TableCell style={{ color: "#3AF219" }}>
                      {row.last24}
                    </TableCell>
                    <TableCell style={{ color: "#3AF219" }}>
                      {row.last7}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </TableBox>
  );
}
