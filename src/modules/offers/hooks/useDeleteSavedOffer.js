import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSavedOffer } from "../api/offers";

export default function useDeleteSavedOffer(studentId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ofertaId }) => deleteSavedOffer({ studentId, ofertaId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["savedOffers", studentId]);
    },
  });
}
