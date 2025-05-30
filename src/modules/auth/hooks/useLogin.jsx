import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";
import { login } from "../api/auth";

export default function useLogin() {
  const setAuth = useSetAtom(authAtom);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth({
        isAuthenticated: true,
        token: data.token,
        user: data.user,
      });
      localStorage.setItem("token", data.token);
    }
  });
}
