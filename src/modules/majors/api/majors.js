import axios from "../../shared/api/axiosInstance";

export const getAllActivated = async () => {
    const { data } = await axios.get("/major/activated");
    return data;
};

export const getAllOffersByMajorId = async (majorId) => {
    const { data } = await axios.get(`/majors-offers/get-offers-by-major-id/${majorId}`);
    return data;
}

export const assignMajorsToOffer = async (offerId, majors) => {
    const { data } = await axios.post(`/majors-offers/${offerId}`, majors);
    return data;
}

export const getAllMajorsByOfferId = async (offerId) => {
    const { data } = await axios.get(`/majors-offers/${offerId}`);
    return data;
}