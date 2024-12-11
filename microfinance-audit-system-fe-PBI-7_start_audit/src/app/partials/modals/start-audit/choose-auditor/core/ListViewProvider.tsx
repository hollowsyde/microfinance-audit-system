import {createContext, useContext} from 'react'
import {
  initialListView,
  ListViewContextProps,
} from '../../../../../../_metronic/helpers'

const ListViewContext = createContext<ListViewContextProps>(initialListView)

const useListView = () => useContext(ListViewContext)

export {useListView}
