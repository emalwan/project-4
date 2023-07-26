const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product'); // assuming you have a Product model

router.post('/addtocart', async (req, res) => {
  const { productId, quantity } = req.body;

  // Get user cart
  let cart = await Cart.findOne({ user: req.user._id });

  // If no cart, create one
  if(!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  // Check if product is in cart, if so, just increase quantity
  let cartItem = cart.items.find(item => item.product.toString() === productId);

  if(cartItem) {
    cartItem.quantity += quantity;
  } else {
    // else, find price of product and add product to cart
    const product = await Product.findById(productId);
    cartItem = {
      product: productId,
      quantity: quantity,
      price: product.price,
    };
    cart.items.push(cartItem);
  }

  await cart.save();
  res.send({ success: true });
});

module.exports = router;
