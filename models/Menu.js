const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newMenuSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    detail: {
        type:String,
        required:true,
    },
    price: {
        type:String,
        required:true,
    },
    imageURL: {
        type:String,
        required:true,
    },
    
})

module.exports = mongoose.model('menu', newMenuSchema)