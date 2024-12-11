import {Column} from 'react-table'
import {AuditorInfoCell} from './AuditorInfoCell'
import {AuditorAvailabilityCell} from './AuditorAvailabilityCell'
import {AuditorSelectionCell} from './AuditorSelectionCell'
import {AuditorCustomHeader} from './AuditorCustomHeader'
import {IAuditor} from '../../../IAuditModels'

const auditorsColumns: ReadonlyArray<Column<IAuditor>> = [
  {
    id: 'selection',
    Cell: ({...props}) => <AuditorSelectionCell id={props.data[props.row.index].id} on_audit={props.data[props.row.index].on_audit} />,
  },
  {
    Header: (props) => <AuditorCustomHeader tableProps={props} title='Auditor' className='min-w-125px' />,
    id: 'user',
    accessor: 'user',
    Cell: ({...props}) => <AuditorInfoCell user={props.data[props.row.index].user} />,
  },
  {
    Header: (props) => <AuditorCustomHeader tableProps={props} title='Ketersediaan' className='min-w-125px' />,
    id: 'on_audit',
    accessor: 'onAudit',
    Cell: ({...props}) => <AuditorAvailabilityCell on_audit={props.data[props.row.index].on_audit} />,
  },
]

export {auditorsColumns}
