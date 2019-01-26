
const TokenKey = 'access_token'
const RefreshTokenKey = 'refresh_token'
const ExpiresAtKey = 'expires_at'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function getHeaderToken() {
  return `Bearer ${localStorage.getItem(TokenKey)}`
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function setRefreshToken(refreshToken) {
  return localStorage.setItem(RefreshTokenKey, refreshToken)
}

export function getRefreshToken() {
  return localStorage.getItem(RefreshTokenKey)
}

export function getExpiresAt() {
  return localStorage.getItem(ExpiresAtKey)
}

export function setExpiresAt(expiresAt) {
  let expriesTimestamp = Date.now() + expiresAt*1000
  return localStorage.setItem(ExpiresAtKey, expriesTimestamp)
}

export function removeRefreshToken() {
  return localStorage.removeItem(RefreshTokenKey)
}

export function removeExpiresAt() {
  return localStorage.removeItem(ExpiresAtKey)
}

export function tenMinutesBeforeExpires(){

  if (Date.now() >= (getExpiresAt() - 10*60*1000)) {
    return true
  }
  return false
}