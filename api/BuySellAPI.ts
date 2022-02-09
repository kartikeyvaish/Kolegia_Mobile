// Client import
import { ApiResponse } from "apisauce";

// Local types imports
import apiClient from "./client";
import configurations from "../config/config";

// Main route for BuySell
const BuySellRoute = configurations.buysell_route;

// Endpoints
const create_buy_sell = `${BuySellRoute}/create-new-buysell-product`;
const edit_buysell_item = `${BuySellRoute}/edit-buy-sell-product`;
const get_own_buy_sell = `${BuySellRoute}/get-own-buy-sell-list`;
const delete_buy_sell = `${BuySellRoute}/delete-buy-sell-product`;
const get_buysell_details = `${BuySellRoute}/get-buysell-product-details`;
const get_buy_sell_feed = `${BuySellRoute}/get-buy-sell-feed`;
const search_buy_sell = `${BuySellRoute}/search-buy-sell-products`;

// GetBuySellFeed Endpoint function
function GetBuySellFeed(after: string, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        get_buy_sell_feed,
        { after: after },
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// SearchBuySellItems Endpoint function
function SearchBuySellItems(search: string, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        search_buy_sell,
        { search: search },
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// PostNewBuySellItem Endpoint function
function PostNewBuySellItem(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.post(create_buy_sell, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    })
}

// Edit Buy Sell Item Endpoint function
function EditBuySellItem(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.put(edit_buysell_item, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    })
}

// Get Own Buy Sell List Endpoint function
function GetBuySellProductDetails(product_id: string, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        get_buysell_details,
        { product_id: product_id },
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// Get Own Buy Sell List Endpoint function
function GetOwnBuySellList(Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        get_own_buy_sell,
        {},
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// DeleteBuySellItem Endpoint function
function DeleteBuySellItem(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.delete(
        delete_buy_sell,
        {},
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
            data: DATA,
        }
    );
}

// Object containing all endpoints
const BuySellAPI = {
    PostNewBuySellItem,
    EditBuySellItem,
    GetBuySellProductDetails,
    GetOwnBuySellList,
    DeleteBuySellItem,
    GetBuySellFeed,
    SearchBuySellItems
}

// Exporting Auth Endpoints
export default BuySellAPI;