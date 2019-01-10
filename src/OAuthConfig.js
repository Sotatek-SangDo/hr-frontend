// export const authPasswordFlowConfig: AuthConfig = {
//   // Url of the Identity Provider
//   issuer: "http://auth.erptech.vn/",
  
//   requireHttps: false,
//   // The SPA's id. The SPA is registerd with this id at the auth-server
//   clientId: 'hrm-resource-server',

//   ClientSecret: 'gJ7t7czenNY8WZEdSAe8ZbKd9MpUhc3S',

//   scope: "openid offline_access email roles profile hrm",
//   oidc: false
// };
// grant_type = password
// user/pass: admin@erptech.vn/111111
// const passport = require('passport');
// const OAuth2Strategy = require('passport-oauth2');

// passport.use(new OAuth2Strategy({
//     authorizationURL: 'http://auth.erptech.vn/connect/authorize',
//     tokenURL: 'http://auth.erptech.vn/connect/token',
//     clientID: 'hrm-resource-server',
//     clientSecret: 'gJ7t7czenNY8WZEdSAe8ZbKd9MpUhc3S'
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log(accessToken, 'Accesstoken');
//   }
// ));
const request = require('request');

const options = {
  method: "GET",
  url: "http://auth.erptech.vn/.well-known/openid-configuration"
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
