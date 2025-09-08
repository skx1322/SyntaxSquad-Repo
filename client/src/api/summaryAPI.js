export const URL = {
    baseURL: function(){
        const baseURL = import.meta.env.VITE_BACKEND;
        if (!baseURL) {
            console.warn(`Missing URL for Backend API URL.`);
        };
        return baseURL;
    }
}

export const userAPI = {
    login: {
        url: ``,
        method: `post`,
    },
    register: {
        url: ``,
        method: `post`,
    },
    account: {
        url: ``,
        method: `get`,
    },
    update: {
        url: ``,
        method: `put`,
    },
    logout: {
        url: ``,
        method: `delete`,
    }
};

export const tutorAPI = {
    
}
