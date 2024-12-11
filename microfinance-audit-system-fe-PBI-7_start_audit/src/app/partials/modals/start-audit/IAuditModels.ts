import {ID, Response} from "../../../../_metronic/helpers";

export interface IUser {
    id: ID
    username: string
    email: string
    first_name: string
    last_name: string
    onAudit: boolean
}

export interface IAuditor {
    id: ID
    user: IUser
    onAudit: boolean
    session: IAuditSession
}

export interface IAuditorTeam {
    member: IAuditor[]
}

export interface IAuditSession {
    auditTypeId: number
    auditorTeam: IAuditorTeam
}

export const defaultAuditData: IAuditSession = {
    auditTypeId: 0,
    auditorTeam: {member: []}
}

export type StepProps = {
    data: IAuditSession
    updateData: (fieldsToUpdate: Partial<IAuditSession>) => void
}

export type AuditorsQueryResponse = Response<Array<IAuditor>>