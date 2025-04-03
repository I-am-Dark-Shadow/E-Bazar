import { useState } from "react"
import { FaRegUserCircle } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi.js"
import AxiosToastError from "../utils/AxiosToastError"
import { updateAvatar } from "../redux/userSlice.js"


// icons import section
import { IoMdCloseCircleOutline } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const UserProfileAvatarEdit = ({ close }) => {

    const user = useSelector((state) => state.user)

    const dispatch = useDispatch();

    //  loading state
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleUploadAvatarImage = async (e) => {
        const file = e.target.files[0]

        // if no file then return
        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append("avatar", file)


        // upload avatar image
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData
            })
            const { data: responseData } = response
            dispatch(updateAvatar(responseData.data.avatar))

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }


    }

    return (
        <>
            <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-700 bg-opacity-90 p-4 flex items-center justify-center">

                <div className="bg-white max-w-sm w-full p-6 rounded-lg flex flex-col items-center">
                    <button className="ml-auto mt-[-1rem] mr-[-1rem] font-semibold text-red-600 hover:text-red-800 cursor-pointer">
                        <IoMdCloseCircleOutline size={35} onClick={ close } />
                    </button>
                    <div className="flex items-center justify-center">
                        {
                            user.avatar ? (
                                <>
                                    <div className="relative w-40 rounded-full">
                                        <img className=" mx-auto h-[130px] w-[130px]  lg:h-[100px] lg:w-[100px] rounded-full object-cover object-center border-8 border-green-200" src={user.avatar} alt="Avatar" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="relative w-40 rounded-full justify-center items-center flex">
                                        <FaRegUserCircle size={100} />
                                    </div>
                                </>
                            )
                        }
                    </div>

                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="uploadProfileImage">
                            <div className="mt-4 font-semibold bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg text-xs">
                                {
                                    loading ? "Loading..." : "Upload New Image"
                                }
                            </div>
                        </label>

                        <input onChange={handleUploadAvatarImage} type="file" id="uploadProfileImage" className="hidden" />
                    </form>

                </div>

            </section>
        </>
    )
}

export default UserProfileAvatarEdit