const {Schema, model} = require('mongoose')
const schema = new Schema({
    title: {
        type: String,
        default: 'cat2'
    },
    product: {
        type: Object
    },
    date: {
        type: String
    }
})
module.exports = model('cat2', schema)