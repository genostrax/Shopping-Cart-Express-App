var express = require('express')
var path = require('path')
var app = express()
var bodyparser = require("body-parser");
var mongoose = require('mongoose')
var url = "mongodb://localhost:27017/shopping";
var session = require('express-session')
var cookieParser = require('cookie-parser')
var passport = require('passport')
var flash = require('connect-flash')
var validator = require('express-validator')
var MongoStore = require('connect-mongo')(session)

mongoose.connect(url)
require('./config/passport')
app.use(cookieParser())
app.use(session({
    secret: 'martha', 
    resave: false, 
    saveUninitialized: false,
store: new MongoStore({mongooseConnection: mongoose.connection, useNewUrlParser: true}),
    cookie: { maxAge: 180 * 60 * 1000 }
}))

var index = require('./routes/index')
var profile = require('./routes/user/profile')
var signin = require('./routes/user/signin')
var signup = require('./routes/user/signup')
var shoppingCart = require('./routes/shopping-cart')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({extended:false}));
app.use(validator())
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated()
    res.locals.session = req.session
    next()
})

app.use('/',index)
app.use('/shopping-cart',shoppingCart)
app.use('/profile',profile)
app.use('/signin',signin)
app.use('/signup',signup)


app.listen(5000, function() {
    console.log('Connection Established - 5000')
})