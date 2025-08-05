import React from "react";
import { useMajorsByOfferId } from "../hooks/useMajorsByOfferId";

const MajorsTags = ({ offerId }) => {
    const { data: majors = [], isLoading, isError } = useMajorsByOfferId(offerId);

    if (isLoading) return <p className="text-sm text-gray-500">Cargando programas...</p>;
    if (isError) return <p className="text-sm text-red-500">Error al cargar los programas de estudio</p>;
    if (majors.length === 0) return <p className="text-sm text-gray-400">Sin programas asignados</p>;

    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {majors.map((major) => (
                <span
                    key={major.PROGRAMA_ESTUDIO_ID}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full border border-blue-300"
                >
                    {major.NOMBRE}
                </span>
            ))}
        </div>
    );
};

export default MajorsTags;
