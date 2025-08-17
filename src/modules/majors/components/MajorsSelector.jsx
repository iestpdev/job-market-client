import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useActivatedMajors } from "../hooks/useMajors";
import { useMajorsByOfferId } from "../hooks/useMajorsByOfferId";
import { useAssignMajorsToOffer } from "../hooks/useAssignMajorsToOffer";

const MajorsSelector = ({ offerId, onClose }) => {
    const { data: majors = [] } = useActivatedMajors();
    const { data: assignedMajors = [] } = useMajorsByOfferId(offerId);
    const { mutate: assignMajors, isLoading } = useAssignMajorsToOffer();
    const [selectedMajors, setSelectedMajors] = useState([]);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (assignedMajors.length > 0) {
            setSelectedMajors(assignedMajors.map((m) => m.PROGRAMA_ESTUDIO_ID));
        }
    }, [assignedMajors]);

    const toggleMajor = (id) => {
        setSelectedMajors((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        );
    };

    const handleSave = () => {
        assignMajors(
            { offerId, programIds: selectedMajors },
            {
                onSuccess: () => {
                    // refresca chips/tags en OfferDetails
                    queryClient.invalidateQueries({ queryKey: ["majorsByOfferId", offerId] });
                    // cierra el modal
                    onClose?.();
                },
            }
        );
    };

    return (
        <div className="w-full my-4">
            <div className="flex flex-wrap gap-2">
                {majors.map((major) => (
                    <button
                        key={major.ID}
                        type="button"
                        onClick={() => toggleMajor(major.ID)}
                        className={`px-3 py-2 rounded-lg border text-sm transition 
            ${selectedMajors.includes(major.ID)
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                            }`}
                    >
                        {major.NOMBRE}
                    </button>
                ))}
            </div>
            <button
                type="button"
                disabled={isLoading}
                onClick={handleSave}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
                {isLoading ? "Guardando..." : "Guardar"}
            </button>
        </div>
    );
};

export default MajorsSelector;
