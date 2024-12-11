/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import { IUser } from '../../../IAuditModels'

type Props = {
  user: IUser
}

const AuditorInfoCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column fw-bold'>
      <p>
        {user.first_name}
        {' '}
        {user.last_name}
      </p>
      <p>
        {'Username: '}{user.username}
      </p>
      <span>{'Email: '}{user.email}</span>
    </div>
  </div>
)

export {AuditorInfoCell}
