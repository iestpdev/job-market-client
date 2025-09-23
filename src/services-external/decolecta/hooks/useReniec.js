import { useQuery } from "@tanstack/react-query";
import { getByDNI } from "../api/decolecta";

export default function useReniec(dni, enabled = true) {
    return useQuery({
        queryKey: ["reniec", dni],
        queryFn: () => getByDNI(dni),
        enabled: enabled && !!dni,
        retry: 1,
    });
}
