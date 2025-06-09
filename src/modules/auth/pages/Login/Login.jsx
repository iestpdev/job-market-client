import LoginForm from "../../components/forms/Login/LoginForm";
import { Link } from "react-router-dom";
import "./Login.css";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="brand-header">
        <h1 className="brand-title">IESTP JOBS</h1>
        <p className="brand-subtitle">Portal de Empleos y Oportunidades</p>
      </div>
      <LoginForm />
      <div className="register-link">
        <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
      </div>
    </div>
  );
}