/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../redux/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { PriceWithDiscount } from "../utils/PriceWithDiscount";
import { setUserDetails } from '../redux/userSlice'
import { handleAddAddress } from "../redux/addressSlice";
//import { useNavigate } from "react-router-dom";
import {setOrder} from "../redux/orderSlice"


// this line full meaning is to create a context, when we want to use this context we have to use useContext
export const GlobalContext = createContext(null);

// this line full meaning is 
export const useGlobalContext = () => useContext(GlobalContext);

// eslint-disable-next-line react/prop-types
const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch();
    // total price
    const [totalPrice, setTotalPrice] = useState(0);
    //
    const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
    // total cart items
    const [totalQty, setTotalQty] = useState(0);

    const cartItem = useSelector((state) => state?.cartItem.cart);

    const user = useSelector((state) => state?.user);



    const fetchCartItem = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getCartItem,
            })
            // destructure the response because response is an object and we want to get the data
            const { data: responseData } = response

            if (responseData.success) {
                //console.log(responseData.data);
                dispatch(handleAddItemCart(responseData.data))
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    const updateCartItem = async (id, qty) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateCartItemQty,
                data: {
                    _id: id,
                    qty: qty
                }
            })

            // destructure the response because response is an object and we want to get the data
            const { data: responseData } = response

            if (responseData.success) {
                //toast.success(responseData.message)
                fetchCartItem()
                return responseData
            }
        } catch (error) {
            AxiosToastError(error)
            return error
        }
    }

    const deleteCartItem = async (cartId) => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCartItem,
                data: {
                    _id: cartId
                }
            })

            // destructure the response because response is an object and we want to get the data
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                fetchCartItem()
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    // useEffect(() => {
    //     fetchCartItem()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const fetchAddress = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getAddress
            })

            // destructure the response because response is an object and we want to get the data
            const { data: responseData } = response

            // if response is success then set the data
            if (responseData.success) {
                //console.log(responseData.data);
                dispatch(handleAddAddress(responseData.data))
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const fetchOrder = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getOrderItems,
            })

            // destructure the response because response is an object and we want to get the data
            const { data: responseData } = response

            if (responseData.success) {
                //console.log(responseData.data);
                dispatch(setOrder(responseData.data))
            }
            
        } catch (error) {
            AxiosToastError(error)
        }
    }


    // this is use for when i logout then clear the cart suppose we use window.location.reload(); then huge load or presure on server
    useEffect(() => {
        if (user?._id) {
            fetchCartItem()
            fetchAddress()
            fetchOrder()
        }
        else {
            dispatch(handleAddItemCart([]));  // Clear cart when user logs out
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])


    const handleLogoutOut = () => {
        dispatch(handleAddItemCart([]));
        dispatch(setUserDetails(null)); // Optional: Clear user details from Redux
        localStorage.clear();
    };

    // total cart items and total price
    useEffect(() => {
        const qty = cartItem.reduce((preve, curr) => {
            return preve + curr.quantity;
        }, 0);
        //console.log(qty);
        setTotalQty(qty);

        const tprice = cartItem.reduce((preve, curr) => {
            const priceAfterDiscount = PriceWithDiscount(curr?.productId?.price, curr?.productId?.discount);

            return preve + (priceAfterDiscount * curr?.quantity);
        }, 0);
        //console.log(tprice);
        setTotalPrice(tprice);

        const notDiscountPrice = cartItem.reduce((preve, curr) => {
            return preve + (curr?.productId?.price * curr?.quantity);

        }, 0);
        setNotDiscountTotalPrice(notDiscountPrice)


    }, [cartItem]);



    return (
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartItem,
            deleteCartItem,
            fetchAddress,
            totalPrice,
            totalQty,
            cartItem,
            notDiscountTotalPrice,
            handleLogoutOut
        }}>
            {children}

        </GlobalContext.Provider>
    )
}

export default GlobalProvider 