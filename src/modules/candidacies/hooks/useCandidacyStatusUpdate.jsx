import { useMutation } from "@tanstack/react-query";
import { updateStatusById } from "../api/candidacies";

export default function useCandidacyStatusUpdate(onSuccess) {
    return useMutation({
        mutationFn: ({ id, status }) => updateStatusById(id, status),
        onSuccess,
    });
}
