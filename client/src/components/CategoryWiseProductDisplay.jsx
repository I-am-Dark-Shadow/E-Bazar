/* eslint-disable react/prop-types */
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import gsap from "gsap";


import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import AxiosToastError from "../utils/AxiosToastError"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import CardLoading from "./CardLoading"
import CartProduct from "./CardProduct"
import { valideURLConvert } from "../utils/valideURLConvert";
import { useSelector } from "react-redux";



const CategoryWiseProductDisplay = ({ id, name }) => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    const containerRef = useRef()

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })

            // destructure the response because response is an object and we want to get the data
            const { data: responseData } = response

            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleScrollRight = () => {
        gsap.to(containerRef.current, {
            scrollLeft: containerRef.current.scrollLeft + 200,
            duration: 0.8, // Adjust for smoothness
            ease: "power2.out", // Makes the motion smooth
        });
    };

    const handleScrollLeft = () => {
        gsap.to(containerRef.current, {
            scrollLeft: containerRef.current.scrollLeft - 200,
            duration: 0.8,
            ease: "power2.out",
        });
    };

    const lodingCardNumber = new Array(7).fill(null)

    // clicking see all and redirect to product list
    const subCategoryData = useSelector((state) => state.product.allSubCategory)

    // redirect to product list because of sub category
    const subcategory = subCategoryData?.find(sub =>
        sub.category.some(c => c._id === id)
    );

    
    return (
        <>
            <div className="">
                {data.length > 0 && (
                    <div className=" container mx-auto lg:px-8 p-4 my-2 flex items-center justify-between">
                        <h3 className="lg:text-2xl text-lg font-semibold uppercase text-gray-600">{name}</h3>
                        <Link to={`/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`} className="text-green-500 hover:text-green-600 text-lg font-mono font-semibold">See all</Link>
                    </div>
                )}

                <div className="flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-8 lg:overflow-hidden overflow-x-scroll scrollbar-none" ref={containerRef}>
                    {
                        loading &&
                        lodingCardNumber.map((_, index) => {
                            return (
                                <CardLoading key={"CategoryWiseProductDisplay123" + index} />
                            )
                        })
                    }

                    {
                        data.map((p, index) => {
                            return (
                                <CartProduct
                                    data={p}
                                    key={p._id + "CategoryWiseProductDisplay" + index}
                                />
                            )
                        })
                    }

                    {data.length > 6 && (
                        <div className="px-2 w-full left-0 right-0 container mx-auto absolute hidden lg:flex items-center justify-between mt-32">
                            <button onClick={handleScrollLeft} className="z-10 relative bg-white shadow-lg rounded-xl p-3 border-4 border-gray-100 hover:border-gray-200">
                                <FaAngleLeft size={30} />
                            </button>
                            <button onClick={handleScrollRight} className="z-10 relative bg-white shadow-lg rounded-xl p-3 border-4 border-gray-100 hover:border-gray-200">
                                <FaAngleRight size={30} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CategoryWiseProductDisplay