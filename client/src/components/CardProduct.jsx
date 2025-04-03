/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { DisplayPriceIndianRuppe } from "../utils/DisplayPriceIndianRuppe";
import { valideURLConvert } from "../utils/valideURLConvert";
//import SummaryApi from "../common/SummaryApi"; 
//import AxiosToastError from "../utils/AxiosToastError";
import { useState } from "react";
//import Axios from "../utils/Axios";
//import toast from "react-hot-toast";
//import { useGlobalContext } from "../provider/GlobalProvider";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {

  const url = `/product/${valideURLConvert(data.name)}-${data._id}`
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false)



  return (
    <>
      <Link to={url} className="border p-2 lg:p-3 grid gap-1 min-w-36 max-w-36 lg:min-w-52 rounded-md mb-3 shadow-md ">
        <div className="min-h-20 w-full lg:min-h-24 rounded">
          <img
            src={data?.image[0]}
            alt={data?.name}
            className="lg:w-full lg:h-full object-cover rounded-lg " />
        </div>

        <div className="w-fit text-gray-500 font-mono lg:text-lg text-xs ml-[2px]">
          {data?.unit}
        </div>

        <div className="mx-auto font-semibold text-ellipsis font-mono ml-[2px] lg:text-lg text-sm line-clamp-2">
          {data?.name}
        </div>

        <div className="w-fit text-green-500 font-mono text-xs font-medium ml-[2px] lg:text-md">
          {data?.discount}% OFF
        </div>

        <div className="flex items-center justify-between gap-0 lg:gap-3">
          <div className="border-[2px] border-white px-1 bg-white rounded w-20 cursor-default">
            <div className="font-mono text-red-500 line-through lg:text-sm text-xs ml-[-3px] mt-[-3px]">
              {DisplayPriceIndianRuppe(data?.price)}
            </div>
            <div className="font-mono text-gray-800 lg:text-lg text-md mt-[-4px] font-semibold ml-[-3px]">
              {DisplayPriceIndianRuppe(data?.price * (1 - data?.discount / 100))}
            </div>
          </div>

          <div className="">
            {
              data?.stock == 0 ? (
                <p className="text-red-500 font-semibold lg:text-base text-sm text-center animate-pulse">Out of Stock</p>
              ) : (
                < AddToCartButton data={data} />
              )
            }
          </div>
        </div>


      </Link>
    </>
  )
}

export default CardProduct