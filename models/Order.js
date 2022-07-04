const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    paymentId: String,
    receiptUrl: String,
    orderId: String,
    dateCreated: Date,
    amount: Number,
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customers'
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        title: String,
        price: Number,
        countInStock: Number,
        qty: Number,
        method: String,
        status: String,
        orderDue: Date,
        quality: String
    }],
    status: {type: 'String', required: true}
})

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema)