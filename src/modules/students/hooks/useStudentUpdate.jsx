import { useMutation } from "@tanstack/react-query";
import { updateByIdWithFormData } from "../api/students";

export default function useStudentUpdate(id, onSuccess) {
    return useMutation({
        mutationFn: async (formData) => {
            return await updateByIdWithFormData(id, formData);
        },
        onSuccess,
    });
}
