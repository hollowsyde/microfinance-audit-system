import { ActionType } from "../actions/actionType"
import { Action } from "../actions/sessionAction"

export const initialState = 0

const reducer = (state: number = initialState, action: Action) => {
    switch(action.type){
        case ActionType.SESSION:
            return state
        default:
            return state
    }
}

export default reducer