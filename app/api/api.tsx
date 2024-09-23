
const BASE_URL = 'http://ec2-52-66-250-210.ap-south-1.compute.amazonaws.com/ems/api/'; 
// const BASE_URL = 'http://192.168.1.7:80/ems/api/'; 
// const BASE_URL = '192.168.1.8/ems/api/users'; 

// Define endpoints as constants
const ENDPOINTS = {
    LOGIN: 'users/login',
    SIGNUP: 'users/create',
    USER: 'user',
    POSTBusiness: 'vendors_business/create',
    GetBusiness: 'vendors_business',
    GetCategory: 'categories',
    GetCategoryData: 'categories/getcategoriesdata',
    // Add other endpoints here
};

// Function to build the full URL for an endpoint
export const buildUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;

// Export the API functions
export const loginUrl = () => buildUrl(ENDPOINTS.LOGIN);
export const signupUrl = () => buildUrl(ENDPOINTS.SIGNUP);
export const userUrl = () => buildUrl(ENDPOINTS.USER);
export const POSTBusinessUrl = () => buildUrl(ENDPOINTS.POSTBusiness);
export const GetBusiness = (vendorId: string | number) => buildUrl(`${ENDPOINTS.GetBusiness}/${vendorId}`);
export const GetCategory = () => buildUrl(ENDPOINTS.GetCategory);
export const GetCategoryData = () => buildUrl(ENDPOINTS.GetCategoryData);
