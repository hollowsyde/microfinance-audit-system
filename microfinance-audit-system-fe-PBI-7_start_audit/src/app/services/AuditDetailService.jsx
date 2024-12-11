import axios from "axios";
import { BE_API_URL } from './config'

const API_URL = BE_API_URL('');

class AuditDetailService {
    async getCategory(id) {
        try {
            const response = await axios.get(API_URL + "audit/audit-categories-by-session/" + id);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch category data');
        }
    }
}

export default new AuditDetailService();