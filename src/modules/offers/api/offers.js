import axios from "../../shared/api/axiosInstance";

export const getAll = async () => {
    const { data } = await axios.get("/offer");
    return data;
};

export const getAllByCompanyId = async (companyId) => {
    const { data } = await axios.get(`/offer/get-all-by-company-id/${companyId}`);
    return data;
};

export const getById = async (id) => {
    const { data } = await axios.get(`/offer/${id}`);
    return data;
};

export const create = async (offer) => {
    const { data } = await axios.post("/offer", offer);
    return data;
};

export const updateById = async (id, offer) => {
    const { data } = await axios.patch(`/offer/${id}`, offer);
    return data;
};

export const deleteById = async (id) => {
    const { data } = await axios.delete(`/offer/${id}`);
    return data;
};

export const getSavedOffersByStudentId = async (studentId) => {
    const { data } = await axios.get(`/saved-offer/${studentId}`);
    return data;
};

export const saveOffer = async ({ studentId, ofertaId }) => {
    const { data } = await axios.post("/saved-offer", { studentId, ofertaId });
    return data;
};

export const deleteSavedOffer = async ({ studentId, ofertaId }) => {
    const { data } = await axios.delete("/saved-offer", {
        data: { studentId, ofertaId },
    });
    return data;
};

export const checkSavedOffer = async (studentId, offerId) => {
    const { data } = await axios.get(`/saved-offer/exists`, {
        params: { studentId, ofertaId: offerId },
    });
    return data;
};