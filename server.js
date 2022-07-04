if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
  }
const express = require('express')
const multer = require('multer')
const { storage } = require('./cloudinary')
const upload = multer({ storage })
const ExpressError = require('./utils/ExpressError')
const mongoSanitize = require('express-mongo-sanitize')
const path = require('path')
const cors = require('cors')
const logger = require('morgan');
const User = require('./models/User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleOneTapStrategy = require('passport-google-one-tap').GoogleOneTapStrategy
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')

const MongoDBStore = require("connect-mongo");

const PORT = process.env.PORT || 2000
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/mp-productions';

const productsRouter = require('./routes/products')
const orderRouter = require('./routes/order')
const userRouter = require('./routes/user')
const uploadRouter = require('./routes/upload')
const dashboardRouter = require('./routes/dashboard')

const app = express()
const mongoose = require('mongoose')

// CONNECT TO DATABASE
main().catch(err => console.log("MONGOOSE CONNECTION ERROR", err));
async function main() {
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('database connected')
}

//Middleware
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(mongoSanitize({
  replaceWith: '_'
}))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(session({
    secret: 'thisShouldBeABetterSecret',
    store: MongoDBStore.create({ mongoUrl: dbUrl }),
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser('thisShouldBeABetterSecret'))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.use(new GoogleOneTapStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    verifyCsrfToken: false
  }, 
  function (profile, done) {
    console.log(profile)
  }
))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

app.use('/products', productsRouter)
app.use('/order', orderRouter)
app.use('/user', userRouter)
app.use('/upload', uploadRouter)
app.use('/dashboard', dashboardRouter)

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
  })

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if(!err.message) err.message = 'Oh no! Somthing went wrong!'
    console.error(err.message, statusCode, err)
    res.status(statusCode).send(err)
})


app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}`)
})