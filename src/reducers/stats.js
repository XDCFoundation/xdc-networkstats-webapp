import { eventConstants } from "../constants";
let initialState = {
  nodes: 172,
  totalNodes: 176,
  countries: 70,
  bestBlock: 55963787,
  avgTime: 0.7,
  lastBlock: 17,
  gasPrice: 0.007,
  avgRate: 78,
  upTime: 77,
  nodesArr: [],
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
    case eventConstants.UPDATE_AVG_TIME:
      return {
        ...state,
        avgTime: action.data,
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
    default:
      return state;
  }
}
