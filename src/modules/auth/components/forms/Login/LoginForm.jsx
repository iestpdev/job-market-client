import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const { mutate, isLoading, error } = useLogin({
    onSuccess: () => {
      navigate("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
      <button type="submit" disabled={isLoading}>Ingresar</button>
      {error && <p>Error: {error?.response?.data?.message || error.message || "Error inesperado"}</p>}
    </form>
  );
}
