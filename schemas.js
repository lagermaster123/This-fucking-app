const BaseJoi = require('joi');
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

const addressesSchema = Joi.array().items(
    Joi.object({
        firstName: Joi.string().pattern(/^[A-Za-z ]+$/, 'names').required(),
        lastName: Joi.string().pattern(/^[A-Za-z ]+$/, 'names').required(),
        addressLine1: Joi.string().alphanum().required(),
        addressLine2: Joi.string().alphanum().required(),
        city: Joi.string().pattern(/^[A-Za-z ]+$/, 'city').required(),
        state: Joi.string().pattern(/^[A-Za-z ]+$/, 'state').required(),
        zip: Joi.number().integer().min(9999).max(100000).required()
    })
)
module.exports.addressesSchema = addressesSchema

const productSchema = Joi.object({
    title: Joi.string(),
    price: Joi.number().positive().precision(2).required(),
    categories: Joi.string().required(),
    countInStock: Joi.number(),
    description: Joi.string().required(),
    weight: Joi.number().positive().required(),
    sales: Joi.number().positive(),
    clicks: Joi.number().positive(),
    inCart: Joi.number().positive()
})
module.exports.productSchema = productSchema

const orderSchema = Joi.object({
    locationId: Joi.string().required(),
    sourceId: Joi.string().required(),
    verificationToken: Joi.string().required(),
    total: Joi.number().positive().precision(2).required(),
    user: Joi.string().alphanum(),
    items: Joi.array().items(
        Joi.object({
            product: Joi.string().required(),
            title: Joi.string().required(),
            images: Joi.array().items(
                Joi.string()
            ),
            price: Joi.number().positive().precision(2).required(),
            countInStock: Joi.number(),
            qty: Joi.number().positive().precision(0),
            method: Joi.string().pattern(/^[a-z]+$/).required(),
            status: Joi.string().pattern(/^[a-z]+$/).required(),
            orderDue: Joi.date().required(),
            quality: Joi.string().pattern(/^[a-z]+$/).required()
        })
    ).required(),
    billingAddress: Joi.object({
        firstName: Joi.string().pattern(/^[A-Za-z ]+$/).required(),
        lastName: Joi.string().pattern(/^[A-Za-z ]+$/).required(),
        addressLine1: Joi.string().pattern(/^[A-Za-z0-9 ]+$/).required(),
        addressLine2: Joi.string().pattern(/^[A-Za-z0-9 ]+$/).required(),
        city: Joi.string().pattern(/^[A-Za-z ]+$/, 'city').required(),
        state: Joi.string().pattern(/^[A-Z]+$/, 'state').required(),
        zip: Joi.number().integer().min(9999).max(100000).required()
    }).required(),
    shippingAddress: Joi.object({
        firstName: Joi.string().pattern(/^[A-Za-z ]+$/).allow(null, ''),
        lastName: Joi.string().pattern(/^[A-Za-z ]+$/).allow(null, ''),
        addressLine1: Joi.string().pattern(/^[A-Za-z0-9 ]+$/).allow(null, ''),
        addressLine2: Joi.string().pattern(/^[A-Za-z0-9 ]+$/).allow(null, ''),
        city: Joi.string().pattern(/^[A-Za-z ]+$/, 'city').allow(null, ''),
        state: Joi.string().pattern(/^[A-Z]+$/, 'state').allow(null, ''),
        zip: Joi.number().integer().min(9999).max(100000).allow(null, '')
    }),
    contactInfo: Joi.object({
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^[0-9]{10}$/)
    }).required()
})
module.exports.orderSchema = orderSchema

const userSchema = Joi.object({
    firstName: Joi.string().pattern(/^[A-Za-z ]+$/, 'names').required(),
    lastName: Joi.string().pattern(/^[A-Za-z ]+$/, 'names').required(),
    email: Joi.string().email(),
    phone: Joi.number().min(999999999).max(10000000000),
    addresses: Joi.isSchema(addressesSchema),
    role: Joi.string().pattern(/^[A-Z]+$/).required(),
    orders: Joi.array().items(
        Joi.isSchema(orderSchema)
    ),
    username: Joi.string().alphanum().required()
})
module.exports.userSchema = userSchema

module.exports.registerSchema = Joi.object({
    image: Joi.array().items(
        Joi.object({
            filename: Joi.string().alphanum(),
            url: Joi.string().uri()
        })
    ),
    username: Joi.string().pattern(/^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/).required(),
    firstName: Joi.string().pattern(/^[A-Za-z ]{0,32}$/, 'names').required(),
    lastName: Joi.string().pattern(/^[A-Za-z ]{0,32}$/, 'names').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})
module.exports.loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

module.exports.emailSchema = Joi.object({
    email: Joi.string().email().required()
})

module.exports.imageSchema = Joi.array().items(
    Joi.object({
        fieldname: Joi.string().valid('image').required(),
        originalname: Joi.string(),
        encoding: Joi.string(),
        mimetype: 'image/jpeg',
        path: Joi.string().uri().required(),
        size: Joi.number(),
        filename: Joi.string().alphanum().required()
    })
)

module.exports.verifySchema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().alphanum().required()
})

module.exports.setPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().alphanum().required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required()
})

module.exports.oneTapSchema = Joi.object({
    iss: Joi.string(),
    nbf: Joi.string(),
    aud: Joi.string(),
    sub: Joi.string(),
    email: Joi.string().email().required(),
    email_verified: Joi.string(),
    azp: Joi.string(),
    name: Joi.string(),
    picture: Joi.string().uri().required(),
    given_name: Joi.string().pattern(/^[A-Za-z ]{0,32}$/, 'names').required(),
    family_name: Joi.string().pattern(/^[A-Za-z ]{0,32}$/, 'names').required(),
    iat: Joi.string(),
    exp: Joi.string(),
    jti: Joi.string().alphanum().required(),
    alg: Joi.string(),
    kid: Joi.string(),
    typ: Joi.string()
})

module.exports.userUpdateSchema = Joi.object({
    image: Joi.array().items(
        Joi.object({
            _id: Joi.string().alphanum(),
            url: Joi.string().uri().required(),
            filename: Joi.string().pattern(/^[A-Za-z0-9 ]{0,64}$/)
        })
    ),
    username: Joi.string().alphanum().required(),
    name: Joi.string().pattern(/^[A-Za-z ]{0,32}$/).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]+$/).max(10).required(),
    addresses: Joi.array().items(
        Joi.object({
            _id: Joi.string().alphanum(),
            firstName: Joi.string().pattern(/^[A-Za-z ]+$/, 'names').required(),
            lastName: Joi.string().pattern(/^[A-Za-z ]+$/, 'names').required(),
            addressLine1: Joi.string().pattern(/^[A-Za-z0-9 ]+$/).required(),
            addressLine2: Joi.string().pattern(/^[A-Za-z0-9 ]+$/),
            city: Joi.string().pattern(/^[A-Za-z ]+$/, 'city').required(),
            state: Joi.string().pattern(/^[A-Z ]{0,2}$/, 'state').required(),
            zip: Joi.number().integer().min(9999).max(100000).required()
        })
    )
})