import { ID } from "../../_metronic/helpers"
import { ActionType } from "../actions/actionType"
import { Step2Action } from "../actions/startAuditStep2Action"

export interface Step2State {
    auditorsId: ID[]
}

export const initialState = {
    auditorsId: []
}

const step2Reducer = (state:Step2State = initialState, action: Step2Action) => {
    switch(action.type){
        case ActionType.ADD_AUDITORS_ID:{
            return {...state, auditorsId:[...state.auditorsId, action.payload]}
        }
        case ActionType.REMOVE_AUDITORS_ID:{
            const clearedArr: ID[] = [...state.auditorsId].filter((target) =>{
                return target !== action.payload
            })
            return {...state, auditorsId:clearedArr}
        }
        case ActionType.REMOVE_ALL_AUDITORS_ID:{
            return{...state, auditorsId:[]}
        }
        default:{
            return state
        }
    }
}

export default step2Reducer