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
import {dispatchAction} from "../../utility";
import {connect} from "react-redux";
import {countries} from 'country-data';

const TableBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 550px;
  @media (min-width: 300px) and (max-width: 1024px) {
  max-width: 1500px
  }
  @media (min-width: 300px) and (max-width: 767px) {
  max-width: 767px
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
    height: "5px",
    padding: "10px",
    width: "17px",
    whiteSpace: "nowrap",
  },
}))(TableCell);

const StyledTableHeadCell = withStyles((theme) => ({
  root: {
    height: 4,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    width: 17,
    whiteSpace: "nowrap",
  },
}))(TableCell);

const Div = styled.div`
margin-bottom: 10px;
width: 100%;
`;

function EnhancedTable(props) {
  let rows = [];
    if (!_.isEmpty(props.stats.expandedCountry) && !_.isUndefined(props.stats.expandedCountry)) {
      for (let i = 0; i < props.stats.expandedCountry.length; i++) {
        if(parseFloat(props.stats.expandedCountry[i].last24diff)>0 && parseFloat(props.stats.expandedCountry[i].last7diff)>0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: <Flex><img src="/images/Up arrow.svg" />&nbsp;<Up>{props.stats.expandedCountry[i].last24diff+"%"}</Up></Flex>,
          last7: <Flex><img src="/images/Up arrow.svg" />&nbsp;<Up>{props.stats.expandedCountry[i].last7diff+"%"}</Up></Flex>,
        });
      }
      else if(parseFloat(props.stats.expandedCountry[i].last24diff)>0 && parseFloat(props.stats.expandedCountry[i].last7diff)<0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: <Flex><img src="/images/Up arrow.svg" />&nbsp;<Up>{Math.abs(props.stats.expandedCountry[i].last24diff).toFixed(2)+"%"}</Up></Flex>,
          last7: <Flex><img src="/images/Down arrow.svg" />&nbsp;<Down>{Math.abs(props.stats.expandedCountry[i].last7diff).toFixed(2)+"%"}</Down></Flex>
        });
      }else if(parseFloat(props.stats.expandedCountry[i].last24diff)>0 && parseFloat(props.stats.expandedCountry[i].last7diff)===0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: <Flex><img src="/images/Up arrow.svg" />&nbsp;<Up>{Math.abs(props.stats.expandedCountry[i].last24diff).toFixed(2)+"%"}</Up></Flex>,
          last7: props.stats.expandedCountry[i].last7diff+"%"
        });
      }
      else if(parseFloat(props.stats.expandedCountry[i].last24diff)<0 && parseFloat(props.stats.expandedCountry[i].last7diff)>0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: <Flex><img src="/images/Down arrow.svg" />&nbsp;<Down>{Math.abs(props.stats.expandedCountry[i].last24diff).toFixed(2)+"%"}</Down></Flex>,
          last7: <Flex><img src="/images/Up arrow.svg" />&nbsp;<Up>{props.stats.expandedCountry[i].last7diff+"%"}</Up></Flex>,
        });
      }
      else if(parseFloat(props.stats.expandedCountry[i].last24diff)<0 && parseFloat(props.stats.expandedCountry[i].last7diff)<0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: <Flex><img src="/images/Down arrow.svg" />&nbsp;<Down>{Math.abs(props.stats.expandedCountry[i].last24diff).toFixed(2)+"%"}</Down></Flex>,
          last7: <Flex><img src="/images/Down arrow.svg" />&nbsp;<Down>{Math.abs(props.stats.expandedCountry[i].last7diff).toFixed(2)+"%"}</Down></Flex>
        });
      }else if(parseFloat(props.stats.expandedCountry[i].last24diff)<0 && parseFloat(props.stats.expandedCountry[i].last7diff)===0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: <Flex><img src="/images/Down arrow.svg" />&nbsp;<Down>{Math.abs(props.stats.expandedCountry[i].last24diff).toFixed(2)+"%"}</Down></Flex>,
          last7: props.stats.expandedCountry[i].last7diff+"%"
        });
      }

      else if(parseFloat(props.stats.expandedCountry[i].last24diff)===0 && parseFloat(props.stats.expandedCountry[i].last7diff)>0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: props.stats.expandedCountry[i].last24diff+"%",
          last7: <Flex><img src="/images/Up arrow.svg" />&nbsp;<Up>{props.stats.expandedCountry[i].last7diff+"%"}</Up></Flex>,
        });
      }
      else if(parseFloat(props.stats.expandedCountry[i].last24diff)===0 && parseFloat(props.stats.expandedCountry[i].last7diff)<0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: props.stats.expandedCountry[i].last24diff+"%",
          last7: <Flex><img src="/images/Down arrow.svg" />&nbsp;<Down>{Math.abs(props.stats.expandedCountry[i].last7diff).toFixed(2)+"%"}</Down></Flex>
        });
      }else if(parseFloat(props.stats.expandedCountry[i].last24diff)===0 && parseFloat(props.stats.expandedCountry[i].last7diff)===0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: props.stats.expandedCountry[i].last24diff+"%",
          last7: props.stats.expandedCountry[i].last7diff+"%"
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
        <StyledTableRow
        style={{
        height: "40px"
        }}
        >
          {headCells.map((headCell) => (
            <StyledTableHeadCell
              key={headCell.id}
              style={{
                color: "white",
                whiteSpace: "nowrap",
                alignContent: "start",
                borderColor: "#4E6AB5",
              }}
            >
              <TableSortLabel
                active={false}
                hideSortIcon={true}
              >
                {headCell.label}
              </TableSortLabel>
            </StyledTableHeadCell>
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
      <Div>
        <Table sx={{ minWidth: 100 }} aria-labelledby="tableTitle"
         rowsPerPage={10}
        >
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
            {stableSort(rows.slice(0,10), getComparator(order, orderBy)).map(
              (row, index) => {
                const isItemSelected = isSelected(row.id);

                return (
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        color: "white",
                        borderColor: "#4E6AB5",
                      }}
                    >
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        color: "white",
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
        </Div>
      </TableContainer>
    </TableBox>
  );
}


const mapStateToProps = (state) => {
  return {stats: state.stats}
};

export default connect(mapStateToProps, {dispatchAction})(EnhancedTable);