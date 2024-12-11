/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

type Props = {
  className?: string
}
const ConfigurationTilesWidget = ({className}: Props) => {
  return (
    <div className={clsx('card', className)}>
      <img className="card-img-top" src={toAbsoluteUrl('/media/stock/600x600/img-80.jpg')} alt="Microfinance Audit System - Start Audit"></img>
      <div className='card-body d-flex align-items-center justify-content-center flex-wrap'>
      
        <a
        href='#'
        className='btn btn-secondary btn-block fw-semibold w-100'
        >
        Konfigurasi
        </a>

      </div>
    </div>
  )
}

export {ConfigurationTilesWidget}
