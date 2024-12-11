import React from "react";
import {render, cleanup} from '@testing-library/react';
import {ConfigurationTilesWidget} from "../../../../src/app/partials";

describe('Configuration Tiles Widget test suite', () => {

    afterEach(() => {
        cleanup()
    })

    const configTilesWidget = render(<ConfigurationTilesWidget className='card-xl-stretch' />)

    test('render Konfigurasi button', () => {

        const configButton = configTilesWidget.getByText("Konfigurasi")
        expect(configButton).toBeTruthy

    })

})
