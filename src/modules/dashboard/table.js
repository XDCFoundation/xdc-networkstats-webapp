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
import styled from "styled-components";
import { withStyles } from "@material-ui/styles";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import _ from "lodash";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { eventConstants } from "../../constants";
import store from "../../store";

const TableBox = styled.div`
  width: 100%;
  overflow: scroll;
  display: block;
  overflow-y: auto;
  white-space: nowrap;
`;

const SearchBox = styled.input`
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
    padding: "0px 8px",
    fontWeight: "400",
    borderBottom: "0.3px solid #E8E8E8"
  },
}))(TableCell);

function EnhancedTable(props) {


  function findIndex(search) {
    return _.findIndex(rows, search);
  }

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
  useEffect(()=>{
   if(!_.isEmpty(props.stats.pinned)){
   let pin = props.stats.pinned;
    for(let i = 0; i< pin.length; i++) {
     let index = props.stats.nodesArr.findIndex(a => a.nodeName === pin[i]);
     arraymove(props.stats.nodesArr, index, 0);
     setRows(props.stats.nodesArr);
    }
  }
  else{
    setRows(props.stats.nodesArr);
  }
  },[props.stats.nodesArr]);

  const [query, setQuery] = useState('');
    const filteredRows = props.stats.nodesArr.filter((row) => {
      return row.nodeName.toLowerCase().includes((query).toLowerCase());
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
    setChecked(e.target.value)
  };
  useEffect(()=>{})


  function pinned(pin){
  // let nodes = rows;
  let filter = props.stats.pinned;
  filter.push(pin)
  store.dispatch({ type: eventConstants.UPDATE_PINNED, data: filter});
  // nodes.splice(nodes.findIndex(a => a.nodeName === pinNode[0].nodeName) , 1)
  console.log("filter", props.stats.pinned);
  
  }

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
    <SearchBox placeholder="Search by node name"  
    value={query}
    onChange={e => setQuery(e.target.value)}
    />
    <TableBox sx={{ width: "auto", backgroundColor: "#F8F8F8" }}>
      <Paper sx={{ width: "auto" }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead />
            <TableBody>
              {stableSort(query!=='' ? filteredRows : rows).map((row) => {
                let block = row.lastBlock.toLocaleString();
                return (
                  <StyledTableRow>
                    <StyledTableCell padding="radio">
                      <Radio control={<Radio />}
                      value={row.nodeName}
                      onChange={e => pinned(e.target.value)}
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
  return { stats: state.stats };
};

export default connect(mapStateToProps, { dispatchAction })(EnhancedTable);
