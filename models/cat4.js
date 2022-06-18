const {Schema, model} = require('mongoose')
const schema = new Schema({
    title: {
        type: String,
        default: 'cat4'
    },
    product: {
        type: Object
    },
    date: {
        type: String
    }
})
module.exports = model('cat4', schema)