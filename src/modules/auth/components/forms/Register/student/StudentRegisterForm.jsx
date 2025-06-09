import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRegisterStudent from '../../../../hooks/useRegisterStudent';
import './StudentRegisterForm.css';

export default function StudentRegisterForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        apellidos: '',
        nombres: '',
        genero: '',
        fechNac: '',
        tipoDOI: 'DNI',
        numDOI: '',
        username: '',
        userpass: '',
    });

    const { mutate, isPending } = useRegisterStudent(() => navigate('/login'));

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
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
                    <div className="form-section">
                        <h4 className="section-title">Información Personal</h4>
                        <div className="form-grid">
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
                                <label className="date-label">Género</label>
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

                    <div className="form-section">
                        <h4 className="section-title">Documento de Identidad</h4>
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
                        </div>
                    </div>

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

                            <div className="input-group">
                                <input
                                    name="userpass"
                                    placeholder="Contraseña"
                                    type="password"
                                    onChange={handleChange}
                                    value={form.userpass}
                                    className="student-input"
                                    required
                                />
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