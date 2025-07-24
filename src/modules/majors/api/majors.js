import axios from "../../shared/api/axiosInstance";

export const getAllActivated = async () => {
    const { data } = await axios.get("/major/activated");
    return data;
};
