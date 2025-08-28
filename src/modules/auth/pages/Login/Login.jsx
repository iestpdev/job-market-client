import LoginForm from "../../components/forms/Login/LoginForm";
import { Link } from "react-router-dom";
import "./Login.css";

export default function LoginPage() {
  return (
    <div className="login-page flex flex-col items-center justify-center min-h-screen bg-gray-50">

      <div className="brand-header flex flex-col items-center mb-8">
        <img
          src="/logo.png"
          alt="IESTP Jobs Logo"
          className="w-48 h-48 object-contain"
        />
        <p className="brand-subtitle text-gray-600 text-sm md:text-base">
          Portal de Empleos y Oportunidades
        </p>
      </div>

      <LoginForm />

      <div className="register-link mt-6 text-gray-600 text-sm">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
