const router = require('express').Router()
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const { validateImage } = require('../middlewear')

router.post('/images', upload.array('image'), validateImage)

module.exports = router