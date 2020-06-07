require("dotenv").config();

const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const express = require('express')
const {setup} = require('./discord');
const {telesetup} = require('./telegram');
const tl = require('express-tl');
const cookieParser = require('cookie-parser');

const app = express()

const port = process.env.PORT || 8080
const path = process.env.HOSTPATH || `http://localhost:${port}`;

app.engine('tl', tl)
app.set('views', './views');
app.set('view engine', 'tl');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.get('/', express.static('public'));

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

app.get('/', function(req, res) {
  // res.cookie('uuid', '');
  // res.cookie('provider', '');
  // res.cookie('username', '');

	res.render('index', {
    loggedIn: req.isAuthenticated(),
    path: path,
    bot: process.env.TELEGRAM_NAME
	})
})

// app.get('/static/discord.png', express.static('public/discord.png'));
app.get('/static', express.static('public'));

app.get('/info', checkAuth, function (req, res) {
  // req.session.cookie.uuid = req.user;
  req.user.uuid = req.cookies.uuid;
  // console.log(req.cookies.uuid, req.user)
  res.json(req.user);
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.send('not logged in :(');
}


setup(app, path);
telesetup(app, path);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
