
// const BASE_URL = 'http://ec2-52-66-250-210.ap-south-1.compute.amazonaws.com/ems/api/'; 
const BASE_URL = 'http://192.168.1.8:80/ems/api/'; 
// const BASE_URL = '192.168.1.8/ems/api/users'; 

// Define endpoints as constants
const ENDPOINTS = {
    LOGIN: 'users/login',
    SIGNUP: 'users/create',
    USER: 'user',
    POSTBusiness: 'vendors_business/create',
    GetBusiness: 'vendors_business',
    GetCategory: 'categories',
    GetSubCategory: 'sub_categories',
    GetCategoryData: 'categories/getcategoriesdata',
    GetCartData: 'cart',
    PostCartData: 'cart/create',
    RemoveIndividualCartData: 'cart/delete',
    GetVendorTypes:'vendor_types',
    SaveAddress:'address/add_address',
    GetAddresses : 'address/getaddresses',
    UpdateDefaultAddress : 'address/updatedefaultaddress',
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
export const GetSubCategory = () => buildUrl(ENDPOINTS.GetSubCategory);
export const GetCategoryData = () => buildUrl(ENDPOINTS.GetCategoryData);
export const GetCartData = () => buildUrl(ENDPOINTS.GetCartData);
export const PostCartData = () => buildUrl(ENDPOINTS.PostCartData);
export const RemoveIndividualCartData = () => buildUrl(ENDPOINTS.RemoveIndividualCartData);
export const GetVendorTypes = () => buildUrl(ENDPOINTS.GetVendorTypes);
export const SaveAddress = () => buildUrl(ENDPOINTS.SaveAddress);
export const GetAddresses = () => buildUrl(ENDPOINTS.GetAddresses);
export const UpdateDefaultAddress = () => buildUrl(ENDPOINTS.UpdateDefaultAddress);


