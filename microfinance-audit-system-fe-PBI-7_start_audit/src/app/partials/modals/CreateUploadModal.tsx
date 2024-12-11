/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react';
import {createPortal} from 'react-dom';
import {Modal} from 'react-bootstrap';
import {KTSVG} from '../../../_metronic/helpers';
import AuditDataService from "../../../app/services/AuditDataService";
import {useParams} from "react-router-dom";

type Props = {
    show: any,
    handleClose: any
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const CreateUploadModal = ({show, handleClose}: Props) => {
    const [fileList, setFileList] = useState<FileList | null>();
    const files = fileList ? [...fileList] : [];
    const [hasErrorFile, setHasErrorFile] = useState(false);
    const [hasErrorSubmit, setHasErrorSubmit] = useState(false);
    const { id } = useParams();

    const updateFileList = (e: any) => {
        setFileList(e.target.files)
    }

    const submit = async () => {
        setHasErrorFile(false);

        if (files.length === 0) {
            setHasErrorFile(true);
            return;
        }
        const zip = require('jszip')();
        files.forEach((file) => {
            zip.file(file.name, file);
        });

        try {
            await AuditDataService.saveAuditData(id, zip)
            window.alert("Data Audit berhasil disimpan");
            window.location.reload();
        } catch (e) {
            setHasErrorSubmit(true)
        }
    }

    return createPortal(
        <Modal
            id='kt_modal_create_app modal-div'
            data-testid='modal'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-900px'
            show={show}
        >
            <div className='modal-header'>
                <h2>Upload File disini</h2>
                {/* begin::Close */}
                <button
                   className='btn btn-sm btn-icon btn-active-color-primary'
                   data-bs-dismiss="modal"
                   onClick={handleClose}>X
                </button>
                {/* end::Close */}
            </div>

            <div className='modal-body py-lg-10 px-lg-10'>
                {hasErrorSubmit &&
                    <div className="alert alert-danger text-center" role="alert">
                        Upload file gagal
                    </div>
                }
                {hasErrorFile && (
                    <div className="alert alert-danger text-center" role="alert">
                        File Audit dibutuhkan
                    </div>
                )}
                {/*begin::Stepper */}
                <div
                    className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
                    id='kt_modal_create_app_stepper'
                >

                    {/*begin::Content */}
                    <div className='flex-row-fluid py-lg-5 px-lg-15'>
                        {/*begin::Form */}
                        <form noValidate id='kt_modal_create_app_form'>
                            <div className='current' data-kt-stepper-element='content'>
                                <div className='w-100'>
                                    {/*begin::Form Group */}
                                    <div className='fv-row mb-10'>
                                        <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                                            <span className='required'>File</span>
                                            <i
                                                className='fas fa-exclamation-circle ms-2 fs-7'
                                                data-bs-toggle='tooltip'
                                                title='Upload your document'
                                            ></i>
                                        </label>
                                        <p>File yang disimpan akan diestrak ke dalam zip</p>
                                        <input
                                            data-testid='input-file'
                                            type='file'
                                            className='form-control form-control-lg form-control-solid'
                                            name='appname'
                                            placeholder=''
                                            onChange={updateFileList}
                                            accept=".xlsx"
                                            multiple
                                        />
                                        {files.length !== 0 && <p className='mb-0'>File yang telah di pilih:</p>}
                                        {files.map((file) => {
                                            return <p key={file.name} className='mb-0'>- {file.name}</p>
                                        })}
                                    </div>
                                    {/*end::Form Group */}

                                </div>
                            </div>

                            {/*begin::Actions */}
                            <div className='d-flex flex-stack pt-10'>
                                <div className='me-2'>
                                </div>
                                <div>
                                    <button
                                        type='button'
                                        className='btn btn-lg btn-primary'
                                        data-kt-stepper-action='submit next'
                                        onClick={submit}
                                    >
                                        Tambah Data{' '}
                                        <KTSVG
                                            path='/media/icons/duotune/arrows/arr064.svg'
                                            className='svg-icon-3 ms-2 me-0'
                                        />
                                    </button>
                                </div>
                            </div>
                            {/*end::Actions */}
                        </form>
                        {/*end::Form */}
                    </div>
                    {/*end::Content */}
                </div>
                {/* end::Stepper */}
            </div>
        </Modal>,
        modalsRoot
    );
};

export {CreateUploadModal};
