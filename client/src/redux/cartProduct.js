import { createSlice } from "@reduxjs/toolkit";

// X_X
const initialState = {
    cart : []
};

const cartSlice = createSlice({
    name: "cartItem",
    initialState : initialState,
    reducers: {
        handleAddItemCart: (state, action) => {
            state.cart = [...action.payload]
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload);
        },
    },
});

export const { handleAddItemCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;