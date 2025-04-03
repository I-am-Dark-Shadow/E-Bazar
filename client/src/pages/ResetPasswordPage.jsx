import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

// icons import section
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const ResetPasswordPage = () => {

    // react router useLocation hook
    const location = useLocation();

    // react router navigate hook
    const navigate = useNavigate();

    // showPassword is used to show password
    const [showPassword, setShowPassword] = useState(false);

    // showConfirmPassword is used to show confirm password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    // data is used to store the value of the input field
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
        // those name is same as the name of the database model field
    })

    // valideValue is used to check the value of the input field
    const valideValue = Object.values(data).every((item) => item)

    // password and confirm password match or not
    const passwordMatch = data.newPassword === data.confirmPassword

    // redirect to home page when user iput manually url for reset-password
    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }

        if (location?.state?.email) {
            setData((preve) => {
                return {
                    ...preve,
                    email: location?.state?.email
                }
            })
        }
    }, [location, navigate])

    // handleChange is used to get the value of the input field
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
        e.preventDefault();

        try {
            // if password and confirm password match then show success message
            const response = await Axios({
                ...SummaryApi.resetPassword, // change end point
                data: data
            })

            // if response is error then show error message using toast
            if (response.data.error) {
                toast.error(response.data.message)
            }

            // if response is success then show success message using toast
            if (response.data.success) {
                toast.success(response.data.message)

                // redirect to verification-otp page with carrying email because there no email field
                navigate("/login", {
                    state: data
                })

                // when reset password successfully then all field will be empty
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })
            }



        } catch (error) {
            // if response is error then show error message
            AxiosToastError(error)

        }

    }




    return (
        <>
            <section className="w-full container mx-auto px-2">
                <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-8 mb-5">
                    <p className="lg:text-2xl text-xl font-semibold text-center text-green-500 bg-cyan-100 rounded p-2">Reset Password</p>

                    <form action="" className="grid gap-4 py-4 mt-6" onSubmit={handleSubmit}>

                        <div className="grid gap-1">
                            {/* htmlFor mean label for input */}
                            <label htmlFor="email" className="cursor-pointer font-semibold">Email :</label>
                            <input
                                className="bg-blue-50 p-2 cursor-not-allowed border rounded outline-none focus:border-primary-200"
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={handleChange}
                                name="email"
                                placeholder="Email not Found"
                                readOnly
                                disabled

                            />
                        </div>

                        <div className="grid gap-1">
                            {/* htmlFor mean label for input */}
                            <label htmlFor="newPassword" className="cursor-pointer font-semibold">New Password :</label>

                            <div className="bg-blue-50 p-2 cursor-pointer border rounded flex items-center focus-within:border-primary-200">
                                <input
                                    className="w-full outline-none bg-blue-50 cursor-pointer"
                                    type={showPassword ? "text" : "password"}
                                    id="newPassword"
                                    value={data.password}
                                    onChange={handleChange}
                                    name="newPassword"
                                    placeholder="Enter your Password"
                                />
                                <div className="cursor-pointer" >

                                    {
                                        showPassword ? (
                                            <FaRegEye
                                                className=""
                                                onClick={() => setShowPassword(false)}
                                            />
                                        ) : (
                                            <FaRegEyeSlash
                                                className=""
                                                onClick={() => setShowPassword(true)}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-1">
                            {/* htmlFor mean label for input */}
                            <label htmlFor="confirmPassword" className="cursor-pointer font-semibold">Confirm New Password :</label>

                            {/* password match or not */}
                            {data.newPassword && data.confirmPassword && (
                                <p className={`${passwordMatch ? "text-green-600 text-sm" : "text-red-600 text-sm"} `} >
                                    {
                                        passwordMatch ? "New Password and Confirm New Password Match" : "New Password and Confirm New Password Not Match"
                                    }
                                </p>
                            )}

                            <div className="bg-blue-50 p-2 cursor-pointer border rounded flex items-center focus-within:border-primary-200">
                                <input
                                    className="w-full outline-none bg-blue-50 cursor-pointer"
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    name="confirmPassword"
                                    placeholder="Enter your Confirm Password"
                                />
                                <div className="cursor-pointer" >

                                    {
                                        showConfirmPassword ? (
                                            <FaRegEye
                                                className=""
                                                onClick={() => setShowConfirmPassword(false)}
                                            />
                                        ) : (
                                            <FaRegEyeSlash
                                                className=""
                                                onClick={() => setShowConfirmPassword(true)}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </div>



                        <button
                            className={`${valideValue && passwordMatch ? "bg-green-600 cursor-pointer hover:bg-green-700" : "bg-gray-200 cursor-not-allowed"}   text-white py-2 rounded font-semibold tracking-widest`}
                            type="submit"
                            disabled={!valideValue || !passwordMatch} // Disables button when input is invalid
                        >
                            Change Password
                        </button>

                    </form>

                    <p className="text-center mt-3 text-sm text-gray-500">
                        Don&apos;t want to reset password ?
                        <Link
                            to="/login"
                            className="text-blue-500 hover:text-primary-700 mx-2 hover:text-blue-700 font-semibold"
                        >
                            [Login]
                        </Link>

                    </p>
                </div>
            </section>
        </>
    )
}

export default ResetPasswordPage