// Client import
import { ApiResponse } from "apisauce";

// Local types imports
import apiClient from "./client";
import configurations from "../config/config";

// Main route for RaisedHands Endpoints
const RaisedHandRoute = configurations.raisedhands_route;

// Endpoints
const raise_a_hand = `${RaisedHandRoute}/raise-hand-on-an-item`;
const get_raisedHands_list = `${RaisedHandRoute}/get-raised-responses`;
const accept_raised_hand = `${RaisedHandRoute}/accept-raised-hand`;
const reject_raised_hand = `${RaisedHandRoute}/reject-raised-hand`;

// RaiseHand Endpoint function
function RaiseHandOnItem(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.post(raise_a_hand, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// GetRaisedHands Endpoint function
function GetRaisedHands(Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        get_raisedHands_list,
        {},
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// Accept a Raise hand
function AcceptRaisedhand(product_id: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.post(accept_raised_hand, { _id: product_id }, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// Reject a raised hand
function RejectRaisedHand(product_id: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.delete(reject_raised_hand, {}, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
        data: { _id: product_id }
    });
}

// object to export
const RaisedHandAPI = {
    RaiseHandOnItem,
    GetRaisedHands,
    AcceptRaisedhand,
    RejectRaisedHand
};

// Export the API
export default RaisedHandAPI;