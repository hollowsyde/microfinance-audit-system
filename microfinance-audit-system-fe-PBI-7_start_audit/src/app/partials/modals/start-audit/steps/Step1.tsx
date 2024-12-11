/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from "react";
import {StepProps} from '../IAuditModels';
import AuditTypeService from '../../../../../app/services/AuditTypeService';

import {LoadingIndicator} from "../loading/LoadingIndicator";

const Step1 = ({data, updateData}: StepProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const [dataType, setDataType] = useState([]);

  useEffect(() => {
    const getTypes = async () => {
      setIsLoading(true)
      try {
        const types = await AuditTypeService.getAllTypes();
        setDataType(types);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    getTypes()
  }, [])

  function showTypes() {
    return dataType.map((types:any, index) => {
      return <option key={index} value={types.id as number}>{types.label}</option>;
    });
  }

  return (
    <div className='current' data-kt-stepper-element='content'>
      <div className='w-100'>
        {/*begin::Form Group */}
        {isLoading && <LoadingIndicator />}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Tipe Audit</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Pilih tipe audit'
            ></i>
          </label>
          <select
            className='form-select form-select-lg form-select-solid'
            name='audittype'
            placeholder='Pilih tipe'
            value={data.auditTypeId}
            onChange={(e) =>
              updateData({
                auditTypeId: Number(e.target.value),
                auditorTeam: data.auditorTeam
              })
            }>
              {showTypes()}
          </select>
        </div>
        {/*end::Form Group */}
      </div>
    </div>
  )
}

export {Step1}