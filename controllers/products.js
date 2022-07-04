const Product = require('../models/product')
const Category = require('../models/category')

module.exports.getAllProducts = async (req, res) => {
    let args = {}
    for(let filter in req.body) {
        if(req.body[filter].length > 0) {
            if(filter === 'price') {
                const arr = req.body[filter]
                args[filter] = {
                    $gte: arr[0],
                    $lte: arr[1]
                }
            } else {
                args[filter] = req.body[filter]
            }
        }
    }
    console.log(args)
    const products = await Product.find(args)
    res.send(products)
}

module.exports.getCategories = async (req, res) => {
    const categories = await Category.find({})
    res.json(categories)
}

module.exports.showProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.json(product)
}