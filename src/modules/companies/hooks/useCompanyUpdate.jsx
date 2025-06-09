import { useMutation } from "@tanstack/react-query";
import { updateByIdWithFormData } from "../api/companies";

export default function useCompanyUpdate(id, onSuccess) {
    return useMutation({
        mutationFn: (formData) => updateByIdWithFormData(id, formData),
        onSuccess,
    });
}
