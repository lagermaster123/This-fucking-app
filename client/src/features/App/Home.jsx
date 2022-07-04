import React, { useEffect, useState }from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import { IoIosOptions } from 'react-icons/io'
import { GrDeliver, GrDiamond } from 'react-icons/gr'
import AboutUs from './components/AboutUs'
import Contact from './components/Contact'
import CardComp from './components/CardComp'
import { getProducts as listProducts } from '../../redux/actions/productActions'
import axios from 'axios'


const Home = () => {
    const dispatch = useDispatch()
    const getProducts = useSelector((state) => state.getProducts)
    const { products, loading, error } = getProducts

    const [filters, setFilters] = useState({
        categories: [],
        price: []
    })

    useEffect(() => {
        dispatch(listProducts({ filters }))
    }, [dispatch]);

    return(
    <HomeStyles>
        <div className="main">
            <div id="showcase">
                <div className="col">
                    <div className="row">
                        <img id='bg' src="/images/background-img.png" alt="" />
                        <div className="overlay">
                            <div className="callToAction">
                                <h2>Flowers Delivered</h2>
                                <h2>with Love</h2>
                                <button className='btn btn-info'>Call Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="container">
                            <div className="products">
                                <div className="ShowcaseFlowers">
                                {loading 
                                ? <CircularProgress /> 
                                : error 
                                    ? <h2>{error}</h2> 
                                    : products.map((product, i) => (
                                        <CardComp
                                            key={i}
                                            product={product}
                                            height={'50vh'}
                                            width={'350px'}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="features">
                <div className="container">
                <div className="card">
                    <IoIosOptions size={'1.5rem'}/>
                    <div className="info">
                        <h5>Custom Orders</h5>
                        <div className='d-flex align-items-center justify-content-center'>
                            <div className="line"></div>
                        </div>
                        <p>Make a bouquet your own!</p>
                    </div>
                </div>
                <div className="card">
                    <GrDeliver size={'1.5rem'}/>
                    <div className="info">
                        <h5>Free Delivery</h5>
                        <div className='d-flex align-items-center justify-content-center'>
                            <div className="line"></div>
                        </div>
                        <p>Free shipping on every order!</p>
                    </div>
                </div>
                <div className="card">
                    <GrDiamond size={'1.5rem'}/>
                    <div className="info">
                        <h5>Satisfaction Guarenteed</h5>
                        <div className='d-flex align-items-center justify-content-center'>
                            <div className="line"></div>
                        </div>
                        <p>Not Satisfied with your order? <br />
                        Get approved for a refund and get your money back!</p>
                    </div>
                </div>
                </div>
            <div id="about"></div>
            </div>
            <AboutUs />
            <Contact />
        </div>
    </HomeStyles>
    );
}

export default Home


const HomeStyles = styled.div`
    .main {
        overflow: hidden;
        #showcase {
            height: 60vh;
            background-color: rgba(53, 58, 88, 67%);
            .col {
                .row {
                    .overlay {
                        position: absolute;
                        margin: 0;
                        padding: 1em;
                        height: 60vh;
                        width: 33vw;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: rgba(0, 0, 0, 47%);
                        z-index: 2;
                        #icon {
                            margin-left: 2em;
                            width: 20vw;
                        }
                        .callToAction {
                            margin: 0 2em;
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            h2 {
                                color: white;
                                font-family: 'Great Vibes', cursive;
                            }
                            button {
                                width: 90px;
                                margin: 1em 0;
                            }
                        }
                    }
                    .container {
                        position: relative;
                        left: 30vw;
                        height: 60vh;
                        overflow-y: hidden;
                        overflow-x: auto;
                        .products {
                            .ShowcaseFlowers {
                                margin: auto;
                                display: grid;
                                grid-auto-flow: column;
                                grid-auto-columns: 30%;
                                padding: 3em;
                                .productCard {
                                    height: 50vh;
                                    width: 350px;
                                }
                            }
                        }
                    }
                }
            }
        }
        #features {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40vh;
            background-color: white;
            position: relative;
            z-index: 2;
            .container {
                display: flex;
                justify-content: center;
                .card {
                    height: 200px;
                    background-color: transparent;
                    border: none;
                    margin: auto;
                    .info {
                        margin-left: 1em;
                        .line {
                            border-bottom: 2px solid black;
                            width: 80px;
                        }
                        p {
                            margin-top: .25em;
                        }
                    }
                }
            }
        }
        @media (min-width: 768px) {
            background: url('/images/background-img.png') no-repeat center center fixed;
            h2 {
                font-size: 4em;
            }
            #bg {
                display: none;
            }
            .ShowcaseFlowers {
                gap: 1em;
            }
            #features {
                .card {
                    display: flex;
                    flex-direction: row;
                }
            }
        }
        @media (max-width: 768px) {
            background: url('/images/background-img.png') no-repeat top center;
            h2 {
                font-size: 2em;
            }
            #bg {
                display: none;
                height: 60vh;
                width: auto;
                overflow: hidden;
                opacity: .7;
            }
            .ShowcaseFlowers {
                gap: 15rem;
            }
            #features {
                .container {
                    height: 25vh;
                    justify-content: center;
                    align-items: center;
                    .card {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        margin: 0;
                        .feature {
                            margin-bottom: 5em;
                        }
                        .info {
                            text-align: center;
                        }
                        p {
                            display: none;
                        }
                    }
                }
            }
        }
    }
`;
