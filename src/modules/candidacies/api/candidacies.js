import axios from "../../shared/api/axiosInstance";

export const getAll = async () => {
    const { data } = await axios.get("/candidacy");
    return data;
};

export const create = async (candidacy) => {
    const { data } = await axios.post("/candidacy", candidacy);
    return data;
};

export const getAllByCompanyId = async (companyId) => {
    const { data } = await axios.get(`/candidacy/get-all-by-company-id/${companyId}`);
    return data;
};

export const getAllByStudentId = async (studentId) => {
    const { data } = await axios.get(`/candidacy/get-all-by-student-id/${studentId}`);
    return data;
};

export const getAttachmentsByStudentId = async (studentId) => {
    const { data } = await axios.get(`/candidacy/get-attachments-by-student-id/${studentId}`);
    return data;
};

export const updateStatusById = async (id, status) => {
    const { data } = await axios.patch(`/candidacy/status/${id}`, { status });
    return data;
};

export const uploadDocument = async (candidacyId, field, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.patch(
        `/candidacy/upload-doc/${candidacyId}/${field}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return data;
};

export const checkIfApplied = async (ofertaId, alumnoId) => {
    const { data } = await axios.get(`/candidacy/exists/${ofertaId}/${alumnoId}`);
    return data.exists;
};