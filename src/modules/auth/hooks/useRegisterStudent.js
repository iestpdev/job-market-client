import { useMutation } from '@tanstack/react-query';
import { registerStudent } from '../api/auth-register';

export default function useRegisterStudent(onSuccess) {
    return useMutation({
        mutationFn: registerStudent,
        onSuccess,
    });
}