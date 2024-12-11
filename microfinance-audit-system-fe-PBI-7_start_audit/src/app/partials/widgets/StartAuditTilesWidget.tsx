/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {StartAuditModal} from '../modals/start-audit/StartAuditModal'
import {useState} from "react"


type Props = {
  className?: string
}
const StartAuditTilesWidget = ({className}: Props) => {

  const [showStartAuditModal, setShowStartAuditModal] = useState<boolean>(false);

  return (
    <div className={clsx('card', className)}>

      <img className="card-img-top" src={toAbsoluteUrl('/media/stock/600x600/img-38.jpg')} alt="Microfinance Audit System - Start Audit"></img>
      <div className='card-body d-flex align-items-center justify-content-center flex-wrap'>
      
        <button type='button' className='btn btn-secondary btn-block fw-semibold w-100' onClick={() => setShowStartAuditModal(true)}>
          Start Audit
        </button>

      </div>

      <StartAuditModal data-testid='startauditmodal' show={showStartAuditModal} handleClose={() => setShowStartAuditModal(false)} />

    </div>
  )
}

export {StartAuditTilesWidget}
