import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveOffer } from "../api/offers";

export default function useSaveOffer(studentId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ofertaId }) => saveOffer({ studentId, ofertaId }), // 👈 aquí ya se injecta studentId
    onSuccess: () => {
      queryClient.invalidateQueries(["savedOffers", studentId]);
    },
  });
}
