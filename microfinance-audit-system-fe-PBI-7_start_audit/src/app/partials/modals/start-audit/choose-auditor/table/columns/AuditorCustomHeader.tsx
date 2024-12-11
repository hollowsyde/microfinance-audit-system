import clsx from 'clsx';

import {FC, PropsWithChildren} from 'react';
import {HeaderProps} from 'react-table';

import {IAuditor} from '../../../IAuditModels';

type Props = {
  className?: string
  title?: string
  tableProps: PropsWithChildren<HeaderProps<IAuditor>>
}
const AuditorCustomHeader: FC<Props> = ({className, title, tableProps}) => {

  return (
    <p
      {...tableProps.column.getHeaderProps()}
      className={clsx(
        className,
      )}
    >
      {title}
    </p>
  )
}

export {AuditorCustomHeader}
