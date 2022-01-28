// Client import
import { ApiResponse } from "apisauce";

// Local types imports
import apiClient from "./client";
import configurations from "../config/config";

// Main route for Requirement endpoints
const RequirementsRoute = configurations.requirements_route;

// Endpoints
const new_requirement = `${RequirementsRoute}/create-a-requirement`;
const get_own_requirements = `${RequirementsRoute}/get-own-requirements`;
const edit_requirement = `${RequirementsRoute}/edit-a-requirement`;
const delete_requirement = `${RequirementsRoute}/delete-requirement`;
const requirement_feed = `${RequirementsRoute}/get-requirement-feed`;

// RequirementFeed Endpoint function
function RequirementFeed(after: string, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        requirement_feed,
        { after: after },
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// PostNewRequirement Endpoint function
function PostNewRequirement(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.post(new_requirement, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// EditRequirement Endpoint function
function EditRequirement(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.put(edit_requirement, DATA, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
}

// Get Own Requirements List Endpoint function
function GetOwnRequirementsList(Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.get(
        get_own_requirements,
        {},
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
}

// DeleteRequirement Endpoint function
function DeleteRequirement(DATA: any, Token: string): Promise<ApiResponse<any, any>> {
    return apiClient.delete(
        delete_requirement,
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
const RequirementsAPI = {
    PostNewRequirement,
    GetOwnRequirementsList, EditRequirement, DeleteRequirement, RequirementFeed
}

// Exports
export default RequirementsAPI;