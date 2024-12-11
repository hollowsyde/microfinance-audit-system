import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuditDataService from '../../../../src/app/services/AuditDataService';
import {CreateUploadModal} from "../../../../src/app/partials";

jest.mock('../../../../src/app/services/AuditDataService', () => ({
    saveAuditData: jest.fn().mockImplementationOnce((): Promise<void> => Promise.resolve()),
}));

describe('CreateUploadModal', () => {
    test('submit with valid input should call saveAuditData', async () => {
        const handleClose = jest.fn();
        const show = true;

        render(<CreateUploadModal show={show} handleClose={handleClose} />);

        const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
        const fileList = [file];
        const inputFile = screen.getByTestId('input-file');
        userEvent.upload(inputFile, fileList);

        const submitButton = screen.getByText(/Tambah Data/);
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(AuditDataService.saveAuditData).toHaveBeenCalled();
        });
    });

    test('submit with error should set hasErrorSubmit', async () => {
        const handleClose = jest.fn();
        const show = true;
        (AuditDataService.saveAuditData as any).mockImplementationOnce(() => {
            throw new Error('Error message');
        });

        render(<CreateUploadModal show={show} handleClose={handleClose} />);

        const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
        const fileList = [file];
        const inputFile = screen.getByTestId('input-file');
        userEvent.upload(inputFile, fileList);

        const submitButton = screen.getByText(/Tambah Data/);
        userEvent.click(submitButton);

        const errorMessage = await screen.findByText(/Upload file gagal/);
        expect(errorMessage).toBeInTheDocument();
    });
});
