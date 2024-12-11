import { cleanup } from "@testing-library/react"
import { AuthModel, getAuth, refreshAuth, removeAuth } from "../../../../../src/app/modules/auth"
import { setAuth } from "../../../../../src/app/modules/auth/core/AuthHelpers"
import { ActionType } from "../../../../../src/redux/actions/actionType"
import { store } from "../../../../../src/redux/store"

jest.mock("../../../../../src/redux/store")

describe('Auth helpers', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('setAuth, should dispatch setAuthTokenAction with provided auth object', () => {
        const auth: AuthModel = {
            access: 'access_token',
            refresh: 'refresh_token',
        }

        setAuth(auth)

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ActionType.SET_AUTH_TOKEN,
            setAuth: auth,
        })
    })

    test('refreshAuth, should dispatch updateAccessTokenAction with provided access string', () => {
        const access = 'access_token'

        refreshAuth(access)

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ActionType.UPDATE_ACCESS_TOKEN,
            updateAuth: access,
        })
    })

    test('removeAuth, should dispatch removeTokenAction', () => {
        removeAuth()

        expect(store.dispatch).toHaveBeenCalledWith({
            type: ActionType.REMOVE_AUTH_TOKEN,
        })
    })

    test('getAuth, if have auth', () => {
        const storeState = {
            auth: {
                access: 'access_token',
                refresh: 'refreshtoken'
            }
        };

        (store.getState as jest.Mock).mockReturnValue(storeState)

        expect(getAuth()).toBe(storeState.auth);
    })

    test('getAuth, if don\'t have auth', () => {
        const storeState = {
            auth: {
                access: undefined,
                refresh: undefined
            }
        };

        (store.getState as jest.Mock).mockReturnValue(storeState)

        expect(getAuth()).toBe(undefined);
    })
})
