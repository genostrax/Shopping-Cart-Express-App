var Product = require('../models/product')
var mongoose = require('mongoose')
var url = "mongodb://localhost:27017/shopping";

mongoose.connect(url)

var products = [
    new Product({
        imagePath: 'https://www.pcdiga.com/media/catalog/product/cache/1/image/2718f121925249d501c6086d4b8f9401/1/_/1_98_55.jpg',
        title: 'Redmi 6A',
        price: 30
    }),
    new Product({
        imagePath: 'http://newwalkntalk.com/wp-content/uploads/2017/07/oneplus-5-official_1.jpg',
        title: 'OnePlus X',
        price: 40
    }),
    new Product({
        imagePath: 'https://www.gizmochina.com/wp-content/uploads/2018/09/Apple-iPhone-Xs-600x600.jpg',
        title: 'iPhone XS',
        price: 60
    }),
    new Product({
        imagePath: 'https://s.sdgcdn.com/7/2018/06/650abd8d41a18a8c51c8ca22ed8851b4ef3cf798_f84131a73ae68e92425914f09a16aaa09e1e5dd4_Twilight-1-600x600.jpg',
        title: 'Huawei',
        price: 90
    })
]

var done = 0
for(var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++
        if(done == products.length) {
            exit()
        }
    })
}

function exit() {
    mongoose.disconnect()
}

