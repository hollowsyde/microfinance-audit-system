import {UploadDataPage} from "../../../src/app/pages/UploadDataPage";
import {render} from '@testing-library/react';
import React from "react";

describe('Upload Data Page test suite', () => {

    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        render( <>
            <UploadDataPage />,
            container
        </>
        );
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    });

    test('Renders correctly upload data page', () => {
        const widget = document.querySelector('div.upload-page');
        expect(widget).toBeInTheDocument();
    });

});