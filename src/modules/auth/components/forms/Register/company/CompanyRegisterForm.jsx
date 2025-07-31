import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import useRegisterCompany from '../../../../hooks/useRegisterCompany';
import './CompanyRegisterForm.css';

export default function CompanyRegisterForm() {
    const navigate = useNavigate();
     const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        razonSocial: '',
        ruc: '',
        rubro: '',
        direccion1: '',
        contacto1: '',
        telefono1: '',
        correo1: '',
        username: '',
        userpass: '',
        logo: null,
    });

    const { mutate, isPending } = useRegisterCompany(() => navigate('/login'));

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name === 'logo') {
            setForm(prev => ({ ...prev, logo: files[0] }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value) data.append(key, value);
        });
        mutate(data);
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h3 className="register-title">Registro de Empresa</h3>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-grid">
                        <div className="input-group">
                            <input
                                name="razonSocial"
                                placeholder="Razón Social"
                                onChange={handleChange}
                                value={form.razonSocial}
                                className="register-input"
                                required
                            />
                        </div>
                        
                        <div className="input-group">
                            <input
                                name="direccion1"
                                placeholder="Dirección"
                                onChange={handleChange}
                                value={form.direccion1}
                                className="register-input"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                name="ruc"
                                placeholder="RUC de la Empresa"
                                onChange={handleChange}
                                value={form.ruc}
                                className="register-input"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                name="rubro"
                                placeholder="Rubro"
                                onChange={handleChange}
                                value={form.rubro}
                                className="register-input"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                name="contacto1"
                                placeholder="Persona de Contacto"
                                onChange={handleChange}
                                value={form.contacto1}
                                className="register-input"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                name="telefono1"
                                placeholder="Teléfono"
                                onChange={handleChange}
                                value={form.telefono1}
                                className="register-input"
                                type="tel"
                                required
                            />
                        </div>

                        <div className="input-group input-full">
                            <input
                                name="correo1"
                                placeholder="Correo Electrónico"
                                onChange={handleChange}
                                value={form.correo1}
                                className="register-input"
                                type="email"
                                required
                            />
                        </div>

                        <div className="input-group input-full">
                            <div className="file-input-wrapper">
                                <input
                                    name="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="file-input"
                                    id="logo-upload"
                                    required
                                />
                                <label htmlFor="logo-upload" className="file-label">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21,15 16,10 5,21" />
                                    </svg>
                                    {form.logo ? form.logo.name : 'Subir Logo de la Empresa'}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="credentials-section">
                        <h4 className="section-title">Credenciales de Acceso</h4>
                        <div className="form-grid">
                            <div className="input-group">
                                <input
                                    name="username"
                                    placeholder="Usuario"
                                    onChange={handleChange}
                                    value={form.username}
                                    className="register-input"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    name="userpass"
                                    placeholder="Contraseña"
                                    type={showPassword ? "text" : "password"}
                                    onChange={handleChange}
                                    value={form.userpass}
                                    className="register-input"
                                    required
                                />
                                 <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className={`register-button ${isPending ? 'loading' : ''}`}
                    >
                        {isPending ? '' : 'Registrarse como Empresa'}
                    </button>
                </form>
            </div>
        </div>
    );
}