import { useQuery } from "@tanstack/react-query";
import { getSavedOffersByStudentId } from "../api/offers";

export default function useSavedOffersByStudentId(studentId) {
  return useQuery({
    queryKey: ["savedOffers", studentId],
    queryFn: () => getSavedOffersByStudentId(studentId),
    enabled: !!studentId,
  });
}
