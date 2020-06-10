const express = require("express");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const jwt = require("jsonwebtoken");

// 'email',
const scopes = [
  "identify" /* 'connections', (it is currently broken)  'guilds', 'guilds.join' */,
];
const prompt = "consent";

function setup(app, path) {
  const callbackURL = `${path}/dcallback`;
  console.log("dcallback", callbackURL);

  passport.use(
    new Strategy(
      {
        clientID: process.env.DISCORD_CLIENT,
        clientSecret: process.env.DISCORD_SECRET,
        callbackURL: callbackURL,
        scope: scopes,
        prompt: prompt,
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          return done(null, profile);
        });
      }
    )
  );

  app.get(
    "/discord",
    passport.authenticate("discord", { scope: scopes, prompt: prompt }),
    function (req, res) {}
  );
  app.get(
    "/dcallback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    function (req, res) {
      // req.session.cookie.uuid = req.user.id;
      const id = "d" + req.user.id;
      const token = jwt.sign(id, process.env.JWT_SECRET);
      res.cookie("jwt", token);
      res.cookie("uuid", id);
      res.cookie("provider", "discord");
      res.cookie("username", req.user.username);

      if (process.env.REDIRECT) res.redirect(process.env.REDIRECT);
      else res.redirect("/info");
    } // auth success
  );
}

module.exports = { discord: setup };
