import { useState } from "react"

// icons import section
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

// import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

    // data is used to store the value of the input field
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })


    // onChange is used to get the value of the input field
    // x_x
    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }

        })
    }


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()

    const valideValue = Object.values(data).every((item) => item)

    // password and confirm password match or not
    const passwordMatch = data.password === data.confirmPassword

    // API call
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // if password and confirm password match then show success message
            const response = await Axios({
                ...SummaryApi.register,
                data: data
            })

            // if response is error then show error message using toast
            if (response.data.error){
                toast.error(response.data.message)
            }

            // if response is success then show success message using toast
            if (response.data.success){
                toast.success(response.data.message)
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                // redirect to login page
                navigate("/login")
            }


        } catch (error) {
            // if response is error then show error message
            AxiosToastError(error)

        }

    }

    return (
       <>
            <section className="w-full container mx-auto flex px-2 justify-center">
                <div className="bg-white my-4 w-full max-w-sm lg:max-w-lg mx-auto rounded py-4 px-6 mb-5">
                    <p className="lg:text-2xl text-xl font-semibold text-center text-green-500 bg-cyan-100 rounded p-2">Wellcome To E-Bazar</p>

                    <form action="" className="gap-4 mt-6 flex flex-col justify-center" onSubmit={handleSubmit}>
                        <div className="grid gap-1">
                            {/* htmlFor mean label for input */}
                            <label htmlFor="name" className="cursor-pointer font-semibold">Name :</label>
                            <input
                                className="bg-blue-50 p-2 cursor-pointer border rounded flex items-center focus-within:border-primary-200"
                                type="text"
                                id="name"
                                autoFocus
                                value={data.name}
                                onChange={handleChange}
                                name="name"
                                placeholder="Enter your Full Name"
                            />
                        </div>

                        <div className="grid gap-1">
                            {/* htmlFor mean label for input */}
                            <label htmlFor="email" className="cursor-pointer font-semibold">Email :</label>
                            <input
                                className="bg-blue-50 p-2 cursor-pointer border rounded flex items-center focus-within:border-primary-200"
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={handleChange}
                                name="email"
                                placeholder="Enter your Email"
                            />
                        </div>

                        <div className="grid gap-1">
                            {/* htmlFor mean label for input */}
                            <label htmlFor="password" className="cursor-pointer font-semibold">Password :</label>

                            <div className="bg-blue-50 p-2 cursor-pointer border rounded flex items-center focus-within:border-primary-200">
                                <input
                                    className="w-full outline-none bg-blue-50 cursor-pointer"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    name="password"
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
                            <label htmlFor="confirmPassword" className="cursor-pointer font-semibold">Confirm Password :</label>

                            {/* password match or not */}
                            {data.password && data.confirmPassword && (
                                <p className={`${passwordMatch ? "text-green-600 text-sm" : "text-red-600 text-sm"} `} >
                                    {
                                        passwordMatch ? "Password and Confirm Password Match" : "Password and Confirm Password Not Match"
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
                            className={`${valideValue && passwordMatch ? "bg-green-600 cursor-pointer hover:bg-green-700" : "bg-gray-200 cursor-not-allowed"}  mt-4 text-white py-2 rounded font-semibold tracking-widest`}
                            type="submit"
                            disabled={!valideValue || !passwordMatch} // Disables button when input is invalid
                        >
                            Register
                        </button>

                    </form>

                    <p className="text-center mt-3 text-sm text-gray-500">
                        Already have an account ?
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

export default RegisterPage
