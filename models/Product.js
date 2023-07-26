const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        min: [1, "Rating should be at least 1"],
        max: [5, "Rating should be maximum 5"]
    },
    feedback: {
        type: String,
        maxlength: [200, "Feedback cannot be more than 200 characters"]
    }
}, {
    timestamps: true
})

const ProductSchema = mongoose.Schema({
    type: String,
    coffeeType: String,
    organic: Boolean,
    price: Number,
    reviews: [reviewSchema],
    roaster: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roaster'
    }]
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
