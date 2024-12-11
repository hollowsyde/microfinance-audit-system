import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel} from './_models'
import * as authHelper from './AuthHelpers'
import {refreshToken} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'
import { AuthState } from '../../../../redux/reducers/authReducer'
import { useSelector } from 'react-redux'
import { rootState } from '../../../../redux/reducers/rootReducer'

type AuthContextProps = {
  auth: AuthState | undefined
  username: string | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  logout: () => void
}

const initAuthContextPropsState = {
  auth: undefined,
  username: undefined,
  saveAuth: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const auth = useSelector((state: rootState) => state.auth)
  const username = "dummy user"
  const saveAuth = (auth: AuthModel | undefined) => {
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }
  const logout = () => {
    saveAuth(undefined)
  }

  return (
    <AuthContext.Provider value={{auth, username, saveAuth, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, logout} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  useEffect(() => {
    const requestUser = async (auth: AuthState) => {
      if (!didRequest.current) {
        console.log('harunya cuma masuk sekali')
        // ga ada token
        if (!auth.access || !auth.refresh) logout()
        else{
          if (auth.access.exp && auth.access.exp <= Date.now()/1000) {
            if (auth.refresh.exp && auth.refresh.exp <= Date.now()/1000) {
              // keduanya exp
              logout()
            } else {
              // refresh
              try {
                const {data: authData} = await refreshToken(auth.refresh.token)
                authHelper.refreshAuth(authData.access)
              } catch (error) {
                // gagal refresh
                console.log(error)
                logout()
              }
            }
          }
        }
        
      }
      
      setShowSplashScreen(false)

      return () => (didRequest.current = true)
    }

    if (auth) {
      requestUser(auth)
    } else {
      logout()
      setShowSplashScreen(false)
    }
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <div>{children}</div>
}

export {AuthProvider, AuthInit, useAuth}
