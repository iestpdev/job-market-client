import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { authAtom } from "../../auth/atoms/authAtom";
import { create } from "../api/offers";
import { useTiptapEditor } from "../../shared/utils/tiptap/tiptapConfig";

export const useOfferCreate = () => {
    const navigate = useNavigate();
    const auth = useAtomValue(authAtom);
    const companyId = auth?.user?.companyId;

    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        sueldo: 0,
        adHonorem: false,
        viaticos: 0,
        bonos: 0,
        numVacantes: 0,
        fechaCierre: "",
        requisitos: "",
        beneficios: "",
        contacto: "",
        correo: "",
        telefono: "",
    });

    const descripcionEditor = useTiptapEditor(formData.descripcion);
    const requisitosEditor = useTiptapEditor(formData.requisitos);
    const beneficiosEditor = useTiptapEditor(formData.beneficios);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "sueldo") {
            const newSueldo = Number(value);

            setFormData((prev) => {
                const updated = {
                    ...prev,
                    [name]: newSueldo,
                };

                if (newSueldo !== 0) {
                    updated.adHonorem = false;
                }

                return updated;
            });
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const offerData = {
                ...formData,
                companyId,
                fechaPublicacion: new Date().toISOString(),
                sueldo: formData.sueldo || 0,
                descripcion: descripcionEditor.getHTML(),
                requisitos: requisitosEditor.getHTML(),
                beneficios: beneficiosEditor.getHTML(),
            };
            await create(offerData);
            navigate("/");
        } catch (error) {
            console.error("Error al crear la oferta:", error);
            alert("Ocurrió un error al crear la oferta");
        }
    };

    return {
        formData,
        descripcionEditor,
        requisitosEditor,
        beneficiosEditor,
        handleChange,
        handleSubmit,
    };
};