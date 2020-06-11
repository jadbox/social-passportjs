const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { TelegramStrategy } = require("passport-telegram-official");

const throwError = () => {
  throw new TypeError(
    "Please provide your credentials through BOT_TOKEN and BOT_NAME envivroment variable. Also set PORT to 80, because widget won't work otherwise."
  );
};

const botToken = process.env.TELEGRAM_TOKEN || throwError();
const botName = process.env.TELEGRAM_NAME || throwError();

// console.log('botToken', botName, botToken);
let tstrat = null;
passport.use(
  tstrat = new TelegramStrategy(
    {
      botToken: botToken,
      queryExpiration: 86400 * 10,
      passReqToCallback: true,
    },
    (req, user, done) => {
      console.log("!! authenticated tg:", user);

      req.user = user;
      done(null, user);
    }
  )
);

function telesetup(app, path) {
  app.get("/tlogin", function (req, res, next) {
    // console.log('tlogin botToken', botToken);
    // console.log("tlogin req", req.params, '-', req.body);
    // console.log('t', tstrat.options);

    passport.authenticate("telegram", function (err, user, info) {
      if (err) {
        console.warn("telegram err", err, "-", info);
        return next(err);
      }
      if (!user) {
        console.warn("telegram no user", info);
        return res.redirect("/");
      }

      console.log("Authentication Telegram success:", user.username);

      const id = "t" + user.id;
      const token = jwt.sign(id, process.env.JWT_SECRET);
      res.cookie("jwt", token);

      res.cookie("uuid", id);
      res.cookie("provider", "telegram");
      res.cookie("telegram_id", user.id);
      res.cookie("username", user.username);

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        if (process.env.REDIRECT) res.redirect(process.env.REDIRECT);
        else res.redirect("/info");
        // return res.redirect('/users/' + user.username);
      });
    })(req, res, next);
  });
}

module.exports = { telesetup };
