import {createSlice} from "@reduxjs/toolkit";

// initialValue is used to set the initial value of the state
const initialValue = {
    allCategory: [],
    loadingCategory: false,
    allSubCategory: [],
    allProduct: []
};

// createSlice is used to create a slice of the state    
const productSlice = createSlice({
    name: "product",
    initialState: initialValue,
    reducers: {
        setAllCategory: (state, action) => {
            // [...action.payload] it's mean here we are creating a new array and adding all the value of action.payload
            state.allCategory = [...action.payload]
        },
        setLoadingCategory: (state, action) => {
            state.loadingCategory = action.payload
        },
        setAllSubCategory: (state, action) => {
            state.allSubCategory = [...action.payload]
        },
        setAllProduct: (state, action) => {
            state.allProduct = [...action.payload]
        },
        
    }
})

// actions is used to get the value of the state
export const { setAllCategory, setAllSubCategory, setAllProduct, setLoadingCategory } = productSlice.actions

// reducer is used to get the value of the state
export default productSlice.reducer