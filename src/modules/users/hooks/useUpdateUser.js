import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update } from "../api/users";
import { useSetAtom, useAtomValue } from "jotai";
import { authAtom } from "../../auth/atoms/authAtom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useUpdateUser = (setErrors) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const setAuth = useSetAtom(authAtom);
    const auth = useAtomValue(authAtom);

    return useMutation({
        mutationFn: (payload) => update(auth.user.id, payload),

        onSuccess: (data, variables) => {
            const { newPassword, username } = variables;

            queryClient.invalidateQueries({ queryKey: ["user", data.id] });

            if (newPassword) {
                localStorage.removeItem("auth");
                setAuth({ isAuthenticated: false, token: null, user: null });
                navigate("/login");
            } else if (username && username !== auth.user.username) {
                setAuth((prev) => ({
                    ...prev,
                    user: {
                        ...prev.user,
                        username,
                    },
                }));
            }

            toast.success("Usuario actualizado con éxito");
            if (setErrors) setErrors([]); // limpia errores si todo fue bien
        },

        onError: (error) => {
            const errors = error?.response?.data?.details;

            if (setErrors && Array.isArray(errors)) {
                setErrors(errors); // mostramos todos los mensajes del backend
            } else {
                const msg = error?.response?.data?.message || "No se pudo actualizar el usuario";
                if (setErrors) setErrors([msg]);
                else toast.error(msg);
            }
        },
    });
};
