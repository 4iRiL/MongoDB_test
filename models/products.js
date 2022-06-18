const {Schema, model} = require('mongoose')
const schema = new Schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    date: {
        type: String
    },
    version: {
        type: Number
    },
    cat1: {
        type: Object
    },
    cat2: {
        type: Object
    },
    cat3: {
        type: Object
    },
    cat4: {
        type: Object
    }
})

module.exports = model('products', schema)