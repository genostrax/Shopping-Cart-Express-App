var express = require('express')
var router = express.Router()
var Product = require('../models/product')
var Cart = require('../models/cart')

router.get('/', (req, res) => {
    if(!req.session.cart) {
        return res.render('shopping-cart', {products: null})
    }
    var cart = new Cart(req.session.cart)
    res.render('shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
})

module.exports = router