import { ActionType } from "./actionType"
import { ID } from "../../_metronic/helpers"
import { store } from '../../redux/store'

const dispatchAddId = (id:ID) => {
    return store.dispatch({type: ActionType.ADD_AUDITORS_ID, payload:id})
}

const dispatchRemoveId = (id:ID) => {
    return store.dispatch({type: ActionType.REMOVE_AUDITORS_ID, payload:id})
}

const dispatchRemoveAllId = () => {
    return store.dispatch({type: ActionType.REMOVE_ALL_AUDITORS_ID})
}

export { dispatchAddId, dispatchRemoveId, dispatchRemoveAllId }