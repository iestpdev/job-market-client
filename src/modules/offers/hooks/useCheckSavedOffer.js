import { useQuery } from "@tanstack/react-query";
import { checkSavedOffer } from "../api/offers";

const useCheckSavedOffer = (studentId, offerId) => {
    return useQuery({
        queryKey: ["saved-offer-exists", studentId, offerId],
        queryFn: () => checkSavedOffer(studentId, offerId),
        enabled: !!studentId && !!offerId,
    });
};

export default useCheckSavedOffer;
