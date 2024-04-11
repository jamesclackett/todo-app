/// AUTH SERVICE:
// Simplifies API queries for other services and components

import { API, HTTP_METHOD, queryAPI } from "./queryService"

// send login request to the backend
export const loginUser = async (user) => {
    return await queryAPI(HTTP_METHOD.POST, API.AUTH + '/login', user);
}

// send register request to the backend
export const registerUser = async (user) => {
    return await queryAPI(HTTP_METHOD.POST, API.AUTH + '/register', user);
}


