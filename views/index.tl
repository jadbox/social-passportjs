<html>
  <body style="background-color: antiquewhite;">
    <div style="width: 100%; text-align: center;">
      <div style="margin: 0 auto 0 auto;">
        <h3>Please login below:</h3>
        Telegram ${d.bot} login:<br />

        <script async
          src="${d.twidget}"
          data-telegram-login="${d.bot}"
          data-size="large"
          data-auth-url="/tlogin"
          data-request-access="write"
        ></script>

        <br /><br />
        <p>Logged in status: ${d.loggedIn}</p>
        <p><a href="/logout">log out</a></p>
      </div>
    </div>
    <br />
  </body>
</html>
