import "../index.css"

import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// images import
import errorimage from "../assets/wrong.jpg"


const Dashboard = () => {
    const user = useSelector((state) => state.user);

    return (
        <>
            {
                user._id ? (
                    <>
                        <section className="bg-blue-50 lg:mx-auto mx-5 lg:mt-[-30px]">
                            <div className="container mt-5 lg:mt-0  lg:p-3 grid lg:grid-cols-[500px,1fr]">
                                {/* left sidebar */}
                                <div className=" sticky top-24 max-h-[calc(100vh-0px)] overflow-y-auto hidden lg:block">
                                    <UserMenu />
                                </div>

                                {/* right sidebar */}
                                <div className="lg:my-auto lg:mt-10 max-h-[calc(100vh-200px)] overflow-y-auto  bg-white border-2 rounded-lg shadow-lg lg:min-h-[82vh] custom-scrollbar-hidden">
                                    <Outlet />
                                </div>
                            </div>

                        </section>
                    </>
                ) : (
                    <>
                        <div className="container mx-auto p-3 flex flex-col items-center justify-center">
                            <div className="bg-gray-100 w-full h-full p-5 mt-0">
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="text-2xl font-bold text-gray-500">You are not logged in</h1>
                                    <p className="text-gray-500">Please login to access your dashboard</p>
                                </div>
                            </div>
                            <img className="mt-10 w-1/5 rounded-3xl shadow-md" src={errorimage} alt="image" />
                        </div>
                    </>
                )
            }

        </>
    )
}

export default Dashboard