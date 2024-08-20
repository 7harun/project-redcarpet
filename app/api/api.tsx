
const BASE_URL = 'http://ec2-52-66-250-72.ap-south-1.compute.amazonaws.com/ems/api/users'; 

// Define endpoints as constants
const ENDPOINTS = {
    LOGIN: '/login',
    SIGNUP: '/create',
    USER: '/user',
    // Add other endpoints here
};

// Function to build the full URL for an endpoint
export const buildUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;

// Export the API functions
export const loginUrl = () => buildUrl(ENDPOINTS.LOGIN);
export const signupUrl = () => buildUrl(ENDPOINTS.SIGNUP);
export const userUrl = () => buildUrl(ENDPOINTS.USER);
