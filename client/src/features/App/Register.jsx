import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import FormInput from './components/Forms/FormInput'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import AddIcon from '@mui/icons-material/Add';
import { Navigate } from 'react-router-dom'

import { login } from '../../redux/reducers/userSlice'

const Register = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const [ Error, setError ] = useState(null)
    const [ Loading, setLoading ] = useState(false)
    const [ values, setValues ] = useState({
        image: [
            {
                filename: '',
                url: ''
            }
        ],
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: undefined,
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate();

    const handleRegisterSuccess = (user) => {
        setLoading(false)
        dispatch(login(user))
        navigate('/shop')
    }

    const handleRegisterFailed = (message) => {
        setLoading(false)
        setError(message)
    }

    const register = async (e) => {
        setLoading(true)
        const inputs = Array.from(document.querySelectorAll('input'))
        const errors = inputs.filter(input => input.validity.valid === false).length
        if (errors) {
            setError('Please fill everything out')
            setLoading(false)
        } else {
            setError('')
            await axios.post('/user/register', values)
            .then(res => res.data.message === 'success' ? handleRegisterSuccess(res.data.user) : handleRegisterFailed(res.data.message))
        }
    }

    const inputs = [
        {
            id: 'cunt',
            type: 'text',
            label: 'First Name',
            name: 'firstName',
            pattern: '^[A-Za-z ]{1,32}$',
            errorMessage: 'Invalid first name',
            required: true
        },
        {
            id: 'cunt2',
            type: 'text',
            label: 'Last Name',
            name: 'lastName',
            pattern: '^[A-Za-z ]{1,32}$',
            errorMessage: 'Invalid last name',
            required: true
        },
        {
            id: 'cunt3',
            type: 'email',
            label: 'Email',
            name: 'email',
            errorMessage: 'Invalid email',
            required: true
        },
        {
            id: 'cunt4',
            type: 'text',
            label: 'Phone Number',
            name: 'phone',
            pattern: '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$',
            errorMessage: 'Invalid phone number',
            required: true
        },
        {
            id: 'username',
            type: 'text',
            label: 'Username',
            name: 'username',
            pattern: '^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$',
            errorMessage: '8-20 characters, no special characters',
            required: true
        },
        {
            id: 'password',
            type: 'password',
            label: 'Password',
            name: 'password',
            pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
            errorMessage: '0-8 characters, one letter, one number and one special character',
            required: true
        },
        {
            id: 'confirmPassword',
            type: 'password',
            label: 'Confirm Password',
            name: 'confirmPassword',
            pattern: values.password,
            errorMessage: 'Passwords must match',
            required: true
        },
    ]

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value })
    }

    const upload = async (value, type) => {
        if(!value) return
        setLoading(true)
        const form = document.getElementById(`${type}-profile-img`)
        const data = new FormData(form)
        const handleSuccess = (image) => {
            setLoading(false)
            setValues({ ...values, image: image })
        }
        try {
            await axios.post('/upload/images', data, { headers: { 'content-type': 'multipart/form-data' }})
            .then(res => handleSuccess(res.data.image))
        } catch(e) {
            setLoading(false)
            setError(e.message)
        }
    }

    if(!user) { return (
        <RegisterStyles>
            <div className="main">
                <div className="image-screen">
                    <div className="overlay">
                        <img className='icon' src="/favicon.png" alt="" />
                    </div>
                </div>
                <div className="login-screen">
                    <h1>Register</h1>
                    {Error ? <span className='text-danger'><b>{Error}</b></span> : <></>}
                    <div className="register">
                        <div className="desktop">
                            <form id="desktop-profile-img">
                                <label className='d-flex flex-column align-items-center' htmlFor="desktop-img">
                                    {values.image[0].url.length > 0 ? 'Change' : 'Add'} Profile Image
                                    <Avatar src={values.image[0].url} alt={values.image[0].filename}>
                                        {Loading ? <CircularProgress /> : <AddIcon />}
                                    </Avatar>
                                </label>
                                <input id='desktop-img' type="file" name='image' onChange={(e) => upload(e.target.value, 'desktop')} disabled={Loading} style={{ display: 'none' }}/>
                            </form>
                            <div action='/user/register' method='POST' onSubmit={register} noValidate encType="multipart/form-data">
                                {inputs.map((input, index) => (
                                    <FormInput 
                                        key={input.id}
                                        state={values}
                                        {...input}
                                        onChange={onChange} 
                                        disabled={Loading}
                                    />
                                ))}
                                <Button type='submit' variant='contained' disabled={Loading} onClick={register}>{Loading ? <CircularProgress color="inherit" size={20}/> : 'Sign Up'}</Button>
                            </div>
                        </div>

                        <div className="mobile">
                            <form id="mobile-profile-img">
                                <label className='d-flex flex-column align-items-center' htmlFor="desktop-img">
                                    {values.image[0].url.length > 0 ? 'Change' : 'Add'} Profile Image
                                    <Avatar src={values.image.length ? values.image[0].url : ''} alt={values.image[0].filename}>
                                        {Loading ? <CircularProgress color='inherit'/> : <AddIcon />}
                                    </Avatar>
                                </label>                                
                                <input id='mobile-img' type="file" name='image' onChange={(e) => upload(e.target.value, 'mobile')} disabled={Loading} style={{ display: 'none' }}/>
                            </form>
                            <div>
                                <div className="d-flex form-row">
                                    <FormInput state={values} onChange={onChange} {...inputs[0]} disabled={Loading} />
                                    <FormInput state={values} onChange={onChange} {...inputs[1]} disabled={Loading} />
                                </div>
                                <div className="d-flex form-row mb-2">
                                    <FormInput state={values} onChange={onChange} {...inputs[2]} disabled={Loading} />
                                    <FormInput state={values} onChange={onChange} {...inputs[3]} disabled={Loading} />
                                </div>
                                <div className="username">
                                    <FormInput state={values} onChange={onChange} {...inputs[4]} disabled={Loading} />
                                </div>
                                <div className="d-flex form-row mb-3">
                                    <FormInput state={values} onChange={onChange} {...inputs[5]} disabled={Loading} />
                                    <FormInput state={values} onChange={onChange} {...inputs[6]} disabled={Loading} />
                                </div>
                                <Button type='submit' variant='contained' disabled={Loading} onClick={register}>{Loading ? <CircularProgress color="inherit" size={20}/> : 'Sign Up'}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RegisterStyles>
    ) } else { return <><Navigate to='/shop' /></> }
}

export default Register

const RegisterStyles = styled.div`
    .main {
        display: flex;
        .green {
            color: green;
        }
        .red {
            color: red;
        }
            .image-screen {
                height: 100vh;
                width: 50vw;
                background-image: url('images/background-img.png');
                background-repeat: none;
                background-size: cover;
                .overlay {
                    height: 100%;
                    width: 100%;
                    background-color: rgba(53, 58, 88, 67%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .icon {
                        width: 70%;
                    }
                }
            }
            .login-screen {
                height: 100vh;
                width: 50vw;
                padding: 10em;
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                h1 {
                    font-size: 450%;
                    text-align: center;
                    font-family: 'Water Brush', cursive;
                }
                .register {
                    padding: 1em;
                    background-color: white;
                    border-radius: 1em;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    .mobile {
                        display: none;
                    }
                    label {
                        cursor: pointer;
                        &:hover {
                            filter: brightness(93%)
                        }
                    }
                }
            }
    }
    @media (max-width: 768px) {
        .main {
            flex-direction: column-reverse;
                h1 {
                    margin-bottom: .5em;
                }
                .image-screen {
                    height: 30vh;
                    width: 100vw;
                }
                .login-screen {
                    height: 70vh;
                    width: 100vw;
                    padding: .5em;
                    .register {
                        background-color: transparent;
                        height: 70%;
                        margin: 1em;
                        padding: 0;
                        .desktop {
                            display: none;
                        }
                        .mobile {
                            display: flex;
                            flex-direction: column;
                            .username {
                                input {
                                    width: 85vw;
                                }
                            }
                            .form-row {
                                input {
                                    width: 38vw;
                                }
                            }
                        }
                    }
                }
            }
        }
`