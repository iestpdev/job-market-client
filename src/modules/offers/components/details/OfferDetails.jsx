import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UploadDocsModal from '../../../candidacies/components/UploadDocsModal/UploadDocsModal';
import usePermissions from '../../../shared/hooks/usePermissions';
import useCheckIfApplied from '../../../candidacies/hooks/useCheckIfApplied';
import useOfferDelete from '../../hooks/useOfferDelete';
import useStudentDetails from '../../../students/hooks/useStudentDetails';
import { useAtomValue } from 'jotai';
import { authAtom } from '../../../auth/atoms/authAtom';
import MajorsSelector from '../../../majors/components/MajorsSelector';
import MajorsTags from '../../../majors/components/MajorsTags';
import { Pencil } from 'lucide-react';
import './OfferDetails.css';

const OfferDetails = ({ offer, showApplyBtn = true, onDelete }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showMajorsModal, setShowMajorsModal] = useState(false); // Modal de Majors
    const [_, setCandidacyId] = useState(null);
    const auth = useAtomValue(authAtom);
    const studentId = auth?.user?.studentId;
    const { isStudent } = usePermissions();
    const { data: alreadyApplied, isLoading: checking, refetch: refetchApplied } = useCheckIfApplied(offer.ID, studentId);
    const { student } = useStudentDetails(studentId);
    const hasCurriculum = !!student?.CURRICULUM;

    const { mutate: deleteOffer, isPending } = useOfferDelete(() => {
        navigate("/");
        onDelete?.();
    });

    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        setShowModal(false);
        setHasApplied(false);
        setCandidacyId(null);
    }, [offer?.ID]);

    const isApplied = alreadyApplied || hasApplied;
    if (!offer) {
        return (
            <div className="offer-details-empty">
                <p>No hay oferta seleccionada.</p>
            </div>
        );
    }

    const handleApply = () => {
        if (!hasCurriculum) {
            alert("Debes tener un currículum (PDF) cargado antes de postular.");
            return;
        }
        setShowModal(true);
    };

    const {
        ID,
        TITULO,
        RAZON_SOCIAL,
        DIRECCION1,
        DESCRIPCION,
        SUELDO,
        VIATICOS,
        BONOS,
        REQUISITOS,
        BENEFICIOS,
        FECHA_PUBLICACION,
        FECHA_CIERRE,
        NUM_VACANTES,
        CONTACTO,
        CORREO,
        TELEFONO,
    } = offer;

    const formatDate = (dateString) => {
        if (!dateString) return "No especificada";
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatSalary = (amount) => {
        if (!amount || Number(amount) <= 0) return null;
        return `S/ ${Number(amount).toLocaleString('es-PE')}`;
    };

    return (
        <div className="offer-details">
            {/* Header */}
            <div className="offer-details-header">
                <div className="offer-header-content">
                    <h1 className="offer-title">{TITULO}</h1>
                    <div className="offer-company-info">
                        <span className="company-name">{RAZON_SOCIAL}</span>
                    </div>
                    <div className="offer-location">
                        <span className="location-icon">📍</span>
                        <span className="location-text">{DIRECCION1}</span>
                    </div>
                </div>

                {!isStudent && (
                    <>
                        <button className="btn-edit" onClick={() => navigate(`/offer/edit/${offer.ID}`)}>
                            Editar Oferta
                        </button>
                        <button
                            className="btn-delete"
                            onClick={() => {
                                if (confirm("¿Estás seguro de que deseas eliminar esta oferta?")) {
                                    deleteOffer(offer.ID);
                                }
                            }}
                            disabled={isPending}
                        >
                            {isPending ? "Eliminando..." : "Eliminar Oferta"}
                        </button>
                    </>
                )}

                <div className="offer-actions">
                    {isStudent && studentId && showApplyBtn && (
                        <>
                            <button
                                className={`btn-apply ${alreadyApplied ? "applied" : ""}`}
                                onClick={handleApply}
                                disabled={isApplied || checking}
                            >
                                {checking
                                    ? "Verificando..."
                                    : alreadyApplied
                                        ? "Postulado"
                                        : "Postular"}
                            </button>

                            {showModal && (
                                <UploadDocsModal
                                    offerId={offer.ID}
                                    studentId={studentId}
                                    onClose={() => setShowModal(false)}
                                    setCandidacyId={setCandidacyId}
                                    onApplied={() => {
                                        setHasApplied(true);
                                        refetchApplied();
                                    }}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>


            <div className="offer-section">
                <h3 className="section-title mb-2">Programas de estudio</h3>

                <div className="flex flex-wrap items-center gap-2">
                    <MajorsTags offerId={ID} />
                    {!isStudent && (
                        <button
                            className="flex items-center justify-center p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                            onClick={() => setShowMajorsModal(true)}
                            title="Editar programas de estudio"
                        >
                            <Pencil size={18} />
                        </button>

                    )}
                </div>
            </div>

            {/* Modal de MajorsSelector */}
            {showMajorsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        <button
                            onClick={() => setShowMajorsModal(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                        >
                            ✕
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Programas de Estudio</h2>
                        <MajorsSelector offerId={ID}  onClose={() => setShowMajorsModal(false)} />
                    </div>
                </div>
            )}

            {/* Compensación */}
            {(SUELDO || VIATICOS || BONOS) && (
                <div className="offer-section">
                    <h3 className="section-title">Compensación</h3>
                    <div className="compensation-grid">
                        {formatSalary(SUELDO) && (
                            <div className="compensation-item">
                                <span className="compensation-label">Salario:</span>
                                <span className="compensation-value">{formatSalary(SUELDO)}</span>
                            </div>
                        )}
                        {formatSalary(VIATICOS) && (
                            <div className="compensation-item">
                                <span className="compensation-label">Viáticos:</span>
                                <span className="compensation-value">{formatSalary(VIATICOS)}</span>
                            </div>
                        )}
                        {formatSalary(BONOS) && (
                            <div className="compensation-item">
                                <span className="compensation-label">Bonos:</span>
                                <span className="compensation-value">{formatSalary(BONOS)}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Descripción */}
            {DESCRIPCION && DESCRIPCION.replace(/<[^/>]+><\/[^>]+>/g, '').trim() !== '' && (
                <div className="offer-section">
                    <h3 className="section-title">Descripción completa del empleo</h3>
                    <div className="job-description" dangerouslySetInnerHTML={{ __html: DESCRIPCION || "No especificada" }} />
                </div>
            )}

            {/* Requisitos */}
            {REQUISITOS && REQUISITOS.replace(/<[^/>]+><\/[^>]+>/g, '').trim() !== '' && (
                <div className="offer-section">
                    <h3 className="section-title">Requisitos</h3>
                    <div className="job-requirements" dangerouslySetInnerHTML={{ __html: REQUISITOS }} />
                </div>
            )}

            {/* Beneficios */}
            {BENEFICIOS && BENEFICIOS.replace(/<[^/>]+><\/[^>]+>/g, '').trim() !== '' && (
                <div className="offer-section">
                    <h3 className="section-title">Beneficios</h3>
                    <div className="job-benefits" dangerouslySetInnerHTML={{ __html: BENEFICIOS }} />
                </div>
            )}

            {/* Información adicional */}
            <div className="offer-section">
                <h3 className="section-title">Información adicional</h3>
                <ul className="info-list">
                    {NUM_VACANTES &&
                        <li><strong>Vacantes:</strong> {NUM_VACANTES}</li>
                    }
                    {CONTACTO &&
                        <li><strong>Contacto:</strong> {CONTACTO}</li>
                    }
                    {CORREO &&
                        <li><strong>Correo:</strong> {CORREO}</li>
                    }
                    {TELEFONO &&
                        <li><strong>Teléfono:</strong> {TELEFONO}</li>
                    }
                </ul>
            </div>

            {/* Publicación */}
            <div className="offer-section">
                <h3 className="section-title">Información de publicación</h3>
                <div className="publication-info">
                    <div className="info-item">
                        <span className="info-label">Fecha de publicación:</span>
                        <span className="info-value">{formatDate(FECHA_PUBLICACION)}</span>
                    </div>
                    {FECHA_CIERRE && (
                        <div className="info-item">
                            <span className="info-label">Fecha de cierre:</span>
                            <span className="info-value">{formatDate(FECHA_CIERRE)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfferDetails;
