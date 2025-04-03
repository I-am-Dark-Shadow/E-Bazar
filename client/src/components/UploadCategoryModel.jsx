import { useState } from "react"
import { FaRegWindowClose } from "react-icons/fa";
import uploadImage from "../utils/UploadImage.js";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi.js";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError.js";

// eslint-disable-next-line react/prop-types
const UploadCategoryModel = ({ close, fetchData }) => {

  const [data, setData] = useState({
    name: "",
    image: ""
  })

  // loading state for uploading image
  const [loading, setLoading] = useState(false)

  // onChange is used to get the value of the input field 
  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  // API call and handle the response
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data
      })

      // destructure the response because response is an object and we want to get the data
      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        close()
        fetchData()
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadCategoryImage = async (e) => {

    // get the file from the input why files[0] because files is an array why 0 because we want to get the first file
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
    

    setData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url
      }
    })

  }


  return (
    <>
      <section className="fixed top-0 left-0 right-0 bottom-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
        <div className="bg-white max-w-4xl w-full p-4 rounded-md">

          <div className="flex items-center justify-between shadow-md p-3 bg-amber-100 rounded-md">
            <h1 className="text-xl kode_mono_bold text-blue-600">Add A New Category</h1>
            <button onClick={close} className="w-fit block ml-auto text-red-600 hover:text-red-700">
              <FaRegWindowClose size={30} />
            </button>
          </div>

          <form action="" className="my-3" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <label htmlFor="categoryName" className="mt-10 kode_mono_bold text-lg">
                Category Name :
              </label>
              <input
                type="text"
                placeholder="Enter Category Name"
                id="categoryName"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="bg-blue-50 border-2 border-green-300 focus:border-blue-500 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
                autoComplete="off"
              />
            </div>

            <div className="mt-4">
              <p className="kode_mono_bold text-lg">
                Image :
              </p>

              <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                <div className=" text-gray-400 mt-2 bg-blue-50 h-40 w-full lg:w-40 rounded-lg border-2 border-green-300 flex items-center justify-center ">
                  {
                    data.image ? (
                      <img
                        src={data.image}
                        alt="Category Image"
                        className="w-full h-full object-contain object-center rounded-lg"
                      />
                    ) : (
                      <p className="text-sm">No Image</p>
                    )
                  }

                </div>

                <label htmlFor="uploadCategoryImage">
                  <div disabled={!data.name} className={`
                  lg:h-12 lg:w-full w-[138px] lg:px-3 p-2 border-[3px]  text-gray-600 rounded-md shadow-md
                  ${!data.name ? "bg-gray-300 border-gray-300 cursor-not-allowed" : "border-yellow-400 bg-transparent bg-green-400 hover:bg-yellow-300 cursor-pointer"}
                  `}>

                    {
                      loading ? "Loading..." : "Upload Image"
                    }
                  </div>

                  <input onChange={handleUploadCategoryImage} disabled={!data.name} type="file" id="uploadCategoryImage" className="hidden" />
                </label>

              </div>
            </div>

            <button
              disabled={!data.name && !data.image}
              className={
                `
              w-full mt-5 p-2 border-4  text-white kode_mono_bold  rounded-md shadow-md 
              ${data.name && data.image ? "border-green-500 bg-green-400 hover:bg-green-500 cursor-pointer" : "bg-gray-300 border-gray-300 cursor-not-allowed"}

              `
              }>
              {loading ? "Loading..." : "Add Category"}
            </button>

          </form>
        </div>
      </section>
    </>
  )
}

export default UploadCategoryModel