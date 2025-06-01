import { EditorContent } from "@tiptap/react";
import Toolbar from "../../../shared/components/tiptap/Toolbar";

const OfferForm = ({
    formData,
    descripcionEditor,
    requisitosEditor,
    beneficiosEditor,
    handleChange,
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
            <div>
                <label>Título:</label>
                <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Descripción:</label>
                {descripcionEditor && (
                    <div className="tiptap-editor">
                        <Toolbar editor={descripcionEditor} />
                        <EditorContent editor={descripcionEditor} />
                    </div>
                )}
            </div>

            <div>
                <label>Sueldo:</label>
                <input
                    type="number"
                    name="sueldo"
                    min={0}
                    value={formData.sueldo}
                    onChange={handleChange}
                />
            </div>

            {formData.sueldo === 0 && (
                <div>
                    <label>¿Es Ad Honorem?</label>
                    <input
                        type="checkbox"
                        name="adHonorem"
                        checked={formData.adHonorem}
                        onChange={handleChange}
                    />
                </div>
            )}

            <div>
                <label>Fecha de Cierre:</label>
                <input
                    type="datetime-local"
                    name="fechaCierre"
                    value={formData.fechaCierre}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Requisitos:</label>
                {requisitosEditor && (
                    <div className="tiptap-editor">
                        <Toolbar editor={requisitosEditor} />
                        <EditorContent editor={requisitosEditor} />
                    </div>
                )}
            </div>

            <div>
                <label>Beneficios:</label>
                {beneficiosEditor && (
                    <div className="tiptap-editor">
                        <Toolbar editor={beneficiosEditor} />
                        <EditorContent editor={beneficiosEditor} />
                    </div>
                )}
            </div>

            <button type="submit">Crear Oferta</button>
        </form>
    );
};

export default OfferForm;
