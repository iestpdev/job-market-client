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