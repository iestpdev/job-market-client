import axios from "../../shared/api/axiosInstance";

export const getById = async (id) => {
    const { data } = await axios.get(`/company/${id}`);
    return data;
};

export const updateById = async (id, company) => {
    const { data } = await axios.patch(`/company/${id}`, company);
    return data;
};

export const updateByIdWithFormData = async (id, formData) => {
    const { data } = await axios.patch(`/company/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};
