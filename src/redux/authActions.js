import { signUpUser, loginUser, signUpCompany, loginCompany, signUpAdmin, loginAdmin } from "../api/apiCalls";

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

export const updateUserSuccess = ({ name, surname, password, logo_path }) => {
    return {
        type : 'update-user-success',
        data : {
            name,
            surname,
            password,
            logoPath: logo_path
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
        console.log(response.data);

        const loginState = {
            id : response.data.id,
            email : creds.email,
            name : response.data.firstName,
            surname : response.data.lastName,
            password : creds.password,
            logoPath : response.data.imageUrl,
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
        console.log(response.data);

        const loginState = {
            id : response.data.id,
            email : creds.email,
            name : response.data.firstName,
            surname : response.data.lastName,
            password : creds.password,
            logoPath : response.data.imageUrl,
            role: response.data.role
        }     
        dispatch(loginUserSuccess(loginState));

        return response;
    }
}