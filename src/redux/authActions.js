import { signUpUser, loginUser, signUpCompany, loginCompany, signUpAdmin } from "../api/apiCalls";

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

        const loginState = {
            id : response.data.data.userid,
            email : creds.email,
            name : response.data.data.name,
            surname : response.data.data.surname,
            password : creds.password,
            logoPath : response.data.data.logo_path
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