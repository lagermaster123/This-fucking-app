import React from 'react'
import styled from 'styled-components'
import { address } from '../data'
import FormInput from './FormInput'

function BillingAddress({ billingAddress, onChange, onCheck, checked, cartItems }) {
  return (
    <BillingForm>
        <div className="header">
            <h1><b>Billing Address</b></h1>
            {cartItems.filter(item => item.method === 'delivery').length
            ? <div className="same">
                <input id='sameAddress' type="checkbox" onChange={onCheck} />
                <label htmlFor="sameAddress">same as shipping address</label>
            </div>
            : <></>}
        </div>
        <div className="content">
            <div className="d-flex">
                {address.map((input, index) => {
                    if(index < 2) return (
                        <FormInput
                        id='billingAddress'
                        key={`${input.name}${input.id}`}
                        state={billingAddress}
                        checked={checked}
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
                        id='billingAddress'
                        key={`${input.name}${input.id}`}
                        state={billingAddress}
                        checked={checked}
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
                        id='billingAddress'
                        key={`${input.name}${input.id}`}
                        state={billingAddress}
                        checked={checked}
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
                        id='billingAddress'
                        key={`${input.name}${input.id}`}
                        state={billingAddress}
                        checked={checked}
                        {...input}
                        onChange={onChange}
                        />
                    )
                })}
            </div>
        </div>
    </BillingForm>
  )
}

export default BillingAddress

const BillingForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 2em;
    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        .same {
            display: flex;
            align-items: center;
            input {
                margin-right: .5em;
            }
        }
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