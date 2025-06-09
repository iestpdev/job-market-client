import { useMutation } from "@tanstack/react-query";
import { uploadDocument } from "../api/candidacies";
import { showError, showSuccess } from "../../../modules/shared/components/toast/toast";

export default function useUploadDocument() {
    return useMutation({
        mutationFn: ({ id, field, file }) => uploadDocument(id, field, file),
        onSuccess: () => showSuccess("Documento subido correctamente"),
        onError: () => showError("Error al subir el documento"),
    });
}
