import { useState, useEffect, useRef } from "react";
import { validateFileSize } from "../../utils/validateFileSize";
import './StudentForm.css';

const StudentForm = ({ student, onSubmit }) => {
    const fileInputRef = useRef(null);
    const [form, setForm] = useState({
        apellidos: "",
        nombres: "",
        genero: "",
        fechNac: "",
        tipoDOI: "",
        numDOI: "",
        curriculum: null,
    });

    useEffect(() => {
        if (student) {
            setForm({
                apellidos: student.APELLIDOS || "",
                nombres: student.NOMBRES || "",
                genero: student.GENERO || "",
                fechNac: student.FECH_NACIMIENTO?.slice(0, 10) || "",
                tipoDOI: student.TIPO_DOI || "",
                numDOI: student.NUM_DOI || "",
                curriculum: null,
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

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
            <h2>Editar Perfil</h2>

            <div className="student-form-group">
                <label>Nombres:</label>
                <input type="text" name="nombres" value={form.nombres} onChange={handleChange} required />
            </div>

            <div className="student-form-group">
                <label>Apellidos:</label>
                <input type="text" name="apellidos" value={form.apellidos} onChange={handleChange} required />
            </div>

            <div className="student-form-group">
                <label>Género:</label>
                <select name="genero" value={form.genero} onChange={handleChange}>
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
                <select name="tipoDOI" value={form.tipoDOI} onChange={handleChange}>
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

            <button type="submit" className="student-form-submit">Guardar cambios</button>
        </form>
    );
};

export default StudentForm;
