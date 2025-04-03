import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartProduct";
import addressReducer from "./addressSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
    // reducer mean is a function that accept state and action and return new state
    reducer: {
        // reducers
        user : userReducer,
        product : productReducer,
        cartItem : cartReducer,
        addresses : addressReducer,
        orders : orderReducer
    }
})