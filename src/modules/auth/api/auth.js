import axios from '../../shared/api/axiosInstance';

export const login = async (credentials) => {
  const { data } = await axios.post('/auth', credentials);
  return data;
};