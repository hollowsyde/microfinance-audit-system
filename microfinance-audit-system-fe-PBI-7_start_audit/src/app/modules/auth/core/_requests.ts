import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL + '/authentication'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `${API_URL}/token/`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`
export const REFRESH_TOKEN =  `${API_URL}/token/refresh/`
export const HAS_LOGGED_IN = `${API_URL}/hasloggedin/`

// Server should return AuthModel
export function login(username: string, password: string) {
  const post = {username: username, password: password}
  return axios.post<AuthModel>(LOGIN_URL, post)
}

export function refreshToken(refreshToken: string) {
  const post = {refresh: refreshToken}
  return axios.post<{access: string}>(REFRESH_TOKEN, post)
}

export function hasloggedin() {
  return axios.get(HAS_LOGGED_IN)
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
