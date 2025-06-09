import { useMutation } from "@tanstack/react-query";
import { create } from "../api/candidacies";
import { showSuccess, showError } from "../../shared/components/toast/toast";

export default function useCreateCandidacy() {
    return useMutation({
        mutationFn: create,
        onSuccess: () => showSuccess("Postulación realizada correctamente"),
        onError: () => showError("Error al postularse"),
    });
}
