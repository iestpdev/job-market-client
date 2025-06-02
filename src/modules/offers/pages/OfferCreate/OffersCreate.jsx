import OfferForm from "../../components/forms/OfferForm";
import { useOfferCreate } from "../../hooks/useOfferCreate";

const OffersCreatePage = () => {
    const {
        formData,
        descripcionEditor,
        requisitosEditor,
        beneficiosEditor,
        handleChange,
        handleSubmit,
    } = useOfferCreate();

    return (
        <>
            <h1>Crear Nueva Oferta Laboral</h1>
            <OfferForm
                formData={formData}
                descripcionEditor={descripcionEditor}
                requisitosEditor={requisitosEditor}
                beneficiosEditor={beneficiosEditor}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default OffersCreatePage;