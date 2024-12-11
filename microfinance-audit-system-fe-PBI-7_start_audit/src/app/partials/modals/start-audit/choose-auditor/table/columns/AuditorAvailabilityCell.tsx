import {FC} from 'react'

type Props = {
  on_audit: boolean
}

const AuditorAvailabilityCell: FC<Props> = ({on_audit}) => (
  <> {!on_audit && <div className='badge badge-light-success fw-bold'>Tersedia</div>}</>
)

export {AuditorAvailabilityCell}
