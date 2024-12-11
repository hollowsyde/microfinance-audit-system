import {AuthModel} from './_models'
import { store } from '../../../../redux/store'
import jwt_decode from 'jwt-decode'
import { removeTokenAction, setAuthTokenAction, updateAccessTokenAction } from '../../../../redux/actions/authActions'

const setAuth = (auth: AuthModel) => {
  store.dispatch(setAuthTokenAction(auth))
}

const refreshAuth = (access: string) => {
  store.dispatch(updateAccessTokenAction(access))
}

const removeAuth = () => {

  store.dispatch(removeTokenAction())
}

const getAuth = () => {
  const state = store.getState();
  const authState = state.auth;

  if (!authState.access || !authState.refresh) {
    return
  }

  return authState
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: {headers: {Authorization: string}}) => {
      const auth = getAuth()
      if (auth && auth.access) {
        config.headers.Authorization = `Bearer ${auth.access.token}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export {getAuth, setAuth, refreshAuth, removeAuth}
