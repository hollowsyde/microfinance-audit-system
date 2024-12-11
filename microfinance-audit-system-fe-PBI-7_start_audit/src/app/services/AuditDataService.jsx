import axios from "axios";
import { BE_API_URL } from './config'

const API_URL = BE_API_URL('');

class AuditDataService {
    saveAuditData(id, data) {

        data.generateAsync({ type: "blob" }).then((zipBlob) => {
            const formData = new FormData();
            formData.append("id_audit", id)
            formData.append("file", zipBlob, "myZipFile.zip");

            const headers = {
                "Content-Type": "multipart/form-data",
            };

            axios
                .post(API_URL + "audit/upload-data", formData, headers);
        });
    }
}

export default new AuditDataService();