const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomersSchema = new Schema({
    firstName: {
        type: 'String',
        required: true
    },
    lastName: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    phone: {
        type: 'String',
        required: true
    },
    billingAddress: {
        firstName: String,
        lastName: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        zip: Number,
    },
    shippingAddress: {
        firstName: String,
        lastName: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        zip: Number,
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
})

module.exports = mongoose.models.Customers || mongoose.model('Customers', CustomersSchema)