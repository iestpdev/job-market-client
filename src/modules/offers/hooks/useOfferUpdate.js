import { useMutation } from "@tanstack/react-query";
import { updateById } from "../api/offers";

const useOfferUpdate = (id, onSuccess) => {
    return useMutation({
        mutationFn: (formData) => updateById(id, formData),
        onSuccess,
    });
};

export default useOfferUpdate;
