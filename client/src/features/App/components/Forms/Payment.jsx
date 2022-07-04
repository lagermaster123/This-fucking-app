import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

function Payment({ handleNext, deliveryFee, disabled, shippingRequired, billingAddress, shippingAddress, contactInfo, user, cartItems }) {
    const { firstName, lastName, addressLine1, addressLine2, city, state, zip } = billingAddress
    const [ loading, setLoading ] = useState(true)
    let card
    let payments
    const getCartSubtotal = () => {
        return cartItems.reduce((price, item) => item.price * item.qty + price, 0)
    }
    const getDelivery = () => {
        let s = 0
        for(let item of cartItems) {
            if(item.method === 'delivery') {
                s = s + Number(item.qty)
            }
        }
        return Number(s*deliveryFee)
    }
    const getTax = () => {
        return (getCartSubtotal()*.06)
    }
    const getTotal = () => {
        return (getCartSubtotal() + getDelivery() + getTax())
    }

    const appId = 'sandbox-sq0idb-ihuefPlQcS2alQH1s3AmMQ';
    const locationId = 'LX71JE03RASQC';


    async function createPayment(token, verificationToken) {
        const bodyParameters = {
            locationId,
            sourceId: token,
            user: user ? user._id : 'null',
            total: Number(getTotal().toFixed(2)),
            items: cartItems,
            billingAddress,
            shippingAddress,
            contactInfo
        };

        if (verificationToken !== undefined) {
            bodyParameters.verificationToken = verificationToken;
        }

        const body = JSON.stringify(bodyParameters);

        const paymentResponse = await fetch('/order/place', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body,
        });

        if (paymentResponse.ok) {
            return paymentResponse.json();
        }

        const errorBody = await paymentResponse.text();
        throw new Error(errorBody);
    }

    async function initializeCard(payments) {
        const card = await payments.card();
        await card.attach('#card-container')
        .then(setLoading(false));

        return card;
    }
    async function verifyBuyer(payments, token) {
        const verificationDetails = {
            amount: '1.00',
            billingContact: {
              addressLines: ['123 Main Street', 'Apartment 1'],
              familyName: 'Doe',
              givenName: 'John',
              email: 'jondoe@gmail.com',
              country: 'GB',
              phone: '3214563987',
              region: 'LND',
              city: 'London',
            },
            currencyCode: 'GBP',
            intent: 'CHARGE',
        };

        const verificationResults = await payments.verifyBuyer(
            token,
            verificationDetails
        );
        return verificationResults.token;
    }
    async function tokenize(paymentMethod) {
        const tokenResult = await paymentMethod.tokenize();
        if (tokenResult.status === 'OK') {
            return tokenResult.token;
        } else {
            throw new Error(
            `Tokenization errors: ${JSON.stringify(tokenResult.errors)}`
            );
        }
    }

    const placeOrder = async (event, paymentMethod, shouldVerify=false) => {
        const cardButton = document.getElementById('card-button')
        try {
            cardButton.disabled = true
            const token = await tokenize(paymentMethod)
            let verificationToken;

            if(shouldVerify) verificationToken = await verifyBuyer(payments, token);
            
            const paymentResults = await createPayment(
                token,
                verificationToken
            );

            displayPaymentResults('SUCCESS');
            handleNext()
        } catch (e) {
            cardButton.disabled = false;
            displayPaymentResults('FAILURE');
            console.error(e.message);
        }
    }

    function displayPaymentResults(status) {
        const statusContainer = document.getElementById(
          'payment-status-container'
        );
        if (status === 'SUCCESS') {
          statusContainer.classList.remove('is-failure');
          statusContainer.classList.add('is-success');
        } else {
          statusContainer.classList.remove('is-success');
          statusContainer.classList.add('is-failure');
        }

        statusContainer.style.visibility = 'visible';
      }

    const onLoad = async () => {
        if (!window.Square) {
            throw new Error('Square.js failed to load properly');
        }
        try {
            payments = window.Square.payments(appId, locationId)
        } catch {
            const statusContainer = document.getElementById(
                'payment-status-container'
              );
            statusContainer.className = 'missing-credentials';
            statusContainer.style.visibility = 'visible';
            return;
        }

        try {
            card = await initializeCard(payments)
        } catch (e) {
            if(!loading) console.error('initialize card error!', e)
            return
        }
    }

    useEffect(() => {
        onLoad()
    },[onLoad])

  return (
    <Summary>
        <div className="checkout">
            {cartItems.length === 0 
            ? <h4>Cart is empty</h4>
            : cartItems.map((item, i) => {
                return (
                <div key={i} className="d-flex align-items-center justify-content-between border-bottom p-2">
                    <Link to={`/product/${item.product}`} className="qty">
                            {/* <img className='m-1' src={item.product.images[0]} height={'50em'} alt="" /> */}
                            {item.qty} x {item.title}
                    </Link>
                    <div className="price">${(Number(item.price) * Number(item.qty)).toFixed(2)}</div>
                </div>
            )
            })}
        </div>
        <div className="payment">
        {!loading
        ? <>
            <div id="payment-status-container"></div>
            <div id="card-container"></div>
        </> : <CircularProgress/ >}
        </div>
        <div className="cost">
            <div className="cost-item">
                <div className="sub-total">Subtotal:</div>
                <div className="sub-total">${getCartSubtotal().toFixed(2)}</div>
            </div>
            {shippingRequired
            ? <div className="cost-item">
                <div className="sub-total">Delivery Fee:</div>
                <div className="sub-total">${getDelivery().toFixed(2)}</div>
            </div> : <></>}
            <div className="cost-item">
                <div className="tax">Tax:</div>
                <div className="tax-price">${getTax().toFixed(2)}</div>
            </div>
            <div className="cost-item total">
                <h4 className="total-tbl">Total:</h4>
                <h4 className="total-price">${getTotal().toFixed(2)}</h4>
            </div>
        </div>
        <Button id="card-button" onClick={(e) => placeOrder(e, card, true)} disabled={disabled} variant="contained">Place Order</Button>
    </Summary>
  )
}

export default Payment

const Summary = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    background-color: white;
    min-height: 65vh;
    width: 100%;
    .payment {
        height: 10em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .checkout {
        width: 100%;
        margin-bottom: 2em;
        a {
            text-decoration: none;
            transition: .5s;
            color: black;
            &:hover {
                text-decoration: underline;
            }
        }
        .checkout-item {
            display: flex;
            justify-content: space-between;
            padding: .5em;
            border-bottom: 1px solid rgba(0,0,0,.25);
        }
    }
    .cost {
        margin-top: auto;
        width: 100%;
        margin: 1em;
        .cost-item {
            padding: 0 1em;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
    #card-button {
        padding: .5em;
        width: 100%;
    }
    .total {
        border-top: 1px solid rgba(0,0,0,.25);
        font-weight: bold;
        
    }
    #payment-status-container {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        margin: 1em;
        width: 100%;
        visibility: hidden;
    }

#payment-status-container.missing-credentials {
  width: 350px;
}

#payment-status-container.is-success:before {
  content: '';
  background-color: #00b23b;
  width: 16px;
  height: 16px;
  margin-right: 16px;
  -webkit-mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.7071 6.70711C12.0968 6.31744 12.0978 5.68597 11.7093 5.29509C11.3208 4.90422 10.6894 4.90128 10.2973 5.28852L11 6C10.2973 5.28852 10.2973 5.28853 10.2973 5.28856L10.2971 5.28866L10.2967 5.28908L10.2951 5.29071L10.2886 5.29714L10.2632 5.32224L10.166 5.41826L9.81199 5.76861C9.51475 6.06294 9.10795 6.46627 8.66977 6.90213C8.11075 7.4582 7.49643 8.07141 6.99329 8.57908L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E");
  mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.7071 6.70711C12.0968 6.31744 12.0978 5.68597 11.7093 5.29509C11.3208 4.90422 10.6894 4.90128 10.2973 5.28852L11 6C10.2973 5.28852 10.2973 5.28853 10.2973 5.28856L10.2971 5.28866L10.2967 5.28908L10.2951 5.29071L10.2886 5.29714L10.2632 5.32224L10.166 5.41826L9.81199 5.76861C9.51475 6.06294 9.10795 6.46627 8.66977 6.90213C8.11075 7.4582 7.49643 8.07141 6.99329 8.57908L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L6.29289 10.7071C6.68342 11.0976 7.31658 11.0976 7.70711 10.7071L11.7071 6.70711Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E");
}

#payment-status-container.is-success:after {
  content: 'Payment successful';
  font-size: 14px;
  line-height: 16px;
}

#payment-status-container.is-failure:before {
  content: '';
  background-color: #cc0023;
  width: 16px;
  height: 16px;
  margin-right: 16px;
  -webkit-mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L6.58579 8L4.29289 10.2929C3.90237 10.6834 3.90237 11.3166 4.29289 11.7071C4.68342 12.0976 5.31658 12.0976 5.70711 11.7071L8 9.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.41421 8L11.7071 5.70711C12.0976 5.31658 12.0976 4.68342 11.7071 4.29289C11.3166 3.90237 10.6834 3.90237 10.2929 4.29289L8 6.58579L5.70711 4.29289Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E%0A");
  mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L6.58579 8L4.29289 10.2929C3.90237 10.6834 3.90237 11.3166 4.29289 11.7071C4.68342 12.0976 5.31658 12.0976 5.70711 11.7071L8 9.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.41421 8L11.7071 5.70711C12.0976 5.31658 12.0976 4.68342 11.7071 4.29289C11.3166 3.90237 10.6834 3.90237 10.2929 4.29289L8 6.58579L5.70711 4.29289Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E%0A");
}

#payment-status-container.is-failure:after {
  content: 'Payment failed';
  font-size: 14px;
  line-height: 16px;
}

#payment-status-container.missing-credentials:before {
  content: '';
  background-color: #cc0023;
  width: 16px;
  height: 16px;
  margin-right: 16px;
  -webkit-mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L6.58579 8L4.29289 10.2929C3.90237 10.6834 3.90237 11.3166 4.29289 11.7071C4.68342 12.0976 5.31658 12.0976 5.70711 11.7071L8 9.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.41421 8L11.7071 5.70711C12.0976 5.31658 12.0976 4.68342 11.7071 4.29289C11.3166 3.90237 10.6834 3.90237 10.2929 4.29289L8 6.58579L5.70711 4.29289Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E%0A");
  mask: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L6.58579 8L4.29289 10.2929C3.90237 10.6834 3.90237 11.3166 4.29289 11.7071C4.68342 12.0976 5.31658 12.0976 5.70711 11.7071L8 9.41421L10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L9.41421 8L11.7071 5.70711C12.0976 5.31658 12.0976 4.68342 11.7071 4.29289C11.3166 3.90237 10.6834 3.90237 10.2929 4.29289L8 6.58579L5.70711 4.29289Z' fill='black' fill-opacity='0.9'/%3E%3C/svg%3E%0A");
}

#payment-status-container.missing-credentials:after {
  content: 'applicationId and/or locationId is incorrect';
  font-size: 14px;
  line-height: 16px;
}

#payment-status-container.is-success.store-card-message:after {
  content: 'Store card successful';
}

#payment-status-container.is-failure.store-card-message:after {
  content: 'Store card failed';
}
`