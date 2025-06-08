import { useMutation } from "@tanstack/react-query";
import { deleteById } from "../api/offers";

const useOfferDelete = (onSuccess) => {
    return useMutation({
        mutationFn: deleteById,
        onSuccess,
        onError: (err) => {
            console.error("Error al eliminar oferta:", err);
            alert("No se pudo eliminar la oferta.");
        }
    });
};

export default useOfferDelete;
