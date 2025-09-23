import { useQuery } from "@tanstack/react-query";
import { getByRUC } from "../api/decolecta";

export default function useSunat(ruc, enabled = true) {
    return useQuery({
        queryKey: ["sunat", ruc],
        queryFn: () => getByRUC(ruc),
        enabled: enabled && !!ruc,
        retry: 1,
    });
}
