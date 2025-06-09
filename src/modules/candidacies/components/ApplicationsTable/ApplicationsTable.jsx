import { useMemo } from "react";
import { useGenericTable } from "../../../shared/components/table/tableConfig";
import GenericTable from "../../../shared/components/table/Table";
import { MdOutlineDescription } from "react-icons/md";
import "./ApplicationsTable.css";

export default function ApplicationsTable({ applications, onSelectOffer }) {
    const columns = useMemo(
        () => [
            { accessorKey: "TITULO", header: "Título", enableColumnFilter: true,},
            { accessorKey: "RAZON_SOCIAL", header: "Razón Social", enableColumnFilter: true, },
            { accessorKey: "RUBRO", header: "Rubro", enableColumnFilter: true, },
            {
                accessorKey: "ESTADO_RESPUESTA",
                header: "Estado",
                cell: ({ getValue }) => {
                    const estado = getValue();
                    const colorClass =
                        estado === "APPROVED" ? "green" : estado === "REJECTED" ? "red" : "gray";
                    const label =
                        estado === "APPROVED" ? "APROBADO" :
                            estado === "REJECTED" ? "RECHAZADO" :
                                "PENDIENTE";

                    return <span className={`status-badge ${colorClass}`}>{label}</span>;
                },
                enableColumnFilter: false,
            },
            {
                id: "details",
                header: "Detalles",
                cell: ({ row }) => (
                    <button
                        onClick={() => onSelectOffer(row.original.OFERTA_ID)}
                        className="details-button"
                    >
                        <MdOutlineDescription />
                    </button>
                )
            }
        ],
        [onSelectOffer]
    );

    const table = useGenericTable({ columns, data: applications });

    return (
        <div className="candidacies-table-container">
            <GenericTable table={table} />
        </div>
    );
}
