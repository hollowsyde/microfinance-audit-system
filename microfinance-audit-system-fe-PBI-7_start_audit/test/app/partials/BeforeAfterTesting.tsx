import {render} from "@testing-library/react";
import {UploadWidget} from "../../../src/app/partials";
import React from "react";

const BeforeAfterTesting = () => {
    let root: HTMLDivElement;
    let container: HTMLDivElement;

    beforeEach(() => {
        root = document.createElement('div');
        root.id = 'root';
        container = document.createElement('div');
        container.id = 'modal-div';
        document.body.appendChild(root);
        document.body.appendChild(container);
        render(<UploadWidget />, { container: root });
    });

    afterEach(() => {
        document.body.removeChild(root);
        document.body.removeChild(container);
    });
}

export {BeforeAfterTesting};
