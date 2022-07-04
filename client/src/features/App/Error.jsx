import React from 'react'
import styled from 'styled-components'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Error({ error = 'Page not found', status = 404}) {
  return (
    <StyledError>
        <h1>Error!</h1>
        <h3>{status}</h3>
        <p>{error}</p>
        <Link to={'/'} id={'home'} className="d-flex flex-column align-items-center"><AiOutlineHome size={'5vh'}/><label htmlFor="home">Home</label></Link>
    </StyledError>
  )
}

export default Error

const StyledError = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    padding: 4em;
    h1 {
        font-weight: bold;
        font-size: 15vh;
        color: rgba(0,0,0,.5);
    }
    h3 {
        font-weight: bold;
        font-size: 10vh;
        color: rgba(0,0,0,.5);
    }
    a {
        text-decoration: none;
        cursor: pointer;
    }
    label {
        cursor: pointer;
    }
`