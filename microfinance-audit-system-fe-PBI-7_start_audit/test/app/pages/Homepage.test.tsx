import {Homepage} from "../../../src/app/pages/Homepage";
import {render, screen, cleanup} from '@testing-library/react';
import React from "react";

describe('Homepage test suite', () => {

    afterEach(() => {
        cleanup()
    })

    const {container} = render(<Homepage />)

    test('render Start Audit Navigation Widget', () => {
        expect(container.getElementsByClassName('audit-card-xl-stretch')).toBeTruthy
    })

    test('render Konfigurasi Navigation Widget', () => {
        expect(container.getElementsByClassName('config-card-xl-stretch')).toBeTruthy
    })

    test('render Histori Audit Navigation Widget', () => {
        expect(container.getElementsByClassName('history-card-xl-stretch')).toBeTruthy
    })

})
