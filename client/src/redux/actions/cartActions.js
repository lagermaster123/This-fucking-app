import * as actionTypes from '../constants/cartConstants'
import axios from 'axios'

export const addToCart = (id, qty, method, orderDue, quality) => async (dispatch, getState) => {
    const { data } = await axios.get(`/products/${id}`)
    let price
    switch(quality) {
        case 'deluxe':
            price = data.price + 10
            break
        case 'premium':
            price = data.price + 20
            break
        default:
            price = data.price
            break
    }

    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            product: data._id,
            title: data.title,
            images: data.images,
            price: price,
            countInStock: data.countInStock,
            qty,
            method,
            status: data.countInStock > 0 ? 'open' : 'pre-order',
            orderDue: new Date(orderDue),
            quality
        }
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
}