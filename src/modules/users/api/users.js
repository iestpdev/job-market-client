import axios from "../../shared/api/axiosInstance";

export const update = async (id, user) => {
    const { data } = await axios.patch(`/user/${id}`, user);
    return data;
}