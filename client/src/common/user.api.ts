import { baseURL } from "./baseURL";

const userAPI = {
    login: {
        link: `${baseURL}/api/user/login`
    },
    register: {
        link: `${baseURL}/api/user/register`
    },
    auth: {
        link: `${baseURL}/api/user/auth` 
    }
};

export default userAPI;