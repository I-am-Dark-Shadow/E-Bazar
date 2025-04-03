/* eslint-disable react/prop-types */
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { valideURLConvert } from "../utils/valideURLConvert";
import EditProductDetails from "./EditProductDetails";
import { useState } from "react";
import ConfirmBox from "./ConfirmBox";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const ProductCardAdmin = ({ data, fetchProductData }) => {
    const navigate = useNavigate()

    const [editOpen, setEditOpen] = useState(false)

    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);


    const handleDeleteProduct = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteProduct,
                data: {
                    _id: data._id
                }
            })

            // destructure the response because response is an object and we want to get the data 
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchProductData) {
                    fetchProductData()
                }

                setOpenConfirmBoxDelete(false)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <>
            <div className="p-3 mt-2 poppins w-36 rounded-md border-2 border-gray-200 bg-blue-100 shadow-md cursor-pointer hover:bg-blue-200 hover:border-blue-500">
                <div className="" onClick={() => navigate(`/product/${valideURLConvert(data.name)}-${data._id}`)}>
                    <img
                        src={data?.image[0]}
                        alt={data?.name}
                        className="w-full h-full object-scale-down rounded-md"
                    />
                </div>
                <p className="text-ellipsis line-clamp-2 font-medium">
                    {data?.name}
                </p>
                <p className="text-gray-500 text-sm">
                    {data?.unit}
                </p>

                {/* Edit and Delete */}
                <div className="flex items-center justify-around py-2">
                    <button onClick={() => setEditOpen(true)} className="border-2 px-2 py-1 border-green-600 rounded bg-green-100 text-green-700 hover:bg-green-200">
                        <MdOutlineEdit size={20} />
                    </button>
                    <button onClick={() => setOpenConfirmBoxDelete(true)}
                        className="border-2 px-2 py-1 border-red-600 rounded bg-red-100 text-red-700 hover:bg-red-200">
                        <MdOutlineDeleteForever size={20} />
                    </button>
                </div>

                {
                    editOpen && (
                        <EditProductDetails fetchProductData={fetchProductData} data={data} close={() => setEditOpen(false)} />
                    )
                }

                {
                    openConfirmBoxDelete && (
                        <ConfirmBox
                            close={() => setOpenConfirmBoxDelete(false)}
                            cancel={() => setOpenConfirmBoxDelete(false)}
                            confirm={handleDeleteProduct}
                        />
                    )
                }

            </div>
        </>
    )
}

export default ProductCardAdmin