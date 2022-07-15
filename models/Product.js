const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title: {
        type: 'String',
        required: true
    },
    images: [{ type: 'String' }],
    price: {
        type: 'Number',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    countInStock: {
        type: 'Number',
        required: true
    },
    description: {
        type: 'String'
    },
    dimensions: {
        w: 'Number',
        h: 'Number'
    },
    weight: {
        type: 'String',
        required: true
    },
    sales: {
        type: 'Number',
        required: true
    },
    clicks: {
        type: 'Number',
        required: true
    }
})

module.exports = mongoose.model('Product', ProductSchema)