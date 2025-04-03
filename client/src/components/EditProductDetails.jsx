/* eslint-disable react/prop-types */
import { useState } from "react";
// import NoData from "../components/NoData";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";

import { IoMdCloudUpload } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage.jsx";
import { useSelector } from "react-redux";
import AddFieldComponent from "../components/AddFieldComponent.jsx";
// import toast from "react-hot-toast";
import SuccessAlert from "../utils/SuccessAlert.js";
import { FaRegWindowClose } from "react-icons/fa";




const EditProductDetails = ({ data : propsData, close, fetchProductData }) => {

    const [data, setData] = useState({
        _id: propsData._id,
        name: propsData.name || "",
        image: propsData.image || [],
        category: propsData.category || [],
        subCategory: propsData.subCategory || [],
        unit: propsData.unit || "",
        stock: propsData.stock || "",
        price: propsData.price || "",
        discount: propsData.discount || "",
        description: propsData.description || "",
        more_details: propsData.more_details || {},
    });
    
    const [imageLoading, setImageLoading] = useState(false);

    const [viewImageUrl, setViewImageUrl] = useState("")

    const allCategory = useSelector((state) => state.product.allCategory);

    const [selectCategory, setSelectCategory] = useState("");

    const [selectSubCategory, setSelectSubCategory] = useState("");

    const allSubCategory = useSelector((state) => state.product.allSubCategory);

    const [openAddField, setOpenAddField] = useState(false);
    const [fieldName, setFieldName] = useState("");

    // const fetchProduct = async () => {
    //   try {
    //     setImageLoading(true)
    //     const response = await Axios({
    //       ...SummaryApi.getProduct,
    //     })

    //     // destructure the response because response is an object and we want to get the data
    //     const { data: responseData } = response

    //     // if response is success then set the data
    //     if (responseData.success) {
    //       setData(responseData.data)
    //     }
    //   } catch (error) {
    //     AxiosToastError(error)
    //   } finally {
    //     setImageLoading(false)
    //   }
    // }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0]

        // if no file delect then return
        if (!file) {
            return
        }

        // upload image
        setImageLoading(true) // when uploading image set loading state to true
        const response = await uploadImage(file)
        const { data: ImageResponse } = response

        setData((preve) => {
            return {
                ...preve,
                image: [...preve.image, ImageResponse.data.url]
            }
        })
        setImageLoading(false) // when uploading image set loading state to false
    }

    const handleDeleteImage = async (index) => {
        data.image.splice(index, 1)
        setData((preve) => {
            return {
                ...preve,
            }
        })
    }

    const handleRemoveCategorySelected = async (index) => {
        // why splice because we want to remove the category from the array
        data.category.splice(index, 1)
        setData((preve) => {
            return {
                ...preve
            }
        })
    }

    const handleRemoveSubCategorySelected = async (index) => {
        // why splice because we want to remove the category from the array
        data.subCategory.splice(index, 1)
        setData((preve) => {
            return {
                ...preve
            }
        })
    }

    const handleAddField = () => {
        setData((preve) => {
            return {
                ...preve,
                more_details: {
                    ...preve.more_details,
                    [fieldName]: ""
                }
            }
        })
        setFieldName("")
        setOpenAddField(false)
    }

    const handleSubmit = async (e) => {
        // e.preventDefault() for refresh the page
        e.preventDefault()

        // API call
        try {
            const response = await Axios({
                ...SummaryApi.updateProductDetails,
                data: data
            })

            // destructure the response because response is an object and we want to get the data
            const { data: responseData } = response

            // if response is success then show success message using toast
            if (responseData.success) {
                SuccessAlert(responseData.message)
                if (close) {
                    close()
                }
                fetchProductData()
                setData({
                    name: "",
                    image: [],
                    category: [],
                    subCategory: [],
                    unit: "",
                    stock: "",
                    price: "",
                    discount: "",
                    description: "",
                    more_details: {},
                })
            }
        } catch (error) {
            AxiosToastError(error)
        }

    }


    return (
        <>
            <section className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-80 z-50 py-6 px-4 cursor-auto">
                <div className="bg-white w-full lg:max-w-4xl max-w-lg  rounded-md p-4 mx-auto overflow-y-scroll scrollbar-design h-full max-h-[90vh]">
                    
                    <section className="p-3 kode_mono ">
                        <div className="py-3 px-2 lg:px-6 font-semibold bg-yellow-100 shadow-md flex items-center justify-between rounded-md">
                            <h2 className="text-sm lg:text-2xl kode_mono_bold">Edit Product Details</h2>
                            <button className="text-red-600 hover:text-red-700" onClick={close}>
                                <FaRegWindowClose size={30} />
                            </button>
                        </div>


                        <div className="p-3 mt-2">
                            {/* {
                                !data[0] && !loading && (
                                <NoData />
                                )
                            } */}

                            <div className="">
                                <form action="" className="grid gap-3" onSubmit={handleSubmit}>

                                    {/* name part */}
                                    <div className="grid gap-2">
                                        <label htmlFor="name" className="text-xl ml-1">Name : </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Product Name"
                                            value={data.name}
                                            onChange={handleChange}
                                            name="name"
                                            id="name"
                                            required
                                            className="w-full p-3 border focus:outline-green-500 border-yellow-400 rounded-md bg-blue-50"
                                        />
                                    </div>

                                    {/* description part */}
                                    <div className="grid gap-2">
                                        <label htmlFor="description" className="text-xl ml-1">Description : </label>
                                        <textarea
                                            type="text"
                                            placeholder="Enter Product Description"
                                            value={data.description}
                                            onChange={handleChange}
                                            name="description"
                                            id="description"
                                            required
                                            multiple
                                            rows={3}
                                            className="w-full p-3 border focus:outline-green-500 border-yellow-400 rounded-md bg-blue-50 resize-none"
                                        />
                                    </div>

                                    {/* image part */}
                                    <div className="grid gap-2">
                                        <p className="text-xl ml-1">
                                            Image :
                                        </p>
                                        <div className="">
                                            <label htmlFor="productImage" className="bg-blue-50 p-1 border hover:border-green-500 border-yellow-400 rounded-md h-28 flex items-center justify-center cursor-pointer">
                                                <div className="text-gray-500 flex flex-col items-center">

                                                    {
                                                        imageLoading ? (
                                                            <>
                                                                <Loading />
                                                                <p className="text-sm">Image Uploading...</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <IoMdCloudUpload size={45} />
                                                                <p className="text-sm"> Upload Image</p>
                                                            </>
                                                        )
                                                    }

                                                </div>
                                                <input
                                                    type="file"
                                                    id="productImage"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleUploadImage}
                                                />
                                            </label>

                                            {/* display the images*/}
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {
                                                    data.image.map((img, index) => {
                                                        return (
                                                            <div
                                                                key={img + index}
                                                                className="h-20 w-20 min-w-20 bg-blue-50 rounded border-2 border-yellow-400 relative ">
                                                                <img
                                                                    src={img}
                                                                    alt={img}
                                                                    className="h-full w-full object-contain cursor-pointer"
                                                                    onClick={() => setViewImageUrl(img)}
                                                                />

                                                                <div
                                                                    onClick={() => handleDeleteImage(index)}
                                                                    className="absolute bottom-0 right-0 pt-2 pl-2 p-1 text-red-600 bg-red-50 hover:bg-red-100 rounded-tl-full border-2 border-red-600 cursor-pointer hover:scale-150">
                                                                    <MdDeleteForever size={15} />
                                                                </div>

                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                        </div>
                                    </div>

                                    {/* category part */}
                                    <div className="grid gap-2">
                                        <label htmlFor="category" className="text-xl ml-1">Category : </label>

                                        {/* X _ X */}
                                        <div className="">

                                            {/* select value */}
                                            <select
                                                name=""
                                                id="category"
                                                className="w-full p-3 border focus:outline-green-500 border-yellow-400 rounded-md bg-blue-50"
                                                value={selectCategory}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    const category = allCategory.find((el) => el._id === value)
                                                    setData((preve) => {
                                                        return {
                                                            ...preve,
                                                            category: [...preve.category, category]
                                                        }
                                                    })
                                                    setSelectCategory("")
                                                }}
                                            >
                                                <option value=""> Select Category </option>
                                                {
                                                    allCategory.map((category, index) => {
                                                        return (
                                                            <option
                                                                key={category._id + index + "category"}
                                                                value={category?._id}
                                                            >
                                                                {category?.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>

                                            {/* display value */}
                                            <div className="flex flex-wrap">
                                                {
                                                    data.category.map((category, index) => {
                                                        return (
                                                            <div
                                                                key={category._id + index + "productsection"}
                                                                className="bg-white shadow-md px-2 m-1 mt-2 rounded lg:border-2 border border-green-500 text-gray-500 text-sm inline-block"
                                                            >
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <p className="">
                                                                        {category.name}
                                                                    </p>
                                                                    <div onClick={() => handleRemoveCategorySelected(index)} className="cursor-pointer">
                                                                        <IoIosClose size={30} className="text-red-600 hover:text-red-700" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* sub category part */}
                                    <div className="grid gap-2">
                                        <label htmlFor="subcategory" className="text-xl ml-1">Sub Category : </label>

                                        {/* X _ X */}
                                        <div className="">

                                            {/* select value */}
                                            <select
                                                name=""
                                                id="subcategory"
                                                className="w-full p-3 border focus:outline-green-500 border-yellow-400 rounded-md bg-blue-50"
                                                value={selectSubCategory}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    const subCategory = allSubCategory.find((el) => el._id === value)

                                                    setData((preve) => {
                                                        return {
                                                            ...preve,
                                                            subCategory: [...(preve.subCategory || []), subCategory]
                                                        }
                                                    })
                                                    setSelectSubCategory("")
                                                }}
                                            >
                                                <option value=""> Select Sub Category </option>
                                                {
                                                    allSubCategory.map((subcategory, index) => {
                                                        return (
                                                            <option
                                                                key={subcategory._id + index + "subcategory"}
                                                                value={subcategory?._id}
                                                            >
                                                                {subcategory?.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>

                                            {/* display value */}
                                            <div className="flex flex-wrap">
                                                {
                                                    data.subCategory.map((subcategory, index) => {
                                                        return (
                                                            <div
                                                                key={subcategory._id + index + "productsection"}
                                                                className="bg-white shadow-md px-2 m-1 mt-2 rounded lg:border-2 border border-green-500 text-gray-500 text-sm inline-block"
                                                            >
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <p className="">
                                                                        {subcategory.name}
                                                                    </p>
                                                                    <div onClick={() => handleRemoveSubCategorySelected(index)} className="cursor-pointer">
                                                                        <IoIosClose size={30} className="text-red-600 hover:text-red-700" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* unit part */}
                                    <div className="grid gap-2">
                                        <label htmlFor="unit" className="text-xl ml-1">Unit : </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Product Unit"
                                            value={data.unit}
                                            onChange={handleChange}
                                            name="unit"
                                            id="unit"
                                            required
                                            className="w-full p-3 border focus:outline-green-500 border-yellow-400 rounded-md bg-blue-50"
                                        />
                                    </div>

                                    {/* stock part */}
                                    <div className="grid gap-2">
                                        <label htmlFor="stock" className="text-xl ml-1">No. Of Stock : </label>
                                        <input
                                            type="number"
                                            placeholder="Enter Product Stock"
                                            value={data.stock}
                                            onChange={handleChange}
                                            name="stock"
                                            id="stock"
                                            required
                                            className="w-full p-3 border focus:outline-green-500 border-yellow-400 rounded-md bg-blue-50"
                                        />
                                    </div>

                                    {/* price part */}
                                    <div className="grid gap-2">
                                        <label htmlFor="price" className="text-xl ml-1">Price : </label>
                                        <input
                                            type="number"
                                            placeholder="Enter Product Price"
                                            value={data.price}
                                            onChange={handleChange}
                                            name="price"
                                            id="price"
                                            required
                                            className="w-full p-3 border focus:outline-green-500 border-yellow-400 rounded-md bg-blue-50"
                                        />
                                    </div>

                                    {/* Discount part */}
                                    <div className="grid gap-2">
                                        <label htmlFor="discount" className="text-xl ml-1">Discount in % : </label>
                                        <input
                                            type="number"
                                            placeholder="Enter Product Discount"
                                            value={data.discount}
                                            onChange={handleChange}
                                            name="discount"
                                            id="discount"
                                            required
                                            className="w-full p-3 border focus:outline-green-500 border-yellow-400 rounded-md bg-blue-50"
                                        />
                                    </div>

                                    {/* Add Fields part */}
                                    <div className="">
                                        {
                                            Object?.keys(data?.more_details)?.map((key, index) => {
                                                return (
                                                    <div key={index} className="grid gap-2">
                                                        <label htmlFor={key} className="text-xl ml-1">{key} : </label>
                                                        <input
                                                            type="text"
                                                            placeholder={`Enter ${key}`}
                                                            value={data?.more_details[key]}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                setData((preve) => {
                                                                    return {
                                                                        ...preve,
                                                                        more_details: {
                                                                            ...preve.more_details,
                                                                            [key]: value
                                                                        }
                                                                    }
                                                                })
                                                            }}
                                                            name={key}
                                                            id={key}
                                                            required
                                                            className="w-full p-3 border focus:outline-green-500 border-yellow-400 rounded-md bg-blue-50"
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>


                                    <div
                                        onClick={() => setOpenAddField(true)}
                                        className=" mt-3 w-32 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md cursor-pointer">
                                        Add Fields
                                    </div>

                                    <button
                                        disabled={!data.name && !data.description && !data.image[0] && data.category.length === 0 && data.subCategory.length === 0 && !data.unit && !data.stock && !data.price && !data.discount}
                                        className={`
                            w-full mt-6 p-2 border-4  text-white kode_mono_bold  rounded-md shadow-md 
                            ${data.name && data.description && data.image[0] && data.category[0] && data.subCategory[0] && data.unit && data.stock && data.price && data.discount ? "border-green-500 bg-green-400 hover:bg-green-500 cursor-pointer" : "bg-gray-300 border-gray-300 cursor-not-allowed"}
                            `}>
                                        Update Product Details
                                    </button>


                                </form>
                            </div>

                        </div>

                        {
                            viewImageUrl && (
                                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50 p-4">
                                    <div className="max-w-md w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "> {/* Limit image size */}
                                        <ViewImage
                                            url={viewImageUrl}
                                            close={() => setViewImageUrl("")}
                                        />
                                    </div>
                                </div>
                            )
                        }

                        {
                            openAddField && (
                                <AddFieldComponent
                                    value={fieldName}
                                    onChsange={(e) => setFieldName(e.target.value)}
                                    submit={(e) => handleAddField(e)}
                                    close={() => setOpenAddField(false)} />
                            )
                        }
                    </section>
                </div>
            </section>
        </>
    )
}

export default EditProductDetails




