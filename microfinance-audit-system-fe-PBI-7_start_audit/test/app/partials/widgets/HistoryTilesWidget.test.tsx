import React from "react";
import {render, cleanup} from '@testing-library/react';
import {AuditHistoryTilesWidget} from "../../../../src/app/partials";

describe('Configuration Tiles Widget test suite', () => {

    afterEach(() => {
        cleanup()
    })

    const configTilesWidget = render(<AuditHistoryTilesWidget className='card-xl-stretch' />)

    test('render Histori Audit button', () => {

        const configButton = configTilesWidget.getByText("Histori Audit")
        expect(configButton).toBeTruthy

    })

})
