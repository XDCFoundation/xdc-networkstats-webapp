import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import style from "styled-components";
import { styled } from '@mui/material/styles';
import { withStyles } from "@material-ui/styles";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import _ from "lodash";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const TableBox = style.div`
  width: 100%;
  overflow: scroll;
  display: block;
  overflow-y: auto;
  white-space: nowrap;
`;

const SearchBox = style.input`
  background-image: url("/images/Search.svg");
  background-repeat: no-repeat;
  background-position: 0.5rem;
  padding-left: 2rem;
  background-size: 0.875rem;

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
  color: "black";
`;

const Label = style.div`
  font-size: 12px;
  line-height: 15px;
  font-family: "Inter";
  color: #393939;
  font-weight: 600;
`;
const DisplayFlex = style.div`
  display: flex;
  align-items: center;
  text-align: center;
`;
const Img = style.img`
  display: flex;
  align-items: center;
  text-align: center;
`;
const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 50,
  },
}))(TableRow);

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundImage: 'url("/images/Selected.svg")',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    content: '""',
  },
});

const CustomiseTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",

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
    pointerEvents: "none",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  root: {
    fontWeight: "400",
    borderBottom: "0.3px solid #E8E8E8",
    padding: "6px",
  },
}))(TableCell);

function EnhancedTable(props) {
  function findIndex(search) {
    return _.findIndex(rows, search);
  }

  const [selected, setSelected] = React.useState([]);
  console.log("selected", selected);
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    return stabilizedThis.map((el) => el[0]);
  }

  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (!_.isEmpty(selected)) {
      let pin = selected;
      for (let i = 0; i < pin.length; i++) {
        let index = props.stats.nodesArr.findIndex(
          (a) => a.nodeName === pin[i]
        );
        arraymove(props.stats.nodesArr, index, 0);
        setRows(props.stats.nodesArr);
      }
    } else {
      setRows(props.stats.nodesArr);
    }
  }, [props.stats.nodesArr]);

  const [query, setQuery] = useState("");
  const filteredRows = props.stats.nodesArr.filter((row) => {
    return row.nodeName.toLowerCase().includes(query.toLowerCase());
  });

  const [showTooltip, setShowTooltip] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showLatency, setShowLatency] = useState(false);
  const [showPeers, setShowPeers] = useState(false);
  const [showPendingTxn, setShowPendingTxn] = useState(false);
  const [setLastBlock, setShowLastBlock] = useState(false);
  const [showUptime, setShowUptime] = useState(false);
  const headCells = [
    {
      id: "nodeName",

      disablePadding: true,

      label: (
        <DisplayFlex>
          <Label>Node Name</Label>&nbsp;
          <CustomiseTooltip
            open={showTooltip}
            onOpen={() => setShowTooltip(true)}
            onClose={() => setShowTooltip(false)}
            disableFocusListener
            disableTouchListener
            title="Name of the specified node"
          >
            <Img
              src="/images/Help.svg"
              alt=" "
              onClick={() => setShowTooltip(!showTooltip)}
            />
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
          <CustomiseTooltip
            open={showType}
            onOpen={() => setShowType(true)}
            onClose={() => setShowType(false)}
            title="Type of node with the architecture and version details"
            disableFocusListener
            disableTouchListener
          >
            <Img
              src="/images/Help.svg"
              alt=" "
              onClick={() => setShowType(!showType)}
            />
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
          <CustomiseTooltip
            open={showLatency}
            onOpen={() => {
              setShowLatency(true);
            }}
            onClose={() => setShowLatency(false)}
            title="Delay in acceptance of a transaction"
          >
            <Img
              src="/images/Help.svg"
              alt=" "
              onClick={() => setShowLatency(!showLatency)}
            />
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
          <CustomiseTooltip
            open={showPeers}
            onClose={() => setShowPeers(false)}
            onOpen={() => setShowPeers(true)}
            title="Number of peers sharing the ledger"
          >
            <Img
              src="/images/Help.svg"
              alt=" "
              onClick={() => setShowPeers(!showPeers)}
            />
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
          <CustomiseTooltip
            open={showPendingTxn}
            onOpen={() => setShowPendingTxn(true)}
            onClose={() => setShowPendingTxn(false)}
            title="Number of incomplete transactions"
          >
            <Img
              src="/images/Help.svg"
              alt=" "
              onClick={() => setShowPendingTxn(!showPendingTxn)}
            />
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
          <CustomiseTooltip
            open={setLastBlock}
            title="Latest block associated with the node"
            onClose={() => setShowLastBlock(false)}
            onOpen={() => setShowLastBlock(true)}
          >
            <Img
              src="/images/Help.svg"
              alt=" "
              onClick={() => setShowLastBlock(!setLastBlock)}
            />
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
          <CustomiseTooltip
            open={showUptime}
            onClose={() => setShowUptime(false)}
            onOpen={() => setShowUptime(true)}
            title="Total available and working time of the network"
          >
            <Img
              src="/images/Help.svg"
              alt=" "
              onClick={() => setShowUptime(!showUptime)}
            />
          </CustomiseTooltip>
        </DisplayFlex>
      ),
    },
  ];

  const [checked, setChecked] = useState(true);
  const [pin, setPin] = useState([]);
  const changeRadio = (e) => {
    setChecked(e.target.value);
  };


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
      <SearchBox
        placeholder="Search by node name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <TableBox sx={{ width: "auto", backgroundColor: "#F8F8F8" }}>
        <Paper sx={{ width: "auto" }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead />
              <TableBody>
                {stableSort(query !== "" ? filteredRows : rows).map(
                  (row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const isItemSelected = isSelected(row.nodeName);
                    let block = row.lastBlock.toLocaleString();
                    return (
                      <StyledTableRow
                        onClick={(event) => {handleClick(event, row.nodeName);}}
                        role="radio"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.nodeName}
                      >
                        <StyledTableCell padding="radio">
                          <Radio
                            control={<Radio />}
                            style={{
                              paddingRight: "0px",
                              paddingLeft: "18px",
                            }}
                            color="default"
                            checkedIcon={<BpCheckedIcon />}
                            icon={<BpIcon />}
                            checked={isItemSelected}
                            disableRipple
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
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
                            // width: "450px",
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
                            // width: "450px",
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
                          #{block}
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
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TableBox>
    </>
  );
}

const mapStateToProps = (state) => {
  return { stats: state.stats };
};

export default connect(mapStateToProps, { dispatchAction })(EnhancedTable);
