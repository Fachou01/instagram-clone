import axios from "axios";

const httpMain = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API
});

export default httpMain;