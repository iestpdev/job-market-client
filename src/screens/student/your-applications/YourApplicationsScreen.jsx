import { useState, useEffect } from "react";
import useApplicationsByStudent from "../../../modules/candidacies/hooks/useApplicationsByStudent";
import ApplicationsTable from "../../../modules/candidacies/components/ApplicationsTable/ApplicationsTable";
import useOfferDetails from "../../../modules/offers/hooks/useOfferDetails";
import OfferDetails from "../../../modules/offers/components/details/OfferDetails";

export default function YourApplicationsScreen() {
    const { applications, loading, error } = useApplicationsByStudent();
    const [selectedOfferId, setSelectedOfferId] = useState(null);
    const { offer, loading: offerLoading, error: offerError } = useOfferDetails(selectedOfferId);

    useEffect(() => {
        if (applications.length > 0 && !selectedOfferId) {
            setSelectedOfferId(applications[0].OFERTA_ID);
        }
    }, [applications, selectedOfferId]);

    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
                <h1>Mis Postulaciones</h1>
                {loading && <p>Cargando postulaciones...</p>}
                {error && <p>{error}</p>}
                {!loading && (
                    <ApplicationsTable
                        applications={applications}
                        onSelectOffer={(id) => setSelectedOfferId(id)}
                    />
                )}
            </div>
            <div style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: "1rem" }}>
                <h1>Detalle de Oferta</h1>
                {offerLoading && <p>Cargando detalles de la oferta...</p>}
                {offerError && <p>{offerError}</p>}
                {!offerLoading && offer && <OfferDetails offer={offer} showApplyBtn={false} />}
            </div>
        </div>
    );
}
