import { useState, useEffect, useRef } from "react";
import { validateFileSize } from "../../utils/validateFileSize";
import { useActivatedMajors } from "../../../majors/hooks/useMajors";
import "./StudentForm.css";

const StudentForm = ({ student, onSubmit }) => {
    const fileInputRef = useRef(null);
    const { data: majors = [], isLoading: loadingMajors } = useActivatedMajors();

    const [form, setForm] = useState({
        apellidos: "",
        nombres: "",
        correoInstitucional: "",
        telefono: "",
        genero: "",
        fechNac: "",
        tipoDOI: "",
        numDOI: "",
        programaEstudioId: "",
        esEgresado: false,
        curriculum: null,
    });

    useEffect(() => {
        if (student) {
            setForm({
                apellidos: student.APELLIDOS || "",
                nombres: student.NOMBRES || "",
                correoInstitucional: student.CORREO_INSTITUCIONAL || "",
                telefono: student.TELEFONO || "",
                genero: student.GENERO || "",
                fechNac: student.FECH_NACIMIENTO?.slice(0, 10) || "",
                tipoDOI: student.TIPO_DOI || "",
                numDOI: student.NUM_DOI || "",
                programaEstudioId: student.PROGRAMA_ESTUDIO_ID || "",
                esEgresado: !!student.ES_EGRESADO,
                curriculum: null,
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === "checkbox" ? checked : value;

        if (name === "tipoDOI") {
            setForm((prev) => ({
                ...prev,
                tipoDOI: value,
                numDOI: "",
            }));
            return;
        }

        if (name === "numDOI") {
            const maxLen = form.tipoDOI === "DNI" ? 8 : 20;
            newValue = value.replace(/\D/g, "").slice(0, maxLen);
        }

        if (name === "telefono") {
            newValue = value.replace(/\D/g, "").slice(0, 9);
        }

        setForm((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        const isValid = validateFileSize(file, 10, () => {
            setForm((prev) => ({ ...prev, curriculum: null }));
        }, fileInputRef);

        if (isValid) {
            setForm((prev) => ({ ...prev, curriculum: file }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in form) {
            const value = form[key];
            if (value !== null && value !== undefined) {
                if (key === "curriculum" && !(value instanceof File)) continue;
                formData.append(key, value);
            }
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="student-form-container">
            <h2>{student ? "Editar Perfil" : "Registrar Estudiante"}</h2>

            <div className="student-form-group">
                <label>Nombres:</label>
                <input type="text" name="nombres" value={form.nombres} onChange={handleChange} required />
            </div>

            <div className="student-form-group">
                <label>Apellidos:</label>
                <input type="text" name="apellidos" value={form.apellidos} onChange={handleChange} required />
            </div>

            <div className="student-form-group">
                <label>Correo institucional:</label>
                <input
                    type="email"
                    name="correoInstitucional"
                    value={form.correoInstitucional}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="student-form-group">
                <label>Teléfono:</label>
                <input
                    type="text"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                    maxLength={9}
                    placeholder="9 dígitos"
                />
            </div>

            <div className="student-form-group">
                <label>Género:</label>
                <select name="genero" value={form.genero} onChange={handleChange} required>
                    <option value="">Seleccione</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                </select>
            </div>

            <div className="student-form-group">
                <label>Fecha de nacimiento:</label>
                <input type="date" name="fechNac" value={form.fechNac} onChange={handleChange} required />
            </div>

            <div className="student-form-group">
                <label>Tipo de Documento:</label>
                <select name="tipoDOI" value={form.tipoDOI} onChange={handleChange} required>
                    <option value="">Seleccione</option>
                    <option value="DNI">DNI</option>
                    <option value="CE">Carnet de extranjería</option>
                </select>
            </div>

            <div className="student-form-group">
                <label>Número de Documento:</label>
                <input
                    type="text"
                    name="numDOI"
                    value={form.numDOI}
                    onChange={handleChange}
                    required
                    placeholder={form.tipoDOI === "DNI" ? "Máx. 8 dígitos" : "Máx. 20 caracteres"}
                />
            </div>

            <div className="student-form-group">
                <label>Programa de Estudio:</label>
                <select
                    name="programaEstudioId"
                    value={form.programaEstudioId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione un programa</option>
                    {loadingMajors ? (
                        <option disabled>Cargando...</option>
                    ) : (
                        majors.map((m) => (
                            <option key={m.ID} value={m.ID}>
                                {m.NOMBRE}
                            </option>
                        ))
                    )}
                </select>
            </div>

            <div className="student-form-group">
                <label>
                    <input
                        type="checkbox"
                        name="esEgresado"
                        checked={form.esEgresado}
                        onChange={handleChange}
                    />
                    ¿Es egresado?
                </label>
            </div>

            <div className="student-form-group">
                <label>Currículum (PDF):</label>
                <input type="file" accept=".pdf" name="curriculum" onChange={handleFileChange} ref={fileInputRef} />

                {form.curriculum instanceof File ? (
                    <p style={{ marginTop: "0.5rem" }}>
                        <strong>Archivo seleccionado:</strong>{" "}
                        <a href={URL.createObjectURL(form.curriculum)} target="_blank" rel="noopener noreferrer">
                            {form.curriculum.name}
                        </a>
                    </p>
                ) : (
                    student?.CURRICULUM && (
                        <p style={{ marginTop: "0.5rem" }}>
                            <strong>Archivo actual:</strong>{" "}
                            <a href={student.CURRICULUM} target="_blank" rel="noopener noreferrer">
                                Ver currículum adjunto
                            </a>
                        </p>
                    )
                )}
            </div>

            <button type="submit" className="student-form-submit">
                {student ? "Guardar cambios" : "Registrar"}
            </button>
        </form>
    );
};

export default StudentForm;
