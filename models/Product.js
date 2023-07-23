const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    title: String,
    genre: String,
    isFiction: Boolean,
    numberOfPages: Number,
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }]
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product