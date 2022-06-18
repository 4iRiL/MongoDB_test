const {Schema, model} = require('mongoose')
const schema = new Schema({
    title: {
        type: String,
        default: 'cat1'
    },
    product: {
        type: Object
    },
    date: {
        type: String
    }
})
module.exports = model('cat1', schema)