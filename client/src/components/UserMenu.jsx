import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

// icons import section
import { HiExternalLink } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";


import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";



// user menu section component
// eslint-disable-next-line react/prop-types
const UserMenu = ({ close }) => {

    // user details from database
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // handle logout function use for logout
    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })

            if (response.data.success) {

                // close model when after login
                if (close) {
                    // close model close when after login 
                    close()
                }

                // dispatch logout mean remove user details from redux store
                dispatch(logout());
                // remove token from local storage
                localStorage.clear()

                // show success message and redirect
                toast.success(response.data.message);

                // redirect to login page 
                navigate("/")

                // // Optionally, refresh the page
                // window.location.reload();


            }
        } catch (error) {
            console.log("logout error", error);
            // show error message
            AxiosToastError(error)
        }
    }

    const handleClose = () => {
        // close model when after login
        if (close) {
            // close model close when after login 
            close()
        }
    }

    return (
        <>
            <div className="m-10 max-w-sm">
                <div className="rounded-lg border bg-white px-4 pt-8 pb-6 shadow-lg" onClick={handleClose}>
                    {
                        user.avatar ? (
                            <>
                                <div className="relative mx-auto w-28 rounded-full">
                                    <span className="absolute left-20 mt-2 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
                                    <Link to={"/dashboard/profile"}><img className="mx-auto h-[110px] w-[110px] rounded-full object-cover object-center border-8 border-green-200" src={user.avatar} alt="Avatar" /></Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="relative mx-auto w-28 rounded-full">
                                    <span className="absolute left-20 mt-2 m-4 h-3 w-3 rounded-full bg-red-500 ring-2 ring-red-300 ring-offset-2"></span>
                                    <Link to={"/dashboard/profile"}><FaRegUserCircle size={110} /></Link>
                                </div>
                            </>
                        )
                    }

                    <h1 className="my-1 text-center text-xl font-bold press_start_2p_regular leading-8 text-gray-900">{user.name}</h1>

                    <h3 className="font-lg font-semibold kode_mono text-center leading-6 text-gray-600">{user.email}</h3>

                    <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600"><span className="font-semibold text-gray-600">Mobile No :</span> {user.mobile}</p>

                    <p className="text-center text-sm leading-6 text-gray-500 hover:text-blue-900">
                        <Link onClick={handleClose} to={"/dashboard/profile"} className="font-semibold items-center flex justify-center gap-1">{user.role} <HiExternalLink /> </Link>
                    </p>

                    {/* <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">{user.last_login_date}</p> */}

                    <div className="flex items-center p-4">
                        <Link onClick={handleClose} to={"/dashboard/myorders"} className="flex items-center gap-1 hover:text-blue-700 font-semibold ">Recent Order <HiExternalLink /></Link>
                        <button onClick={handleLogout} className="ml-auto">
                            <span className="rounded-md bg-red-200 py-1 p-2 text-xs font-medium text-red-700 hover:bg-red-300">Logout</span>
                        </button>
                    </div>

                    <ul className="mt-3 divide-y rounded-md bg-gray-100 py-2 px-3 text-gray-600 shadow hover:text-gray-700 hover:shadow">
                        {
                            user.role === "ADMIN" ? (
                                <>
                                    <li className="flex items-center py-3 text-sm">
                                        <Link onClick={handleClose} to={"/dashboard/category"} className="font-semibold hover:text-green-600  flex items-center gap-1">1. Category <HiExternalLink /> </Link>
                                        <Link onClick={handleClose} to={"/dashboard/subcategory"} className="ml-auto font-semibold hover:text-amber-600  flex items-center gap-1">2. Sub Category <HiExternalLink /> </Link>
                                    </li>
                                    <li className="flex items-center py-3 text-sm">
                                        <Link onClick={handleClose} to={"/dashboard/uploadproduct"} className="font-semibold hover:text-violet-600  flex items-center gap-1">3. Upload Product <HiExternalLink /> </Link>
                                        <Link onClick={handleClose} to={"/dashboard/products"} className="ml-auto font-semibold hover:text-pink-600  flex items-center gap-1">4. Products <HiExternalLink /> </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="flex items-center py-3 text-sm">
                                        <span className="cursor-not-allowed">Status :  </span>
                                        <span className="ml-auto"><span className="cursor-not-allowed rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">{user.status}</span></span>
                                    </li>
                                </>
                            )
                        }

                        <li className="flex items-center py-3 text-sm">
                            <Link onClick={handleClose} to={"/dashboard/address"} className="font-semibold hover:text-blue-900 flex items-center gap-1">Save/Add Address <HiExternalLink /> </Link>
                            {/* <span className="ml-auto truncate max-w-[120px] overflow-hidden whitespace-nowrap">{user.address_details}</span> */}
                        </li>
                        <li className="flex items-center py-3 text-sm">
                            <Link onClick={handleClose} to={"/dashboard/ordershistory"} className="font-semibold hover:text-blue-900 flex items-center gap-1">Order History <HiExternalLink /></Link>
                            <Link onClick={handleClose} to={"/dashboard/editprofile"} className="ml-auto">
                                <span className="rounded-full bg-cyan-200 hover:bg-cyan-300 py-1 px-2 text-xs font-medium text-green-700">Edit Profile</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    )
}

export default UserMenu