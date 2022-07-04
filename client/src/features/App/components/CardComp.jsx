import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import {Link} from 'react-router-dom'

const CardComp = ({ product, height = '50vh', width = '350px', xsHeight = '400px', xsWidth = '48vw' }) => {
    return(
        <CardCompStyles>
            <Link to={`/product/${product._id}`} style={{textDecoration: 'none'}}>
                <Box className='card' sx={{ width: { xs: xsWidth, md: width }, height: { xs: xsHeight, md: height }, m: '.5em' }}>
                    <div className="cardHead">
                        <img src={product.images[0]} alt="" className="cardImage"/>
                        <span className={product.countInStock > 0 ? 'd-none' : ''} color='danger'>out of stock</span>
                    </div>
                    <div className="cardBody">
                        <h5 className='title'>{product.title}</h5>
                        <span className='price'>${product.price}</span>
                    </div>
                </Box>
            </Link>
        </CardCompStyles>
    );
}

export default CardComp

const CardCompStyles = styled.div`
    .card {
        color: black;
        text-decoration: none;
        overflow: hidden;
        transition: .5s;
        border: none;
        padding: 2em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        .cardHead {
            display: flex;
            flex-direction: column;
            align-items: end;
            position: relative;
            height: 70%;
            span {
                position: relative;
                top: -5em;
                right: -1.5em;
            }
        }
        .cardBody {
            margin-top: auto;
            position: relative;
            height: 30%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .title {
                font-weight: bold;
                text-align: center;
            }
            .price {
                margin-bottom: .5em;
            }
        }
        &:hover {
           padding: 0; 
           cursor: pointer;
        }
    }
    @media (min-width: 768px) {
        img {
            height: 100%;
        }
    }
    @media (max-width: 768px) {
        img {
            height: 80%;
        }
    }
`