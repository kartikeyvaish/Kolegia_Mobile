// Client import
import { ApiResponse } from "apisauce";

// Local Types Imports
import apiClient from "./client";
import configurations from "../config/config";

// Main Route for LostFound
const LostFoundRoute = configurations.lostfound_route;

// Endpoints
const create_buy_sell = `${LostFoundRoute}/create-new-lost-found-product`;
const get_own_lostfound = `${LostFoundRoute}/get-own-lost-found-list`;
const delete_lostfound = `${LostFoundRoute}/delete-lost-found-product`;
const get_lostfound_details = `${LostFoundRoute}/get-lost-found-product-details`;
const edit_lostfound = `${LostFoundRoute}/edit-lost-found-product`;
const get_lost_found_feed = `${LostFoundRoute}/get-lost-found-feed`;
const search_lost_found = `${LostFoundRoute}/search-lost-found-products`;
const mark_as_found = `${LostFoundRoute}/mark-as-found`;

// GetLostFoundFeed Endpoint function
function GetLostFoundFeed(after: string, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        get_lost_found_feed,
        { after: after },
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// SearchLostFoundItems Endpoint function
function SearchLostFoundItems(search: string, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        search_lost_found,
        { search: search },
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

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

// MarkAsFound Endpoint function
function MarkAsFound(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.put(mark_as_found, DATA, {
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
    GetLostFoundFeed,
    MarkAsFound,
    SearchLostFoundItems
}

// Exports
export default LostFoundAPI;