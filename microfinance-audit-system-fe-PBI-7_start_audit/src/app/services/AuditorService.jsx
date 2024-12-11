import axios from "axios";
import { BE_API_URL } from './config'

const API_URL = BE_API_URL('');

class AuditorService {
    async getAllAuditors() {
        try {
            const response = await axios.get(API_URL + "audit/get-all-auditors/");
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch auditors data');
        }
    }
}

export default new AuditorService();