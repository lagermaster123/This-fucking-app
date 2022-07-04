if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
  }
const mongoose = require('mongoose')
const products = require('./products')
const Product = require('../models/Product')
const categories = ['Valentines Day', 'Get Well', 'Love and Romance', 'Sympathy and Funeral', 'Birthdays', 'Other Events']
const Category = require('../models/Category')
const passport = require('passport')
const dbUrl = process.env.DB_URL

// CONNECT TO DATABASE
main().catch(err => console.log("MONGOOSE CONNECTION ERROR", err));
async function main() {
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('database connected')
}

const seedProd = async() => {
    await Product.deleteMany({})
    await Category.deleteMany({})

    for (let cat of categories) {
        const c = new Category ({
            name: cat
        })
        await c.save()
    }

    for (let prod of products) {
        const cats = await Category.find({})
        const index = products.indexOf(prod)
        const p = new Product ({
            ...prod,
            category: cats[index % cats.length]._id
        })
        await p.save()
    }
}

seedProd().then(() => {
    console.log('SUCCESS')
    mongoose.connection.close()
})