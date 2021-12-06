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
import { visuallyHidden } from "@mui/utils";
import styled from "styled-components";
import utility from "../../utility";
import { LocationService } from "../../services";


const TableBox = styled.div`
  padding-top: 41px;
  padding-left: 38px;
  width: 550px;
  height: auto;
  @media (max-width: 1025px) {
    width: 1000px;

    @media (max-width: 415px) {
      width: 380px;
    }
  }
`;
let rows = [];

export default function EnhancedTable(props) {

  const [data, setData] = useState([]);
  useEffect(() => {

    if (props?.data && props?.data?.length >= 1) {
      (props?.data).map((item, index) => {
        setData(item);
      });
      async function fetchData (){
        const [error, res] = await utility.parseResponse(LocationService.getLocation(data));
        if (error)
        return;
        let country = {
          countries: res.country,
          id: "1",
          last24h: "64",
          last24: "3.56%",
          last7: "5.56%",
        }
        if (rows.length >=9) {
          rows.pop();
        }
        rows.unshift(country);
      }
      fetchData();
    }
  }, [props?.data]);
  
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
              borderColor: "#4E6AB5"
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
        <Table sx={{ minWidth: 100 }} aria-labelledby="tableTitle">
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
                    <TableCell style={{ color: "white", width: "2px", borderColor: "#4E6AB5"}}>{row.id}</TableCell>
                    <TableCell style={{ color: "white", width: "20px", borderColor: "#4E6AB5" }}>
                      {row.countries}
                    </TableCell>
                    <TableCell style={{ color: "white", width: "30px", borderColor: "#4E6AB5" }}>
                      {row.last24h}
                    </TableCell>
                    <TableCell style={{ color: "#3AF219",  width: "30px", borderColor: "#4E6AB5" }}>
                      {row.last24}
                    </TableCell>
                    <TableCell style={{ color: "#3AF219",  width: "30px", borderColor: "#4E6AB5" }}>
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
