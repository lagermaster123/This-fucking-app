import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../redux/reducers/userSlice'
import { Navigate } from 'react-router-dom'
import FormInput from './components/Forms/FormInput'
import AddressDdlForm from './components/Forms/AddressDdlForm'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import axios from 'axios'
import { CircularProgress } from '@mui/material'

const inputs = [
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
        type: 'text',
        label: 'Phone Number',
        name: 'phone',
        pattern: '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$',
        errorMessage: 'Invalid phone number',
        required: true
    }
]

function Profile() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const [ disabled, setDisabled ] = useState(true)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')
    const [ edit, setEdit ] = useState({
        toggle: false,
        address: {}
    })
    const [ values, setValues ] = useState(user ? {
        username: user.username,
        image: user.image,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: String(user.phone),
        addresses: user.addresses || []
    } : {})
    const [ newAddress, setNewAddress ] = useState({})
    const onChange = (e) => {
        setError('')
        const inputs = Array.from(document.querySelectorAll('input'))
        const errors = inputs.filter(input => !input.validity.valid)
        if(errors.length) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
        setValues({...values, [e.target.name]: e.target.value})
    }
    const reset = () => {
        setValues({
            username: user.username,
            image: user.image,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone: user.phone,
            adressess: user.addressess  
        })
    }
    const upload = async (e) => {
        if(!e.target.value) return
        const form = document.getElementById(`desktop-profile-img`)
        const data = new FormData(form)
        const handleSuccess = (image) => {
            setValues({ ...values, image: image })
        }
        try {
            await axios.post('/upload/images', data, { headers: { 'content-type': 'multipart/form-data' }})
            .then(res => handleSuccess(res.data.image))
            console.log(values)
        } catch(e) {
            setError(e.message)
        }
    }
    const update = async () => {
        if (!error.length) {
            setLoading(true)
            const filteredPhone = values.phone.split('').filter(e => !isNaN(e)).join('')
            const newPhone = `${filteredPhone.slice(0,3)}-${filteredPhone.slice(3,6)}-${filteredPhone.slice(6,10)}`
            let newAddy = values.addresses
            if (!edit.toggle) {
                console.log(edit.address)
            }
            const data = {...values, phone: newPhone, addresses: newAddy}
            const handleSuccess = (user) => {
                setError('')
                dispatch(login(user))
                window.location.reload(false)
            }
            const handleError = (message) => {
                setError(message)
                setLoading(false)
            }
            // await axios.post('/user/update', data)
            // .then(res => res.data.message === 'success' ? handleSuccess(res.data.user) : handleError(res.data.message))
        }
    }
    if (user) {
        return (
            <StyledProfile>
                <Box sx={{ width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Box sx={{ alignText: 'center', color: 'danger' }}><span className='text-danger'>{error}</span></Box>
                    <Box sx={{ width: {xs: '80%', md: '50%'}, display: 'flex', flexDirection: {xs: 'column', md: 'row'}, alignItems: {xs: 'center', md: 'start'} }}>
                        <Box sx={{ width: {xs: '100%', md: '50%'}, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2em'}}>
                            <h1><b>Edit Profile</b></h1>
                            <form id='desktop-profile-img'>
                                <label className='d-flex flex-column align-items-center' htmlFor="desktop-img">
                                    <Avatar src={user.image.length ? values.image[0].url : ''} alt={user.image[0].filename}>
                                        +
                                    </Avatar>
                                    {user.image[0].url.length > 0 ? 'Change' : 'Add'} Profile Image
                                </label>  
                                <input id='desktop-img' type="file" name='image' onChange={upload} disabled={loading} style={{ display: 'none' }}/> 
                            </form>
                            { inputs.map((input, index) => 
                                <Box sx={{ width: {xs: '100%', md: '100%'} }} key={input.name}>
                                    <FormInput 
                                        {...input}
                                        onChange={onChange}
                                        state={values}
                                        disabled={loading}/>
                                </Box>
                            )}
                        </Box>
                        <AddressDdlForm sx={{ width: {xs: '95vw'}}} user={user} setEdit={setEdit} values={newAddress} setValues={setNewAddress} setDisabled={setDisabled} loading={loading} setError={setError}/>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '70%'}}>
                        <Button variant='contained' color='inherit' disabled={loading} onClick={reset}>Reset</Button>
                        <Button variant='contained' disabled={loading || disabled} onClick={update}>
                            {loading ? <CircularProgress color={'inherit'} size={20}/> : 'Save'}
                        </Button>
                    </Box>
                </Box>
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
    label {
        cursor: pointer;
    }
`