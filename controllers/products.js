const Product = require('../models/Product')
const Roaster = require('../models/Roaster')

exports.product_create_get = async (req, res) => {
    try {
        const roasters = await Roaster.find()
        res.render('product/add', {roasters})
    } catch (error) {
        console.log(error.message)
    }

    
}

exports.product_create_post = (req, res) => {
    console.log(req.body)


    const product = new Product(req.body)
    product.save()
        .then(() => {
            console.log('Your product has been saved')
            res.status(201).json(product)
        })
        .catch((err) => {
            console.log('an error occurred', err)
        })
}

exports.product_index_get = async (req, res) => {
    try{
        const products = await Product.find().populate('roaster')
        console.log(products)
        res.status(200).json(products)
        // res.render('book/index', { products: products }) //does the same thing
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'Something Went Wrong!'})
    }

    // Book.find().then((products) =>{
    //     console.log(products)
    //     res.render('book/index', {products})
    // }).catch((error) => {
    //     console.log(error.message)
    //     res.send('HMMMMM Something is not right')
    // })

}

exports.product_delete = async (req, res) => {
    console.log(req.query.id)
    try {
        // Try to execute this code
        await Product.findByIdAndDelete(req.query.id)
        res.sendStatus(204)
    } catch (error) {
        // Execute this if there is an error
        console.log(error.message)
        res.status(500).json({message: error.message})
    } finally {
        // Execute this code no matter what
        console.log('We are in the finally block')
    }
}

exports.product_detail_get = async (req, res) => {
    try {
        const product = await Product.findById(req.query.id)
        res.json(product)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

exports.product_edit_get = async (req, res) => {
    try {
        const product = await Product.findById(req.query.id)
        res.render('product/edit', {product})
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

exports.product_edit_post = async (req, res) => {
    try {
        console.log(req.body.id)
        await Product.findByIdAndUpdate(req.body.id, req.body)
        res.redirect('/product/index')
    } catch (error) {
        console.log(error.message)
    }
}