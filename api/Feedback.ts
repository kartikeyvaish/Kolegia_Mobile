// Client import
import { ApiResponse } from "apisauce";

// Local Types Imports
import apiClient from "./client";
import configurations from "../config/config";

// Main Route for Feedback
const FeedBackRoute = configurations.feedback_route;

// Endpoints
const get_feedbacks = `${FeedBackRoute}/get-feedbacks`;
const post_feedback = `${FeedBackRoute}/post-feedback`;

// GetFeedbacks Endpoint function
function GetFeedbacks(): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        get_feedbacks,
    );
}

// function to post feedback
function PostFeedback(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.post(post_feedback, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// object containing all endpoints
const FeedBackAPI = {
    GetFeedbacks,
    PostFeedback
}

// Exports
export default FeedBackAPI;