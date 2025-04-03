/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useGlobalContext } from "../provider/GlobalProvider"
import SummaryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
import addLoading from "../assets/Spinner_Loading.gif"
import { useSelector } from "react-redux"


import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";



const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    //console.log(cardItem);
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemDetails] = useState()



    const handleADDToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation() // to stop the event from bubbling up to the parent element

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addToCart,
                data: {
                    productId: data?._id,
                }
            })

            // destructure the response because response is an object and we want to get the data
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                // call the fetchCartItem function
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    // check if the product is already in the cart
    useEffect(() => {
        const checkingItem = cartItem.some(item => item.productId._id === data._id)
        setIsAvailableCart(checkingItem)

        const productQty = cartItem.find(item => item.productId._id === data._id)
        setQty(productQty?.quantity)
        setCartItemDetails(productQty)

    }, [data, cartItem])

    const increaseQty = async (e) => {
        // when i click on the button i want to stop the event from bubbling up to the parent element
        e.preventDefault()
        // when i click on this button then not trigger the the productDisplay page
        e.stopPropagation()

        // if (qty === data.stock) {
        //     toast.error("Product is out of stock")
        //     return
        // }

        if (qty + 1 > data.stock) {
            toast.error("Cannot add more, stock limit reached!");
            return;
        }

        const response = await updateCartItem(cartItemDetails?._id, qty + 1)

        if (response.success) {
            toast.success("Item Added")
        }

    }

    const decreaseQty = async (e) => {
        // when i click on the button i want to stop the event from bubbling up to the parent element
        e.preventDefault()
        // when i click on this button then not trigger the the productDisplay page
        e.stopPropagation()

        if (qty === 1) {
            deleteCartItem(cartItemDetails?._id)
        }
        else {
            const response = await updateCartItem(cartItemDetails?._id, qty - 1)

            if (response.success) {
                toast.success("Item Removed")
            }
        }
    }

    return (
        <>
            {
                isAvailableCart ? (
                    <div className="lg:flex items-center gap-2 lg:mr-0 mr-2">
                        <button className="bg-red-600 hover:bg-red-700 text-white lg:px-2 px-[6px] lg:py-2 py-[5px] lg:mt-0 mt-[-4px]  rounded-md cursor-pointer font-medium " onClick={decreaseQty}>
                            <FaMinus size={14} />
                        </button>
                        <p className="mx-2 lg:mx-0 font-mono">
                            {qty}
                        </p>
                        <button className="bg-green-600 hover:bg-green-700 text-white lg:px-2 px-[6px] lg:py-2 py-[5px] lg:mt-0 mt-[-4px]  rounded-md cursor-pointer font-medium " onClick={increaseQty}>
                            <FaPlus size={14} />
                        </button>
                    </div>
                ) : (

                    <button onClick={handleADDToCart} className="bg-green-600 hover:bg-green-700 text-white lg:px-4 px-[6px] lg:py-2 py-[5px] lg:mt-0 mt-[-4px]  rounded-md cursor-pointer font-medium ">
                        {
                            loading ? <img src={addLoading} className="w-7 h-7" alt="" /> : "Add"
                        }
                    </button>
                )
            }

        </>
    )
}

export default AddToCartButton