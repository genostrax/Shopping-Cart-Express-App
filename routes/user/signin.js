var express = require('express')
var router = express.Router()
var bodyparser = require("body-parser");
var csrf = require('csurf')
var csrfProtection = csrf()
var passport = require('passport')

router.use(csrfProtection)
router.use(bodyparser.urlencoded({extended:false}));

router.get('/', function(req, res, next) {
    var messages = req.flash('error')
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
})

router.post('/login', passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin', 
    failureFlash: true,
}))

module.exports = router

