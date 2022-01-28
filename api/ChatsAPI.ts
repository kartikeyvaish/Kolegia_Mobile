// Client import
import { ApiResponse } from "apisauce";

// Local types imports
import apiClient from "./client";
import configurations from "../config/config";

// Main Route for Chats Endpoints
const ChatsRoute = configurations.chats_route;

// Endpoints
const get_chats = `${ChatsRoute}/get-chats`;
const get_messages = `${ChatsRoute}/get-messages`;
const mark_as_read = `${ChatsRoute}/mark-as-read`;
const send_message = `${ChatsRoute}/send-message`;
const contact_seller = `${ChatsRoute}/get-or-create-chat-room`;

// GetChats Endpoint function
function GetChats(Token: any): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        get_chats,
        {},
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// GetChats Endpoint function
function GetMessages(Params: any, Token: any): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        get_messages,
        Params,
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// Mark as Read Endpoint
function MarkAsRead(room_id: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.put(mark_as_read, { room_id: room_id }, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// SendMessage Endpoint function
function SendMessage(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.post(send_message, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// ContactSeller Endpoint function
function ContactSeller(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.post(contact_seller, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// object containing all endpoints
const ChatsAPI = {
    GetChats,
    GetMessages,
    MarkAsRead,
    SendMessage,
    ContactSeller,
}

// Exports
export default ChatsAPI;