import { IoMdCart } from "react-icons/io";
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceIndianRuppe } from "../utils/DisplayPriceIndianRuppe";
import { Link } from "react-router-dom";

import { FaAnglesRight } from "react-icons/fa6";
import { useSelector } from "react-redux";



const CartMobileLink = () => {

  const { totalQty, totalPrice } = useGlobalContext();

  const cartItem = useSelector((state) => state?.cartItem.cart);


  return (

    <>
      {
        cartItem.length > 0 && (
          <div className=" px-2 pt-4 sticky bottom-4 lg:hidden">
            <div className="bg-green-600 px-3 py-2 rounded-md text-neutral-100 flex items-center justify-between">
              {/* left part */}
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-500 rounded w-fit">
                  <IoMdCart size={30} className="" />
                </div>

                {/* right part */}
                <div className="font-semibold text-xl">
                  <p className="font-mono">
                    {totalQty} items
                  </p>
                  <p className="font-mono">
                    {DisplayPriceIndianRuppe(totalPrice)}
                  </p>
                </div>
              </div>

              <Link to={"/cart"} className="flex items-center gap-1">
                <span className="font-semibold text-lg">
                  View Cart
                </span>
                <FaAnglesRight className="animate-pulse" size={20} />
              </Link>
            </div>
          </div>
        )
      }
    </>

  )
}

export default CartMobileLink