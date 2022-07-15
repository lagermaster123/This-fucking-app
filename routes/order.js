const router = require('express').Router()
const order = require('../controllers/order')
const { validateOrder, isAdmin, isLoggedIn } = require('../middlewear')
const CatchAsync = require('../utils/CatchAsync')

router.post('/place', validateOrder, order.place)

router.get('/get-order', isLoggedIn, isAdmin, CatchAsync(order.get))

router.post('/complete', isLoggedIn, isAdmin, CatchAsync(order.complete))

router.post('/undo', isLoggedIn, isAdmin, CatchAsync(order.undo))

router.post('/delete', isLoggedIn, isAdmin, CatchAsync(order.delete))

router.post('/print', isLoggedIn, isAdmin, CatchAsync(order.print))

router.post('/get-delivery', order.getDelivery)

module.exports = router