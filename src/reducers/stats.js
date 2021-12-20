import { eventConstants } from "../constants";
let initialState = {
  nodes: 172,
  totalNodes: 176,
  countries: 70,
  bestBlock: 55963787,
  avgBlock: 0.7,
  lastBlock: 17,
  gasPrice: 0.007,
  avgRate: 78,
  upTime: 77,
  map: [],
  expandedCountry: [],
  markers: [],
  efficiency: [],
  nodesArr: [
    {
      nodeName: "Null",
      type: "XDC",
      latency: "0ms",
      peers: "0",
      pendingTxn: "0",
      lastBlock: "Null",
      graph: "Graph",
      upTime: "0ms",
    },
  ],
  blockTime: [],
};
export default function stats(state = initialState, action) {
  switch (action.type) {
    case eventConstants.UPDATE_AVG_RATE:
      return {
        ...state,
        avgRate: action.data,
      };
    case eventConstants.UPDATE_NODES:
      return {
        ...state,
        nodes: action.data,
      };
    case eventConstants.UPDATE_TOTAL_NODES:
      return {
        ...state,
        totalNodes: action.data,
      };
    case eventConstants.UPDATE_COUNTRIES:
      return {
        ...state,
        countries: action.data,
      };
    case eventConstants.UPDATE_BEST_BLOCK:
      return {
        ...state,
        bestBlock: action.data,
      };
    case eventConstants.UPDATE_AVG_BLOCK:
      return {
        ...state,
        avgBlock: action.data,
      };
    case eventConstants.UPDATE_LAST_BLOCK:
      return {
        ...state,
        lastBlock: action.data,
      };
    case eventConstants.UPDATE_UP_TIME:
      return {
        ...state,
        upTime: action.data,
      };
    case eventConstants.UPDATE_GAS_PRICE:
      return {
        ...state,
        gasPrice: action.data,
      };
    case eventConstants.UPDATE_NODES_ARR:
      return {
        ...state,
        nodesArr: action.data,
      };
    case eventConstants.UPDATE_MAP:
      return {
        ...state,
        map: action.data,
      };
    case eventConstants.UPDATE_BLOCKTIME:
      return {
        ...state,
        blockTime: action.data,
      };
    case eventConstants.UPDATE_EXPANDEDCOUNTRY:
      return {
        ...state,
        expandedCountry: action.data,
      };
    case eventConstants.UPDATE_MARKERS:
      return {
        ...state,
        markers: action.data,
      };
    case eventConstants.UPDATE_EFFICIENCY:
      return {
        ...state,
        efficiency: action.data,
      };
    default:
      return state;
  }
}
