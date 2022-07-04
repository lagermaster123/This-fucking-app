import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import FormInput from './components/Forms/FormInput'
import AddressDdlForm from './components/Forms/AddressDdlForm'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const inputs = [
    {
        label: 'Username',
        name: 'username',
        type: 'text',
        errorMessage: 'Invalid',
        helperText: <Link to={"/change-password"}>change password</Link>,
        pattern: '^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$',
        required: true,
    },
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        errorMessage: 'Invalid',
        pattern: '^[A-Za-z0-9 ]{0,32}$',
        required: true,
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        errorMessage: 'Invalid',
        required: true,
    },
    {
        label: 'phone',
        name: 'phone',
        type: 'text',
        errorMessage: 'Invalid',
        pattern: '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$',
        required: true,
    }
]

function Profile() {
    const user = useSelector(state => state.user.user)
    const [ disabled, setDisabled ] = useState(true)
    const [ values, setValues ] = useState(user ? {
        username: user.username,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        adressess: user.addressess,
        paymentMethods: user.paymentMethods
    } : {})
    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
        setDisabled(false)
    }
    const reset = () => {
        setValues({
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone: user.phone,
            adressess: user.addressess,
            paymentMethods: user.paymentMethods  
        })
    }
    if (user) {
        return (
            <StyledProfile>
                <Box sx={{ width: {xs: '80vw', md: '33vw'}, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1><b>Edit Profile</b></h1>
                { inputs.map((input, index) => 
                    <Box sx={{ width: {xs: '100%', md: '100%'} }} key={input.name}>
                        <FormInput 
                            {...input}
                            onChange={onChange}
                            state={values}/>
                    </Box>
                )}
                <AddressDdlForm user={user}/>
                </Box>
                <div className="d-flex justify-content-between m-3 w-100">
                    <Button variant='contained' color='inherit' onClick={reset}>Reset</Button>
                    <Button variant='contained' disabled={disabled}>Save</Button>
                </div>
            </StyledProfile>
          )
    } else {
        return (
            <Navigate to={'/login'} />
        )
    }
}

export default Profile

const StyledProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3em;
`