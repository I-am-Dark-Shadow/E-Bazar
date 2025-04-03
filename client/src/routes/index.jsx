import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import SearchPage from '../pages/SearchPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import OtpVerificationPage from '../pages/OtpVerificationPage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import UserMenuPageMobile from '../pages/UserMenuPageMobile'
import Dashboard from '../layouts/Dashboard'
import Profile from '../pages/Profile'
import MyOrders from '../pages/MyOrders'
import Address from '../pages/Address'
import OrdersHistory from '../pages/OrdersHistory'
import EditProfile from '../pages/EditProfile'
import CategoryPage from '../pages/CategoryPage'
import SubCategoryPage from '../pages/SubCategoryPage'
import UploadProductPage from '../pages/UploadProductPage'
import ProductsPage from '../pages/ProductsPage'
import AdminPermision from '../layouts/AdminPermision'
import ProductListPage from '../pages/ProductListPage'
import ProductDisplayPage from '../pages/ProductDisplayPage'
import CartMobile from '../pages/CartMobile'
import CheckoutPage from '../pages/CheckoutPage'
import Success from '../pages/Success'
import PaymentCancel from '../pages/PaymentCancel'



const router = createBrowserRouter([
    {
        path: '/',
        // my main file is app.js
        element: <App />,

        // all pages path in children array
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordPage />
            },
            {
                path: 'verification-otp',
                element: <OtpVerificationPage />
            },
            {
                path: 'reset-password',
                element: <ResetPasswordPage />
            },
            {
                path: 'user',
                element: <UserMenuPageMobile />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "editprofile",
                        element: <EditProfile />
                    },
                    {
                        path: "myorders",
                        element: <MyOrders />
                    },
                    {
                        path: "address",
                        element: <Address />
                    },
                    {
                        path: "ordershistory",
                        element: <OrdersHistory />
                    },
                    {
                        path: "category",
                        element: <AdminPermision><CategoryPage /></AdminPermision>
                    },
                    {
                        path: "subcategory",
                        element: <AdminPermision><SubCategoryPage /></AdminPermision>
                    },
                    {
                        path: "uploadproduct",
                        element: <AdminPermision><UploadProductPage /></AdminPermision>
                    },
                    {
                        path: "products",
                        element: <AdminPermision><ProductsPage /></AdminPermision>
                    },

                ]
            },

            {
                path: ":category",
                children: [
                    {
                        path: ":subCategory",
                        element: <ProductListPage />
                    }
                ]
            },
            {
                path: "product/:product",
                element: <ProductDisplayPage />
            },

            {
                path: 'cart',
                element: <CartMobile />
            },
            {
                path: "checkout",
                element: <CheckoutPage />
            },
            {
                path: "success",
                element: <Success />
            },
            {
                path: "payment-cancel",
                element: <PaymentCancel />
            },
            

        ]
    }

])

export default router