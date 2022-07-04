import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/reducers/userSlice'
import Button from '@mui/material/Button'
import FormInput from './components/Forms/FormInput'
import axios from 'axios'

const Login = () => {
    const [ Error, setError ] = useState('')
    const [ Values, setValues ] = useState({
        Username: '',
        Password: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e) => {
        setValues({...Values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const inputs = Array.from(document.querySelectorAll('input'))
        const errors = inputs.filter(input => input.validity.valid === false).length
        if (!errors) {
            axios({
                method: 'POST',
                url: 'http://localhost:2000/user/login',
                data: {
                    username: Values.Username,
                    password: Values.Password
                }
            }).then(res => {
                console.log(res.data)
                const {
                    username,
                    firstName,
                    lastName,
                    image,
                    phone,
                    email,
                    addresses,
                    role
                } = res.data
                dispatch(login({
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    image: image,
                    phone: phone,
                    email: email,
                    addresses: addresses,
                    role
                }))
                navigate(-1)
            })
        } else {
            setError('Either Username or Password is invalid')
        }
    }
    return(
        <LoginStyles>
            <div className="main">
                <div className="image-screen">
                    <div className="overlay">
                        <img className='icon' src="/favicon.png" alt="" />
                    </div>
                </div>
                <div className="login-screen">
                    <h1>LOG IN</h1>
                    {Error.length ? <span className='text-dangerous'>{Error}</span> : <span>Get back to the best flowers in Tamarac, FL</span>}
                    <form id='login' action="/login" method="post" onSubmit={(e) => handleSubmit(e)}>
                        <div className="login">
                            <FormInput 
                                label={'Username'} 
                                name="Username"
                                pattern="^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
                                errorMessage={'Invalid Username'}
                                type='text'
                                required={true}
                                state={Values}
                                onChange={onChange} />
                            <div className="password">
                                <FormInput 
                                    label={'Password'} 
                                    name="Password"
                                    pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                                    errorMessage={'Invalid Password'}
                                    helperText={<small><Link to={'/forgot-password'}>forgot password?</Link></small>}
                                    type='password'
                                    required={true}
                                    state={Values}
                                    onChange={onChange} />
                            </div>
                        </div>
                        <Button type='submit' className="btn-login">Log in</Button>
                    </form>
                    <span>Don't have an account? <Link to="/register">create account</Link></span>
                </div>
            </div>
        </LoginStyles>
    )
}

export default Login

const LoginStyles = styled.div`
    .main {
        display: flex;
        .image-screen {
            width: 50vw;
            height: 100vh;
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
            width: 50vw;
            height: 100vh;
            padding: 2em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            h1 {
                font-size: 400%;
                text-align: center;
                font-family: 'Water Brush', cursive;
                margin-bottom: 1em;
            }
            #login {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                .login {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .password {
                        display: flex;
                        flex-direction: column;
                        align-items: end;
                        margin-bottom: 2em;
                        a {
                            text-decoration: none;
                        }
                    }
                }
                .btn-login {
                    width: 100%;
                    border: none;
                    border-radius: 1em;
                    background-color: #616BA7;
                    color: white;
                    padding: .5em;
                    margin: .5em;
                }
            }
        }
    }
    @media (max-width: 768px) {
        .main {
            flex-direction: column-reverse;
            .login-screen {
                height: 50vh;
                width: 100vw;
                padding: 1em;
                h1 {
                    margin-bottom: .5em;
                }
            }
            .image-screen {
                height: 50vh;
                width: 100vw;
            }
        }
    }
`