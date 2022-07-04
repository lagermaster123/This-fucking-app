import React from 'react'
import styled from 'styled-components'
import { address } from '../data'
import FormInput from './FormInput'

function ShippingAddress({shippingAddress, onChange }) {
  return (
    <ShippingForm>
        <div className="header">
            <h1><b>Shipping Address</b></h1>
        </div>
        <div className="content">
            <div className="d-flex">
                {address.map((input, index) => {
                    if(index < 2) return (
                        <FormInput
                        id='shippingAddress'
                        key={`${input.name}${input.id}`}
                        state={shippingAddress}
                        {...input}
                        onChange={onChange}
                        />
                    )
                })}
            </div>
            <div className="d-flex">
                {address.map((input, index) => {
                    if(index >= 2 && index < 4) return (
                        <FormInput
                        id='shippingAddress'
                        key={`${input.name}${input.id}`}
                        state={shippingAddress}
                        {...input}
                        onChange={onChange}
                        />
                    )
                })}
            </div>
            <div className="d-flex">
                {address.map((input, index) => {
                    if(index >= 4 && index < 6) return (
                        <FormInput
                        id='shippingAddress'
                        key={`${input.name}${input.id}`}
                        state={shippingAddress}
                        {...input}
                        onChange={onChange}
                        />
                    )
                })}
            </div>
            <div className="d-flex">
                {address.map((input, index) => {
                    if(index >= 6 && index < 8) return (
                        <FormInput
                        id='shippingAddress'
                        key={`${input.name}${input.id}`}
                        state={shippingAddress}
                        {...input}
                        onChange={onChange}
                        />
                    )
                })}
            </div>
        </div>
    </ShippingForm>
  )
}

export default ShippingAddress

const ShippingForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 2em;
    .header {
        display: flex;
    }
    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 50vh;
        padding: 2em;
    }
    @media (max-width: 768px) {
        margin: .5em;
        .content {
            padding: 0;
        }
    }
`