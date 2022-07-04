import React from 'react'
import styled from 'styled-components'
import CartCard from './components/CartCard'
import Button from '@mui/material/Button'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../../redux/actions/cartActions'

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const prodChangeHandler = (id, qty, method, orderDue, quality) => {
        dispatch(addToCart(id, qty, method, orderDue, quality))
    }

    const removeHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const getCardCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
    }

    const getCartSubtotal = () => {
        return cartItems.reduce((price, item) => item.price * item.qty + price, 0)
    }

    return (
        <CartStyles>
            <h1>Shopping Cart</h1>
            <div className="main">
                <div className="cart">
                    {cartItems.length === 0 ? (
                        <div>
                            Your cart is empty <Link to="/">Go Back</Link>
                        </div>
                    ): cartItems.map((item, i) => (
                            <CartCard 
                                key={i} 
                                item={item} 
                                prodChangeHandler={prodChangeHandler}
                                removeFromCart={removeHandler}
                            />
                        ))}
                </div>
                <div className="totals">
                    <div className="sub">
                        <h6>Subtotal:</h6>
                        <p className='subtotal'><b>${getCartSubtotal().toFixed(2)}</b></p>
                    </div>
                    <Link to={cartItems.length ? '/checkout' : ''}><Button variant='contained' color='primary' disabled={!cartItems.length}>Proceed To Checkout</Button></Link>
                </div>
            </div>
        </CartStyles>
    );
}

export default Cart

const CartStyles = styled.div`
    text-align: center;
    .subtotal {
        font-size: 20pt;
    }
    a {
        text-decoration: none;
    }
    h1 {
        margin-top: .5em;
        font-weight: bold;
        height: 5vh;
    }
    .main {
        display: flex;
        padding: 5em;
        .cart {
            padding: 0 2em;
            margin-right: 5vw;
            width: 70vw;
        }
        .totals {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: white;
            padding: 2em;
            height: 25%;
            width: 25vw;
        }
    }
    @media (max-width: 768px) {
        .main {
            height: 40vh;
            flex-direction: column;
            justify-content: space-between;
            padding: 0;
            .cart {
                width: 100%;
                margin: 0;
                padding: 0 .5em;
            }
            .totals {
                width: 100%;
                text-align: center;
                margin: 0;
            }
        }
    }
`