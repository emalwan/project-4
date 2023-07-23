const mongoose = require('mongoose')

const roasterSchema = mongoose.Schema({
    name: {type: String, default: 'Joe Bloggs'},
    email: {type: String, required: true},
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
},{
    // Created at, updated at
    timestamps: true
})

const Roaster = mongoose.model('Roaster', roasterSchema)

module.exports = Roaster
