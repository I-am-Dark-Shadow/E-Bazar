import { useDispatch, useSelector } from "react-redux"
import "../index.css"

// icons import section
import { MdOutlineEdit } from "react-icons/md";



import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../redux/userSlice";






const EditProfile = () => {
    // get user details from redux store
    const user = useSelector((state) => state.user);

    // state for open profile avatar edit 
    const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);

    // set user data 
    const [userData, setUserData] = useState({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
    });

    // loading 
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // fetch user details 
    useEffect(() => {
        setUserData({
            name: user.name || "",
            email: user.email || "",
            mobile: user.mobile || "",
        });
    }, [user]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        // Update the userData state
        setUserData((preve) => ({
            ...preve,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // update user details 
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data: userData
            });

            // if response is error then show error message
            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);

                // fetch user details when submit button clicked then whole website will be reloaded and updated
                const userData = await fetchUserDetails();
                dispatch(setUserDetails(userData.data));
            }


        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    }



    return (
        <>
            <div className="container mx-auto p-3 flex items-center justify-center ">

                {/* all the details of user */}
                <div className="bg-white w-full h-full p-5 mt-0">
                    <div className="">
                        <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-20">
                            {
                                user.avatar ? (
                                    <>
                                        <div className="relative w-40 rounded-full flex items-center flex-col">
                                            <span className="absolute left-24 mt-2 m-4 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
                                            <img onClick={() => setOpenProfileAvatarEdit(true)} className=" mx-auto h-[130px] w-[130px]  lg:h-[100px] lg:w-[100px] rounded-full object-cover object-center border-8 border-green-200 cursor-pointer" src={user.avatar} alt="Avatar" />
                                            <button onClick={() => setOpenProfileAvatarEdit(true)} className="absolute lg:mt-2 mt-5 bg-gray-300 bg-opacity-50  text-white  rounded-full p-8 lg:p-7 text-xs">
                                                <Link to="/dashboard/editprofile"><MdOutlineEdit size={30} /></Link>
                                            </button>
                                            {
                                                openProfileAvatarEdit && (
                                                    <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
                                                )
                                            }
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        <div className="relative w-40 rounded-full">
                                            <span className="absolute left-16 mt-1 m-4 h-3 w-3 rounded-full bg-red-500 ring-2 ring-red-300 ring-offset-2"></span>
                                            <FaRegUserCircle size={100} />
                                            <button className="mt-3 bg-yellow-400 hover:bg-green-500 text-white px-4 py-1 rounded-xl text-xs">
                                                <Link to="/dashboard/editprofile"><MdOutlineEdit size={25} /></Link>
                                            </button>
                                            <UserProfileAvatarEdit />
                                        </div>
                                    </>
                                )
                            }
                        </div>


                        <div className="mt-6">
                            <form action="" className="" onSubmit={handleSubmit}>
                                <div className="mt-5">
                                    <label htmlFor="name" className="text-xl font-bold port_lligat_sans_regular">
                                        NAME :
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-1 mt-2  text-lg lg:text-xl font-semibold kode_mono text-gray-500 outline-none border-2  rounded-lg focus:border-2 focus:border-green-400"
                                        placeholder="Enter Your New Name"
                                        id="name"
                                        value={userData.name || ""}
                                        name="name"
                                        onChange={handleOnChange}
                                        autoComplete="name"
                                        required
                                    />
                                </div>

                                <div className="mt-5">
                                    <label htmlFor="email" className="text-xl font-bold port_lligat_sans_regular">
                                        EMAIL :
                                    </label>
                                    <input type="email" className="w-full p-1 mt-2 text-xl lg:text-lg font-semibold kode_mono text-gray-500 outline-none border-2  rounded-lg focus:border-green-400"
                                        placeholder="Enter Your New Name"
                                        id="email"
                                        value={userData.email || ""}
                                        name="email"
                                        onChange={handleOnChange}
                                        autoComplete="email"
                                        required
                                    />

                                </div>


                                <div className="mt-5">
                                    <label htmlFor="mobile" className="text-xl font-bold port_lligat_sans_regular">
                                        Mobile NO :
                                    </label>
                                    <input type="text" className="w-full p-1 mt-2 text-xl lg:text-lg font-semibold kode_mono text-gray-500 outline-none border-2  rounded-lg focus:border-green-400"
                                        placeholder="Enter Your New Mobile No"
                                        value={userData.mobile || ""}
                                        id="mobile"
                                        name="mobile"
                                        onChange={handleOnChange}
                                        autoComplete="mobile"
                                        required
                                    />
                                </div>

                                <button type="submit" className="shadow-lg font-semibold mt-8 border-4 border-green-600 bg-green-400 hover:bg-green-500 text-white px-4 py-1 rounded-xl text-lg">
                                    {
                                        loading ? "LOADING..." : "SUBMIT"
                                    }
                                </button>

                            </form>

                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default EditProfile