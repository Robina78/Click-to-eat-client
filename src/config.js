import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://click-to-eat2.herokuapp.com/"
})