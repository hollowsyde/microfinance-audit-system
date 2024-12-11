import {FC, useMemo} from 'react';

import {useListView} from '../../core/ListViewProvider';
import {ID} from '../../../../../../../_metronic/helpers';

import {dispatchAddId, dispatchRemoveId} from '../../../../../../../redux/actions/actionDispatcher';

type Props = {
  id: ID,
  on_audit: boolean
}

const AuditorSelectionCell: FC<Props> = ({id, on_audit}) => {
  const {selected, onSelect} = useListView()
  const isSelected = useMemo(() => selected.includes(id), [id, selected])
  return (
    <div className='form-check form-check-sm form-check-custom form-check-solid'>
      <input
        className='form-check-input'
        type='checkbox'
        disabled={on_audit}
        defaultChecked={isSelected}
        onChange={(e) => {
          if(e.target.checked){
            dispatchAddId(id);
            onSelect(id);
          }else{
            dispatchRemoveId(id);
            onSelect(id)
          }
        }}
      />
    </div>
  )
}

export {AuditorSelectionCell}
