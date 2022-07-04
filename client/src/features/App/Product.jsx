import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
// import Picker from '../../../../../everything stinks/client/src/features/App/components/Picker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios'

//Actions
import { addToCart } from '../../redux/actions/cartActions'

const Product = () => {
    const [ dateOpen, setDateOpen ] = useState(false)
    const [ product, setProduct ] = useState({})
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState()
    const [ selected, setSelected ] = useState('deluxe')
    const [ quality, setQuality ] = useState('deluxe')
    const [ Qty, setQty ] = useState(1)
    const [method, setMethod] = useState('pickup')
    const orderDate = new Date()
    orderDate.setDate(orderDate.getDate() + 2)
    const [orderDue, setOrderDue] = useState(orderDate)
    const [ pickerDate, setPickerDate ] = useState(Date)
    const [ toggle, setToggle ] = useState('pickup')
    const [ Default, setDefault ] = useState('1')
    const [startDate, setStartDate] = useState(new Date())
    const [dateChange, setDateChange] = useState(false)
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const getProductDetails = async() => {
            await axios.get('/products/' + id)
            .then(res => {
                setProduct(res.data)
                setLoading(false)
            })
            .catch(e => setError(e))
        }
        if (product && id !== product._id) {
          getProductDetails()
          console.log(orderDue)
        }
      }, [dispatch, id, product]);

    const addToCartHandler = () => {
        dispatch(addToCart(id, Qty, method, orderDue, quality))
        navigate('/cart')
    }

    const handleCardClick = (id) => {
        setSelected(id)
        setQuality(id)
    }
    const updateFulfill = (target) => {
        setToggle(target)
        setMethod(target)
    }
    const toggleDefault = (id, date) => {
        if (id !== '3') setDateOpen(false)
        setDefault(id)
        setOrderDue(date)
    }
    const handlePickerChange = (value) => {
        const date = value.split('-')
        setOrderDue(new Date(date[0], Number(date[1]) - 1, date[2]))
        setPickerDate(value)
        setDefault('3')
    }
    const handleLabel = (e) => {
        setDateOpen(true)
    }
    const getDay = (day) => {
        const value = day.getDay()
        switch (value) {
            case 0:
                return 'Sun'
            case 1:
                return 'Mon'
            case 2:
                return 'Tue'
            case 3:
                return 'Wed'
            case 4:
                return 'Thu'
            case 5:
                return 'Fri'
            case 6:
                return 'Sat'
            default:
                return ''
        }
    }
    const today = new Date()
    let tommorrow = new Date()
    tommorrow.setDate(today.getDate() + 1)
    let dayAfter = new Date()
    dayAfter.setDate(today.getDate() + 2)
    let dayAfterThat = new Date()
    dayAfterThat.setDate(today.getDate() + 3)
    let dateStart = new Date()
    dateStart.setDate(today.getDate() + 4)
    let dateEnd = new Date()
    dateEnd.setDate(today.getDate() + 365)
    return (
        <ProductStyles>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="main">
                <div className="product-container">
                    {loading ? (
                        <h2>Loading...</h2>
                    ): error ? (
                        <h2>{error}</h2>
                    ): (
                        <>
                            <div className="row product">
                                <img src={product.images[0]} alt="" />
                                <div className="d-flex justify-content-between w-100">
                                    <h3 className='description'>Description</h3>
                                    <div className="status">{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</div>
                                </div>
                                <h3 className='mobile-title'>{product.title}</h3>
                                <p>{product.description}</p>
                                <p>Size: <b>10" x 11" x 5"</b></p>
                            </div>
                            <div className="row">
                                <div className="col details">
                                    <h2 className='title'>{product.title}</h2>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <div className="qty d-flex align-items-center">
                                            <span>Qty: </span>
                                            <select value={Qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button 
                                            className='order-now m-2' 
                                            disabled={id && Qty && method && orderDue && quality ? false : true}
                                            onClick={addToCartHandler}
                                        >{product.countInStock > 0 ? 'Add to Cart' : 'Pre-Order'}</button>
                                    </div>

                                    {/********************************* PRODUCT OPTIONS *********************************/}
                                    <div className="section">
                                        <div id="regular" className={selected === 'regular' ? 'card selected' : 'card'} onClick={(e) => handleCardClick(e.target.id)}>
                                            <img src={product.images[0]} alt={product.title} />
                                            <h5>Regular</h5>
                                            <span>${product.price}</span>
                                        </div>
                                        <div id="deluxe" className={selected === 'deluxe' ? 'card selected' : 'card'} onClick={(e) => handleCardClick(e.target.id)}>
                                            <img src={product.images[0]} alt={product.title} />
                                            <h5>Deluxe</h5>
                                            <span>${product.price + 10}</span>
                                        </div>
                                        <div id="premium" className={selected === 'premium' ? 'card selected' : 'card'} onClick={(e) => handleCardClick(e.target.id)}>
                                            <img src={product.images[0]} alt={product.title} />
                                            <h5>Premium</h5>
                                            <span>${(product.price + 20).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    {/********************************* FULFILLMENT METHOD *********************************/}
                                    <div className="fulfillment">
                                        <div className="tabs">
                                            <div id='delivery' className={toggle === 'delivery' ? 'tab' : 'tab un-ticked'} onClick={(e) => updateFulfill(e.target.id)}>Delivery</div>
                                            <div id='pickup' className={toggle === 'pickup' ? 'tab' : 'tab un-ticked'} onClick={(e) => updateFulfill(e.target.id)}>Pickup</div>
                                        </div>
                                        <div className="body">
                                            <div className="date disabled">
                                                <span>Today</span>
                                                <div>{today.getDate()}</div>
                                            </div>
                                            <div className="date disabled">
                                                <span>{getDay(tommorrow)}</span>
                                                <div>{tommorrow.getDate()}</div>
                                            </div>
                                            <div id='1' className={Default === '1' ? 'date default' : 'date'} onClick={(e) => toggleDefault(e.target.id, dayAfter)}>
                                                <span>{getDay(dayAfter)}</span>
                                                <div>{dayAfter.getDate()}</div>
                                            </div>
                                            <div id='2' className={Default === '2' ? 'date default' : 'date'} onClick={(e) => toggleDefault(e.target.id, dayAfterThat)}>
                                                <span>{getDay(dayAfterThat)}</span>
                                                <div>{dayAfterThat.getDate()}</div>
                                            </div>
                                            <label id='3' htmlFor="dtp"  className={!dateOpen ? 'date' : 'd-none'} onClick={handleLabel}
                                            >More Dates</label>
                                            <input
                                                type="date"
                                                value={pickerDate}
                                                onChange={(e) => handlePickerChange(e.target.value)}
                                                min={`${dateStart.getFullYear()}-${dateStart.getMonth() + 1 < 10 ? '0' + (dateStart.getMonth() + 1).toString() : (dateStart.getMonth() + 1).toString()}-${dateStart.getDate() < 10 ? '0' + dateStart.getDate().toString() : dateStart.getDate().toString()}`} 
                                                max={`${dateEnd.getFullYear()}-${dateEnd.getMonth() + 1 < 10 ? '0' + (dateEnd.getMonth() + 1).toString() : (dateEnd.getMonth() + 1).toString()}-${dateEnd.getDate() < 10 ? '0' + dateEnd.getDate().toString() : dateEnd.getDate().toString()}`} 
                                                className={dateOpen ? '' : 'd-none'} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-section">
                                    <div id="reviews">
        
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            </LocalizationProvider>
        </ProductStyles>
    )
}

export default Product

const ProductStyles = styled.div`
    .main {
        min-height: 100vh;
        padding: 5em;
        background-color: #F3E6CC;
        .product-container {
            display: flex;
            .row {
                background-color: white;
                width: 50vw;
                display: flex;
                justify-content: center;
                align-items: center;
                .col {
                    display: flex;
                    flex-direction: column;
                    button {
                        margin-top: 2em;
                    }
                }
            }
            .product {
                position: relative;
                .mobile-title {
                    display: none;
                }
            }
            .section {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                .card {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    min-height: 10em;
                    text-align: center;
                    padding: 1em;
                    img {
                        height: auto;
                        width: 100%;
                    }
                    img, span, h5 {
                        pointer-events: none;
                    }
                }
                .selected {
                    border: 3px #2d307e solid;
                }
            }
            .fulfillment {
                display: flex;
                flex-direction: column;
                height: 10em;
                .tabs {
                    height: 20%;
                    min-width: 5em;
                    display: flex;
                    .tab {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        background-color: white;
                        position: relative;
                        top: 1px;
                        border: 1px solid rgba(0,0,0,.25);
                        border-bottom: none;
                        padding: 0 .5em;
                        border-radius: 1em 1em 0px 0px;
                    }
                    .un-ticked {
                        background-color: white;
                        border: none;
                        filter: brightness(88%);
                    }
                }
                .body {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 80%;
                    padding: 2em;
                    background-color: white;
                    border: 1px solid rgba(0,0,0,.25);
                    border-radius: 0 1em 1em 1em;
                    .date {
                        cursor: pointer;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        border-radius: 1em;
                        justify-content: center;
                        text-align: center;
                        border: 1px solid rgba(0,0,0,.25);
                        height: 5em;
                        width: 5em;
                        span, div {
                            pointer-events: none;
                        }
                        &:hover {
                            border: 2px solid black;
                        }
                    }
                    .disabled {
                        border: none;
                        cursor: default;
                        background-color: rgba(0,0,0,.25);
                        &:hover {
                            border: none;
                        }
                    }
                    .default {
                        border: 2px solid black;
                    }
                    
                }
            }
        }
    }
    @media (min-width: 768px) {
        .main {
            .product-container {
                .product {
                    img {
                        height: 60%;
                        width: auto;
                    }
                }
                .row {
                    .col {
                        .section {
                            padding: 3em;
                        }
                    }
                }

            }
        }
        .card {
            width: 10em;
            margin: 1em;
        }
        .col {
            padding: 2em;
        }
    }
    @media (max-width: 768px) {
        p {
            font-size: .75em;
        }
        .main {
            padding: 0;
            width: 100vw;
            .product-container {
                flex-direction: column;
                .product {
                    img {
                        height: 30%;
                        width: auto;
                    }
                }
                .row {
                    width: 100%;
                    margin: 0;
                    padding-bottom: 0;
                    overflow: hidden;
                }
                .title {
                    display: none;
                }
                .mobile-title {
                    margin-top: 7vh;
                    display: block;
                }
                .fulfillment {
                    width: 100%;
                    .tabs {
                        border-bottom: 1px solid rgba(0,0,0,.25);
                    }
                    .body {
                        padding: 0;
                        margin: .25em 0;
                        border: none;
                        .date {
                            height: 50%;
                            width: 15%;
                            margin: .25em;
                        }
                    }
                }
                .col {
                    padding: 1em .5em;
                }
                .card {
                    width: 30vw;
                    margin: .5em;
                }
                .section {
                    padding: .5em;
                }
            }
        }
    }
`