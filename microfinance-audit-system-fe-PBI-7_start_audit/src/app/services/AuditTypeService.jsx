import axios from "axios";
import { BE_API_URL } from './config'

const API_URL = BE_API_URL('');

class AuditTypeService {
    async getAllTypes() {
        try {
            const response = await axios.get(API_URL + "audit/get-all-audit-types/")
            return response.data
        } catch (error) {
            throw new Error('Failed to fetch audit types');
        }
    }
}

export default new AuditTypeService();
