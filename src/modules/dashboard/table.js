import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Radio from '@mui/material/Radio';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

function createData(
  nodeName,
  type,
  latency,
  peers,
  pendingTxn,
  lastBlock,
  upTime
) {
  return {
    nodeName,
    type,
    latency,
    peers,
    pendingTxn,
    lastBlock,
    upTime,
  };
}

const rows = [
  createData(
    "Bitrue_22_XF_161.97.128.20",
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
    "45ms",
    8,
    0,
    "#526,481",
    "100%"
  ),
  createData(
    "Bitrue",
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
    "45ms",
    8,
    0,
    "#526,481",
    "100%"
  ),
  createData(
    "Bitrue_22",
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
    "45ms",
    8,
    0,
    "#526,481",
    "100%" 
  ),
  createData(
    "Bitrue_22_XF",
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
    "45ms",
    8,
    0,
    "#526,481",
    "100%"
  ),
  createData(
    "Bitrue_22_XF_1",
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
    "45ms",
    8,
    0,
    "#526,481",
    "100%"
  ),
  createData(
    "Bitrue_22_XF_1610",
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
    "45ms",
    8,
    0,
    "#526,481",
    "100%"
  ),
  createData(
    "Bitrue_22_XF_1618",
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
    "45ms",
    8,
    0,
    "#526,481",
    "100%"
  ),
  createData(
    "Bitrue_22_XF_161.97",
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
    "45ms",
    8,
    0,
    "#526,481",
    "100%"
  ),
  createData(
    "Bitrue_22_XF_161.97.1",
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
    "45ms",
    8,
    0,
    "#526,481",
    "100%"
  ),
  createData(
    "Bitrue_22_XF_161.97.12",
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
    "45ms",
    8,
    0,
    "#526,481",
    "100%"
  ),
  createData(
    "Bitrue_22_XF_161.97.128",
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
    "45ms",
    8,
    0,
    "#526,481",
    "100%"
  ),
  createData(
    "Bitrue_22_XF_161.97.128.2",
    "XDC/v1.1.0-stable-80827806/linux-amd64/go1.15.8",
    "45ms",
    8,
    0,
    "#526,481",
    "100%"
  ),
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
      <TableRow>
        <TableCell padding="radio">
          <Radio
            control={<Radio />}
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
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

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(" ");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (nodeName) => selected.indexOf(nodeName) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
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
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.nodeName);
                  const labelId = `enhanced-table-radio-button-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.nodeName)}
                      role="radio"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.nodeName}
                      selected={isItemSelected}
                    >
                      <TableCell padding="radio">
                        <Radio
                          control={<Radio />}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.nodeName}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.latency}</TableCell>
                      <TableCell align="right">{row.peers}</TableCell>
                      <TableCell align="right">{row.pendingTxn}</TableCell>
                      <TableCell align="right">{row.lastBlock}</TableCell>
                      <TableCell align="right">{row.upTime}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
