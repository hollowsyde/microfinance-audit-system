/* eslint-disable jsx-a11y/anchor-is-valid */
import {CreateUploadModal} from "..";
import {useState} from "react";

const UploadWidget = () => {
    const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);

    return (
        <div className='row'>
            <div className='col-3'></div>
            <div className='col-6'>
                <div className='d-flex flex-column justify-content-between text-center'>
                    <div className='m-0'>
                        <a
                            href='src/_metronic/partials#'
                            className='btn btn-danger fw-semibold px-6 py-3'
                            data-bs-toggle='modal'
                            data-bs-target='#kt_modal_create_app'
                            onClick={() => setShowCreateAppModal(true)}
                            data-testid='button-modal'
                        >
                            Unggah Data
                        </a>
                    </div>
                </div>
                <CreateUploadModal data-testid='modal' show={showCreateAppModal}
                                   handleClose={() => setShowCreateAppModal(false)} />
            </div>
        </div>
    );
};

export {UploadWidget};
