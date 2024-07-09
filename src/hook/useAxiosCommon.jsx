import axios from "axios";


const axiosNotSecure = axios.create({
    baseURL : import.meta.env.VITE_URL
})

const useAxiosCommon = () => {
    return axiosNotSecure;
};

export default useAxiosCommon;