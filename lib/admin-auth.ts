const AUTH_KEY = "qx-admin-auth"
const ADMIN_USER = "admin"
const ADMIN_PASS = "admin"

export function checkCredentials(username: string, password: string): boolean {
  return username.trim() === ADMIN_USER && password === ADMIN_PASS
}

export function login() {
  if (typeof window === "undefined") return
  window.localStorage.setItem(AUTH_KEY, "true")
}

export function logout() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(AUTH_KEY)
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(AUTH_KEY) === "true"
}
