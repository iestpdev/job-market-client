import { useMutation } from '@tanstack/react-query';
import { registerCompany } from '../api/auth-register';

export default function useRegisterCompany(onSuccess) {
    return useMutation({
        mutationFn: registerCompany,
        onSuccess,
    });
}
