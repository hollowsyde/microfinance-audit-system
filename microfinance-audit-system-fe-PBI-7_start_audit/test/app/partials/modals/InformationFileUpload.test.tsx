import React from "react";
import {fireEvent, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import {BeforeAfterTesting} from "../BeforeAfterTesting";

describe('Upload Data Modal test suite', () => {

    BeforeAfterTesting()

    test("renders info convert file to zip", () => {
        const button = screen.getByText(/Unggah Data/i);
        fireEvent.click(button);

        const info = screen.queryByText(/File yang disimpan akan diestrak ke dalam zip/i)
        expect(info).toBeInTheDocument();
    });

    test("renders file name when upload file", () => {
        const button = screen.getByText(/Unggah Data/i);
        fireEvent.click(button);

        const input = screen.getByTestId('input-file');
        const file = new File(['(⌐□_□)'], 'chucknorris.png',
            {type: 'image/png', });

        user.upload(input, file);

        const info = screen.queryByText(/File yang telah di pilih/i)
        expect(info).toBeInTheDocument();

        const file_name = screen.queryByText(/chucknorris.png/i)
        expect(file_name).toBeInTheDocument();
    });

});