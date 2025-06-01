const OfferForm = ({ formData, descripcionEditor, requisitosEditor, beneficiosEditor, handleChange, handleSubmit }) => {
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
                <div className="tiptap-editor">
                    <div ref={descripcionEditor.ref} />
                </div>
            </div>

            <div>
                <label>Sueldo:</label>
                <input
                    type="number"
                    name="sueldo"
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
                <div className="tiptap-editor">
                    <div ref={requisitosEditor.ref} />
                </div>
            </div>

            <div>
                <label>Beneficios:</label>
                <div className="tiptap-editor">
                    <div ref={beneficiosEditor.ref} />
                </div>
            </div>

            <button type="submit">Crear Oferta</button>
        </form>
    );
};

export default OfferForm;