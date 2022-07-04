const router = require('express').Router()
const user = require('../controllers/user')
const { validateLogin, validateRegister, validateVerify, validateSetPassword, isLoggedIn, validateEmail, validateOneTap, validateUserUpdate } = require('../middlewear')
const CatchAsync = require('../utils/CatchAsync')

router.post('/register', validateRegister, CatchAsync(user.register))

router.post('/login', validateLogin, user.login)

router.post('/forgot-password', validateEmail, CatchAsync(user.forgotPassword))

router.post('/verify', validateVerify, CatchAsync(user.verify))

router.post('/set-password', validateSetPassword, CatchAsync(user.setPassword))

router.post('/update', validateUserUpdate, CatchAsync(user.update))

router.post('/one-tap', validateOneTap, user.register)

router.get('/logout', isLoggedIn, user.logout)

module.exports = router