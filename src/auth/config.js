const authPasswordFlowConfig = {
  issuer: 'http://auth.erptech.vn/',
  requireHttps: false,
  clientId: 'hrm-resource-server',
  ClientSecret: 'gJ7t7czenNY8WZEdSAe8ZbKd9MpUhc3S',
  scope: 'openid offline_access email roles profile hrm',
  oidc: false,
  grant_type: 'password'
}
const defaultString = {
  AUTH: 'auth',
  token_endpoint: '/auth/connect/token',
  userInfor_endpoint: '/auth/api/userinfo',
  url_config: '/auth/.well-known/openid-configuration',
  METHOD_POST: 'POST',
  METHOD_GET: 'GET'
}
export { authPasswordFlowConfig, defaultString }
