import axios from "../../shared/api/axiosInstance";

export const getAll = async () => {
    const { data } = await axios.get("/candidacy");
    return data;
};

export const getAllByCompanyId = async (companyId) => {
    const { data } = await axios.get(`/candidacy/get-all-by-company-id/${companyId}`);
    return data;
};

export const getById = async (id) => {
    const { data } = await axios.get(`/candidacy/${id}`);
    return data;
};

export const create = async (candidacy) => {
    const { data } = await axios.post("/candidacy", candidacy);
    return data;
};

export const updateById = async (id, candidacy) => {
    const { data } = await axios.patch(`/candidacy/${id}`, candidacy);
    return data;
};

export const deleteById = async (id) => {
    const { data } = await axios.delete(`/candidacy/${id}`);
    return data;
};