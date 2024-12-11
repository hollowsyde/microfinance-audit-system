import { ID } from "../../_metronic/helpers"
import { ActionType } from "./actionType"

interface Step2AddAction{
    type: ActionType.ADD_AUDITORS_ID,
    payload: ID
}

interface Step2RemoveAction{
    type: ActionType.REMOVE_AUDITORS_ID,
    payload: ID
}

interface Step2RemoveAllAction{
    type: ActionType.REMOVE_ALL_AUDITORS_ID,
}

type Step2Action = Step2AddAction | Step2RemoveAction | Step2RemoveAllAction

export type {Step2Action}