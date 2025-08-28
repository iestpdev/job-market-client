import { useState, useEffect, useCallback } from "react";
import useApplicationsByStudent from "../../../modules/candidacies/hooks/useApplicationsByStudent";
import ApplicationsTable from "../../../modules/candidacies/components/ApplicationsTable/ApplicationsTable";
import useOfferDetails from "../../../modules/offers/hooks/useOfferDetails";
import OfferDetails from "../../../modules/offers/components/details/OfferDetails";

export default function YourApplicationsScreen() {
    const { applications, loading, error } = useApplicationsByStudent();
    const [selectedOfferId, setSelectedOfferId] = useState(null);
    const [showOfferModal, setShowOfferModal] = useState(false);

    const { offer, loading: offerLoading, error: offerError } = useOfferDetails(selectedOfferId);

    useEffect(() => {
        if (applications.length > 0 && !selectedOfferId) {
            setSelectedOfferId(applications[0].OFERTA_ID);
        }
    }, [applications, selectedOfferId]);

    const onKeyDown = useCallback((e) => {
        if (e.key === "Escape") setShowOfferModal(false);
    }, []);
    useEffect(() => {
        if (!showOfferModal) return;
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [showOfferModal, onKeyDown]);

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
                {loading && <p>Cargando postulaciones...</p>}
                {error && <p>{error}</p>}

                {!loading && (
                    <ApplicationsTable
                        applications={applications}
                        onSelectOffer={(id) => {
                            setSelectedOfferId(id);
                            setShowOfferModal(true);
                        }}
                    />
                )}
            </div>

            <div className="hidden lg:block flex-1 border-l border-gray-200 pl-4">
                {offerLoading && <p>Cargando detalles de la oferta...</p>}
                {offerError && <p>{offerError}</p>}
                {!offerLoading && offer && <OfferDetails offer={offer} showApplyBtn={false} />}
            </div>

            {/* Modal: visible SOLO < lg */}
            {showOfferModal && (
                <div
                    className="lg:hidden fixed inset-0 z-50 bg-black/50 p-4 flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="offer-details-title"
                    onClick={() => setShowOfferModal(false)}
                >
                    <div
                        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 max-h-[85vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                            onClick={() => setShowOfferModal(false)}
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>

                        <h2 id="offer-details-title" className="text-xl font-semibold mb-4">
                            Detalles de la oferta
                        </h2>

                        {offerLoading && <p>Cargando detalles de la oferta...</p>}
                        {offerError && <p>{offerError}</p>}
                        {!offerLoading && offer && <OfferDetails offer={offer} showApplyBtn={false} />}
                    </div>
                </div>
            )}
        </div>
    );
}
