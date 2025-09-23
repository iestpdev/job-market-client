import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import useRegisterStudent from '../../../../hooks/useRegisterStudent';
import { useActivatedMajors } from '../../../../../majors/hooks/useMajors';
import './StudentRegisterForm.css';

export default function StudentRegisterForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        apellidos: '',
        nombres: '',
        genero: '',
        fechNac: '',
        tipoDOI: 'DNI',
        numDOI: '',
        programaEstudioId: '',
        esEgresado: false,
        username: '',
        userpass: '',
    });

    const { data: majors = [] } = useActivatedMajors();
    const { mutate, isPending } = useRegisterStudent(() => navigate('/login'));

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setForm(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        mutate(form);
    };

    return (
        <div className="student-register-container">
            <div className="student-register-card">
                <h3 className="student-register-title">Registro de Estudiante</h3>
                <form onSubmit={handleSubmit} className="student-register-form">

                    {/* Información Personal */}
                    <div className="form-section">
                        <h4 className="section-title">Información Personal</h4>
                        <div className="form-grid">
                            <div className="input-group">
                                <select
                                    name="tipoDOI"
                                    onChange={handleChange}
                                    value={form.tipoDOI}
                                    className="student-select"
                                >
                                    <option value="DNI">DNI</option>
                                    <option value="CE">Carnet de Extranjería</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <input
                                    name="numDOI"
                                    placeholder="Número de Documento"
                                    onChange={handleChange}
                                    value={form.numDOI}
                                    className="student-input"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    name="apellidos"
                                    placeholder="Apellidos"
                                    onChange={handleChange}
                                    value={form.apellidos}
                                    className="student-input"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    name="nombres"
                                    placeholder="Nombres"
                                    onChange={handleChange}
                                    value={form.nombres}
                                    className="student-input"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <select
                                    name="genero"
                                    onChange={handleChange}
                                    value={form.genero}
                                    className="student-select"
                                    required
                                >
                                    <option value="">Seleccionar Género</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label className="date-label">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    name="fechNac"
                                    onChange={handleChange}
                                    value={form.fechNac}
                                    className="student-input date-input"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Información Académica */}
                    <div className="form-section">
                        <h4 className="section-title">Información Académica</h4>
                        <div className="form-grid">
                            <div className="input-group">
                                <select
                                    name="programaEstudioId"
                                    onChange={handleChange}
                                    value={form.programaEstudioId}
                                    className="student-select"
                                    required
                                >
                                    <option value="">Seleccionar Programa</option>
                                    {majors.map((major) => (
                                        <option key={major.ID} value={major.ID}>
                                            {major.NOMBRE}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="esEgresado"
                                        checked={form.esEgresado}
                                        onChange={handleChange}
                                    />
                                    ¿Egresado?
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Credenciales de Acceso */}
                    <div className="form-section">
                        <h4 className="section-title">Credenciales de Acceso</h4>
                        <div className="form-grid">
                            <div className="input-group">
                                <input
                                    name="username"
                                    placeholder="Usuario"
                                    onChange={handleChange}
                                    value={form.username}
                                    className="student-input"
                                    required
                                />
                            </div>

                            <div className="input-group relative">
                                <input
                                    name="userpass"
                                    placeholder="Contraseña"
                                    type={showPassword ? "text" : "password"}
                                    onChange={handleChange}
                                    value={form.userpass}
                                    className="student-input pr-10"
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
                        className={`student-register-button ${isPending ? 'loading' : ''}`}
                    >
                        {isPending ? '' : 'Registrarse como Estudiante'}
                    </button>
                </form>
            </div>
        </div>
    );
}
