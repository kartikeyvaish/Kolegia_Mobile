// Client import
import { ApiResponse } from "apisauce";

// Packages Imports
import apiClient from "./client";
import configurations from "../config/config";

// Main Route for Auth Endpoints
const AuthRoute = configurations.auth_route;

// Endpoints
const editProfile = `${AuthRoute}/edit-profile`;
const login = `${AuthRoute}/login`;
const change_password = `${AuthRoute}/change-password`;
const google_login = `${AuthRoute}/google-login`;
const logout = `${AuthRoute}/logout`;
const register = `${AuthRoute}/register`;
const reset_password = `${AuthRoute}/reset-password`;
const send_email_verify_otp = `${AuthRoute}/send-email-register-otp`;
const send_password_reset_otp = `${AuthRoute}/send-forgot-password-otp`;
const toggle_push_notif = `${AuthRoute}/toggle-push-notifications`;
const get_dashboard_stats = `${AuthRoute}/get-dashboard-statistics`;

// GetDashboardStats Endpoint function
function GetDashboardStats(Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        get_dashboard_stats,
        {},
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

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

// ChangePassword Endpoint function
function ChangePassword(DATA: any, Token: any): Promise<ApiResponse<any, any>> {
    return apiClient.put(change_password, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// EditProfile Endpoint function
function EditProfile(DATA: any, Token: any): Promise<ApiResponse<any, any>> {
    return apiClient.put(editProfile, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// TogglePushNotification Endpoint function
function TogglePushNotification(Token: any): Promise<ApiResponse<any, any>> {
    return apiClient.put(toggle_push_notif, {}, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
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

// SendEmailVerifyOTP Endpoint function
function SendEmailVerifyOTP(DATA: any): Promise<ApiResponse<any, any>> {
    return apiClient.post(send_email_verify_otp, DATA);
}

// SendPasswordResetOTP Endpoint function
function SendPasswordResetOTP(DATA: any): Promise<ApiResponse<any, any>> {
    return apiClient.post(send_password_reset_otp, DATA);
}

// ResetPassword Endpoint function
function ResetPassword(DATA: any): Promise<ApiResponse<any, any>> {
    return apiClient.post(reset_password, DATA);
}

// Object containing all endpoints
const AuthAPI = {
    Login,
    GoogleLogin,
    Register,
    Logout,
    ChangePassword,
    EditProfile,
    TogglePushNotification,
    SendEmailVerifyOTP,
    SendPasswordResetOTP,
    ResetPassword,
    GetDashboardStats
};


// Exporting Auth Endpoints
export default AuthAPI;
