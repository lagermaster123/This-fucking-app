import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'

const CartCard = ({ item, prodChangeHandler, removeFromCart }) => {
    const subtotal = Number(item.price)*Number(item.qty)
    return (
        <CartCardStyles>
            <div className="card">
                <Link to={`/product/${item.product}`} className="image">
                    <img src={item.images[0]} alt={item.title} />
                    <span className='title'>{item.title}</span>
                </Link>
                <div className="qty">
                    <div>
                    <span>Qty: </span>
                    <select style={{ width: '40px' }} value={item.qty} onChange={(e) => prodChangeHandler(item.product, e.target.value, item.method, item.orderDue, item.quality)}>
                        {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>{x+1}</option>
                        ))}
                    </select>
                    </div>
                    <select style={{ width: '80px' }} value={item.quality} onChange={(e) => prodChangeHandler(item.product, item.qty, item.method, item.orderDue, e.target.value)}>
                        <option value="regular">Regular</option>
                        <option value="deluxe">Deluxe</option>
                        <option value="premium">Premium</option>
                    </select>
                    <select style={{ width: '80px' }} value={item.method} onChange={(e) => prodChangeHandler(item.product, item.qty, e.target.value, item.orderDue, item.quality)}>
                        <option value="pickup">Pickup</option>
                        <option value="delivery">Delivery</option>
                    </select>
                </div>
                <div className="ending">
                    <span><b>${subtotal.toFixed(2)}</b></span>
                    <FaTrashAlt className='trash' onClick={() => removeFromCart(item.product)}/>
                </div>
            </div>
        </CartCardStyles>
    )
}

export default CartCard


const CartCardStyles = styled.div`
    .card {
        a {
            text-decoration: none;
            color: black;
        }
        height: 5em;
        margin: .5em 0;
        padding: 1.5em;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .image {
            width: 33%;
        }
        img {
            height: 3em;
            width: 3em;
        }
        .title {
            margin-left: 1em;
        }
        .trash {
            margin-left: 1em;
            fill: #2d307e;
            cursor: pointer;
        }
        .qty {
            display: flex;
            width: 33%;
        }
    }
    @media (max-width: 768px) {
        .card {
            height: 10em;
        }
        .image {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            img {
                height: 6em;
                width: auto;
            }
        }
        .qty {
            flex-direction: column;
            align-items: end;
            select {
                margin: .25em;
            }
        }
    }
`