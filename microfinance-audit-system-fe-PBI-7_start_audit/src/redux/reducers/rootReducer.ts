import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import authReducer, {initialState as authState} from "./authReducer";
import step2Reducer, {initialState as step2State} from "./startAuditStep2Reducer";

export interface rootState {
    auth: typeof authState
    step2: typeof step2State
}

const rootReducer = combineReducers({
    session: sessionReducer,
    auth: authReducer,
    step2: step2Reducer
})

export default rootReducer