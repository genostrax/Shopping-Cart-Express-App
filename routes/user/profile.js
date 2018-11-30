var express = require('express')
var router = express.Router()

router.get('/', isLoggedIn, function(req, res, next) {
    res.render('user/profile')
})

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout()
    res.redirect('/')
})

router.use('/', notLoggedIn, (req, res, next) => {
    next()
})

module.exports = router

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}