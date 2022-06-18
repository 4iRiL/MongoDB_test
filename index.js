const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const productsRoutes = require('./routes/products')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./config/handlebars-helpers.js') 
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

app.use(productsRoutes)


async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:5vkirill@products.d69v8.mongodb.net/products', {
            useNewUrlParser: true
        })
        app.listen(PORT, () => {
            console.log(
                'Server has been started...'
            )
        })
    } catch (e) {
        console.log(e)
    }
}
start()