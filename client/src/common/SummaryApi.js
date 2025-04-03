// all api end point are here
// why i can create this file because every time every file like login, register etc not api handle code write individually
// here all path all files api path here in one file for handle api a big project o handle domain for api easily


export const baseURL = import.meta.env.VITE_BACKEND_URL;

const SummaryApi = {

    register: {
        url: '/api/user/register',
        method: 'post'
    },

    login: {
        url: '/api/user/login',
        method: 'post'
    },

    userDetails: {
        url: '/api/user/user-details',
        method: 'get'
    },
    logout: {
        url: '/api/user/logout',
        method: 'get'
    },
    forgort_password: {
        url: '/api/user/forgot-password',
        method: 'put'
    },

    forgot_password_otp_verification: {
        url: '/api/user/verify-forgot-password-otp',
        method: 'put'
    },

    resetPassword: {
        url: '/api/user/reset-password',
        method: 'put'
    },

    refreshToken: {
        url: '/api/user/refresh-token',
        method: 'post'
    },
    uploadAvatar: {
        url: "/api/user/upload-avatar",
        method: "put"
    },
    updateUserDetails: {
        url: "/api/user/update-user",
        method: "put"
    },
    // api category from index.js and add-category from category.route.js
    addCategory: {
        url: "/api/category/add-category",
        method: "post"
    },
    // api /api/category from index.js and /upload from upload.route.js
    uploadImage: {
        url: "/api/file/upload",
        method: "post"
    },
    // api /api/category from index.js and /get from category.route.js
    getCategory: {
        url: "/api/category/get",
        method: "get"
    },
    // api /api/category from index.js and /update from category.route.js put method for update
    updateCategory: {
        url: "/api/category/update",
        method: "put"
    },
    // api /api/category from index.js and /delete from category.route.js delete method for delete
    deleteCategory: {
        url: "/api/category/delete",
        method: "delete"
    },
    // Sub Category Api
    // api /api/sub-category from index.js and /create from subCategory.route.js
    createSubCategory: {
        url: "/api/sub-category/create",
        method: "post"
    },
    // api /api/sub-category from index.js and /get from subCategory.route.js
    getSubCategory: {
        url: "/api/sub-category/get",
        method: "post"
    },
    // api /api/sub-category from index.js and /update from subCategory.route.js
    updateSubCategory: {
        url: "/api/sub-category/update",
        method: "put"
    },
    // api /api/sub-category from index.js and /delete from subCategory.route.js
    deleteSubCategory: {
        url: "/api/sub-category/delete",
        method: "delete"
    },

    // api /api/product from index.js and /create from product.route.js
    createProduct: {
        url: "/api/product/create",
        method: "post"
    },
    // api /api/product from index.js and /get from product.route.js
    getAllProduct: {
        url: "/api/product/get",
        method: "post"
    },

    // api /api/product from index.js and /get-product-by-categoryfrom product.route.js
    getProductByCategory: {
        url: "/api/product/get-product-by-category",
        method: "post"
    },

    // api /api/product from index.js and /get-product-by-category-and-subcategory from product.route.js
    getProductByCategoryAndSubCategory: {
        url: "/api/product/get-product-by-category-and-subcategory",
        method: "post"
    },

    // api /api/product from index.js and /get-product-details from product.route.js
    getProductDetails: {
        url: "/api/product/get-product-details",
        method: "post"
    },

    // api /api/product from index.js and /update-product-details from product.route.js
    updateProductDetails: {
        url: "/api/product/update-product-details",
        method: "put"
    },

    // api /api/product from index.js and /delete-product from product.route.js
    deleteProduct: {
        url: "/api/product/delete-product",
        method: "delete"
    },

    // api /api/product from index.js and /search-product from product.route.js
    searchProduct: {
        url: "/api/product/search-product",
        method: "post"
    },

    //
    addToCart: {
        url: "/api/cart/create",
        method: "post"
    },
    //
    getCartItem: {
        url: "/api/cart/get",
        method: "get"
    },
    // 
    updateCartItemQty: {
        url: "/api/cart/update-qty",
        method: "put"
    },
    // 
    deleteCartItem: {
        url: "/api/cart/delete-cart-item",
        method: "delete"
    },

    //
    createAddress :{
        url: "/api/address/create",
        method:"post"
    },
    //
    getAddress :{
        url: "/api/address/get",
        method:"get"
    },
    //
    updateAddress :{
        url: "/api/address/update",
        method:"put"
    },
    //
    disableAddress :{
        url: "/api/address/disable",
        method:"delete"
    },


    // order api
    //
    cashOnDelivaryOrder :{
        url: "/api/order/cash-on-delivery",
        method:"post"
    },
    //
    payment_url :{
        url: "/api/order/checkout",
        method:"post"
    },
    //
    getOrderItems :{
        url: "/api/order/order-list",
        method:"get"
    },

    


}

export default SummaryApi