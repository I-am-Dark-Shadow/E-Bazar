import emptyBox from "../assets/empty_box.png"
import { useEffect, useState } from "react"
import SummaryApi from "../common/SummaryApi.js"
import AxiosToastError from "../utils/AxiosToastError.js"
import Axios from "../utils/Axios"
import Loading from "../components/Loading.jsx"
import ProductCardAdmin from "../components/ProductCardAdmin.jsx"


const ProductsPage = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search, setSearch] = useState("")

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getAllProduct,
        data: {
          page: page,
          limit: 12,
          search: search
        },
      })
      const { data: responseData } = response

      if (responseData.success) {
        setProductData(responseData.data)
        setTotalPageCount(responseData.totalNoPage)
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
  }, [page])

  const handlePrevious = () => {
    if (page > 1) {
      setPage(preve => preve - 1)
    }
  }

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(preve => preve + 1)
    }
  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(() => {
    // why use flag because we want to call api only once only one time
    let flag = true
    // debounce because we want to get data after 300ms
    // why debounce important because here in search field without debounce type each letter and call api after each letter 
    // so so many time api call happen and that is not good for performance
    // thet's why we use debounce 
    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData()
        flag = false
      }
    }, 800);

    return () => {
      clearTimeout(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <>
      <section className="p-3 kode_mono ">
        <div className="py-3 px-2 lg:px-6 font-semibold bg-yellow-100 shadow-md flex items-center justify-between rounded-md">

          <h2 className="text-sm lg:text-2xl kode_mono_bold">All Products</h2>
          <input
            type="text"
            className="mt-2 w-1/2 lg:p-3 p-2 text-xs lg:text-lg border-2 focus:outline-green-500 border-yellow-400 rounded-md bg-blue-50"
            placeholder="Search Product Here..."
            onChange={handleSearch}
            value={search}
          />


        </div>

        {
          loading && (
            <Loading />
          )
        }

        <div className=" min-h-[60vh]">
          <div className="mt-3 p-4 rounded-md bg-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {
                productData.length > 0 ? (
                  productData.map((p, index) => (
                    <ProductCardAdmin data={p} key={index} fetchProductData={fetchProductData} />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-10">
                    <img src={emptyBox} alt="No Data" className="w-44 h-44 object-cover rounded-full bg-transparent" />
                    <p className="text-gray-500 text-xl  mt-4">No products found.</p>
                    <p className="text-gray-500 text-lg font-semibold mt-4">Try searching for something else!</p>
                  </div>
                )
              }
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={handlePrevious} className="border-[3px] text-red-700 border-red-400 px-4 py-1 hover:bg-red-100 rounded-br-3xl rounded-tl-3xl kode_mono_bold text-lg shadow-lg ">
              Previous
            </button>
            <p className="text-gray-500">{page}/{totalPageCount}</p>
            <button onClick={handleNext} className="border-[3px] text-green-700 border-green-400 px-4 py-1 hover:bg-green-100 rounded-br-3xl rounded-tl-3xl kode_mono_bold text-lg shadow-lg ">
              Next
            </button>
          </div>
        </div>

      </section>
    </>
  )
}

export default ProductsPage