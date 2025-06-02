import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';

export const useGenericTable = ({ columns, data }) => {
    return useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
};

export const renderCell = (cell) => flexRender(cell.column.columnDef.cell, cell.getContext());
