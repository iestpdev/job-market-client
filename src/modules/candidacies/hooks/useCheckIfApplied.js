import { useQuery } from "@tanstack/react-query";
import { checkIfApplied } from "../api/candidacies";

export default function useCheckIfApplied(ofertaId, alumnoId) {
    return useQuery({
        queryKey: ["applied", ofertaId, alumnoId],
        queryFn: () => checkIfApplied(ofertaId, alumnoId),
        enabled: !!ofertaId && !!alumnoId,
    });
}
