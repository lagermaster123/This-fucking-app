import React, { useState } from 'react';
import { createGlobalStyle } from "styled-components"
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './features/App/Navbar'
import Footer from './features/App/components/Footer'
import Home from './features/App/Home'
import Shop from './features/App/Shop'
import Product from './features/App/Product'
import Cart from './features/App/Cart'
import Checkout from './features/App/Checkout'
import Login from './features/App/Login'
import Register from './features/App/Register'
import Profile from './features/App/Profile'
import Error from './features/App/Error'
import ForgotPassword from './features/App/ForgotPassword';
import axios from 'axios'
import {
  Routes,
  Route
} from 'react-router-dom'

import { getProducts as listProducts } from './redux/actions/productActions'
import { useGoogleOneTapLogin } from 'react-google-one-tap-login'

function App() {
    useGoogleOneTapLogin({
        onSuccess: (response) => axios.post('/user/one-tap', { response }),
        onError: (e) => console.log(e),
        googleAccountConfigs: {
            client_id: "1044830510357-anorf42rh8k5t226ot51jsfjdlkaht1n.apps.googleusercontent.com",
        }
    })
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
  
    const [checked, setChecked] = useState([])
    const [filters, setFilters] = useState({
        categories: [],
        price: [0,100]
    })
  
    const handleToggle = (value, category, range) => {
        const newFilters = {...filters}
        switch(category) {
            case 'categories':
                const currentIndex = checked.indexOf(value)
                const newChecked = [...checked]
        
                if(currentIndex === -1) {
                    newChecked.push(value)
                } else {
                    newChecked.splice(currentIndex, 1)
                }
                setChecked(newChecked)
                newFilters.category = newChecked
                setFilters(newFilters)
                break
            case 'price':
                newFilters.price = range
                setFilters(newFilters)
                break
            default: return null
        }
  
        setFilters(newFilters)
        dispatch(listProducts({ filters: newFilters }))
  }
  return (
    <div className="App">
        <div id="g_id_onload"
            data-client_id="1044830510357-anorf42rh8k5t226ot51jsfjdlkaht1n.apps.googleusercontent.com"
            data-login_uri="http://localhost:2000"
        ></div>
        <Navbar handleToggle={handleToggle} filters={filters}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route path="shop" element={<Shop handleToggle={handleToggle} filters={filters} checked={checked}/>} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer/>
        <GlobalStyle />
    </div>
  );
}

export default App;

const primary = '#DED1B6'
const secondary = '#FC9BC0'
const dark = '#616BA7'
const light = 'white'
const feature = '#CDF4F1'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        body {
            background-color: ${primary};
            overflow-x: hidden;
            font-size: 12pt;
            font-family: 'Lato', sans-serif;
            li {
                list-style: none;
            }
            textarea {
                border-radius: 10px;
                padding: .25em;
                color: ${dark};
                resize: none;
                box-shadow: 5px 5px 15px -7px rgba(0,0,0,0.5);
                &:active {
                    filter: brightness(100%);
                }
            }
            .d-none {
                display: none;
            }
            .order-now {
                width: 10em;
                height: 4em;
                border: none;
                border-radius: 1em;
                background-color: ${dark};
                color: white;
                transition: .25s;
                &:hover {
                    background-color: ${secondary};
                }
            }
            .btn-primary {
                border: none;
                border-radius: 20px;
                background-color: ${dark};
                color: white;
                font-weight: bold;
                box-shadow: 5px 5px 15px -7px rgba(0,0,0,.5);
                &:focus, &:active, &:hover {
                    box-shadow: none;
                    outline: none;
                    background-color: ${dark};
                    filter: brightness(200%);
                    border: none;
                    color: white;
                }
            }
            .btn-secondary {
                margin: 0 1em;
                border-radius: 0px;
                border: none;
                background-color: ${primary};
                color: black;
                &:hover {
                    background-color: ${primary};
                    color: white;
                    filter: brightness(50%);
                }
            }
            .btn-info {
                margin: 0 1em;
                border-radius: 0px;
                border: none;
                background-color: ${light};
                color: black;
                
                &:focus, &:active, &:hover{
                    box-shadow: none;
                    outline: none;
                    background-color: ${light};
                    filter: brightness(150%);
                    border: none;
                    color: black;
                }
            }
            .b {
                font-weight: bold;
                font-size: 20px;
            }
            .main {
                min-height: 100vh;
            }
        }
    }

    //big screen
    @media (min-width: 3000px) {
        body {
            font-size: 30px;
            overflow: hidden;
            a {
                text-decoration: none;
                font-size: 30px;
            }
            li {
                list-style: none;
            }
            .b {
                font-size: 40px;
            }
            h2 {
                font-weight: bold;
                font-size: 60px;
            }
            .spacer {
                height: 60vh;
            }
            #contact {
                background-color: ${light};
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .footer {
                width: 100%;
                .container {
                    width: 3000px;
                    .col {
                        width: 3000px;
                    }
                }
            }
        }
    }

    //mobile
    @media (min-width: 3000px) {
        .btn-info {
            width: 10vw;
        }
    }
`;