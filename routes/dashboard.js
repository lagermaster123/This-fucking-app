const router = require('express').Router()
const dashboard = require('../controllers/dashboard')
const CatchAsync = require('../utils/CatchAsync')
const { isAdmin } = require('../middlewear')

router.get('/orders', CatchAsync(dashboard.getOrders))

router.post('/orders/complete', CatchAsync(dashboard.completeOrder))

router.post('/orders/undo', CatchAsync(dashboard.undoOrder))

router.post('/orders/delete', CatchAsync(dashboard.deleteOrder))

router.post('/orders/print', CatchAsync(dashboard.printTag))

module.exports = router