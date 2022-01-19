// Client import
import { ApiResponse } from "apisauce";
import apiClient from "./client";

const LostFoundRoute = "/lost-found-items";

// Endpoints
const create_buy_sell = `${LostFoundRoute}/create-new-lost-found-product`;
const get_own_lostfound = `${LostFoundRoute}/get-own-lost-found-list`;
const delete_lostfound = `${LostFoundRoute}/delete-lost-found-product`;
const get_lostfound_details = `${LostFoundRoute}/get-lost-found-product-details`;
const edit_lostfound = `${LostFoundRoute}/edit-lost-found-product`;

// PostLostFoundItem Endpoint function
function PostLostFoundItem(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.post(create_buy_sell, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// Edit Buy Sell Item Endpoint function
function EditLostFoundItem(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.put(edit_lostfound, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// Get Lost Found Item Details Endpoint function
function GetLostFoundItemDetails(product_id: string, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        get_lostfound_details,
        { product_id: product_id },
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// Get Own Buy Sell List Endpoint function
function GetOwnLostFoundItems(Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        get_own_lostfound,
        {},
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// DeleteLostFoundItem Endpoint function
function DeleteLostFoundItem(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.delete(
        delete_lostfound,
        {},
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
            data: DATA,
        }
    );
}

// object containing all endpoints
const LostFoundAPI = {
    PostLostFoundItem,
    EditLostFoundItem,
    GetLostFoundItemDetails,
    GetOwnLostFoundItems,
    DeleteLostFoundItem,
}

// Exports
export default LostFoundAPI;