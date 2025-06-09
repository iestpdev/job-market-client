import { useMemo } from "react";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import './CandidaciesTable.css';
import { MdOutlineDescription } from "react-icons/md";

export default function CandidaciesTable({ candidacies, onSelectStudent }) {
    const columns = useMemo(
        () => [
            { accessorKey: "APELLIDOS", header: "Apellidos", enableColumnFilter: true, },
            { accessorKey: "NOMBRES", header: "Nombres", enableColumnFilter: true, },
            { accessorKey: "TITULO", header: "Oferta", enableColumnFilter: true, },
            {
                accessorKey: "ESTADO_RESPUESTA",
                header: "Estado",
                cell: ({ getValue }) => {
                    const estado = getValue();
                    const colorClass = (estado) === "APPROVED" ? "green" : (estado) === "REJECTED" ? "red" : "gray";
                    return <span className={`status-badge ${colorClass}`}>{
                        (estado) === "APPROVED" ? "APROBADO" : (estado) === "REJECTED" ? "RECHAZADO" : "PENDIENTE"
                    }</span>;
                },
                enableColumnFilter: false
            },
            {
                id: "details",
                header: "Detalles",
                cell: ({ row }) => (
                    <button
                        onClick={() => onSelectStudent(row.original.ALUMNO_ID, row.original.ID)}
                        className="details-button"
                    >
                        <MdOutlineDescription />
                    </button>
                ),
            }
        ],
        [onSelectStudent]
    );

    const table = useGenericTable({ columns, data: candidacies });

    return (
        <div className="candidacies-table-container">
            <GenericTable table={table} />
        </div>
    );
}
