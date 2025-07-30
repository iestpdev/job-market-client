import axios from "../../shared/api/axiosInstance";

export const getAllActivated = async () => {
    const { data } = await axios.get("/major/activated");
    return data;
};

export const getAllOffersByMajorId = async (majorId) => {
    const { data } = await axios.get(`/majors-offers/get-offers-by-major-id/${majorId}`);
    return data;
}