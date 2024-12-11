import { ActionType } from "./actionType"

interface SessionAction{
    type: ActionType.SESSION,
    payload: number
}

type Action = SessionAction

export type {Action}