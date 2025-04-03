import { useState } from "react";
import Divider from "../components/Divider";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceIndianRuppe } from "../utils/DisplayPriceIndianRuppe";

import { IoCashOutline } from "react-icons/io5";
import { RiSecurePaymentLine } from "react-icons/ri";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';


const CheckoutPage = () => {
    const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, } = useGlobalContext();
    const deliveryCharge = 199;

    const [openAddress, setOpenAddress] = useState(false);

    const addressList = useSelector((state) => state?.addresses?.addressList);

    const [selectAddress, setSelectAddress] = useState();

    const navigate = useNavigate();

    const availableCities = [
        "Basirhat", "BASIRHAT", "basirhat",
        "Kolkata", "KOLKATA", "kolkata",
        "Howrah", "HOWRAH", "howrah",
    ];

    const cartItemsList = useSelector((state) => state?.cartItem?.cart);

    const handleCashOnDelivery = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.cashOnDelivaryOrder,
                data: {
                    list_items: cartItemsList,
                    totalAmt: totalPrice,
                    addressId: addressList[selectAddress]?._id,
                    subTotalAmt: totalPrice < 499 ? totalPrice + deliveryCharge : totalPrice
                }
            });

            const { data: responseData } = response;
            //console.log("responseData",responseData);


            if (responseData.success) {
                toast.success(responseData.message);
                if (fetchCartItem) {
                    fetchCartItem();
                }
                navigate("/success", {
                    state: {
                        text: "Order Placed",
                        orderId: responseData.data[0].orderId,
                        subTotalAmt: totalPrice < 499 ? totalPrice + deliveryCharge : totalPrice
                    }
                });
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleOnlinePayment = async () => {
        try {
            toast.loading("Loading...");
            const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
            // console.log("Stripe Public Key:", stripePublicKey);
            const stripePromise = await loadStripe(stripePublicKey);


            const response = await Axios({
                ...SummaryApi.payment_url,
                data: {
                    list_items: cartItemsList,
                    totalAmt: totalPrice,
                    addressId: addressList[selectAddress]?._id,
                    subTotalAmt: totalPrice < 499 ? totalPrice + deliveryCharge : totalPrice
                }
            });

            // destructure the response because response is an object and we want to get the data
            const { data: responseData } = response;
            //console.log("responseData",responseData);

            stripePromise.redirectToCheckout({
                sessionId: responseData.id
            })

            // if (responseData.success) {
            //     toast.success(responseData.message);
            //     if (fetchCartItem) {
            //         fetchCartItem();
            //     }
            //     navigate("/success", {
            //         state: {
            //             text: "Order Placed",
            //             orderId: responseData.data[0].orderId,
            //             subTotalAmt: totalPrice < 499 ? totalPrice + deliveryCharge : totalPrice
            //         }
            //     });
            // }
        } catch (error) {
            AxiosToastError(error);
            console.log(error);
            
        }
    };

    return (
        <section className="bg-white">
            <div className="container mx-auto py-4 px-8 flex flex-col lg:flex-row w-full gap-5 justify-between">
                {/* address section */}
                <div className="w-full">
                    <h3 className="text-3xl font-semibold uppercase underline kode_mono_bold">
                        Choose your address
                    </h3>

                    <div>
                        {
                            addressList?.length > 0 ? (
                                addressList?.map((address, index) => {
                                    const isDeliveryAvailable = availableCities.includes(address.city);
                                    return (
                                        <div key={address._id || index}> {/* Ensure unique key */}
                                            <label
                                                htmlFor={"address" + index}
                                                className={!address.status ? "hidden" : ""}
                                            >
                                                <div className="mt-4 bg-yellow-50 hover:bg-yellow-100 cursor-pointer border-2 border-dashed border-yellow-500 rounded-lg p-4 flex gap-1">
                                                    {/* address content */}
                                                    <div className="">
                                                        <input
                                                            id={"address" + index}
                                                            type="radio"
                                                            value={index}
                                                            onChange={(e) => setSelectAddress(e.target.value)}
                                                            name="address"
                                                            className="w-[15px] h-[15px] accent-green-300"
                                                            disabled={!isDeliveryAvailable}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <h4 className="font-semibold uppercase text-xl flex items-center gap-2 -mt-1">
                                                            🏠:
                                                            <span className={`text-base ${isDeliveryAvailable ? "text-green-600" : "text-red-500"}`}>
                                                                {isDeliveryAvailable ? "Delivery Available" : "Delivery Not Available"}
                                                            </span>
                                                        </h4>
                                                        <p className="text-indigo-600 font-bold uppercase text-lg items-center gap-2">
                                                            Address :
                                                            <span className="text-gray-600 font-medium normal-case text-base"> {address.address_line}</span>
                                                        </p>
                                                        <p className="text-indigo-600 font-bold uppercase text-lg items-center gap-2">
                                                            City :
                                                            <span className="text-gray-600 font-medium normal-case text-base"> {address.city}</span>
                                                        </p>
                                                        <p className="text-indigo-600 font-bold uppercase text-lg items-center gap-2">
                                                            Pincode :
                                                            <span className="text-gray-600 font-medium normal-case text-base"> {address.pincode}</span>
                                                        </p>
                                                        <p className="text-indigo-600 font-bold uppercase text-lg items-center gap-2">
                                                            State :
                                                            <span className="text-gray-600 font-medium normal-case text-base"> {address.state}</span>
                                                        </p>
                                                        <p className="text-indigo-600 font-bold uppercase text-lg items-center gap-2">
                                                            Country :
                                                            <span className="text-gray-600 font-medium normal-case text-base"> {address.country}</span>
                                                        </p>
                                                        <p className="text-indigo-600 font-bold uppercase text-lg items-center gap-2">
                                                            Mobile Number :
                                                            <span className="text-gray-600 font-medium normal-case text-base"> {address.mobile}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="my-4">
                                    <p className="text-xl font-mono font-medium text-red-500 animate-pulse">No Address Found</p>
                                </div>
                            )
                        }
                    </div>

                    <div onClick={() => setOpenAddress(true)} className="h-16 bg-blue-50 hover:bg-blue-100 border-2 border-dashed rounded border-blue-500 my-4 flex items-center justify-center cursor-pointer text-gray-500">
                        Add Address
                    </div>
                </div>

                {/* summary */}
                <div className="w-full max-w-lg">
                    <h3 className="text-3xl font-semibold uppercase underline kode_mono_bold mb-4">
                        Summary
                    </h3>

                    <div className="w-full bg-blue-50 p-4 border-2 border-blue-500 border-dashed rounded-lg">

                        {/* bill details */}
                        <div className="my-4">
                            <h3 className="font-semibold text-lg text-blue-600 mb-3 underline">Bill Details:</h3>

                            <div className="flex items-center justify-between py-1 border-b border-blue-300">
                                <p className="font-medium text-sm">Items Total:</p>
                                <div className="font-semibold text-base font-mono text-gray-700 flex gap-2 items-center">
                                    <p className="text-sm text-red-500 line-through">{DisplayPriceIndianRuppe(notDiscountTotalPrice)}</p>
                                    <p>{DisplayPriceIndianRuppe(totalPrice)}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-1 border-b border-blue-300">
                                <p className="font-medium text-sm text-green-600">Discount:</p>
                                <p className="font-semibold text-base font-mono text-green-600">
                                    -{DisplayPriceIndianRuppe(notDiscountTotalPrice - totalPrice)}
                                </p>
                            </div>
                            <div className="flex items-center justify-between py-1 border-b border-blue-300">
                                <p className="font-medium text-sm">Quantity:</p>
                                <p className="font-semibold text-base font-mono text-gray-700">
                                    {totalQty} Item
                                </p>
                            </div>

                            {totalPrice < 499 ? (
                                <>
                                    <div className="flex items-center justify-between py-1 border-b border-blue-300">
                                        <p className="font-medium text-sm">Delivery Charge:</p>
                                        <p className="font-semibold text-base font-mono text-gray-700">
                                            {DisplayPriceIndianRuppe(deliveryCharge)}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between py-1">
                                        <p className="font-semibold text-lg text-blue-700">All Total:</p>
                                        <p className="font-bold text-lg font-mono text-blue-700">
                                            {DisplayPriceIndianRuppe(totalPrice + deliveryCharge)}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between py-1 border-b border-blue-300">
                                        <p className="font-medium text-sm">Delivery Charge:</p>
                                        <p className="font-semibold text-base font-mono text-green-500">
                                            Free
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between py-1">
                                        <p className="font-semibold text-lg text-blue-700">All Total:</p>
                                        <p className="font-bold text-lg font-mono text-blue-700">
                                            {DisplayPriceIndianRuppe(totalPrice)}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                        <Divider />

                        <div className="w-full lg:max-w-sm flex flex-col gap-4 my-6 mx-auto">
                            <button
                                onClick={handleOnlinePayment}
                                disabled={!addressList[selectAddress]?._id}
                                className={`border-[3px] bg-emerald-200 px-4 py-3 rounded-md font-semibold flex gap-3 items-center justify-center 
                                ${addressList[selectAddress]?._id ? "border-blue-400 hover:bg-green-500 hover:text-white text-green-600 cursor-pointer" : "border-gray-400 bg-gray-200 text-gray-500 cursor-not-allowed"}`}>
                                Online Payment
                                <RiSecurePaymentLine size={25} className={`text-${addressList[selectAddress]?._id ? "text-blue-600" : "text-gray-500"}`} />
                            </button>

                            {totalPrice >= 0 && addressList[selectAddress]?._id ? (
                                <button
                                    onClick={handleCashOnDelivery}
                                    className="border-[3px] border-yellow-400 bg-emerald-200 hover:bg-green-500 hover:text-white text-green-600 px-4 py-3 rounded-md font-semibold flex gap-3 items-center justify-center">
                                    Cash on Delivery
                                    <IoCashOutline size={25} className="text-yellow-600" />
                                </button>
                            ) : (
                                <>
                                    <button disabled className="border-[3px] border-gray-400 bg-gray-200 text-gray-500 px-4 py-3 rounded-md font-semibold flex gap-3 items-center justify-center cursor-not-allowed">
                                        Cash on Delivery
                                        <IoCashOutline size={25} className="text-gray-500" />
                                    </button>

                                    {totalPrice < 0 && (
                                        <>
                                            <p className="text-sm text-orange-600 font-mono -mt-3 text-center">
                                                Minimum Order Value is {DisplayPriceIndianRuppe(3000)}
                                            </p>
                                            <p className="text-sm text-orange-600 font-mono -mt-4 text-center">
                                                For Cash on Delivery.
                                            </p>
                                        </>
                                    )}

                                    {!addressList[selectAddress]?._id && (
                                        <p className="text-sm text-red-600 font-mono  text-center">
                                            Please Add Address
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {openAddress && (
                <AddAddress close={() => setOpenAddress(false)} />
            )}
        </section>
    );
};

export default CheckoutPage;
