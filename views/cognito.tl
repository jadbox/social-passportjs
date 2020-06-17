<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <title>Amazon Cognito hosted UI demo</title>

    <script>
      window.REDIRECT = '${d.redirect || ""}';
      console.log('template', window.REDIRECT);
    </script>

    <script src="js/vendor/aws-cognito-sdk.min.js"></script>
    <script src="js/vendor/amazon-cognito-auth.min.js"></script>
    <script src="js/vendor/amazon-cognito-identity2.js"></script>

    <script src="js/app.js"></script>
    <script src="js/config.js"></script>
    <style>
      body {
        background-image: url("/background.svg");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        font-family: "Roboto !important", sans-serif;
        background-repeat: repeat-x;
        background-position: center center;
        width: 100%;
      }
      #loading {
          margin: 4em auto 0 auto;
          text-align: center;
          size: 5em;
          font-weight: bold;
          color: white;
      }
    </style>
  </head>
  <body onload="init()">
    <div id="loading">
        <h1>Please wait, authenticating...</h1>
    </div>
    <table style="display:none">
      <tr>
        <td>Logged in as:</td>
        <td id="loggedInUser"></td>
        <td>
          <br />
          <button onclick="logout()">Logout</button>
        </td>
      </tr>
    </table>
  </body>
</html>
