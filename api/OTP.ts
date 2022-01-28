// Client import
import { ApiResponse } from "apisauce";

// Local types imports
import apiClient from "./client";
import configurations from "../config/config";

// Main Route for OTP Endpoints
const OTPRoute = configurations.otp_route;

// Endpoints
const verify_otp = `${OTPRoute}/verify-otp`;

// VerifyOTP Endpoint function
function VerifyOTP(DATA: any): Promise<ApiResponse<any, any>> {
    return apiClient.post(verify_otp, DATA);
}

// object containing all endpoints
const OTP_API = {
    VerifyOTP,
}

// Exports
export default OTP_API;