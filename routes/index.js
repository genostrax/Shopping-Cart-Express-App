var express = require('express')
var router = express.Router()
var Product = require('../models/product')
var Cart = require('../models/cart')
var quant = 0

router.get('/', function(req, res) {
    Product.find(function(err, docs) {
        var productChunks = []
        var chunkSize = 3
        
        for(var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize))
        }
        res.render('index', {title: 'Shopping Cart', products: docs})
    })
})

router.get('/add-to-cart/:id', (req, res) => {
    var productId = req.params.id
    var cart = new Cart(req.session.cart ? req.session.cart : {})

    Product.findById(productId, (err, product) => {
        if (err) {
            return res.redirect('/')
        }
        cart.add(product, product.id)
        req.session.cart = cart
        console.log(req.session.cart)
        res.redirect('/')
    })
})

module.exports = router