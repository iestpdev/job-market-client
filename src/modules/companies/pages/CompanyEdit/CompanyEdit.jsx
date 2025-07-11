import { useParams, useNavigate } from "react-router-dom";
import useCompanyDetails from "../../hooks/useCompanyDetails";
import useCompanyUpdate from "../../hooks/useCompanyUpdate";
import CompanyForm from "../../components/CompanyForm/CompanyForm";

export default function CompanyEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { company, loading, error } = useCompanyDetails(id);
    const { mutate, isPending } = useCompanyUpdate(id, () => {
        navigate("/");
    });

    const handleSubmit = (formData) => {
        mutate(formData);
    };

    if (loading) return <p>Cargando empresa...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <CompanyForm company={company} onSubmit={handleSubmit} />
            {isPending && <p>Actualizando datos...</p>}
        </div>
    );
}
