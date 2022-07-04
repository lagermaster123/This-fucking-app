import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import CircularProgress from '@mui/material/CircularProgress'
import StepLabel from '@mui/material/StepLabel'
import FormInput from './components/Forms/FormInput'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const navigate = useNavigate()
    const inputs = Array.from(document.querySelectorAll('input'))
    const [ disabled, setDisabled ] = useState(true)
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ values, setValues ] = useState({
        email: '',
        code: '',
        password: '',
        confirmPassword: ''
    })
    const [ steps, setSteps ] = useState(['Email', 'Verify', 'New Password'])
    const [ activeStep, setActiveStep ] = useState(0)
    const [ skipped, setSkipped ] = useState(new Set());
    const [ verified, setVerified ] = useState(false)
    const handleNext = (email) => {
        setError(null)
        setLoading(false)
        setDisabled(true)
        if(email) setValues({...values, email: email})
        let newSkipped = skipped
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
        if(e.target.type === 'password' && inputs.filter(input => !input.validity.valid).length === 0) {
            return setDisabled(false)
        } else if(e.target.type !== 'password') {
            e.target.validity.valid ? setDisabled(false) : setDisabled(true)
        } else {
            setDisabled(true)
        }
    }
    const sendCode = () => {
        setLoading(true)
        axios({
            method: 'POST',
            data: {
                email: values.email
            },
            url: '/user/forgot-password'
        }).then(res => res.data.message === 'success' && activeStep === 0 ? handleNext(res.data.email) : setError(res.data.message === 'success' ? 'Try Again' : res.data.message))
    }
    const verify = () => {
        setLoading(true)
        axios({
            method: 'POST',
            data: {
                email: values.email,
                code: values.code
            },
            url: '/user/verify'
        }).then(res => res.data.message === 'success' ? handleNext() : setError(res.data.message))
    }
    const setPassword = () => {
        axios({
            method: 'POST',
            data: {
                email: values.email,
                code: values.code,
                password: values.password
            },
            url: '/user/set-password'
        }).then(res => res.data.message === 'success' ? navigate('/login') : setError(res.data.message))
    }
  return (
    <StyledForgot>
        <h1>Forgot Password?</h1>
        <div className="d-flex justify-content-center align-items-center p-5">
            <form noValidate onSubmit={(e) => e.preventDefault()} className="card p-4 d-flex flex-column justify-content-center align-items-center">
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {}
                        const labelProps = {}
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel className='d-flex flex-colum' {...labelProps}>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                {activeStep === 2 ? (
                    <div className='m-3 d-flex flex-column align-items-center text-align-center'>
                    {error ? <span className='text-danger'>{error}</span> : <h4>Create a new password</h4>}
                    <FormInput
                        label='Password'
                        name="password"
                        type={'password'}
                        pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
                        onChange={onChange}
                        state={values}
                        errorMessage={'invalid password'}
                        required={true}
                    />
                    <FormInput
                        label='Confirm Password'
                        name="confirmPassword"
                        type={'password'}
                        pattern={values.password}
                        onChange={onChange}
                        state={values}
                        errorMessage={'invalid password'}
                        required={true}
                    />
                    <div className="d-flex justify-content-between align-items-center w-100">
                    <Button 
                        sx={{ height: '3em', width: '9em' }} 
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        >
                        Back
                    </Button>
                    <Button 
                        sx={{ height: '3em', width: '9em'}} 
                        onClick={setPassword} 
                        variant="contained" 
                        className='m-3' 
                        disabled={disabled}
                    >{loading ? <CircularProgress size={20} color={'inherit'}/> : 'Save'}</Button>
                    </div>
                    </div>
                ): activeStep === 1 ? (
                    <div className='m-3 d-flex flex-column align-items-center text-align-center'>
                    {error ? <span className='text-danger'>{error}</span> : <h4>Check your email for the code</h4>}
                    <FormInput
                        label='Code'
                        name="code"
                        type={'text'}
                        pattern='^[A-Za-z0-9]{6}$'
                        onChange={onChange}
                        state={values}
                        errorMessage={'invalid code'}
                        required={true}
                    />
                    <div className="d-flex justify-content-between align-items-center w-100">
                    <Button 
                        sx={{ height: '3em', width: '9em' }} 
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={sendCode}
                        >
                        send again
                    </Button>
                    <Button 
                        sx={{ height: '3em', width: '9em'}} 
                        onClick={verify} 
                        variant="contained" 
                        className='m-3' 
                        disabled={disabled}
                    >{error ? 'Verify Now' : loading ? <CircularProgress size={20} color={'inherit'}/> : 'Verify'}</Button>
                    </div>
                    </div>
                ) : activeStep === 0 ? (
                    <div className='m-3 d-flex flex-column align-items-center text-align-center'>
                    {error ? <span className='text-danger'>{error}</span> : <h4>Let's make sure it's you</h4>}
                    <FormInput
                        label='Email'
                        name="email"
                        type={'email'}
                        onChange={onChange}
                        state={values}
                        errorMessage={'invalid email'}
                        required={true}
                    />
                    <Button 
                        sx={{ height: '3em', width: '9em'}} 
                        onClick={sendCode} variant="contained" 
                        className='m-3' 
                        disabled={disabled}
                    >{error ? 'Try Again' : loading ? <CircularProgress size={20} color={'inherit'}/> : 'Send Code'}</Button>
                    </div>
                ) : <></>}
            </form>
        </div>
    </StyledForgot>
  )
}

export default ForgotPassword

const StyledForgot = styled.div`
    min-height: 50vh;
    h1 {
        font-weight: bold;
        font-size: 5vh;
        margin: 1em;
    }
`