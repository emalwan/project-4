const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
const isLoggedIn = require('../lib/isLoggedIn')

// router.get('/product/add', isLoggedIn, productController.product_create_get)
router.get('/product/add', productController.product_create_get)
router.post('/product/add', productController.product_create_post)
router.get('/product/index', isLoggedIn, productController.product_index_get)
router.post('/product/delete', productController.product_delete)
router.get('/product/detail', productController.product_detail_get)
// router.get('/product/edit', isLoggedIn, productController.product_edit_get)
router.get('/product/edit', productController.product_edit_get)
router.post('/product/edit', productController.product_edit_post)
router.post('/product/:productId/review', isLoggedIn, productController.product_review_post);
router.get('/product/:productId/reviews', productController.product_reviews_get);


module.exports = router