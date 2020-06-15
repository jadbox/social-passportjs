var gCognitoAuth;

function init() {
  gCognitoAuth = new AmazonCognitoIdentity.CognitoAuth(COGNITO_AUTH_DATA);
  gCognitoAuth.parseCognitoWebResponse(location.href);

  if (window.location.search.indexOf("logout") > -1) {
    logout();
    window.location.href = "/";
    // window.location.reload();
  }

  checkLogin();
  document.getElementById(
    "loggedInUser"
  ).textContent = gCognitoAuth.getUsername();

  /* if (!localStorage.getItem('client_id')) {
    localStorage.setItem('client_id', uuidv4());
  }*/

  refreshData();
  // setInterval(refreshData, 1000);
}

function checkLogin() {
  if (!gCognitoAuth.isUserSignedIn()) {
    gCognitoAuth.getSession();
  } else {
    const username = gCognitoAuth.getUsername();
    const email = JSON.parse(gCognitoAuth.storage.authUser).email;

    updateCookie("cid", username);
    updateCookie("uuid", username);
    updateCookie("cemail", email);
    updateCookie("max-age", 31536000);

    // console.log("document.cookie2", username, email);

    window.location.href = 'https://portal.collab.land:1880/dashboard';
  }
}

function updateCookie(param, username) {
  const cookie = document.cookie || "";
  document.cookie = document.cookie || "";

  if (!cookie) {
    // console.log('no cookie', param);
    document.cookie = param + "=" + username;
  } else if (cookie.indexOf(param) === -1) {
    // console.log('append cookie', param, username);
    document.cookie = cookie + "; " + param + "=" + encodeURIComponent(username);
  } else {
    // console.log('replace cookie', param);
    const old = cookie
      .split("; ")
      .filter((x) => x.indexOf(param) > -1)[0]
      .split("=")[1];
    document.cookie = cookie.replace(old, username);
  }
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
    // gCognitoAuth.signOut();
    gCognitoAuth.globalSignOut((x) => x);
  } else {
    alert("You are not logged in");
  }
}
