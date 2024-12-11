import React from "react";
import {fireEvent, screen} from '@testing-library/react';
import {BeforeAfterTesting} from "../BeforeAfterTesting";

describe('Upload Data Modal test suite', () => {

    BeforeAfterTesting()

    test("submit form without file", () => {
        const button = screen.getByText(/Unggah Data/i);
        fireEvent.click(button);

        const submit = screen.getByText(/Tambah Data/i);
        expect(submit).toBeTruthy();

        fireEvent.click(submit);

        const info = screen.queryByText("File Audit dibutuhkan");
        expect(info).toBeInTheDocument();
    });

});