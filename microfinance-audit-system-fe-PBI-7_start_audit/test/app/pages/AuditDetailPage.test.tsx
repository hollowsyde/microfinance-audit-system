import {act, render, screen} from '@testing-library/react';
import {AuditDetailPage} from "../../../src/app/pages/AuditDetailPage";
import AuditDetailService from '../../../src/app/services/AuditDetailService';

jest.mock('../../../src/app/services/AuditDetailService');
describe('Upload Data Page test suite', () => {

    test('Renders correctly audit detail page', () => {
        render(<AuditDetailPage />);
        const title = screen.queryByText(/Audit Detail/i);
        expect(title).toBeInTheDocument();
    });

    test('should render category data', async () => {
        (AuditDetailService.getCategory as jest.MockedFunction<typeof AuditDetailService.getCategory>)
            .mockResolvedValueOnce([
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
        ]);

        await act(async () => {
            render(<AuditDetailPage />);
        });

        const categoryElements = await screen.findAllByText(/Category/i);

        expect(categoryElements).toHaveLength(2);
    });

    test('should handle error', async () => {
        (AuditDetailService.getCategory as jest.MockedFunction<typeof AuditDetailService.getCategory>)
            .mockRejectedValueOnce(new Error('Failed to fetch category data'));

        await act(async () => {
            render(<AuditDetailPage />);
        });

        const errorElement = await screen.findByText(/Tidak ada data Category/i);

        expect(errorElement).toBeInTheDocument();
    });

});