import axios from "axios";
import { BE_API_URL } from './config'

const API_URL = BE_API_URL('');

class StartAuditService {
    async startAuditSession(typeId, auditorIds) {
        try{
            const formData = new FormData();
            formData.append("auditor_ids", auditorIds);
    
            const response = await axios.post(API_URL + "audit/create-new-audit-session/" + typeId, formData)
            return response
        } catch (error) {
            return error
        }
    }
}

export default new StartAuditService();