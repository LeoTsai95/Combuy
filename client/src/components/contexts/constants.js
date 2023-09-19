// API Endpoints

const BASE_URL = 'http://localhost:2407';

export const API_ENDPOINTS = {
    LOCALHOST: BASE_URL,
    PRODUCT: `${BASE_URL}/products`,
    PRODUCT_BY_ID: (id) => `${BASE_URL}/getProductsAllData/${id}`, 
    CREATE_PRODUCT: `${BASE_URL}/createProduct`,
    CATEGORY: `${BASE_URL}/category`,        
    BRAND: `${BASE_URL}/brand`,               
    DOWN: `${BASE_URL}/down`,
    DOWN_API: `${BASE_URL}/downproducts`,
    UPDATE_PRODUCT_PARTIALLY: (id) => `${BASE_URL}/updateProductPartially/${id}`

};

// User
export const USER_ID = 1;

// Checkbox Option
export const PAYMENT_OPTIONS = [
    { id: "bank_transfer", label: "銀行或郵局轉帳", value: "0" },
    { id: "credit_card", label: "信用卡(一次付清)", value: "1" }
];

export const TRANSPORT_OPTIONS = [
    { id: "postal_delivery", label: "郵寄寄送", value: "0" },
    { id: "courier_delivery", label: "宅配/快遞", value: "1" }
];

export const FAILSTEXT = '操作失敗，請再試一次。'

export const SAVE = {
    SAVE: '儲存',
    SAVEANDPUBLISH: '儲存並上架'
}