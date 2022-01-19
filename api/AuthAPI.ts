// Client import
import { ApiResponse } from "apisauce";
import apiClient from "./client";

const AuthRoute = "/auth";

// Endpoints
const login = `${AuthRoute}/login`;
const google_login = `${AuthRoute}/google-login`;
const register = `${AuthRoute}/register`;
const logout = `${AuthRoute}/logout`;

// Login Endpoint function
function Login(DATA: any): Promise<ApiResponse<any, any>> {
    return apiClient.post(login, DATA);
}

// Google Login Endpoint function
function GoogleLogin(DATA: any): Promise<ApiResponse<any, any>> {
    return apiClient.post(google_login, DATA);
}

// Register Endpoint function
function Register(DATA: any): Promise<ApiResponse<any, any>> {
    return apiClient.post(register, DATA);
}

// logout endpoint function
function Logout(Token: any): Promise<ApiResponse<any, any>> {
    return apiClient.delete(
        logout,
        {},
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// Object containing all endpoints
const AuthAPI = {
    Login,
    GoogleLogin,
    Register,
    Logout,
};


// Exporting Auth Endpoints
export default AuthAPI;
