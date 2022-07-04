const router = require('express').Router()
const { getAllProducts, showProduct, getCategories } = require('../controllers/products')
const catchAsync = require('../utils/CatchAsync')

router.post('/', catchAsync(getAllProducts))

router.get('/categories', catchAsync(getCategories))

router.get('/:id', showProduct)

module.exports = router;