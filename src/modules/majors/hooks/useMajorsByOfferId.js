import { useQuery } from "@tanstack/react-query";
import { getAllMajorsByOfferId } from "../api/majors";

export const useMajorsByOfferId = (offerId) => {
    return useQuery({
        queryKey: ["majors-offers", offerId],
        queryFn: () => getAllMajorsByOfferId(offerId),
        enabled: !!offerId,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    });
};
