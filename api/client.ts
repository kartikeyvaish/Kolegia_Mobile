// packages imports
import { create } from "apisauce";

// Local imports
import config from "../config/config";
import ToastMessages from './../constants/Messages';

// Creating the API Client
const apiClient = create({
    baseURL: config.baseUrl + config.api_version,
    timeout: 15000,
    timeoutErrorMessage: ToastMessages.SERVER_ERROR_MESSAGE,
});

// Exports
export default apiClient;