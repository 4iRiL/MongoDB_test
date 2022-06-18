const {Schema, model} = require('mongoose')
const schema = new Schema({
    title: {
        type: String,
        default: 'cat3'
    },
    product: {
        type: Object
    },
    date: {
        type: String
    }
})
module.exports = model('cat3', schema)