import { useAtomValue } from "jotai";
import { authAtom } from "../../auth/atoms/authAtom";

export default function usePermissions() {
    const auth = useAtomValue(authAtom);
    const role = auth?.user?.tipo;

    const isCompany = role === "COMPANY";
    const isStudent = role === "STUDENT";

    return {
        isCompany,
        isStudent,
        canPublishOffers: isCompany,
        canViewCandidacies: isCompany,
        canViewPostulations: isStudent,
    };
}
