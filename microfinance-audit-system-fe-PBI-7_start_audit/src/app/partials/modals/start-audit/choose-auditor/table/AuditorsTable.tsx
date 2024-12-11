import {useTable, useSortBy, usePagination} from 'react-table';
import {KTCardBody} from '../../../../../../_metronic/helpers';

const AuditorsTable = ({columns, data}: any) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
  )

  return (
    <KTCardBody>

      <div className='d-flex flex-row-reverse mb-1'>
        <p className='m-3'>
          per Halaman
        </p>
        <select 
          className='form-select-sm align-self-center'
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <p className='m-3'>
          Tampilkan
        </p>
      </div>

      <div className='table-responsive'>
        <table className='table table-bordered table-hover align-middle fs-6 gy-5' {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr className='text-start text-muted fw-bold fs-7 text-uppercase gs-0' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting. For this example
                    // we can add them into the header props
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='text-gray-600 fw-semibold' {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className='d-flex justify-content-center my-3'>
          <div className="btn-group btn-group-sm mx-3" role="group" aria-label="Small button group">
            <button type="button" className="btn btn-primary btn-sm" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>
          </div>
        </div>

        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">Pergi ke Halaman</span>
          </div>

          <input type="number" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }} />

          <div className='input-group-append'>
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Halaman:
              <strong className='ms-1'>
                {pageIndex + 1} dari {pageOptions.length}
              </strong>
            </span>
          </div>
          
        </div>

      </div>
    </KTCardBody>
  )
}

export {AuditorsTable}
