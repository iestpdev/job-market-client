import axios from "../../shared/api/axiosInstance";

export const getAll = async () => {
    const { data } = await axios.get("/student");
    return data;
};

export const getById = async (id) => {
    const { data } = await axios.get(`/student/${id}`);
    return data;
};

export const updateById = async (id, student) => {
    const { data } = await axios.patch(`/student/${id}`, student);
    return data;
};

export const updateByIdWithFormData = async (id, formData) => {
    const { data } = await axios.patch(`/student/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};
