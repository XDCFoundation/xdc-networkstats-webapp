import {eventConstants} from '../constants'
let initialState = {
    nodes: 192,
    totalNodes: 196,
    countries: 60,
    bestBlock: 55963,
    avgTime: 0.1,
    lastBlock: 15,
    gasPrice: 0.002,
    avgRate: 98,
    upTime: 99
};
export default function stats(state = initialState, action) {
    switch (action.type) {
        case eventConstants.UPDATE_AVG_RATE:
            return{
                ...state,
                avgRate: action.data
            };
        case eventConstants.UPDATE_NODES:
            return{
                ...state,
                nodes: action.data
            }
        case eventConstants.UPDATE_TOTAL_NODES:
            return{
                ...state,
                totalNodes: action.data
            }
        case eventConstants.UPDATE_COUNTRIES:
            return{
                ...state,
                countries: action.data
            }
        case eventConstants.UPDATE_BEST_BLOCK:
            return{
                ...state,
                bestBlock: action.data
            }
        case eventConstants.UPDATE_AVG_TIME:
            return{
                ...state,
                avgTime: action.data
            }
        case eventConstants.UPDATE_LAST_BLOCK:
            return{
                ...state,
                lastBlock: action.data
            }
        case eventConstants.UPDATE_UP_TIME:
            return{
                ...state,
                upTime: action.data
            }
        case eventConstants.UPDATE_GAS_PRICE:
            return{
                ...state,
                gasPrice: action.data
            }
        default:
            return state;
    }
}