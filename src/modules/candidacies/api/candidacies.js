import axios from "../../shared/api/axiosInstance";

export const getAll = async () => {
    const { data } = await axios.get("/candidacy");
    return data;
};

export const getAllByCompanyId = async (companyId) => {
    const { data } = await axios.get(`/candidacy/get-all-by-company-id/${companyId}`);
    return data;
};

export const getAttachmentsByStudentId = async (studentId) => {
    const { data } = await axios.get(`/candidacy/get-attachments-by-student-id/${studentId}`);
    return data;
};
