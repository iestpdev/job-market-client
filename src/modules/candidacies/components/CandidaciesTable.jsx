import { useMemo } from "react";
import { useGenericTable, renderCell } from "../../shared/components/table/tableConfig";
import { flexRender } from '@tanstack/react-table';
import useCandidaciesByCompany from "../hooks/useCandidaciesByCompany";

export default function CandidaciesTable({ onSelectStudent }) {
    const { candidacies, loading, error } = useCandidaciesByCompany();

    const columns = useMemo(
        () => [
            { accessorKey: "APELLIDOS", header: "Apellidos" },
            { accessorKey: "NOMBRES", header: "Nombres" },
            { accessorKey: "TITULO", header: "Título de Oferta" },
            {
                accessorKey: "DOC_ADJUNTO1",
                header: "CV",
                cell: ({ getValue }) => (
                    <a href={getValue()} target="_blank" rel="noopener noreferrer">
                        Ver CV
                    </a>
                ),
            },
            {
                accessorKey: "ESTADO_RESPUESTA",
                header: "Estado",
                cell: ({ getValue }) => {
                    const estado = getValue();
                    const color =
                        estado === "APPROVED" ? "green" : estado === "REJECTED" ? "red" : "gray";
                    return <span style={{ color }}>{estado}</span>;
                },
            },
            {
                id: "ver_mas",
                header: "Ver Más",
                cell: ({ row }) => (
                    <button
                        onClick={() => onSelectStudent(row.original.ALUMNO_ID)}
                        style={{ cursor: "pointer", background: "none", border: "none", color: "blue" }}
                    >
                        Ver más
                    </button>
                ),
            },
        ],
        [onSelectStudent]
    );

    const table = useGenericTable({ columns, data: candidacies });

    if (loading) return <p>Cargando postulantes...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
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
        </div>
    );
}

