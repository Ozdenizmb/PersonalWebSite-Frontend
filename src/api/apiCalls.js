import axios from "axios";

export const signUpUser = (body) => {
    return axios.post("/api/v1/users/signup/user", body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const loginUser = creds => {
    const { email, password } = creds;
    return axios.get(`/api/v1/users/login/user/${email}?password=${password}`);
}

export const signUpAdmin = (body, adminKey) => {
    return axios.post("/api/v1/users/signup/admin", body, {headers: {key: adminKey}}, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const loginAdmin = (creds) => {
    const { email, password, adminKey } = creds;
    return axios.get(`/api/v1/users/login/admin/${email}?password=${password}`, {headers: {key: adminKey}});
}

export const getUserAndAdmin = (email) => {
    return axios.get(`/api/v1/users/get/email/${email}`);
}

export const setAuthorizationHeader = (userData) => {
    if(userData.isLoggedIn) {
        const { email, password } = userData;
        const userInfo = email + ":" + password;
        const convertBasic = btoa(userInfo);
        const authorizationHeaderValue = "Basic " + convertBasic;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    }
    else {
        delete axios.defaults.headers['Authorization'];
    }
};

export const updateUser = (id, form) => {
    return axios.put(`/api/v1/users/update/user/${id}`, form);
}

export const updateAdmin = (id, form, adminKey) => {
    return axios.put(`/api/v1/users/update/admin/${id}`, form, {headers: {key: adminKey}});
}