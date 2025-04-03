/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import { Link, useParams } from "react-router-dom"
import AxiosToastError from "../utils/AxiosToastError"
import Loading from "../components/Loading"
import CardProduct from "../components/CardProduct"
import { useSelector } from "react-redux"


import { FaAngleDoubleUp } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";
import { gsap } from "gsap"
import { valideURLConvert } from "../utils/valideURLConvert.js"


const ProductListPage = () => {

  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const containerRef = useRef()


  const params = useParams()

  const AllSubCategory = useSelector((state) => state.product.allSubCategory)
  // console.log("AllSubCategory", AllSubCategory);
  const [displaySubCategory, setDisplaySubCategory] = useState([])


  const subCategory = params?.subCategory?.split('-')
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(' ')

  // here [0] use because we want only last element of array and in string format
  const categoryId = params.category.split('-').slice(-1)[0];
  //console.log(categoryId);

  const subCategoryId = params.subCategory.split('-').slice(-1)[0];
  //console.log(subCategoryId);

  const fetchProductData = async () => {

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        },
      })

      // destructure the response because response is an object and we want to get the data
      const { data: responseData } = response


      if (responseData.success) {
        if (responseData.page == 1) {
          setProductData(responseData.data.reverse())
        }
        else {
          setProductData([...productData, ...responseData.data])
        }

        setTotalPageCount(responseData.totalPageCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  useEffect(() => {
    const sub = AllSubCategory.filter(sub => {
      const filterData = sub.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : null
    })

    setDisplaySubCategory(sub)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, AllSubCategory])

  // Scroll Up Function
  const handleScrollUp = () => {
    gsap.to(containerRef.current, {
      scrollTop: containerRef.current.scrollTop - 200, // Scroll Up
      duration: 0.8,
      ease: "power2.out",
    });
  };

  // Scroll Down Function
  const handleScrollDown = () => {
    gsap.to(containerRef.current, {
      scrollTop: containerRef.current.scrollTop + 200, // Scroll Down
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <>
      <section className="sticky top-24 lg:top-20">
        <div className="container sticky top-24 mx-auto grid grid-cols-[130px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr] lg:px-6 px-4 gap-4">
          {/* Left Side Sub Category */}
          <div className="min-h-[79vh] max-h-[79vh] overflow-y-scroll py-4 lg:grid lg:grid-cols-1 gap-2 scrollbar-none lg:mx-5" ref={containerRef}>
            <div className="bg-green-50 shadow-md rounded-md p-3 h-fit lg:mb-0 mb-4">
              <h3 className="lg:text-2xl text-sm kode_mono_bold uppercase">
                Sub Category
              </h3>
            </div>

            {AllSubCategory.length > 2 && (
              <>
                <div className="hidden lg:flex flex-col items-center fixed space-y-4 ml-[248px] ">
                  <button
                    onClick={handleScrollUp}
                    className="bg-yellow-200 text-white hover:text-green-300 p-2 rounded-full shadow-lg border-[3px] border-green-200 hover:bg-amber-200 hover:border-green-200 transition-all"
                  >
                    <FaAngleDoubleUp size={20} />
                  </button>

                  <button
                    onClick={handleScrollDown}
                    className="bg-yellow-200 text-white hover:text-green-300 p-2 rounded-full shadow-lg border-[3px] border-green-200 hover:bg-amber-200 hover:border-green-200 transition-all"
                  >
                    <FaAngleDoubleDown size={20} />
                  </button>
                </div>
              </>
            )
            }

            {/* X_X */}
            {/* Display Sub Category */}
            {
              displaySubCategory.map((sub, index) => {

                const link = `/${valideURLConvert(sub?.category[0]?.name)}-${sub?.category[0]?._id}/${valideURLConvert(sub.name)}-${sub._id}`;

                return (

                  <Link to={link} key={index + "ProductListPage" + sub._id} className={`w-full h-fit border-[3px] border-gray-300 shadow-md hover:shadow-lg rounded-lg mb-2 mt-2 cursor-pointer px-3 py-2 
                                hover:bg-green-50 transition-all flex flex-col items-center 
                                ${subCategoryId == sub._id ? "bg-green-100 border-green-400" : ""}
                                lg:border-4 lg:px-4 lg:mt-2`}
                  >
                    <div className="w-full flex justify-center">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-[80px] h-[80px] lg:w-24 lg:h-auto object-scale-down mt-2"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-sm lg:text-xl text-center font-mono lg:mt-auto mb-1 text-ellipsis line-clamp-2">{sub.name}</p>
                    </div>
                  </Link>


                )
              })
            }
          </div>



          {/* Right Side Product */}
          <>
            <div className=" py-4 lg:py-6 lg:ml-6">
              <div className="hidden lg:block text-xs bg-white text-white select-none -mt-6">.</div>
              <div className="bg-yellow-50 shadow-md p-3 mb-1 kode_mono_bold lg:text-2xl text-sm uppercase rounded-sm ">
                <h3 className="">
                  {subCategoryName}
                </h3>
              </div>

              {/* loading */}
              <div className="">
                {
                  loading && (
                    <Loading />
                  )
                }
                <div className="min-h-[66vh] max-h-[66vh] overflow-y-scroll lg:scrollbar-design scrollbar-none lg:border-none border-l-4 border-r-4 border-gray-200 flex justify-center lg:block">
                  {/* all product */}
                  <div className="gap-3 lg:gap-0 lg:pt-4 mt-3 lg:mt-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
                    {
                      productData.map((p, index) => {
                        return (
                          <CardProduct data={p} key={p._id + "productSubCategory" + index} />
                        )
                      })
                    }
                  </div>
                </div>

              </div>
            </div>
          </>

        </div>
      </section>
    </>

        </div>
      </section>
    </>
  )
}

export default ProductListPage
