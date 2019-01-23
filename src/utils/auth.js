import Cookies from 'js-cookie'

const TokenKey = 'access_token'
const RefreshTokenKey = 'refresh_token'
const ExpiresAtKey = 'expires_at'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getHeaderToken() {
  return `Bearer ${Cookies.get(TokenKey)}`
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setRefreshToken(refreshToken) {
  return Cookies.set(RefreshTokenKey, refreshToken)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function getExpiresAt() {
  return Cookies.get(ExpiresAtKey)
}

export function setExpiresAt(expiresAt) {
  return Cookies.set(ExpiresAtKey, expiresAt)
}
