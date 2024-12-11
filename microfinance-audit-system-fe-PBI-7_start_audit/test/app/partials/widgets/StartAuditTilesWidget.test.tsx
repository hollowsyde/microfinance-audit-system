import React from "react";
import {render, cleanup} from '@testing-library/react';
import {StartAuditTilesWidget} from "../../../../src/app/partials";

describe('Start Audit Tiles Widget test suite', () => {

    afterEach(() => {
        cleanup()
    })

    const startAuditTilesWidget = render(<StartAuditTilesWidget className='card-xl-stretch' />)

    test('render Start Audit button', () => {

        const startAuditButton = startAuditTilesWidget.getByText("Start Audit")
        expect(startAuditButton).toBeTruthy

    })

})
