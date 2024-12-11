import axios from "axios";
import AuditDataService from "../../../src/app/services/AuditDataService";

jest.mock("axios");

describe("AuditDataService", () => {
    describe("saveAuditData", () => {
        it("should call axios.post with the correct arguments", async () => {
            const zipBlob = new Blob([], { type: "application/zip" });
            const data = { generateAsync: jest.fn(() => Promise.resolve(zipBlob)) };

            await AuditDataService.saveAuditData("1", data);

            const formData = new FormData();
            formData.append("id_audit", "1");
            formData.append("file", zipBlob, "myZipFile.zip");

            const headers = {
                "Content-Type": "multipart/form-data",
            };

            expect(axios.post).toHaveBeenCalledWith(
                "http://localhost:8000/audit/upload-data",
                formData,
                headers
            );
        });
    });
});