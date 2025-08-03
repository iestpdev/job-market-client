import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignMajorsToOffer } from "../api/majors";
import { toast } from "react-toastify";

export const useAssignMajorsToOffer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ offerId, programIds }) =>
            assignMajorsToOffer(offerId, { programIds }),

        onSuccess: (data, variables) => {

            queryClient.invalidateQueries({ queryKey: ["majors-offers", variables.offerId] });
            queryClient.invalidateQueries({ queryKey: ["offers"] });
        },

        onError: (error) => {
            const msg =
                error?.response?.data?.message || "No se pudo asignar los programas";
            toast.error(msg);
        },
    });
};
