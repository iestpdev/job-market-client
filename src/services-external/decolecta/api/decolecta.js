import axios from "../../../modules/shared/api/axiosInstance";

export const getByDNI = async (dni) => {
    const { data } = await axios.get(`/decolecta/reniec/${dni}`);
    return data;
}

export const getByRUC = async (ruc) => {
    const { data } = await axios.get(`/decolecta/sunat/${ruc}`);
    return data;
}