import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {

  const loadingCategory = useSelector((state) => state.product.loadingCategory)
  const categoryData = useSelector((state) => state.product.allCategory)
  const subCategoryData = useSelector((state) => state.product.allSubCategory)


  const navigate = useNavigate()

  // redirect to product list because of sub category
  const handleRedirectProductListPage = (id, cat) => {
    const subcategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => {
        return c._id == id
      })

      return filterData ? true : null
    })

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;


    navigate(url)

  }

  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto px-4 ">
          {/* banner */}
          <div className={`w-full h-full lg:min-h-48  rounded bg-blue-100 ${!banner && 'animate-pulse my-2'}`}>
            <img
              src={banner}
              alt="banner"
              className="w-full h-full hidden lg:block"
            />
            <img
              src={bannerMobile}
              alt="banner"
              className="w-full h-full lg:hidden block"
            />
          </div>
        </div>

        {/* heading */}
        <div className="container mx-auto lg:px-8 px-4 my-1">
          <h1 className="lg:text-2xl text-lg font-semibold text-gray-600 uppercase">All Categories</h1>
        </div>
        <div className="container mx-auto lg:px-8 px-6 my-4 grid grid-cols-3 md:grid-cols-8 lg:grid-cols-10 gap-3 lg:gap-4">
          {
            loadingCategory ? (

              new Array(12).fill(null).map((category, index) => {
                return (
                  <div key={index + "loadingcategory"} className="bg-white p-4 rounded-lg min-h-36 grid gap-2 shadow animate-pulse">
                    <div className="bg-blue-100 min-h-24 rounded"></div>
                    <div className="bg-blue-100 h-8 rounded"></div>
                  </div>

                )
              })
            ) : (
              // eslint-disable-next-line no-unused-vars
              categoryData.slice().reverse().map((cat, index) => {
                return (
                  <div
                    key={cat?._id + "displaycategory"}
                    onClick={() => handleRedirectProductListPage(cat?._id, cat?.name)}
                    className=" my-2 bg-white p-1 rounded-lg min-h-36 grid gap-2 shadow cursor-pointer hover:scale-110 hover:transform-cpu transition-all duration-300 border-2 border-gray-200 lg:border-none">
                    <div className="bg-white min-h-32 rounded">
                      <div className="flex flex-col items-center justify-center text-center h-full">
                        <img
                          src={cat?.image}
                          alt={cat?.name}
                          className="w-full h-full object-scale-down"
                        />
                        <p className="font-mono text-gray-800 lg:font-semibold font-bold py-2 lg:p-2 lg:text-base text-sm text-ellipsis line-clamp-2 mb-1 lg:mb-2">{cat?.name}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>

        {/*display category product  */}
        {
          categoryData.map((c, index) => {
            return (
              <CategoryWiseProductDisplay key={c?._id + "categorywiseProduct" + index} id={c?._id} name={c?.name} />

            )
          })
        }


      </section>
    </>
  )
}

export default Home
