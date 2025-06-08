import { useState, useEffect, useRef } from "react";
import { handleImagePreview } from "../../utils/imagePreview";
import "./CompanyForm.css";

export default function CompanyForm({ company, onSubmit }) {
    const [logoPreview, setLogoPreview] = useState(null);
    const [logoError, setLogoError] = useState(null);
    const fileInputRef = useRef(null);
    const [form, setForm] = useState({
        RAZON_SOCIAL: "", RUC: "", LOGO: "", DIRECCION1: "", DIRECCION2: "", RUBRO: "",
        CONTACTO1: "", TELEFONO1: "", CORREO1: "", CONTACTO2: "", TELEFONO2: "", CORREO2: "",
        CONTACTO3: "", TELEFONO3: "", CORREO3: "",
    });

    useEffect(() => {
        if (company) setForm((prev) => ({ ...prev, ...company }));
    }, [company]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const keyMap = {
        RAZON_SOCIAL: "razonSocial", RUC: "ruc", LOGO: "logo", DIRECCION1: "direccion1", DIRECCION2: "direccion2",
        RUBRO: "rubro", CONTACTO1: "contacto1", TELEFONO1: "telefono1", CORREO1: "correo1",
        CONTACTO2: "contacto2", TELEFONO2: "telefono2", CORREO2: "correo2",
        CONTACTO3: "contacto3", TELEFONO3: "telefono3", CORREO3: "correo3",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in form) {
            if (form[key] !== null && form[key] !== undefined) {
                const fieldName = keyMap[key] || key;
                formData.append(fieldName, form[key]);
            }
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="company-form">
            <h2 className="company-form-title">Editar Empresa</h2>
            <h2 className="form-section-title">Datos Generales</h2>
            <div className="form-group">
                <label>Razón Social:</label>
                <input type="text" name="RAZON_SOCIAL" value={form.RAZON_SOCIAL} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>RUC:</label>
                <input type="text" name="RUC" value={form.RUC} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Rubro:</label>
                <input type="text" name="RUBRO" value={form.RUBRO} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Logo:</label>
                <input
                    type="file"
                    accept="image/*"
                    name="LOGO"
                    ref={fileInputRef}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        handleImagePreview(
                            file,
                            (validFile, previewUrl) => {
                                setForm((prev) => ({ ...prev, LOGO: validFile }));
                                setLogoPreview(previewUrl);
                                setLogoError(null);
                            },
                            (errorMsg) => {
                                alert(errorMsg);
                                setLogoError(errorMsg);
                                setLogoPreview(null);
                                setForm((prev) => ({ ...prev, LOGO: "" }));
                                if (fileInputRef.current) fileInputRef.current.value = "";
                            }
                        );
                    }}
                />
                {logoError && <p className="error-text">{logoError}</p>}
                {logoPreview && (
                    <div className="logo-preview">
                        <img src={logoPreview} alt="Vista previa del logo" />
                    </div>
                )}
                {!logoPreview && typeof form.LOGO === "string" && form.LOGO.trim() !== "" && (
                    <div className="logo-preview">
                        <img src={form.LOGO} alt="Logo actual" />
                    </div>
                )}
            </div>

            <h2 className="form-section-title">Direcciones</h2>
            <div className="form-group">
                <label>Dirección 1:</label>
                <input type="text" name="DIRECCION1" value={form.DIRECCION1} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Dirección 2:</label>
                <input type="text" name="DIRECCION2" value={form.DIRECCION2} onChange={handleChange} />
            </div>

            {[1, 2, 3].map((n) => (
                <div key={n}>
                    <h2 className="form-section-title">Contacto {n} {n === 1 ? "" : "(opcional)"}</h2>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" name={`CONTACTO${n}`} value={form[`CONTACTO${n}`] || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Teléfono:</label>
                        <input type="text" name={`TELEFONO${n}`} value={form[`TELEFONO${n}`] || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Correo:</label>
                        <input type="email" name={`CORREO${n}`} value={form[`CORREO${n}`] || ""} onChange={handleChange} />
                    </div>
                </div>
            ))}

            <button type="submit" className="submit-btn">Guardar Cambios</button>
        </form>
    );
}
