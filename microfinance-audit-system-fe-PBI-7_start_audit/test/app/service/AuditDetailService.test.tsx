import AuditDetailService from '../../../src/app/services/AuditDetailService';
import axios from "axios";

jest.mock('axios');

describe('AuditDetailService', () => {
    test('should render category data', async () => {
        const mockResponse = { data: [
                {
                    "id": 57,
                    "title": "Some Audit Category",
                    "audit_type": 145
                },
                {
                    "id": 58,
                    "title": "Some Audit Category 2",
                    "audit_type": 145
                }
            ]};
        (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await AuditDetailService.getCategory(1);

        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/audit/audit-categories-by-session/1');
        expect(result).toEqual(mockResponse.data);
    });

    test('should throw an error if fetching category data fails', async () => {
        const errorMessage = 'Failed to fetch category data';
        (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

        await expect(AuditDetailService.getCategory(1)).rejects.toThrow(errorMessage);
    });
});