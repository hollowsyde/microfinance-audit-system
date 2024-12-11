import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import {BeforeAfterTesting} from "../BeforeAfterTesting";
import {CreateUploadModal} from "../../../../src/app/partials";

describe('Upload Data Page test suite', () => {

    BeforeAfterTesting()

    test('renders upload button', () => {
        const uploadButton = screen.getByTestId('button-modal');
        expect(uploadButton).toBeInTheDocument();
    });

    test('opens modal when upload button is clicked', async () => {
        const button = screen.getByText(/Unggah Data/i);
        expect(screen.queryByText(/Upload File disini/i)).not.toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.queryByText(/Upload File disini/i)).toBeInTheDocument();
    });

    test('closes modal when close button is clicked', async () => {
        const button = screen.getByText(/Unggah Data/i);
        expect(screen.queryByText(/Upload File disini/i)).not.toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.queryByText(/Upload File disini/i)).toBeInTheDocument();
        expect(screen.queryByText(/X/i)).toBeInTheDocument();

        const button_close = screen.getByText(/X/i);
        fireEvent.click(button_close);
        expect(button).toBeInTheDocument();
    });

    test('handleClose is clicked', async () => {
        const showCreateAppModal = jest.fn()
        const setShowCreateAppModalMock = jest.fn();
        render(<CreateUploadModal data-testid='modal' show={showCreateAppModal}
                                  handleClose={() => setShowCreateAppModalMock(false)} />);

        expect(screen.queryByText(/Upload File disini/i)).toBeInTheDocument();
        expect(screen.queryByText(/X/i)).toBeInTheDocument();

        const button_close = screen.getByText(/X/i);
        fireEvent.click(button_close);
        expect(setShowCreateAppModalMock).toBeCalledTimes(1);
    });

});