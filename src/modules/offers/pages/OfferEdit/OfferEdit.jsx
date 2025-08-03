import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OfferForm from "../../components/forms/OfferForm";
import useOfferDetails from "../../hooks/useOfferDetails";
import useOfferUpdate from "../../hooks/useOfferUpdate";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function OfferEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { offer, loading, error } = useOfferDetails(id);
    const { mutate, isPending } = useOfferUpdate(id, () => navigate("/"));

    const [formData, setFormData] = useState({
        titulo: "",
        sueldo: 0,
        viaticos: 0,
        bonos: 0,
        numVacantes: 1,
        fechaCierre: "",
        contacto: "",
        correo: "",
        telefono: "",
        descripcion: "",
        requisitos: "",
        beneficios: "",
        adHonorem: false,
    });

    const descripcionEditor = useEditor({
        extensions: [StarterKit],
        content: formData.descripcion,
        onUpdate: ({ editor }) => {
            setFormData((prev) => ({ ...prev, descripcion: editor.getHTML() }));
        },
    });

    const requisitosEditor = useEditor({
        extensions: [StarterKit],
        content: formData.requisitos,
        onUpdate: ({ editor }) => {
            setFormData((prev) => ({ ...prev, requisitos: editor.getHTML() }));
        },
    });

    const beneficiosEditor = useEditor({
        extensions: [StarterKit],
        content: formData.beneficios,
        onUpdate: ({ editor }) => {
            setFormData((prev) => ({ ...prev, beneficios: editor.getHTML() }));
        },
    });

    useEffect(() => {
        if (offer) {
            setFormData({
                titulo: offer.TITULO || "",
                sueldo: offer.SUELDO || 0,
                viaticos: offer.VIATICOS || 0,
                bonos: offer.BONOS || 0,
                numVacantes: offer.NUM_VACANTES || 1,
                fechaCierre: offer.FECHA_CIERRE?.slice(0, 16) || "",
                contacto: offer.CONTACTO || "",
                correo: offer.CORREO || "",
                telefono: offer.TELEFONO || "",
                descripcion: offer.DESCRIPCION || "",
                requisitos: offer.REQUISITOS || "",
                beneficios: offer.BENEFICIOS || "",
                adHonorem: offer.SUELDO === 0,
            });
            descripcionEditor?.commands.setContent(offer.DESCRIPCION || "");
            requisitosEditor?.commands.setContent(offer.REQUISITOS || "");
            beneficiosEditor?.commands.setContent(offer.BENEFICIOS || "");
        }
    }, [offer, descripcionEditor, requisitosEditor, beneficiosEditor]);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;

        setFormData((prev) => {
            const updated = {
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            };

            if (name === "sueldo" && Number(value) !== 0) {
                updated.adHonorem = false;
            }

            return updated;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData);
    };

    if (loading) return <p>Cargando oferta...</p>;
    if (error) return <p>Error al cargar: {error}</p>;

    return (
        <div className="offer-edit-container">
            <OfferForm
                offerId={id}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                descripcionEditor={descripcionEditor}
                requisitosEditor={requisitosEditor}
                beneficiosEditor={beneficiosEditor}
                isEdit={true}
            />
            {isPending && <p>Guardando cambios...</p>}
        </div>
    );
}
