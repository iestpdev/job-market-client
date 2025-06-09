import axios from '../../shared/api/axiosInstance';

export const registerStudent = async (credentials) => {
    const { data } = await axios.post('/auth-register/student', credentials);
    return data;
};

export const registerCompany = async (credentials) => {
    const { data } = await axios.post('/auth-register/company', credentials, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};