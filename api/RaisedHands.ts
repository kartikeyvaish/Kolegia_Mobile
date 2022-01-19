// Client import
import { ApiResponse } from "apisauce";
import apiClient from "./client";

const RaisedHandRoute = "/raisedhands";

// Endpoints
const raise_a_hand = `${RaisedHandRoute}/raise-hand-on-an-item`;

// RaiseHand Endpoint function
function RaiseHandOnItem(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.post(raise_a_hand, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// object to export
const RaisedHandAPI = {
    RaiseHandOnItem,
};

// Export the API
export default RaisedHandAPI;