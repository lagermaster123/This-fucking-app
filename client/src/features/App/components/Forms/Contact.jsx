import React from 'react'
import styled from 'styled-components'
import FormInput from './FormInput'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

function Contact({ contactInfo, onChange }) {
  return (
    <StyledContact>
        <h1>Contact Info</h1>
        <small>for order updates and tracking information</small>
        <Link to={'/login'}><Button style={{width: '100%'}} variant='contained'>Login</Button></Link>
        <Link to={'/register'}><Button style={{width: '100%'}} variant='contained' color='warning'>Register</Button></Link>
        <span>or</span>
        <FormInput
            id='contactInfo'
            state={contactInfo}
            type='email'
            name='email'
            pattern='^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$'
            label='Email'
            errorMessage='Invalid Email'
            required
            onChange={onChange}
        />
        <FormInput
            id='contactInfo'
            state={contactInfo}
            type='number'
            pattern='^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'
            name='phone'
            label='Phone'
            helperText='123-456-7890'
            errorMessage='Invalid Phone Number'
            required
            onChange={onChange}
        />
    </StyledContact>
  )
}

export default Contact

const StyledContact = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 2em;
    span {
      margin: 1em;
    }
    a, #contactInfo {
      text-decoration: none;
      width: 40%;
    }
    a {
      margin: .5em;
    }
`