import { useState } from "react"
import CardLoading from "../components/CardLoading"
import SummaryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
import AxiosToastError from "../utils/AxiosToastError"
import { useEffect } from "react"
import CardProduct from "../components/CardProduct"
import InfiniteScroll from "react-infinite-scroll-component"
import { useLocation } from "react-router-dom"
import emptyBox from "../assets/empty_box.png"


const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingArrayCard = new Array(10).fill(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const params = useLocation()
  //console.log(params.search.slice(3));

  const searchText = params?.search?.slice(3);



  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData((preve) => {
            return [
              ...preve,
              ...responseData.data
            ]
          })
        }
        setTotalPage(responseData.totalPage)
        //console.log(responseData)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchText])

  //console.log("page", page)

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage(preve => preve + 1)
    }
  }

  return (
    <>
      <section className='bg-white'>
        <div className='container mx-auto p-6 -mt-4'>
          <p className='font-semibold font-mono text-2xl uppercase'>Search Results: {data.length}  </p>

          <InfiniteScroll
            dataLength={data.length}
            hasMore={true}
            next={handleFetchMore}
          >
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 py-4 gap-2 mx-auto'>
              {
                data.map((p, index) => {
                  return (
                    <CardProduct data={p} key={p?._id + "searchProduct" + index} />
                  )
                })
              }

              {/* No Data */}
              {
                !data[0] && !loading && (
                  < div className="col-span-full flex flex-col items-center justify-center py-10" >
                    <img src={emptyBox} alt="No Data" className="w-44 h-44 object-cover rounded-full bg-transparent" />
                    <p className="text-gray-500 text-xl  mt-4">No product found !</p>
                    <p className="text-gray-500 text-lg font-semibold mt-4">Try searching for something else!</p>
                  </div >
                )
              }

              {/***loading data */}
              {
                loading && (
                  loadingArrayCard.map((_, index) => {
                    return (
                      <CardLoading key={"loadingsearchpage" + index} />
                    )
                  })
                )
              }
            </div>
          </InfiniteScroll>
        </div>
      </section>
    </>
  )
}

export default SearchPage


