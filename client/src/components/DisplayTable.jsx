/* eslint-disable react/prop-types */

// why use this DisplayTable component because we want to display the data in table format 
// And we creare a separate component for this because we want to reuse this component in other places

import {
  //createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const DisplayTable = ({ data, column }) => {

  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  })


  return (
    <>
      <div className="lg:p-2">
        <table className="w-full p-0 border-collapse">
          <thead className='bg-black text-white'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                <th className=' lg:p-2 lg:text-2xl text-uppercase border-white border-4 lg:border-8 whitespace-nowrap'>Sr.No</th>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className=' lg:p-2 lg:text-2xl text-uppercase border-white border-4 lg:border-8 whitespace-nowrap'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='bg-fuchsia-50'>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className=''>
                <td className=' lg:p-0 lg:text-lg lg:text-center text-left lg:border-4 border-2 border-gray-300 whitespace-nowrap'>
                  {index + 1}
                </td>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className=' lg:p-0 lg:text-lg lg:text-center text-left lg:border-4 border-2 border-gray-300 whitespace-nowrap'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-4" />
      </div>
    </>
  )
}

export default DisplayTable