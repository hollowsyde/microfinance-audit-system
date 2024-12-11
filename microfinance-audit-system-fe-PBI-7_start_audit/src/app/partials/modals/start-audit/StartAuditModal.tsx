import {useState, useRef} from 'react';
import {createPortal} from 'react-dom';
import {useNavigate} from "react-router-dom";
import {Modal} from 'react-bootstrap';

import {KTSVG} from '../../../../_metronic/helpers';
import {StepperComponent} from '../../../../_metronic/assets/ts/components';
import {Step1} from './steps/Step1';
import {Step2} from './steps/Step2';

import {useSelector, useDispatch} from 'react-redux';
import {rootState} from '../../../../redux/reducers/rootReducer';
import {Step2State} from '../../../../redux/reducers/startAuditStep2Reducer';
import {dispatchRemoveAllId} from '../../../../redux/actions/actionDispatcher';

import {defaultAuditData, IAuditSession} from './IAuditModels';

import StartAuditService from '../../../../app/services/StartAuditService';

type Props = {
  show: boolean
  handleClose: () => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

const StartAuditModal = ({show, handleClose}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [data, setData] = useState<IAuditSession>(defaultAuditData)
  const ids = useSelector<rootState, Step2State["auditorsId"]>((state) => state.step2.auditorsId)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const removeAllId = () => {
    dispatch(dispatchRemoveAllId())
  }

  const closeModal = () => {
    removeAllId()
    handleClose()
  }

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const updateData = (fieldsToUpdate: Partial<IAuditSession>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()
  }

  const nextStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goNext()
  }

  const submit = async () => {
    await StartAuditService.startAuditSession(data.auditTypeId, ids).then(
      (response: any) => {
        const message = response.data.message;
        window.alert(message);
        navigate('/audit-detail/' + response.data.new_session_id);
      }, 
      (error) => {
        window.alert(error);
      })
  }

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={closeModal}
      onEntered={loadStepper}
    >
      <div className='modal-header'>
        <h2>Start Audit</h2>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={closeModal}>
          <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        {/*begin::Stepper */}
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          {/* begin::Aside*/}
          <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
            {/* begin::Nav*/}
            <div className='stepper-nav ps-lg-10'>
              {/* begin::Step 1*/}
              <div className='stepper-item current' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>1</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Tipe Audit</h3>

                    <div className='stepper-desc'>Pilih tipe audit</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 1*/}

              {/* begin::Step 2*/}
              <div className='stepper-item mb-5' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>2</span>
                  </div>
                  {/* begin::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Anggota Tim Auditor</h3>

                    <div className='stepper-desc'>Pilih anggota dari tim auditor</div>
                  </div>
                  {/* begin::Label*/}
                </div>
                {/* end::Wrapper*/}

              </div>
              {/* end::Step 2*/}

            </div>
            {/* end::Nav*/}
          </div>
          {/* begin::Aside*/}

          {/*begin::Content */}
          <div className='flex-row-fluid py-lg-0 px-lg-15'>
            {/*begin::Form */}
            <form noValidate id='kt_modal_create_app_form'>
              <Step1 data={data} updateData={updateData} />
              <Step2 />

              {/*begin::Actions */}
              <div className='d-flex flex-row-reverse pt-10'>
                <button
                  type='button'
                  className='btn btn-lg btn-primary'
                  data-kt-stepper-action='submit'
                  onClick={submit}
                >
                  Start Audit{' '}
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr064.svg'
                    className='svg-icon-3 ms-0 me-0'
                  />
                </button>
                <button
                  type='button'
                  className='btn btn-lg btn-light-primary me-auto'
                  data-kt-stepper-action='previous'
                  onClick={prevStep}
                >
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr063.svg'
                    className='svg-icon-3 me-1'
                  />{' '}
                  Langkah Sebelumnya
                </button>
                <button
                  type='button'
                  className='btn btn-lg btn-light-primary'
                  data-kt-stepper-action='next'
                  onClick={nextStep}
                >
                  Langkah Selanjutnya{' '}
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr064.svg'
                    className='svg-icon-3 ms-1 me-0'
                  />
                </button>
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
  )
}

export {StartAuditModal}
