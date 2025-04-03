/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

import angryImage from "../assets/angry.jpg"
import isAdmin from "../utils/isAdmin";


const AdminPermision = ({ children }) => {

    const user = useSelector((state) => state.user);

    return (
        <>
            {
                isAdmin(user.role) ? children :
                    <div className="container mx-auto p-6 flex flex-col items-center">
                        <div className="bg-gray-100 w-full h-full p-5 mt-0 rounded-lg">
                            <div className="flex flex-col items-center justify-center text-center">
                                <h1 className="text-lg lg:text-2xl font-bold text-amber-500">
                                    🚫 ACCESS DENIED 🚫
                                </h1>
                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 text-sm lg:text-lg font-semibold mt-3">
                                    Please login with an admin account!!
                                </p>
                                <p className="text-gray-600 text-sm lg:text-lg font-semibold mt-3 animate-fade-up">
                                    😡 <span className="italic">I know you&#39;re not an admin, so you can&#39;t access this page.</span> 😡
                                </p>
                            </div>
                        </div>

                        <img
                            className="mt-16 lg:w-1/4 w-1/2 opacity-60 transform transition-all"
                            src={angryImage}
                            alt="Access Denied"
                        />

                        <p className="text-red-500 text-sm lg:text-lg mt-4 font-semibold animate-pulse">
                            Why were you redirected to this page&#39;s URL? 🤔
                        </p>
                    </div>

            }
        </>
    )
}

export default AdminPermision