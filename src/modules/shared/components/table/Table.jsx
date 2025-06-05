import { flexRender } from '@tanstack/react-table';
import { renderCell } from './tableConfig';
import './Table.css';

const GenericTable = ({ table }) => {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();

    return (
        <div className="table-container">
            <table>
                {/* Generic table */}
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getCanFilter() && (
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Filtrar..."
                                                value={header.column.getFilterValue() ?? ''}
                                                onChange={(e) => header.column.setFilterValue(e.target.value)}
                                                className="filter-input"
                                            />
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{renderCell(cell)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className="pagination-controls">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    ←
                </button>
                <span>
                    Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
                </span>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    →
                </button>

                <select
                    className="page-size-select"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[5, 10, 20, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize} por página
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default GenericTable;
