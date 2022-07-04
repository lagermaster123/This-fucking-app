import * as actionTypes from '../constants/orderConstants'

export const getOrdersReducer = (state = { orders: [] }, action) => {
    switch(action.type) {
        case actionTypes.GET_ORDERS_REQUEST:
            return {
                loading: true,
                orders: []
            }
        case actionTypes.GET_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case actionTypes.GET_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
