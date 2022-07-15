import * as actionTypes from '../constants/orderConstants'
import axios from 'axios'

export const getOrders = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_ORDERS_REQUEST })

        const { data } = await axios.get('/order/get-orders')
        const payload = data.map(d => ({ ...d }))

        dispatch({
            type: actionTypes.GET_ORDERS_SUCCESS,
            payload: payload
        })
    } catch(e) {
        dispatch({
            type: actionTypes.GET_ORDERS_FAIL,
            payload: e.message
        })
    }
}