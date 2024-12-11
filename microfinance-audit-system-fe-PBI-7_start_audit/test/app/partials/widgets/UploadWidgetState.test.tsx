import React, {useState} from "react";
import {fireEvent, render} from '@testing-library/react';
import {UploadWidget} from "../../../../src/app/partials";

describe('Upload Data Page test suite', () => {

    let container: HTMLElement;

    test('useState setState is called', () => {

        const setStateMock = jest.fn();
        const useStateMock: any = (useState :any) => [useState, setStateMock];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);

        const uploadWidget = render(<UploadWidget />);
        container = uploadWidget.getByText(/Unggah Data/i);

        expect(container).toBeTruthy();

        fireEvent.click(container);
        expect(setStateMock).toHaveBeenCalledWith(true);
    })

});