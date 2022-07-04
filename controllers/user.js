const User = require('../models/user')
const passport = require('passport')
const ExpressError = require('../utils/ExpressError')
const { SendEmail } = require('../utils/SendEmail')
const { v4: uuidv4 } = require('uuid')

module.exports.register = async (req, res, next) => {
    const { image, username, password, firstName, lastName, phone=1234567890, email } = req.body
    const user = await User.findOne({ username: username })
    if(user) {
        res.json({ message: 'User already exists', user: req.body })
    } else {
        const newUser = new User({
            image,
            username,
            firstName,
            lastName,
            phone: Number(phone),
            email,
            role: 'CLIENT'
        })
        const registeredUser = await User.register(newUser, password)
        req.login(registeredUser, err => {
            if(err) return res.json({ message: 'error at login' })
            res.json({ message: 'success', user: newUser })
        })
    }
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw new ExpressError('issue with passport auth');
        if (!user) res.status(304).send('No User Found')
        else {
            req.login(user, err => {
                if (err) throw new ExpressError('login error after auth')
                res.send(req.user)
            })
        }
    })(req, res, next)
}

module.exports.update = async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if(user) {
        for( let key in req.body) {
            user[key] = req.body[key]
        }
        await user.save()
        res.json({ message: 'success', user})
    } else {
        res.json({message: 'user not found'})
    }
}

module.exports.forgotPassword = async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        const token = uuidv4().toString().slice(0,6)
        user.verification = token
        await user.save()
        SendEmail( req.body.email, 'Reset Password', token, 'Dream Decorations ✨ <support@dreamdecorations.com>')
            .then(result => res.json({ message: 'success', email: result.accepted[0] }))
            .catch(err => res.json({ message: err.message }))
    } else {
        res.json({ message: "that email isn't on file" })
    }
}

module.exports.verify = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if(user && user.verification === req.body.code) {
        user.verified = true
        await user.save()
        res.json({ message: 'success' })
    } else {
        user.verified = false
        await user.save()
        res.json({ message: "That's not quite right" })
    }
}

module.exports.setPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if(user && user.verified && user.verification === req.body.code) {
        try {
            user.setPassword(req.body.password, async (err, user) => {
                if(err) return res.json({ message: 'Error setting password' })
                if(user) {
                    user.verified = false
                    user.verification = ''
                    await user.save()
                    return res.json({ message: 'success' })
                } else {
                    res.json({ message: 'invalid user'})
                }
            })
        } catch (e) {
            throw new ExpressError(e.message)
        }
    } else if (user && user.verification === req.body.code) {
        return res.json({ message: 'Sorry, that code is no longer valid'})
    } else if (user){
        return res.json({ message: 'Incorrect verification code'})
    } else {
        return res.json({ message: 'User not found'})
    }
}

module.exports.get = (req, res) => {
    res.send(req.user)
}

module.exports.logout = (req, res) => {
    req.logout()
}