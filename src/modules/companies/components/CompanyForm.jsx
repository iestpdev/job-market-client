import { useState, useEffect, useRef } from "react";
import { handleImagePreview } from "../utils/imagePreview";

export default function CompanyForm({ company, onSubmit }) {
    const [logoPreview, setLogoPreview] = useState(null);
    const [logoError, setLogoError] = useState(null);
    const fileInputRef = useRef(null);
    const [form, setForm] = useState({
        RAZON_SOCIAL: "",
        RUC: "",
        LOGO: "",
        DIRECCION1: "",
        DIRECCION2: "",
        RUBRO: "",
        CONTACTO1: "",
        TELEFONO1: "",
        CORREO1: "",
        CONTACTO2: "",
        TELEFONO2: "",
        CORREO2: "",
        CONTACTO3: "",
        TELEFONO3: "",
        CORREO3: "",
    });

    useEffect(() => {
        if (company) setForm((prev) => ({ ...prev, ...company }));
    }, [company]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const keyMap = {
        RAZON_SOCIAL: "razonSocial",
        RUC: "ruc",
        LOGO: "logo",
        DIRECCION1: "direccion1",
        DIRECCION2: "direccion2",
        RUBRO: "rubro",
        CONTACTO1: "contacto1",
        TELEFONO1: "telefono1",
        CORREO1: "correo1",
        CONTACTO2: "contacto2",
        TELEFONO2: "telefono2",
        CORREO2: "correo2",
        CONTACTO3: "contacto3",
        TELEFONO3: "telefono3",
        CORREO3: "correo3",
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
        <form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "auto" }}>
            <h2>Datos Generales</h2>
            <div>
                <label>Razón Social:</label>
                <input type="text" name="RAZON_SOCIAL" value={form.RAZON_SOCIAL} onChange={handleChange} required />
            </div>
            <div>
                <label>RUC:</label>
                <input type="text" name="RUC" value={form.RUC} onChange={handleChange} required />
            </div>
            <div>
                <label>Rubro:</label>
                <input type="text" name="RUBRO" value={form.RUBRO} onChange={handleChange} />
            </div>

            <div>
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

                                if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                            }
                        );
                    }}
                />
                
                {logoError && <p style={{ color: "red" }}>{logoError}</p>}
                {logoPreview && (
                    <div style={{ marginTop: "0.5rem" }}>
                        <img src={logoPreview} alt="Vista previa del logo" style={{ maxWidth: "150px" }} />
                    </div>
                )}
                {!logoPreview && typeof form.LOGO === "string" && form.LOGO.trim() !== "" &&  (
                    <div style={{ marginTop: "0.5rem" }}>
                        <img src={form.LOGO} alt="Logo actual" style={{ maxWidth: "150px" }} />
                    </div>
                )}
            </div>

            <h2>Direcciones</h2>
            <div>
                <label>Dirección 1:</label>
                <input type="text" name="DIRECCION1" value={form.DIRECCION1} onChange={handleChange} />
            </div>
            <div>
                <label>Dirección 2:</label>
                <input type="text" name="DIRECCION2" value={form.DIRECCION2} onChange={handleChange} />
            </div>

            <h2>Contacto 1</h2>
            <div>
                <label>Nombre:</label>
                <input type="text" name="CONTACTO1" value={form.CONTACTO1} onChange={handleChange} />
            </div>
            <div>
                <label>Teléfono:</label>
                <input type="text" name="TELEFONO1" value={form.TELEFONO1} onChange={handleChange} />
            </div>
            <div>
                <label>Correo:</label>
                <input type="email" name="CORREO1" value={form.CORREO1} onChange={handleChange} />
            </div>

            <h2>Contacto 2 (opcional)</h2>
            <div>
                <label>Nombre:</label>
                <input type="text" name="CONTACTO2" value={form.CONTACTO2} onChange={handleChange} />
            </div>
            <div>
                <label>Teléfono:</label>
                <input type="text" name="TELEFONO2" value={form.TELEFONO2} onChange={handleChange} />
            </div>
            <div>
                <label>Correo:</label>
                <input type="email" name="CORREO2" value={form.CORREO2} onChange={handleChange} />
            </div>

            <h2>Contacto 3 (opcional)</h2>
            <div>
                <label>Nombre:</label>
                <input type="text" name="CONTACTO3" value={form.CONTACTO3 || ""} onChange={handleChange} />
            </div>
            <div>
                <label>Teléfono:</label>
                <input type="text" name="TELEFONO3" value={form.TELEFONO3 || ""} onChange={handleChange} />
            </div>
            <div>
                <label>Correo:</label>
                <input type="email" name="CORREO3" value={form.CORREO3 || ""} onChange={handleChange} />
            </div>

            <br />
            <button type="submit">Guardar Cambios</button>
        </form>
    );
}
