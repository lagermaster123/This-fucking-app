import React from 'react'
import styled from 'styled-components'
import { AiFillFacebook, AiFillInstagram, AiFillGoogleCircle } from 'react-icons/ai'
import { FaYelp } from 'react-icons/fa'

const Footer = () => {
    return (
        <FooterStyles>
        <div className='footer'>
            <div className="container">
                <div className="col">
                    <div className="row">
                        <h1>FLOWER DELIVERY TO TAMARAC, FL <button className='btn-info'>See Delivery Areas</button></h1>
                        <span id='ftrTagline'>FAMILY OWNED. BEAUTIFUL ARRANGEMENTS FOR EVERY OCCASION!</span>
                    </div>
                    <div className="row">
                        <div id="hoursInfo">
                            <div className="row">
                                <ul id='ftrNav'>
                                    <li><a className="ftrTagline" href="/reviews">Reviews</a></li>
                                    <li><a className="ftrTagline" href="/about">About Us</a></li>
                                    <li><a className="ftrTagline" href="/shop">Shop</a></li>
                                    <li><a className="ftrTagline" href="/contact">Contact</a></li>
                                </ul>
                            </div>
                            <div className="row">
                                <div id="hours">
                                    <ul id="day">
                                        <li>Mon: </li>
                                        <li>Tue: </li>
                                        <li>Wed: </li>
                                        <li>Thu: </li>
                                        <li>Fri: </li>
                                        <li>Sat: </li>
                                        <li>Sun: </li>
                                    </ul>
                                    <ul id='time'>
                                        <li>9:30AM - 4:00PM</li>
                                        <li>9:30AM - 6:00PM</li>
                                        <li>9:30AM - 6:00PM</li>
                                        <li>9:30AM - 6:00PM</li>
                                        <li>9:30AM - 6:00PM</li>
                                        <li>9:30AM - 5:00PM</li>
                                        <li>CLOSED</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div id="ftrContact">
                                    <h4>Dream Decorations Florist</h4>
                                    <a 
                                        href="https://www.google.com/maps/place/Dream+Decorations+Florist/@26.1943604,-80.2484605,17z/data=!4m5!3m4!1s0x88d9056686e6adfb:0xc86c64e426a15b02!8m2!3d26.1943556!4d-80.2462718"
                                        target="blank"
                                        >
                                        7101 W COMMERCIAL BLVD SUITE 4H
                                        <br></br>
                                        TAMARAC, FL. 33319
                                    </a>
                                    <p>LOCAL: <a href="tel:954-642-2468">(954) 642-2468</a></p>
                                    <p>TOLLFREE: <a href="tel:833-237-3264">(833) 237-3264</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div id="social">
                            <AiFillFacebook className="smLink" size={50} />
                            <AiFillGoogleCircle className="smLink" size={50} />
                            <AiFillInstagram className="smLink" size={50} />
                            <FaYelp className="smLink" size={50} />
                        </div>
                    </div>
                    <div className="row">
                        <div id="legal">
                            <a href="https://florist.flowershopnetwork.com/myfsn-privacy-policies"
                                target="blank"
                                >
                                Privacy Policy
                            </a>
                            <a href="https://florist.flowershopnetwork.com/myfsn-terms-of-purchase"
                                target="blank"
                                >
                                Terms of Purchase
                            </a>
                            <a  href="https://www.flowershopnetwork.com/about/termsofuse.php" 
                                className="no-border"
                                target="blank"
                                >
                                Copyright 2022
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </FooterStyles>
    );
}

export default Footer

const FooterStyles = styled.footer`
    .footer {
        margin-top: auto;
        background-color: #272F41;
        color: white;
        overflow-x: hidden;
        .container {
            display: flex;
            justify-content: center;
            .col {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                a {
                    text-decoration: none;
                    color: white;
                    margin-bottom: 1em;
                    &:hover {
                        text-decoration: underline;
                    }
                }
                .row {
                    display: flex;
                    justify-content: center;
                    margin: .75em;
                    width: 100vw;
                    h1 {
                        border-bottom: 3px solid white
                    }
                    .ftrTagline {
                        font-size: 24px
                    }
                    #hoursInfo {
                        display: flex;
                        #ftrNav {
                            margin-right: auto;
                            color: green;
                            li {
                                list-style: none;
                                a {
                                    text-decoration: none;
                                    color: white;
                                    font-size: 25px;
                                    &:hover {
                                        text-decoration: underline;
                                    }
                                }
                            }
                        }
                        #hours {
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                            #day {
                                text-align: right;
                                li {
                                    list-style: none;
                                }
                            }
                            #time {
                                text-align: right;
                                li {
                                    list-style: none;
                                }
                            }
                        }
                        #ftrContact {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            text-align: center;
                            h3 {
                                text-decoration: bold;
                            }
                        }
                    }
                    #social {
                        display: flex;
                        justify-content: center;
                        .smLink {
                            margin: .5em;
                            padding: .15em;
                            &:hover {
                                padding: 0em;
                            }
                        }
                    }
                    #legal {
                        display: flex;
                        justify-content: center;
                        text-align: center;
                        a {
                            padding: 0em 1em;
                            border-right: 1px solid white
                        }
                        .no-border {
                            border: none;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        #hoursInfo {
            flex-direction: column;
            align-items: center;
            li {
                text-align: center;
            }
        }
    }
`