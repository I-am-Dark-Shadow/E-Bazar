/* eslint-disable react/prop-types */

import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";


// edit sub category
// here (data) is the sub category data that we want to edit
const EditSubCategory = ({ close, data, fetchSubCategory }) => {

    // state for sub category data
    const [subCategoryData, setSubCategoryData] = useState({
        _id: data._id,
        name: data.name,
        image: data.image,
        category: data.category || []
    })

    const allCategory = useSelector((state) => state.product.allCategory);

    // loading state for uploading image
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setSubCategoryData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadSubCategoryImage = async (e) => {
        // get the file from the input
        const file = e.target.files[0]

        // if no file then return
        if (!file) {
            return
        }

        // upload image
        setLoading(true) // when uploading image set loading state to true
        const response = await uploadImage(file)
        const { data: ImageResponse } = response
        setLoading(false) // when uploading image set loading state to false


        setSubCategoryData((preve) => {
            return {
                ...preve,
                image: ImageResponse.data.url
            }
        })


    }

    const handleRemoveCategorySelected = (categoryId) => {
        const index = subCategoryData.category.findIndex(el => el._id === categoryId)

        subCategoryData.category.splice(index, 1)

        setSubCategoryData((preve) => {
            return {
                ...preve
            }
        })
    }

    const handleSubmitSubCategory = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.updateSubCategory,
                data: subCategoryData
            })

            // destructure the response because response is an object and we want to get the data
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (close) {
                    close()
                }

                if (fetchSubCategory) {
                    fetchSubCategory()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }



    return (
        <>
            <section className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
                <div className="bg-white max-w-4xl w-full p-4 lg:mx-auto mx-4 rounded-md">

                    <div className="flex items-center justify-between shadow-md p-3 bg-amber-100 rounded-md">
                        <h1 className="text-xl kode_mono_bold text-blue-600">Update Sub Category</h1>
                        <button onClick={close} className="w-fit block ml-auto text-red-600 hover:text-red-700">
                            <FaRegWindowClose size={30} />
                        </button>
                    </div>
                    <form action="" className="my-3" onSubmit={handleSubmitSubCategory}>

                        {/* sub category name part */}
                        <div className="grid gap-2">
                            <label htmlFor="subcategoryname" className="mt-10 kode_mono_bold text-lg">
                                Sub Category Name :
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Sub Category Name"
                                id="subcategoryname"
                                name="name"
                                value={subCategoryData.name}
                                onChange={handleChange}
                                className="bg-blue-50 border-2 border-green-300 focus:border-blue-500 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
                                autoComplete="off"
                            />
                        </div>

                        {/* sub category image part */}
                        <div className="mt-4">
                            <p className="kode_mono_bold text-lg">
                                Image :
                            </p>

                            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                                <div className=" text-gray-400 mt-2 bg-blue-50 h-40 w-full lg:w-40 rounded-lg border-2 border-green-300 flex items-center justify-center ">
                                    {
                                        subCategoryData.image ? (
                                            <img
                                                src={subCategoryData.image}
                                                alt="Sub Category Image"
                                                className="w-full h-full object-contain object-center rounded-lg"
                                            />
                                        ) : (
                                            <p className="text-sm">No Image</p>
                                        )
                                    }

                                </div>

                                <label htmlFor="uploadSubCategoryImage">
                                    <div disabled={!subCategoryData.name}
                                        className={`
                                            lg:h-12 lg:w-full w-[138px] lg:px-3 p-2 border-[3px]  text-gray-600 rounded-md shadow-md
                                            ${!subCategoryData.name ? "bg-gray-300 border-gray-300 cursor-not-allowed" : "border-yellow-400 bg-transparent bg-green-400 hover:bg-yellow-300 cursor-pointer"}
                                        `}>

                                        {
                                            loading ? "Loading..." : "Upload Image"
                                        }
                                    </div>

                                    <input
                                        onChange={handleUploadSubCategoryImage}
                                        disabled={!subCategoryData.name}
                                        type="file"
                                        id="uploadSubCategoryImage"
                                        className="hidden"
                                    />
                                </label>

                            </div>
                        </div>

                        {/* category select part */}
                        <div className="mt-4">
                            <label className="mt-10 kode_mono_bold text-lg">
                                Select Category :
                            </label>
                            <div className="mt-2  border-2 border-green-500 focus-within:border-blue-500 rounded-lg">
                                {/* display value */}

                                <div className="flex flex-wrap gap-1">
                                    {
                                        subCategoryData.category.map((cat, index) => {
                                            return (
                                                <p
                                                    key={cat._id + "selectedValue" || index}
                                                    className="bg-white shadow-md px-2 m-1 flex items-center justify-between rounded border-2 border-green-500 text-gray-500 text-sm cursor-not-allowed"
                                                >
                                                    {cat.name}
                                                    <div onClick={() => handleRemoveCategorySelected(cat._id)} className="cursor-pointer">
                                                        <IoIosClose size={30} className="text-red-600 hover:text-red-700" />
                                                    </div>
                                                </p>
                                            )
                                        })
                                    }
                                </div>

                                {/* select value */}
                                <select
                                    className="bg-transparent text-gray-900 text-sm rounded-lg outline-none w-full p-2 border-2 rounded-tl-none rounded-tr-none"
                                    name=""
                                    id=""
                                    value={subCategoryData.category}
                                    onChange={(e) => {
                                        const { value } = e.target
                                        const categoryDetails = allCategory.find(el => el._id === value)

                                        setSubCategoryData((preve) => {
                                            return {
                                                ...preve,
                                                category: [...preve.category, categoryDetails]
                                            }
                                        })

                                    }}
                                >
                                    <option value={""}>Select Category</option>
                                    {
                                        allCategory.map((category, index) => {
                                            return (
                                                <option key={category._id + "subcategory" || index} value={category?._id}>{category?.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        {/* submit button part */}
                        <button
                            disabled={!subCategoryData.name && !subCategoryData.image && subCategoryData.category.length === 0}
                            className={`
                            w-full mt-6 p-2 border-4  text-white kode_mono_bold  rounded-md shadow-md 
                            ${subCategoryData.name && subCategoryData.image && subCategoryData.category[0] ? "border-green-500 bg-green-400 hover:bg-green-500 cursor-pointer" : "bg-gray-300 border-gray-300 cursor-not-allowed"}
                            `}>
                            {loading ? "Loading..." : "Update Sub Category"}
                        </button>

                    </form>
                </div>
            </section>
        </>
    )
}

export default EditSubCategory