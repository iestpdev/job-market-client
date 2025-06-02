import axios from "../../shared/api/axiosInstance";

export const getAll = async () => {
    const { data } = await axios.get("/student");
    return data;
};

export const getById = async (id) => {
    const { data } = await axios.get(`/student/${id}`);
    return data;
};

export const create = async (student) => {
    const { data } = await axios.post("/student", student);
    return data;
};

export const updateById = async (id, student) => {
    const { data } = await axios.patch(`/student/${id}`, student);
    return data;
};

export const deleteById = async (id) => {
    const { data } = await axios.delete(`/student/${id}`);
    return data;
};