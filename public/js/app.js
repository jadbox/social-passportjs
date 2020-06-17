var gCognitoAuth;

function init() {
  gCognitoAuth = new AmazonCognitoIdentity.CognitoAuth(COGNITO_AUTH_DATA);
  gCognitoAuth.userhandler = gCognitoAuth.userhandler || {};
  gCognitoAuth.userhandler.onSuccess = function() {
    // window.href = '/';
    checkLogin();
  }
  gCognitoAuth.parseCognitoWebResponse(location.href);

  if (window.location.search.indexOf("logout") > -1) {
    logout();
    window.location.href = "/";
    // window.location.reload();
  }

  setTimeout(checkLogin, 500);

  document.getElementById(
    "loggedInUser"
  ).textContent = gCognitoAuth.getUsername();

  /* if (!localStorage.getItem('client_id')) {
    localStorage.setItem('client_id', uuidv4());
  }*/

  // refreshData();
  // setInterval(refreshData, 1000);
}

function checkLogin() {
  if (!gCognitoAuth.isUserSignedIn()) {
    gCognitoAuth.getSession();
  } else {
    const username = gCognitoAuth.getUsername();
    // const email = JSON.parse(gCognitoAuth.storage.authUser).email;

    updateCookie("cid", username);
    updateCookie("uuid", username);
    // updateCookie("cemail", email);
    // updateCookie("max-age", 31536000);

    // console.log("document.cookie2", username, email);

    console.log('redirecting');
    window.location.href = process.env.REDIRECT;
  }
}

function updateCookie(param, username) {
  const cookie = document.cookie || "";
  document.cookie = document.cookie || "";

  document.cookie = param + "=" + encodeURIComponent(username) + '; max-age=31536000"';
  // console.log('document.cookie11 ', document.cookie );
}

function refreshData() {
  checkLogin();
  getData(gCognitoAuth.getSignInUserSession().getIdToken().getJwtToken());
}

function getData(idToken) {
  console.log("--", gCognitoAuth.getSignInUserSession());
  return;
  var xmlhttp = new XMLHttpRequest();
  var url = API_URL + "?id=" + localStorage.getItem("client_id");

  xmlhttp.open("GET", url);
  xmlhttp.setRequestHeader("Authorization", idToken);
  xmlhttp.onload = function () {
    if (this.status == 200) {
      var data = JSON.parse(this.responseText);
      updateView(data);
    } else {
      alert("Could not read data");
    }
  };
  xmlhttp.send();
}

function updateView(data) {
  // Your code here.
}

function logout() {
  if (gCognitoAuth.isUserSignedIn()) {
    localStorage.removeItem("client_id");
    // gCognitoAuth.signOut(true);
    gCognitoAuth.globalSignOut((x) => x);
  } else {
    alert("You are not logged in");
  }
}
