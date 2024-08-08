import axios from "axios";
import { useId } from "react";

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

export const getAllUsers = (page = 0, size = 3) => {
    return axios.get(`/api/v1/users/get/user?page=${page}&size=${size}&sort=createdDate,DESC`);
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

export const createProject = (form) => {
    return axios.post("/api/v1/projects/create", form);
}

export const getProject = (id) => {
    return axios.get(`/api/v1/projects/get/id/${id}`);
}

export const getProjectCount = () => {
    return axios.get("/api/v1/projects/get/count");
}

export const getAllProjects = (pageNumber, pageSize, sort) => {
    return axios.get(`/api/v1/projects/get?page=${pageNumber}&size=${pageSize}&sort=${sort}`);
}

export const updateProject = (id, form) => {
    return axios.put(`/api/v1/projects/update/${id}`, form);
}

export const deleteProject = (id) => {
    return axios.delete(`/api/v1/projects/delete/${id}`);
}

export const addLike = (body) => {
    return axios.post("/api/v1/likes/add", body);
}

export const didILikeIt = (userId, projectId) => {
    return axios.get(`/api/v1/likes/didILikeIt?userId=${userId}&projectId=${projectId}`);
}

export const getLikeCount = (projectId) => {
    return axios.get(`/api/v1/likes/get/${projectId}`);
}

export const deleteLike = (userId, projectId) => {
    return axios.delete(`/api/v1/likes/delete?userId=${userId}&projectId=${projectId}`);
}

export const getAllProjectComments = (projectId, pageNumber, pageSize, pageSort) => {
    return axios.get(`/api/v1/comments/get/project/${projectId}?page=${pageNumber}&size=${pageSize}&sort=${pageSort}`);
}

export const createContact = (body) => {
    return axios.post("/api/v1/contacts/create", body);
}

export const getAllContacts = (pageNumber, pageSize, sort) => {
    return axios.get(`/api/v1/contacts/getpage?page=${pageNumber}&size=${pageSize}&sort=${sort}`);
}

export const deleteContact = (id) => {
    return axios.delete(`/api/v1/contacts/delete/${id}`);
}