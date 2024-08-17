import { signUpUser, loginUser, signUpAdmin, loginAdmin } from "../api/apiCalls";

export const logoutSuccess = () => {
    return {
        type : 'logout-success'
    };
}

export const loginUserSuccess = (loginData) => {
    return {
        type : 'login-user-success',
        data : loginData

    }
}

export const updateUserSuccess = ({ firstName, lastName, imageUrl }) => {
    return {
        type : 'update-user-success',
        data : {
            firstName,
            lastName,
            imageUrl
        }
    }
}

export const signUpUserHandler = (user) => {
    return async function() {
        const response = await signUpUser(user);
        return response
    }
}

export const loginUserHandler = (creds) => {
    return async function(dispatch) {
        const response = await loginUser(creds);

        const loginState = {
            id : response.data.id,
            email : creds.email,
            firstName : response.data.firstName,
            lastName : response.data.lastName,
            password : creds.password,
            imageUrl : response.data.imageUrl,
            role: response.data.role
        }     
        dispatch(loginUserSuccess(loginState));

        return response;
    }
}

export const signUpAdminHandler = (admin, adminKey) => {
    return async function() {
        const response = await signUpAdmin(admin, adminKey);
        return response;
    }
}

export const loginAdminHandler = (creds) => {
    return async function(dispatch) {
        const response = await loginAdmin(creds);

        const loginState = {
            id : response.data.id,
            email : creds.email,
            firstName : response.data.firstName,
            lastName : response.data.lastName,
            password : creds.password,
            imageUrl : response.data.imageUrl,
            role: response.data.role
        }     
        dispatch(loginUserSuccess(loginState));

        return response;
    }
}