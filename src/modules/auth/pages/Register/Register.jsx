import { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentRegisterForm from '../../components/forms/Register/student/StudentRegisterForm';
import CompanyRegisterForm from '../../components/forms/Register/company/CompanyRegisterForm';
import './Register.css';

export default function RegisterPage() {
    const [type, setType] = useState('student');

    return (
        <div className="register-page-container">
            <div className=" flex flex-col items-center mb-8">
                <img
                    src="/logo.png"
                    alt="IESTP Jobs Logo"
                    className="w-48 h-48 object-contain"
                />
                <p className="brand-subtitle text-gray-600 text-sm md:text-base">
                    Portal de Empleos y Oportunidades
                </p>
            </div>

            <div className="register-page-buttons">
                <button
                    className={`register-toggle-button ${type === 'student' ? 'active' : ''}`}
                    onClick={() => setType('student')}
                >
                    Alumno
                </button>
                <button
                    className={`register-toggle-button ${type === 'company' ? 'active' : ''}`}
                    onClick={() => setType('company')}
                >
                    Empresa
                </button>
            </div>
            <div className="register-form-container">
                {type === 'student' ? <StudentRegisterForm /> : <CompanyRegisterForm />}
            </div>
            <div className="register-login-link">
                <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
            </div>
        </div>
    );
}