<!DOCTYPE html>
<html lang="en">
  <head>
    <script>
      /*
      var API_URL = 'https://api.example.com/';
      var COGNITO_AUTH_DATA = {
        ClientId: 'no1rqgf13je9cr9jdtqgv6kdq',
        // Using Amazon Cognito custom domain below, default domain is also fine.
        AppWebDomain: 'auth.collab.land',
        TokenScopesArray: ['phone', 'email', 'openid', 'aws.cognito.signin.user.admin', 'profile'],
        RedirectUriSignIn: 'http://localhost:8080', // 'https://portal.collab.land',
        RedirectUriSignOut: 'https://portal.collab.land'
      };*/
      function init() {}
    </script>
  </head>
  <body onload="init()" style="background-color: antiquewhite;">
    <div style="width: 100%; text-align: center;">
      <div style="margin: 0 auto 0 auto;">
        <h3>Please login below:</h3>

        Telegram ${d.bot} login:<br />

        <script
          async
          src="${d.twidget}"
          data-telegram-login="${d.bot}"
          data-size="large"
          data-auth-url="/tlogin"
          data-request-access="write"
        ></script>

        <div style="display: none;">
          <br /><br />
          <p>Logged in status: ${d.loggedIn}</p>
          <p><a href="/logout">log out</a></p>

          <p id="loggedInUser"></p>
          <button onclick="logout()">Cognito Logout</button>
        </div>
      </div>
    </div>
    <br />
  </body>
</html>
