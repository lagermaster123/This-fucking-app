const { orderSchema, registerSchema, loginSchema, emailSchema, verifySchema, setPasswordSchema, imageSchema, oneTapSchema, userUpdateSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(400).send({ message: 'user must be logged in'})
    }
    next();
}

module.exports.isAdmin = (req, res, next) => {
    if(req.user.role !== 'ADMIN') {
        return res.status(400).send({ message: "you can't access this page"})
    } else {
        next()
    }
}

module.exports.validateOrder = (req, res, next) => {
    const { error } = orderSchema.validate(req.body)
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.json({message: msg})
    } else {
        next()
    }
}

module.exports.validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.validateEmail = (req, res, next) => {
    const { error } = emailSchema.validate(req.body)
    if (error) {
        res.json({ message: 'Invalid Email'})
    } else {
        next()
    }
}

module.exports.validateImage = (req, res, next) => {
    const { error } = imageSchema.validate(req.files)
    if (error) {
        res.json({ message: 'Invalid Image'})
    } else {
        res.json({ message: 'success', image: req.files.map(f => ({ url: f.path, filename: f.filename }))})
    }
}

module.exports.validateVerify = (req, res, next) => {
    const { error } = verifySchema.validate(req.body)
    if (error) {
        res.json({ message: 'Invalid Code'})
    } else {
        next()
    }
}

module.exports.validateSetPassword = (req, res, next) => {
    const { error } = setPasswordSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.json({ message: msg || 'Invalid Code'})
    } else {
        next()
    }
}

module.exports.validateOneTap = (req, res, next) => {
    const { error } = oneTapSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        console.log(msg)
        res.json({ message: msg || 'Invalid Code'})
    } else {
        const data = {
            image: [{
                url: req.body.picture,
                filename: req.body.name
            }],
            username: req.body.sub,
            email: req.body.email,
            firstName: req.body.given_name,
            lastName: req.body.family_name,
            password: req.body.sub,
        }
        req.body = data
        next()
    }
}

module.exports.validateUserUpdate = (req, res, next) => {
    if(req.body.phone) req.body.phone = req.body.phone.split('').filter(e => !isNaN(e)).join('')
    const { error } = userUpdateSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        console.log(msg)
        res.json({ message: msg || 'Invalid Code'})
    } else {
        const data = {
            username: req.body.username,
            addresses: req.body.addresses,
            image: req.body.image,
            firstName: req.body.name.split(' ')[0],
            lastName: req.body.name.split(' ')[1],
            email: req.body.email,
            phone: req.body.phone
        }
        req.body = data
        next()
    }
}