var credentials = {
  client: {
    id: 'f2a5c9da-419d-479a-8481-15096eb99a48',
    secret: 'jbqHUZY44_=ufzcRQJ876]*',
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com',
    authorizePath: 'common/oauth2/v2.0/authorize',
    tokenPath: 'common/oauth2/v2.0/token'
  }
};
var oauth2 = require('simple-oauth2').create(credentials);

var redirectUri = 'http://localhost:8000/authorize';

// The scopes the app requires
var scopes = [ 'openid',
               'User.Read',
               'Mail.Read' ];

function getAuthUrl() {
  var returnVal = oauth2.authorizationCode.authorizeURL({
    redirect_uri: redirectUri,
    scope: scopes.join(' ')
  });
  console.log('Generated auth url: ' + returnVal);
  return returnVal;
}

exports.getAuthUrl = getAuthUrl;

function getTokenFromCode(auth_code, callback, response) {
  var token;
  oauth2.authorizationCode.getToken({
    code: auth_code,
    redirect_uri: redirectUri,
    scope: scopes.join(' ')
  }, function (error, result) {
    if (error) {
      console.log('getTokenFromCode error: ', error);
      callback(response, error, null);
    } else {
      token = oauth2.accessToken.create(result);
      console.log('Token created: ', token.token);
      callback(response, null, token);
    }
  });
}

exports.getTokenFromCode = getTokenFromCode;