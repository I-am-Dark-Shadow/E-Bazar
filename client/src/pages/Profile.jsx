import { useSelector } from "react-redux"
import "../index.css"

import { FaSquareWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";



const Profile = () => {
    const user = useSelector((state) => state.user);

    return (
        <>
            <div className="container mx-auto p-3 flex items-center justify-center ">

                {/* all the details of user */}
                <div className="bg-white w-full h-full p-5 mt-0">
                    <div className="">
                        <div className="flex flex-col lg:flex-row items-center gap-6">
                            {
                                user.avatar ? (
                                    <>
                                        <div className="relative w-40 rounded-full">
                                            <span className="absolute left-24 mt-2 m-4 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
                                            <img className=" mx-auto h-[130px] w-[130px]  lg:h-[100px] lg:w-[100px] rounded-full object-cover object-center border-8 border-green-200" src={user.avatar} alt="Avatar" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="relative w-40 rounded-full">
                                            <span className="absolute left-16 mt-1 m-4 h-3 w-3 rounded-full bg-red-500 ring-2 ring-red-300 ring-offset-2"></span>
                                            <FaRegUserCircle size={100} />
                                        </div>
                                    </>
                                )
                            }

                            <div className="">
                                <p className="mt-0 lg:mt-8 text-xl lg:text-3xl font-semibold kode_mono text-gray-900">
                                    <span className="font-bold port_lligat_sans_regular">NAME</span> :
                                    <Link to={"https://suvrodip-chakroborty.vercel.app/"}>{user.name.toUpperCase()}</Link>
                                </p>
                                <p className="mt-2 text-sm lg:mt-3  lg:text-lg font-semibold kode_mono text-blue-600">
                                    <span className="font-bold port_lligat_sans_regular text-gray-900">EMAIL</span> :
                                    <Link to={""}>{user.email}</Link>
                                </p>
                                <p className="mt-2 text-sm lg:mt-3 lg:text-md font-semibold kode_mono text-green-900 flex gap-2 items-center">
                                    <span className="font-bold port_lligat_sans_regular text-gray-900">MOBILE NO </span> :
                                    <Link to={""}>{user.mobile}</Link>
                                    <FaSquareWhatsapp />
                                </p>
                            </div>
                        </div>
                        {/* <div className=" ml-auto flex flex-col gap-2">
                            <p className="text-2xl mt-8 lg:text-3xl font-semibold text-green-900">
                                <span className="font-bold caveat">All Orders : </span>
                            </p>
                            <p className=" text-gray-400">-------------------</p>



                        </div> */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile