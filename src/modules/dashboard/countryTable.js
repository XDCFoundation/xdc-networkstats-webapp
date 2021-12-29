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
import { withStyles } from "@material-ui/styles";
import _ from "lodash";

const TableBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 550px;
  @media (min-width: 300px) and (max-width: 1024px) {
  max-width: 1024px
  }
`;
const Flex = styled.div`
display: flex;
align-items: center;
text-align: center;
`;

const Up = styled.div`
color: #3AF219;
`;

const Down = styled.div`
color: #E62806;
`;
const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 50,
    tableBottomBorder: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    padding: "0px 40px",
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  root: {
    height: "30px",
    padding: "0px 40px",
  },
}))(TableCell);

export default function EnhancedTable(props) {
  let rows = [];
    if (!_.isEmpty(props.data) && !_.isUndefined(props.data)) {
      for (let i = 0; i < props.data.length; i++) {
        if(parseFloat(props.data[i].last24diff)>0 && parseFloat(props.data[i].last7diff)>0){
        rows.push({
          id: 1 + i,
          countries: props.data[i].country,
          last24h: props.data[i].count,
          last24: <Flex><img src="/images/UpArrow.svg" />&nbsp;<Up>{props.data[i].last24diff+"%"}</Up></Flex>,
          last7: <Flex><img src="/images/UpArrow.svg" />&nbsp;<Up>{props.data[i].last7diff+"%"}</Up></Flex>,
        });
      }
      else if(parseFloat(props.data[i].last24diff)>0 && parseFloat(props.data[i].last7diff)<0){
        rows.push({
          id: 1 + i,
          countries: props.data[i].country,
          last24h: props.data[i].count,
          last24: <Flex><img src="/images/UpArrow.svg" />&nbsp;<Up>{Math.abs(props.data[i].last24diff).toFixed(2)+"%"}</Up></Flex>,
          last7: <Flex><img src="/images/DownArrow.svg" />&nbsp;<Down>{Math.abs(props.data[i].last7diff).toFixed(2)+"%"}</Down></Flex>
        });
      }else if(parseFloat(props.data[i].last24diff)>0 && parseFloat(props.data[i].last7diff)===0){
        rows.push({
          id: 1 + i,
          countries: props.data[i].country,
          last24h: props.data[i].count,
          last24: <Flex><img src="/images/UpArrow.svg" />&nbsp;<Up>{Math.abs(props.data[i].last24diff).toFixed(2)+"%"}</Up></Flex>,
          last7: props.data[i].last7diff+"%"
        });
      }
      else if(parseFloat(props.data[i].last24diff)<0 && parseFloat(props.data[i].last7diff)>0){
        rows.push({
          id: 1 + i,
          countries: props.data[i].country,
          last24h: props.data[i].count,
          last24: <Flex><img src="/images/DownArrow.svg" />&nbsp;<Down>{Math.abs(props.data[i].last24diff).toFixed(2)+"%"}</Down></Flex>,
          last7: <Flex><img src="/images/UpArrow.svg" />&nbsp;<Up>{props.data[i].last7diff+"%"}</Up></Flex>,
        });
      }
      else if(parseFloat(props.data[i].last24diff)<0 && parseFloat(props.data[i].last7diff)<0){
        rows.push({
          id: 1 + i,
          countries: props.data[i].country,
          last24h: props.data[i].count,
          last24: <Flex><img src="/images/DownArrow.svg" />&nbsp;<Down>{Math.abs(props.data[i].last24diff).toFixed(2)+"%"}</Down></Flex>,
          last7: <Flex><img src="/images/DownArrow.svg" />&nbsp;<Down>{Math.abs(props.data[i].last7diff).toFixed(2)+"%"}</Down></Flex>
        });
      }else if(parseFloat(props.data[i].last24diff)<0 && parseFloat(props.data[i].last7diff)===0){
        rows.push({
          id: 1 + i,
          countries: props.data[i].country,
          last24h: props.data[i].count,
          last24: <Flex><img src="/images/DownArrow.svg" />&nbsp;<Down>{Math.abs(props.data[i].last24diff).toFixed(2)+"%"}</Down></Flex>,
          last7: props.data[i].last7diff+"%"
        });
      }

      else if(parseFloat(props.data[i].last24diff)===0 && parseFloat(props.data[i].last7diff)>0){
        rows.push({
          id: 1 + i,
          countries: props.data[i].country,
          last24h: props.data[i].count,
          last24: props.data[i].last24diff+"%",
          last7: <Flex><img src="/images/UpArrow.svg" />&nbsp;<Up>{props.data[i].last7diff+"%"}</Up></Flex>,
        });
      }
      else if(parseFloat(props.data[i].last24diff)===0 && parseFloat(props.data[i].last7diff)<0){
        rows.push({
          id: 1 + i,
          countries: props.data[i].country,
          last24h: props.data[i].count,
          last24: props.data[i].last24diff+"%",
          last7: <Flex><img src="/images/DownArrow.svg" />&nbsp;<Down>{Math.abs(props.data[i].last7diff).toFixed(2)+"%"}</Down></Flex>
        });
      }else if(parseFloat(props.data[i].last24diff)===0 && parseFloat(props.data[i].last7diff)===0){
        rows.push({
          id: 1 + i,
          countries: props.data[i].country,
          last24h: props.data[i].count,
          last24: props.data[i].last24diff+"%",
          last7: props.data[i].last7diff+"%"
        });
      }
      }}
  
  
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
        <StyledTableRow>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{
                color: "white",
                columnWidth: "90px",
                whiteSpace: "nowrap",
                alignContent: "start",
                borderColor: "#4E6AB5",
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
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <StyledTableCell
                      style={{
                        color: "white",
                        width: "20px",
                        borderColor: "#4E6AB5",
                      }}
                    >
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        color: "white",
                        width: "20px",
                        borderColor: "#4E6AB5",
                      }}
                    >
                      {row.countries}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        color: "white",
                        borderColor: "#4E6AB5",
                      }}
                    >
                      {row.last24h}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        borderColor: "#4E6AB5",
                        color: "white",
                      }}
                    >
                      {row.last24}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        borderColor: "#4E6AB5",
                        color: "white",
                      }}
                    >
                      {row.last7}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </TableBox>
  );
}
