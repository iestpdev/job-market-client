import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import useRegisterStudent from '../../../../hooks/useRegisterStudent';
import { useActivatedMajors } from '../../../../../majors/hooks/useMajors';
import useReniec from '../../../../../../services-external/decolecta/hooks/useReniec';
import './StudentRegisterForm.css';

export default function StudentRegisterForm({ toast }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        apellidos: '',
        nombres: '',
        correoInstitucional: '',
        telefono: '',
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

    // Hook de RENIEC (solo si es DNI y 8 dígitos)
    const { data: reniecData } = useReniec(
        form.tipoDOI === "DNI" && form.numDOI.length === 8 ? form.numDOI : null,
        form.tipoDOI === "DNI"
    );

    // Efecto para setear datos de RENIEC
    useEffect(() => {
        if (reniecData?.success && reniecData.data) {
            const { nombres, apellido_paterno, apellido_materno, numero } = reniecData.data;
            setForm(prev => ({
                ...prev,
                nombres: nombres || prev.nombres,
                apellidos: `${apellido_paterno || ""} ${apellido_materno || ""}`.trim(),
                correoInstitucional: `${numero}@iestpchincha.edu.pe`
            }));
        }
    }, [reniecData]);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        // Si cambia el tipo de documento
        if (name === "tipoDOI") {
            if (value === "CE") {
                // Limpiar campos si es Carnet de Extranjería
                setForm(prev => ({
                    ...prev,
                    tipoDOI: value,
                    numDOI: "",
                    apellidos: "",
                    nombres: "",
                    correoInstitucional: ""
                }));
            } else {
                // Si es DNI, solo actualizamos tipo y limpiamos número
                setForm(prev => ({
                    ...prev,
                    tipoDOI: value,
                    numDOI: ""
                }));
            }
            return;
        }

        setForm(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        const payload = {
            ...form,
            correo_institucional: form.correoInstitucional, // snake_case
            fechNac: form.fechNac, // mantener camelCase
        };

        delete payload.correoInstitucional;

        mutate(payload, {
            onError: (error) => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error en el registro',
                    detail: error?.response?.data?.message || "Ocurrió un error inesperado",
                    life: 4000
                });
            },
            onSuccess: () => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Registro exitoso',
                    detail: 'Tu cuenta ha sido creada correctamente',
                    life: 3000
                });
            }
        });
    };


    return (
        <div className="student-register-container">
            <div className="student-register-card">
                <h3 className="student-register-title">Registro de Estudiante</h3>

                <form onSubmit={handleSubmit} className="student-register-form">

                    {/* Documento de Identidad */}
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
                                    maxLength={form.tipoDOI === "DNI" ? 8 : 20}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Información Personal */}
                    <div className="form-section">
                        <h4 className="section-title">Información Personal</h4>
                        <div className="form-grid">
                            <div className="input-group">
                                <input
                                    name="apellidos"
                                    placeholder="Apellidos"
                                    value={form.apellidos}
                                    onChange={handleChange}
                                    className="student-input"
                                    required
                                    readOnly={form.tipoDOI === "DNI"} // Bloqueado si es DNI
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    name="nombres"
                                    placeholder="Nombres"
                                    value={form.nombres}
                                    onChange={handleChange}
                                    className="student-input"
                                    required
                                    readOnly={form.tipoDOI === "DNI"} // Bloqueado si es DNI
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

                            <div className="input-group">
                                <input
                                    type="text"
                                    name="telefono"
                                    placeholder="Teléfono (9 dígitos)"
                                    onChange={handleChange}
                                    value={form.telefono}
                                    className="student-input"
                                    required
                                    maxLength={9}
                                    pattern="\d{9}"
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
                                    type="email"
                                    name="correoInstitucional"
                                    placeholder="Correo institucional"
                                    value={form.correoInstitucional}
                                    onChange={handleChange}
                                    className="student-input"
                                    required
                                    readOnly={form.tipoDOI === "DNI"} // Bloqueado si es DNI
                                />
                            </div>

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
