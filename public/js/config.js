var API_URL = 'https://api.example.com/';
var COGNITO_AUTH_DATA = {
  ClientId: 'no1rqgf13je9cr9jdtqgv6kdq',
  // Using Amazon Cognito custom domain below, default domain is also fine.
  AppWebDomain: 'auth.collab.land',
  TokenScopesArray: ['phone', 'email', 'openid', 'aws.cognito.signin.user.admin', 'profile'],
  RedirectUriSignIn: 'http://localhost:8080', // 'https://portal.collab.land',
  RedirectUriSignOut: 'https://portal.collab.land'
};

/*
To test Amazon Cognito hosted UI:
https://auth.example.com/login?response_type=token&client_id=YOUR_AMAZON_COGNITO_CLIENT_ID&redirect_uri=https://localhost
*/
