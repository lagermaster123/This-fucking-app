const Product = require('../models/Product')
const Order = require('../models/Order')
const Customers = require('../models/Customers')
const User = require('../models/User')
const XMLWriter = require('xml-writer')
const parseString = require('xml2js').parseString
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const { ApiError, Client, Environment } = require('square');
const ExpressError = require('../utils/ExpressError');
const square = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

module.exports.getDelivery = async (req, res) => {
  const deliveryZip = req.body.zip
  const ar = new XMLWriter
  ar.startDocument();
    ar.startElement('RateV4Request');
    ar.writeAttribute('USERID', '995MPPRO5353')
      ar.startElement('Revision')
        ar.text('1')
      ar.endElement('Revision')
      ar.startElement('Package')
        ar.writeAttribute('ID', '1ST')
        ar.startElement('Service')
          ar.text('priority')
        ar.endElement('Service')
        ar.startElement('ZipOrigination')
          ar.text('33068')
        ar.endElement('ZipOrigination')
        ar.startElement('ZipDestination')
          ar.text(deliveryZip)
        ar.endElement('ZipDestination')
        ar.startElement('Pounds')
          ar.text('1')
        ar.endElement('Pounds')
        ar.startElement('Ounces')
          ar.text('12')
        ar.endElement('Ounces')
        ar.startElement('Container')
          ar.text('VARIABLE')
        ar.endElement('Container')
      ar.endElement('Package')
    ar.endElement('RateV4Request')
  ar.endDocument();

  if(deliveryZip > 9999 && deliveryZip < 100000) {
    axios({
        method: 'GET', 
        url: 'https://secure.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=' + ar.toString()
    }).then(response => parseString(response.data, (err, data) => {
        !err
        ? res.send(data.RateV4Response.Package[0].Postage[0].Rate[0])
        : err
    })).catch(e => res.send(e))
  }
}

module.exports.place = async (req, res) => {
  const payload = req.body
  try {
    const idempotencyKey = uuidv4()
    const payment = {
      idempotencyKey,
      locationId: payload.locationId,
      sourceId: payload.sourceId,
      amountMoney: {
        amount: Math.round(payload.total * 100),
        currency: 'USD'
      }
    }
    if (payload.verificationToken) {
      payment.verificationToken = payload.verificationToken;
    }

    const { result, statusCode } = await square.paymentsApi.createPayment(
      payment
    );

    if(result.payment.status === 'COMPLETED') {
      let newCustomer
      const newOrder = new Order({
        paymentId: result.payment.id,
        receiptUrl: result.payment.receiptUrl,
        orderId: result.payment.orderId,
        dateCreated: result.payment.createdAt,
        amount: Number(result.payment.amountMoney.amount)/100,
        items: payload.items,
        status: 'open'
      })
      const currentCustomer = await Customers.findOne({
        firstName: payload.billingAddress.firstName,
        lastName: payload.billingAddress.lastName
      })
      if(currentCustomer) {
        currentCustomer.orders.push(newOrder._id)
        newOrder.customer = currentCustomer._id
        await currentCustomer.save()
        await newOrder.save()
      } else if (payload.username.length > 0) { 
        const user = await User.findOne({ username: payload.username })
        if (user) {
          user.orders.push(newOrder._id)
          await user.save()
        }
      } else { 
          newCustomer = new Customers({
          firstName: payload.billingAddress.firstName,
          lastName: payload.billingAddress.lastName,
          email: payload.contactInfo.email,
          phone: payload.contactInfo.phone,
          billingAddress: payload.billingAddress,
          shippingAddress: payload.shippingAddress,
          orders: []
        })
        newCustomer.orders.push(newOrder._id)
        newOrder.customer = newCustomer._id
        await newCustomer.save()
        await newOrder.save()
      }
      for(let item of payload.items) {
        const prod = await Product.findById(item.product)
        if(prod) {
          prod.countInStock = prod.countInStock - item.qty
          prod.save()
        }
      }
    }

    res.status(statusCode).send({
      success: true,
      payment: {
        id: result.payment.id,
        status: result.payment.status,
        receiptUrl: result.payment.receiptUrl,
        orderId: result.payment.orderId,
      }
    })
  } catch (ex) {
    if (ex instanceof ApiError) {
      // likely an error in the request. don't retry
      throw new ExpressError('error on payment request', 400)
    } else {
      // IDEA: send to error reporting service
      const msg = `Error creating payment: ${ex}`
      throw new ExpressError(msg, 500); // to attempt retry
    }
  }
  
}