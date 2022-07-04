import React from 'react'
import { Link } from 'react-router-dom'

function Summary({ cartItems, getCartSubtotal, getTax, getTotal, deliveryFee}) {
    return (
      <div className="summary container ">
                          <div className="checkout">
                              {cartItems.length === 0 
                              ? <h4>Cart is empty</h4>
                              : cartItems.map((item, i) => {
                                  return (
                                  <div key={i} className="checkout-item">
                                      <div className="d-flex align-items-center">
                                          <Link to={`/product/${item.product}`}><img src={item.images[0]} alt={item.title} height={'40em'} width={'40em'} /></Link>
                                          <div className="qty mx-3">{item.qty} x <Link to={`/product/${item.product}`}>{item.title}</Link></div>
                                      </div>
                                      <div className="price">${item.price * Number(item.qty)}</div>
                                  </div>
                              )
                              })}
                              {/* **************************************** Payment ******************************************** */}
                              <div className="payment-container">
                                  <div id="card-container" className='m-4 w-100' />
                              </div>
                          </div>
                          <div className="cost">
                              <div className="cost-item">
                                  <div className="sub-total">Subtotal:</div>
                                  <div className="sub-total">${getCartSubtotal().toFixed(2)}</div>
                              </div>
                              {cartItems.filter(items => items.method === 'delivery').length
                              ?   <div className="cost-item">
                                      <div className="sub-total">Delivery Fee:</div>
                                      <div className="sub-total">${!deliveryFee ? "0" : deliveryFee.toFixed(2)}</div>
                                  </div>
                              : <></>}
                              <div className="cost-item">
                                  <div className="tax">Tax:</div>
                                  <div className="tax-price">${getTax().toFixed(2)}</div>
                              </div>
                              <div className="cost-item total">
                                  <h4 className="total-tbl">Total:</h4>
                                  <h4 className="total-price">{!getTotal() ? <span>calculating...</span> : `$${getTotal().toFixed(2)}`}</h4>
                              </div>
                              
                              <div className="cost-item d-flex justify-content-center">
                                  <button type='submit' className="btn btn-primary w-50">Place Order</button>
                              </div>
                          </div>
                      </div>
    )
  }
  
  export default Summary