const router = require('express').Router()
const order = require('../controllers/order')
const { validateOrder } = require('../middlewear')
const CatchAsync = require('../utils/CatchAsync')

router.post('/get-delivery', order.getDelivery)

router.post('/place', validateOrder, order.place)

module.exports = router