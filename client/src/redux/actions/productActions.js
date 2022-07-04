import * as actionTypes from '../constants/productConstants'
import axios from 'axios'

export const getCategories = () => async (dispatch) => {
    try {
        dispatch({type: actionTypes.GET_CATEGORIES_REQUEST})
    
        const { data } = await axios.get('/products/categories')
        const payload = data.map(d => ({ ...d, checked: false }))
        
        dispatch({
            type: actionTypes.GET_CATEGORIES_SUCCESS,
            payload: payload
        }) 
    } catch(e) {
        dispatch({
            type: actionTypes.GET_CATEGORIES_FAIL,
            payload: 
                e.response && e.response.data.message 
                    ? e.response.data.message 
                    : e.message
        })
    }
}

export const getProducts = (request) => async (dispatch) => {
    try {
        dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})
    
        const { data } = await axios.post('/products', {
            ...request.filters
        })
    
        dispatch({
            type: actionTypes.GET_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch(e) {
        dispatch({
            type: actionTypes.GET_PRODUCTS_FAIL,
            payload: 
                e.response && e.response.data.message 
                    ? e.response.data.message 
                    : e.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: actionTypes.GET_PRODUCT_DETAILS_REQUEST})
    
        const { data } = await axios.get(`/products/${id}`)
    
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch(e) {
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
            payload: 
                e.response && e.response.data.message 
                    ? e.response.data.message 
                    : e.message
        })
    }
}

export const removeProductDetails = (dispatch) => {
    dispatch({
        type: actionTypes.GET_PRODUCT_DETAILS_RESET
    })
}
