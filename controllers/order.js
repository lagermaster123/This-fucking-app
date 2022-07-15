const Product = require('../models/Product')
const Order = require('../models/Order')
const User = require('../models/User')
const passport = require('passport')
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

module.exports.place = async (req, res) => {
  const payload = req.body
  console.log('payload: ', payload)
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
      console.log('result: ', result)
    if(result.payment.status === 'COMPLETED') {
      console.log('payment is completed')
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
      console.log('new order: ', newOrder)
      const currentCustomer = await User.findOne({
        firstName: payload.billingAddress.firstName,
        lastName: payload.billingAddress.lastName
      })
      if(currentCustomer) {
        console.log('customer already exists')
        currentCustomer.orders.push(newOrder._id)
        newOrder.customer = currentCustomer._id
        await currentCustomer.save()
        await newOrder.save()
      } else if (payload.user.length > 0) { 
        const user = await User.findOne({ _id: payload.user })
        if (user) {
          user.orders.push(newOrder._id)
          await user.save()
          await newOrder.save()
        }
      } else { 
          newCustomer = new User({
            firstName: payload.billingAddress.firstName,
            lastName: payload.billingAddress.lastName,
            email: payload.contactInfo.email,
            phone: payload.contactInfo.phone,
            billingAddress: payload.billingAddress,
            shippingAddress: payload.shippingAddress,
            orders: [newOrder._id]
        })
        newOrder.customer = newCustomer._id
        await User.register(newCustomer, uuidv4().toString())
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
      throw new ExpressError('error on payment request', 400);
    } else {
      // IDEA: send to error reporting service
      const msg = `Error creating payment: ${ex}`
      throw new ExpressError(msg, 500); // to attempt retry
    }
  }
  
}

module.exports.get = async (req, res) => {
  const orders = await Order.find({}).populate('customer')
  const data = orders.map(o => { return { 
      id: o._id.toString(),
      paymentId: o.paymentId,
      receiptUrl: o.receiptUrl,
      orderId: o.orderId,
      dateCreated: o.dateCreated,
      amount: o.amount,
      items: o.items,
      status: o.status,
      customer: `${o.customer.firstName} ${o.customer.lastName}`
  }})
  res.json(data)
}

module.exports.complete = async (req, res) => {
  const order = await Order.findOne({ _id: req.body.order.id })
  if (order.items) {
      order.items.map(item => {
          if(item._id.toString() === req.body.item._id) {
              item.status = 'completed'
          }
          if(!order.items.filter(i => i.status === 'open').length) {
              order.status = 'completed'
          }
      })
  }
  await order.save()
  const payload = await Order.find({})
  res.json({ message: 'success', payload })
}

module.exports.undo = async (req, res) => {
  const order = await Order.findOne({ _id: req.body.order.id })
  if (order.items) {
      order.items.map(item => {
          if(item._id.toString() === req.body.item._id) {
              item.status = 'open'
          }
          if(order.items.filter(i => i.status === 'open').length > 0) {
              order.status = 'open'
          }
      })
  }
  await order.save()
  const payload = await Order.find({})
  res.json({ message: 'success', payload })
}

module.exports.delete = async (req, res) => {
  await Order.findOneAndDelete({ _id: req.body.order.id })
  const payload = await Order.find({})
  res.json({ message: 'success', payload })
}

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

module.exports.printTag = async(req, res) => {
  console.log(req.body.item)
  const payload = new XMLWriter
  payload.startDocument()
      payload.startElement('eVSRequest')
          payload.writeAttribute('USERID', '995MPPRO5353')
          payload.startElement('ImageParameters')
              payload.startElement('LabelSequence')
                  payload.startElement('PackageNumber')
                      payload.text('1')
                  payload.endElement('PackageNumber')
                  payload.startElement('TotalPackages')
                      payload.text('1')
                  payload.endElement('TotalPackages')
              payload.endElement('LabelSequence')
          payload.endElement('ImageParameters')
          payload.startElement('FromName')
              payload.text('Lina Smith')
          payload.endElement('FromName')
          payload.startElement('FromFirm')
              payload.text('Horizon')
          payload.endElement('FromFirm')
          payload.startElement('FromAddress1')
              payload.text('Apt 303')
          payload.endElement('FromAddress1')
          payload.startElement('FromAddress2')
              payload.text('1309 S Agnew Avenue')
          payload.endElement('FromAddress2')
          payload.startElement('FromCity')
              payload.text('Oklahoma City')
          payload.endElement('FromCity')
          payload.startElement('FromState')
              payload.text('OK')
          payload.endElement('FromState')
          payload.startElement('FromZip5')
              payload.text('73108')
          payload.endElement('FromZip5')
          payload.startElement('FromZip4')
              payload.text('2427')
          payload.endElement('FromZip4')
          payload.startElement('FromPhone')
              payload.text('1234567890')
          payload.endElement('FromPhone')
          payload.startElement('AllowNonCleansedOriginAddr')
              payload.text('false')
          payload.endElement('AllowNonCleansedOriginAddr')
          payload.startElement('ToName')
              payload.text('Tall Tom')
          payload.endElement('ToName')
          payload.startElement('ToFirm')
              payload.text('ABC Corp')
          payload.endElement('ToFirm')
          payload.startElement('ToAddress2')
              payload.text('1098 N Fraser Street')
          payload.endElement('ToAddress2')
          payload.startElement('ToCity')
              payload.text('Georgetown')
          payload.endElement('ToCity')
          payload.startElement('ToState')
              payload.text('SC')
          payload.endElement('ToState')
          payload.startElement('ToZip5')
              payload.text('29440')
          payload.endElement('ToZip5')
          payload.startElement('ToZip4')
              payload.text('2849')
          payload.endElement('ToZip4')
          payload.startElement('ToPhone')
              payload.text('8005554526')
          payload.endElement('ToPhone')
          payload.startElement('ToContactPreference')
              payload.text('email')
          payload.endElement('ToContactPreference')
          payload.startElement('ToContactEMail')
              payload.text('talltom@aol.com')
          payload.endElement('ToContactEMail')
          payload.startElement('AllowNonCleansedDestAddr')
              payload.text('false')
          payload.endElement('AllowNonCleansedDestAddr')
          payload.startElement('WeightInOunces')
              payload.text('32')
          payload.endElement('WeightInOunces')
          payload.startElement('ServiceType')
              payload.text('PRIORITY')
          payload.endElement('ServiceType')
          payload.startElement('Container')
              payload.text('VARIABLE')
          payload.endElement('Container')
          payload.startElement('Width')
              payload.text('5.5')
          payload.endElement('Width')
          payload.startElement('Length')
              payload.text('11')
          payload.endElement('Length')
          payload.startElement('Height')
              payload.text('11')
          payload.endElement('Height')
          payload.startElement('Machinable')
              payload.text('TRUE')
          payload.endElement('Machinable')
          payload.startElement('InsuredAmount')
              payload.text('100.00')
          payload.endElement('InsuredAmount')
          payload.startElement('AddressServiceREquested')
              payload.text('true')
          payload.endElement('AddressServiceREquested')
          payload.startElement('CustomerRefNo')
              payload.text('EF789UJK')
          payload.endElement('CustomerRefNo')
          payload.startElement('CustomerRefNo2')
              payload.text('EE66GG87')
          payload.endElement('CustomerRefNo2')
          payload.startElement('ExtraServices')
              payload.startElement('ExtraService')
                  payload.text('120')
              payload.endElement('ExtraService')
          payload.endElement('ExtraServices')
          payload.startElement('CRID')
              payload.text('4569873')
          payload.endElement('CRID')
          payload.startElement('MID')
              payload.text('456789354')
          payload.endElement('MID')
          payload.startElement('VendorCode')
              payload.text('1234')
          payload.endElement('VendorCode')
          payload.startElement('VendorProductVersionNumber')
              payload.text('5.02.1B')
          payload.endElement('VendorProductVersionNumber')
          payload.startElement('SenderName')
              payload.text('Adam Johnson')
          payload.endElement('SenderName')
          payload.startElement('SenderEMail')
              payload.text('Adam1234d@aol.com')
          payload.endElement('SenderEMail')
          payload.startElement('RecipientName')
              payload.text('Robert Jones')
          payload.endElement('RecipientName')
          payload.startElement('RecipientEMail')
              payload.text('bobjones@aol.com')
          payload.endElement('RecipientEMail')
          payload.startElement('RecipientOption')
              payload.text('SAME PAGE')
          payload.endElement('RecipientOption')
          payload.startElement('ImageType')
              payload.text('PDF')
          payload.endElement('ImageType')
          payload.startElement('HoldForManifest')
              payload.text('N')
          payload.endElement('HoldForManifest')
          payload.startElement('NineDigitRoutingZip')
              payload.text('false')
          payload.endElement('NineDigitRoutingZip')
          payload.startElement('ShipInfo')
              payload.text('True')
          payload.endElement('ShipInfo')
          payload.startElement('CarrierRelease')
              payload.text('False')
          payload.endElement('CarrierRelease')
          payload.startElement('ReturnCommitments')
              payload.text('True')
          payload.endElement('ReturnCommitments')
          payload.startElement('PrintCustomerRefNo')
              payload.text('False')
          payload.endElement('PrintCustomerRefNo')
          payload.startElement('PrintCustomerRefNo2')
              payload.text('True')
          payload.endElement('PrintCustomerRefNo2')
          payload.startElement('Content')
              payload.startElement('ContentType')
                  payload.text('Perishable')
              payload.endElement('ContentType')
              payload.startElement('ContentDescription')
                  payload.text('Other')
              payload.endElement('ContentDescription')
          payload.endElement('Content')
          payload.startElement('ActionCode')
              payload.text('M0')
          payload.endElement('ActionCode')
          payload.startElement('OptOutOfSPE')
              payload.text('false')
          payload.endElement('OptOutOfSPE')
      payload.endElement('eVSRequest')
  payload.endDocument()
  await axios({
      method: 'GET',
      url: 'https://secure.shippingapis.com/ShippingAPI.dll?API=eVS&XML=' + payload.toString()
  }).then( res => console.log(res))
}