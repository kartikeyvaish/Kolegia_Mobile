// packages imports
import { create } from "apisauce";

// Local imports
import config from "../config/config";

// Creating the API Client
const apiClient = create({
    baseURL: config.baseUrl + config.api_version,
    timeout: 15000,
});

// Exports
export default apiClient;