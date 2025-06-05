import { EditorContent } from "@tiptap/react";
import Toolbar from "../../../shared/components/tiptap/Toolbar";
import './OfferForm.css';

const OfferForm = ({
    formData,
    descripcionEditor,
    requisitosEditor,
    beneficiosEditor,
    handleChange,
    handleSubmit,
}) => {
    return (
        <form className="offer-form" onSubmit={handleSubmit}>
            <div className="form-grid">
                <div className="form-group">
                    <label>Título:</label>
                    <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Sueldo:</label>
                    <input type="number" name="sueldo" min={0} value={formData.sueldo} onChange={handleChange} />
                </div>

                {formData.sueldo === 0 && (
                    <div className="form-group form-checkbox">
                        <label htmlFor="adHonorem">
                            ¿Es Ad Honorem?
                            <input
                                type="checkbox"
                                id="adHonorem"
                                name="adHonorem"
                                checked={formData.adHonorem}
                                onChange={handleChange}
                            />
                            🤔
                        </label>
                    </div>
                )}

                <div className="form-group">
                    <label>Viáticos:</label>
                    <input type="number" name="viaticos" min={0} value={formData.viaticos} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Bonos:</label>
                    <input type="number" name="bonos" min={0} value={formData.bonos} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Vacantes:</label>
                    <input type="number" name="numVacantes" value={formData.numVacantes} onChange={handleChange} min={1} max={255} />
                </div>

                <div className="form-group">
                    <label>Fecha de Cierre:</label>
                    <input type="datetime-local" name="fechaCierre" value={formData.fechaCierre} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Contacto:</label>
                    <input type="text" name="contacto" value={formData.contacto} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Correo Electrónico:</label>
                    <input type="email" name="correo" value={formData.correo} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Teléfono:</label>
                    <input type="phone" name="telefono" value={formData.telefono} onChange={handleChange} />
                </div>

                <div className="form-group-full">
                    <label>Descripción:</label>
                    {descripcionEditor && (
                        <div className="tiptap-editor">
                            <Toolbar editor={descripcionEditor} />
                            <EditorContent editor={descripcionEditor} />
                        </div>
                    )}
                </div>

                <div className="form-group-full">
                    <label>Requisitos:</label>
                    {requisitosEditor && (
                        <div className="tiptap-editor">
                            <Toolbar editor={requisitosEditor} />
                            <EditorContent editor={requisitosEditor} />
                        </div>
                    )}
                </div>

                <div className="form-group-full">
                    <label>Beneficios:</label>
                    {beneficiosEditor && (
                        <div className="tiptap-editor">
                            <Toolbar editor={beneficiosEditor} />
                            <EditorContent editor={beneficiosEditor} />
                        </div>
                    )}
                </div>
            </div>

            <button type="submit">Crear Oferta</button>
        </form>

    );
};

export default OfferForm;
