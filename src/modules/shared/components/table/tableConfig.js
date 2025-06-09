import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    getFilteredRowModel
} from '@tanstack/react-table';

export const useGenericTable = ({ columns, data }) => {
    return useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: '', 
        },
    });
};

export const renderCell = (cell) => flexRender(cell.column.columnDef.cell, cell.getContext());
