import { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel"
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";



const CategoryPage = () => {

    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);

    const [categoryData, setCategoryData] = useState([]);

    const [openEdit, setOpenEdit] = useState(false);

    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);

    const [deleteCategory, setDeleteCategory] = useState({
        _id: "",
    });

    const [editData, setEditData] = useState({
        name: "",
        image: "",
    });

    const allCategory = useSelector((state) => state.product.allCategory);

    useEffect(() => {
        setCategoryData(allCategory);
    }, [allCategory]);

    const fetchCategory = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getCategory,
            })
            const { data: responseData } = response

            if (responseData.success) {
                setCategoryData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory()
        setCategoryData(allCategory);
    }, [allCategory]);

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory
            })

            // destructure the response because response is an object and we want to get the data 
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                setOpenConfirmBoxDelete(false)
                fetchCategory()
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <>
            <section className="p-3 kode_mono ">
                <div className="py-3 px-6 font-semibold bg-yellow-100 shadow-md flex items-center justify-between rounded-md">
                    <h2 className="text-md lg:text-2xl kode_mono_bold">ALL CATEGORIES</h2>
                    <button onClick={() => setOpenUploadCategory(true)} className="text-md lg:text-xl p-1 lg:p-2 border-4 border-green-500 bg-green-400 text-white hover:bg-green-500 rounded-md shadow-md">Add Category</button>
                </div>

                <div className="p-3 mt-2">

                    {
                        !categoryData[0] && !loading && (
                            <NoData />
                        )
                    }

                    <div className="lg:p-4 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-5">
                        {
                            categoryData.map((category, index) => {
                                return (
                                    <div key={category._id || `category-${index}`} className="w-22 lg:w-34 group  bg-white lg:border-2 lg:border-white border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-lg cursor-pointer hover:border-[4px] hover:border-yellow-200">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-full object-scale-down rounded-lg"
                                            />

                                            <p className="font-mono text-gray-800 font-semibold py-2 px-2 lg:p-2 lg:text-base text-sm ">{category.name}</p>
                                        </div>
                                        <div className="mt-[-10px] lg:text-sm text-xs p-2 items-center justify-between flex-row hidden group-hover:flex">
                                            <button
                                                onClick={() => {
                                                    setOpenEdit(true),
                                                        setEditData(category)
                                                }}
                                                className="cursor-pointer bg-green-400 hover:bg-green-500 text-white p-1 rounded">
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setOpenConfirmBoxDelete(true),
                                                        setDeleteCategory(category)
                                                }}
                                                className="cursor-pointer bg-red-400 hover:bg-red-500 text-white p-1 rounded">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>


                    {
                        loading && (
                            <Loading />
                        )
                    }


                    {
                        // if openUploadCategory is true then show UploadCategoryModel component
                        openUploadCategory && (
                            <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
                        )
                    }

                    {
                        // if openEdit is true then show UploadCategoryModel component
                        openEdit && (
                            <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />
                        )
                    }

                    {
                        // if openDelete is true then show UploadCategoryModel component
                        openConfirmBoxDelete && (
                            <ConfirmBox
                                close={() => setOpenConfirmBoxDelete(false)}
                                cancel={() => setOpenConfirmBoxDelete(false)}
                                confirm={handleDeleteCategory}
                            />
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default CategoryPage
