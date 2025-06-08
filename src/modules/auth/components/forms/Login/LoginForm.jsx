import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";
import "./LoginForm.css";

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
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Usuario"
              required
              className="login-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="login-input"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`login-button ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
          {error && (
            <div className="error-message">
              <p>Error: {error?.response?.data?.message || error.message || "Error inesperado"}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}