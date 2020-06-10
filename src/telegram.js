const express = require('express');
const passport = require('passport');

const {TelegramStrategy} = require('passport-telegram-official');

const throwError = () => {
  throw new TypeError(
    "Please provide your credentials through BOT_TOKEN and BOT_NAME envivroment variable. Also set PORT to 80, because widget won't work otherwise."
  );
};

const botToken = process.env.TELEGRAM_TOKEN || throwError();
const botName = process.env.TELEGRAM_NAME || throwError();

passport.use(
  new TelegramStrategy({ botToken: botToken, passReqToCallback: true }, (req, user, done) => {
    console.log('authenticated tg:', user);

    req.user = user;
    done(null, user);
  })
);

function telesetup(app, path) {
  // Here we create page with auth widget
  /*
  app.get('/', (req, res) => {
    res.send(`<html>
<head></head>
<body>
  <div id="widget">
      <script 
         async 
         src="https://telegram.org/js/telegram-widget.js?2"
         data-telegram-login="${botName}"
         data-size="medium"
         data-auth-url="/login"
         data-request-access="write"
       ></script>
  </div>
</body>
</html>`);
  });
  */

  
  // app.use(passport.initialize());

  app.use('/tlogin', passport.authenticate('telegram'), (req, res) => {
    res.cookie('uuid', 't'+req.user.id);
    res.cookie('provider', 'telegram');
    res.cookie('username', req.user.username);

    console.log('telegram', req.user);
    // res.redirect('/info');
    if(process.env.REDIRECT) res.redirect(process.env.REDIRECT);
	  else res.redirect('/info');
    
    // res.send(`You logged in! Hello ${req.user.first_name}!`);
    // res.redirect('/');
  });
}

module.exports = { telesetup };
