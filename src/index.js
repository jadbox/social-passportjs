require("dotenv").config();

const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const express = require('express')
const {discord} = require('./discord');
const {telesetup} = require('./telegram');
const tl = require('express-tl');
const cookieParser = require('cookie-parser');

const app = express()

const port = process.env.PORT || 8080
const path = process.env.HOSTPATH || `http://localhost:${port}`;

console.log('port', port);
console.log('path process.env.HOSTPATH', path);
console.log('process.env.TELEGRAM_NAME', process.env.TELEGRAM_NAME);
console.log('process.env.DISCORD_CLIENT', process.env.DISCORD_CLIENT);
console.log('process.env.REDIRECT', process.env.REDIRECT);

app.engine('tl', tl)
app.set('views', './views');
app.set('view engine', 'tl');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))


app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.get('/social', function(req, res) {
	res.render('index', {
    loggedIn: req.isAuthenticated(),
    path: path,
    bot: process.env.TELEGRAM_NAME,
    twidget: process.env.TELEGRAM_WIDGET_URL || 'https://telegram.org/js/telegram-widget.js?2'
	})
})

app.get('/', function(req, res) {
	res.render('cognito', {
    loggedIn: req.isAuthenticated(),
    REDIRECT: process.env.REDIRECT,
    path: path,
    bot: process.env.TELEGRAM_NAME,
    twidget: process.env.TELEGRAM_WIDGET_URL || 'https://telegram.org/js/telegram-widget.js?2'
    
  })
})

// app.get('/static/discord.png', express.static('public/discord.png'));
app.get('/static', express.static('public'));

app.get('/info', checkAuth, function (req, res) {
  // req.session.cookie.uuid = req.user;
  req.user.uuid = req.cookies.uuid;
  req.user.loggedIn = true;
  // console.log(req.cookies.uuid, req.user)
  res.json(req.user);
});

app.get('/logout', function(req, res){
  res.clearCookie('uuid');
  res.clearCookie('provider');
  res.clearCookie('username');
  res.clearCookie('jwt');

  req.logout();
  res.redirect('/');
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.json({loggedIn: false});
}

discord(app, path);
telesetup(app, path);

app.listen(port, () => console.log(`Auth app listening at ${path}`));
