import { useQuery } from "@tanstack/react-query";
import { getAllActivated } from "../api/majors";

export const useActivatedMajors = () => {
    return useQuery({
        queryKey: ["majors", "activated"],
        queryFn: getAllActivated,
        staleTime: 1000 * 60 * 10, // 10 minutos
        refetchOnWindowFocus: false
    });
};
