import { useState } from "react";
import OfferSearchAndFilters from "../../offers/components/search/SearchAndFilters";
import OffersPage from "../../offers/pages/Offers/Offers";

export const HomePage = () => {
    const [filters, setFilters] = useState(null);

    return (
        <>
            <OfferSearchAndFilters onSearch={setFilters} />
            <OffersPage filters={filters} />
        </>
    );
};
