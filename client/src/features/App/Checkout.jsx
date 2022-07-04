import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Payment from './components/Forms/Payment'
import BillingAddress from './components/Forms/BillingAddress'
import ShippingAddress from './components/Forms/ShippingAddress'
import Contact from './components/Forms/Contact'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Navigate, Link } from 'react-router-dom';


const Checkout = () => {
    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user.user)
    const { cartItems } = cart
    const shippingRequired = cartItems.filter(item => item.method === 'delivery').length ? true : false
    const [ steps, setSteps ] = useState([])
    const [ checked, setChecked ] = useState(false)
    const [ disabled, setDisabled ] = useState({
        contactInfo: true,
        billingAddress: true,
        shippingAddress: true,
        placeOrder: false
    })
    const [ deliveryFee, setDeliveryFee ] = useState(0)
    const [ contactInfo, setContactInfo ] = useState({
        email: user ? user.email : '',
        phone: user ? user.phone : undefined
    })
    const [ billingAddress, setBillingAddress ] = useState({
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: ''
    })
    const [ shippingAddress, setShippingAddress ] = useState({
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: ''
    })
    const [activeStep, setActiveStep] = React.useState(user ? 1 : 0);
    const [skipped, setSkipped] = React.useState(new Set());

    const handleNext = () => {
        let newSkipped = skipped;

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleShip = () => {
        if(shippingAddress.zip) {
            axios({
                method: 'POST',
                url: '/order/get-delivery',
                data: {
                    zip: shippingAddress.zip
                }
            }).then(res => setDeliveryFee(res.data)).catch(e => console.error(e))
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onChange = (e) => {
        const inputs = Array.from(document.querySelectorAll(`#${e.target.id}`))
        const errors = inputs.filter(input => !input.validity.valid).length
        console.log(errors)
        if(!errors) {
            setDisabled({...disabled, [e.target.id]: false})
        }
        switch(e.target.id) {
            case 'billingAddress':
                setBillingAddress({...billingAddress, [e.target.name]: e.target.value})
                break
            case 'shippingAddress':
                if(checked) setBillingAddress({...shippingAddress, [e.target.name]: e.target.value})
                setShippingAddress({...shippingAddress, [e.target.name]: e.target.value})
                break
            case 'contactInfo':
                setContactInfo({...contactInfo, [e.target.name]: e.target.value})
                break
            default: return null
        }
    }

    const onCheck = (e) => {
        if(e.target.checked) {
            setChecked(true)
            setBillingAddress(shippingAddress)
        } else {
            setChecked(false)
        }
    }

    useEffect(() => {
        if(!cartItems) return Navigate(-1)
        if(shippingRequired) {
            setSteps(['Contact Info','Shipping', 'Billing', 'Place Order'])
        } else {
            setSteps(['Contact Info','Billing', 'Place Order'])
        }
    },[cartItems, shippingRequired])

    return (
        <CheckoutStyles>
            <form id='payment-form' className="main" onSubmit={(e) => (e.preventDefault())}>
            <Box sx={{ 
                width: {xs: '90vh', md: '50vw'},
                backgroundColor: 'white',
                padding: {xs: '.5em', md: '2em'},
                borderRadius: '1em'
                }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel className='d-flex flex-column' {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Link to={'/'}><Button>Home</Button></Link>
                </Box>
                </React.Fragment>
            ) : activeStep === steps.length - 1 ? (
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'between', alignItems: 'center'}}>
                <Payment 
                    handleNext={handleNext} 
                    deliveryFee={deliveryFee} 
                    disabled={disabled.placeOrder} 
                    shippingRequired={shippingRequired}
                    billingAddress={billingAddress}
                    shippingAddress={shippingAddress}
                    contactInfo={contactInfo}
                    user={user}
                    cartItems={cartItems}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2}}>
                    <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    >
                    Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                </Box>
                </Box>
            ) : activeStep === steps.length - 2 ? (
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'between'}}>
                <BillingAddress billingAddress={billingAddress} onChange={onChange} onCheck={onCheck} checked={checked} cartItems={cartItems}/>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2}}>
                    {!user || shippingRequired
                    ? <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                        >
                        Back
                    </Button>
                    : <></>}
                    <Box sx={{ flex: '1 1 auto' }} />

                    <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
                </Box>
            ) : steps.length > 4 && activeStep === steps.length - 3 ? (
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'between'}}>
                <ShippingAddress  shippingAddress={shippingAddress} onChange={onChange} />
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2}}>
                    {!user
                    ? <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                        >
                        Back
                    </Button>
                    : <></>}
                    <Box sx={{ flex: '1 1 auto' }} />

                    <Button onClick={handleShip} disabled={disabled.shippingAddress}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
                </Box>
            ) : !user && activeStep === 0 ? (
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'between'}}>
                <Contact contactInfo={contactInfo} onChange={onChange} />
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2}}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleShip} disabled={disabled.contactInfo}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
                </Box>
            ) : <></>}
            </Box>
            </form>
        </CheckoutStyles>
    )
}

export default Checkout

const CheckoutStyles = styled.div`
    .main {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media (max-width: 768px) {
            background-color: white;
        }
`