import axios from "axios";

export const signUpUser = body => {
    return axios.post("/api/v1/User", body);
}

export const loginUser = creds => {
    const { email, password } = creds;
    return axios.get(`/api/v1/User/Login?email=${email}&password=${password}`);
}

export const getUser = () => {
    return axios.get("/api/v1/User");
}

export const signUpAdmin = body => {
    return axios.post("/api/v1/Company", body);
}

export const loginAdmin = creds => {
    const { email, password } = creds;
    return axios.get(`/api/v1/Company/Login?email=${email}&password=${password}`);
}

export const getAdmin = () => {
    return axios.get("/api/v1/Company");
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