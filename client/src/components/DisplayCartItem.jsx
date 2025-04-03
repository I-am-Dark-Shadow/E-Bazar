/* eslint-disable react/prop-types */


import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceIndianRuppe } from "../utils/DisplayPriceIndianRuppe";

import { BiSolidRightArrow } from "react-icons/bi";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import Divider from "./Divider";
import { PriceWithDiscount } from "../utils/PriceWithDiscount";

import imageEmptyCart from "../assets/empty_cart.jpg"
import toast from "react-hot-toast";


const DisplayCartItem = ({ close }) => {

  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
  const cartItem = useSelector((state) => state?.cartItem.cart);
  const user = useSelector(state => state.user)
  //console.log(user);

  const deliveryCharge = 199;
  const navigate = useNavigate();

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate("/checkout")
      if (close) {
        close()
      }
      return
    }
    toast("Please login first")
  }

  return (
    <>
      <section className="bg-neutral-900 fixed top-0 left-0 right-0 bottom-0 bg-opacity-70 z-50">
        <div className="bg-yellow-50 w-full lg:max-w-sm max-w-md min-h-screen max-h-screen ml-auto">
          <div className="flex items-center justify-between py-2 px-4 bg-lime-200 shadow-md gap-3 border-b-4 border-lime-300">
            <h2 className="font-bold text-3xl underline uppercase text-emerald-600 kode_mono_bold">
              Cart
            </h2>
            <Link to={"/"} className="border-[2px] border-red-600 rounded-md text-red-600 bg-red-100 hover:bg-red-200 hover:scale-110 lg:hidden">
              <IoClose size={25} />
            </Link>
            <button onClick={close} className="border-[3px] border-red-600 rounded-md text-red-600 bg-red-100 hover:bg-red-200 hover:scale-110 hidden lg:block">
              <IoClose size={25} />
            </button>
          </div>

          {/* display items */}
          {
            cartItem[0] ? (
              <>
                <div className="lg:min-h-[80vh] min-h-[84vh] h-full max-h-[calc(100vh-120px)] p-2 flex flex-col gap-4">
                  <div className="py-2 px-3 bg-blue-100  text-lg rounded-md border-2 border-blue-300">
                    <div className="flex gap-2 items-center justify-between text-green-500">
                      <p className="">
                        Total Bill:
                      </p>
                      <div className="flex gap-2 items-center">
                        <p className="font-semibold font-mono text-[15px] text-red-600 line-through">
                          {DisplayPriceIndianRuppe(notDiscountTotalPrice)}
                        </p>
                        <p className="font-semibold font-mono">
                          {DisplayPriceIndianRuppe(totalPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center justify-between text-blue-500">
                      <p className="">
                        Your Total Savings:
                      </p>
                      <p className="font-semibold font-mono">
                        -{DisplayPriceIndianRuppe(notDiscountTotalPrice - totalPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-300 h-full overflow-y-scroll scrollbar-design-blue rounded-md p-3 grid gap-4">
                    {
                      cartItem[0] && (
                        cartItem.map((item, index) => {
                          return (
                            <div className="" key={item?._id + "cartItemDisplay" + index}>
                              <div className="flex w-full items-center gap-4">
                                {/* product image */}
                                <div className="w-16 h-16 min-h-16 min-w-16 bg-white rounded-md border-2 border-blue-300 ">
                                  <img
                                    src={item?.productId?.image[0]}
                                    alt="product images"
                                    className="bg-white rounded-md object-scale-down"
                                  />
                                </div>

                                {/* product name */}
                                <div className="w-full max-w-sm">
                                  <p className="font-medium text-xs text-ellipsis line-clamp-2">
                                    {item?.productId?.name}
                                  </p>
                                  <p className="font-medium text-xs text-slate-400">
                                    {item?.productId?.unit}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <p className="font-mono text-xs font-semibold text-red-600 line-through">
                                      {DisplayPriceIndianRuppe(item?.productId?.price)}
                                    </p>
                                    <p className="font-mono text-md font-semibold text-green-600">
                                      {DisplayPriceIndianRuppe(PriceWithDiscount(item?.productId?.price, item?.productId?.discount))}
                                    </p>
                                  </div>
                                </div>

                                {/* product quantity */}
                                <div className="lg:ml-0 ml-5">
                                  <AddToCartButton
                                    data={item?.productId}
                                  />
                                </div>

                              </div>

                              <Divider />
                            </div>

                          )

                        })
                      )
                    }
                  </div>

                  {/* Bill Details */}
                  <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-lg text-blue-600 mb-3 underline">Bill Details:</h3>

                    <div className="flex items-center justify-between py-1 border-b border-blue-300">
                      <p className="font-medium text-sm">Items Total:</p>
                      <div className="font-semibold text-base font-mono text-gray-700 flex gap-2 items-center">
                        <p className="text-sm text-red-500 line-through">{DisplayPriceIndianRuppe(notDiscountTotalPrice)}</p>
                        <p className="">{DisplayPriceIndianRuppe(totalPrice)}</p>
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

                </div>

                {/* total price and proceed to payment */}
                <div className="px-2">
                  <div className="bg-green-600 text-neutral-100 p-3 py-4 flex items-center justify-between static bottom-0 rounded-md gap-4">
                    {
                      totalPrice < 499 ? (
                        <div className="font-mono font-bold text-lg">
                          {DisplayPriceIndianRuppe(totalPrice + deliveryCharge)}
                        </div>
                      ) : (
                        <div className="font-mono font-bold text-lg">
                          {DisplayPriceIndianRuppe(totalPrice)}
                        </div>
                      )
                    }

                    {/* proceed to payment */}
                    <button onClick={redirectToCheckoutPage} className="flex items-center gap-1 font-semibold text-base">
                      Proceed <BiSolidRightArrow size={15} className="text-yellow-300" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="lg:min-h-[80vh] min-h-[84vh] h-full max-h-[calc(100vh-120px)] p-4 flex flex-col gap-4 items-center justify-center">
                <img
                  src={imageEmptyCart}
                  alt="empty cart"
                  className="rounded-xl border-4 border-blue-300"
                />
                <p className="text-center font-semibold text-lg">
                  Your Cart is Empty !!
                </p>
                <p className="text-center">
                  Add some items to your cart ...
                </p>
                <Link to="/" onClick={close}>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                    Shop Now
                  </button>
                </Link>
              </div>
            )
          }
        </div>
      </section>
    </>
  )
}

export default DisplayCartItem