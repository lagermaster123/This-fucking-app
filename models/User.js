const mongoose = require('mongoose')
const passportLocalMongoose = 
require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    image: [{
        url: String,
        filename: String
    }],
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    addresses: [
        {
            firstName: {type: String, required: true},
            lastName: {type: String, required: true},
            addressLine1: {type: String, required: true},
            addressLine2:{type:  String},
            city: {type: String, required: true},
            state: {type: String, required: true},
            zip: {type: Number, required: true}
        }
    ],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    role: {
        type: String,
        required: true
    },
    verification: String,
    verified: Boolean
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
