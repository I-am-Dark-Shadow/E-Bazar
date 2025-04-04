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
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/userSlice";


const LoginPage = () => {

  // data is used to store the value of the input field
  const [data, setData] = useState({
    email: "",
    password: "",
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


  // showPassword is used to show the password
  const [showPassword, setShowPassword] = useState(false);

  // navigate is used to navigate to another page 
  const navigate = useNavigate()

  // dispatch is used to dispatch the action
  const dispatch = useDispatch()


  const valideValue = Object.values(data).every((item) => item)


  // API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // if password and confirm password match then show success message
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      })

      // if response is error then show error message using toast
      if (response.data.error) {
        toast.error(response.data.message)
      }

      // if response is success then show success message using toast
      if (response.data.success) {
        toast.success(response.data.message)

        // store access token and refresh token in local storage
        localStorage.setItem("accessToken", response.data.data.accessToken)
        localStorage.setItem("refreshToken", response.data.data.refreshToken)

        const userDetails = await fetchUserDetails()

        // dispatch the action 
        dispatch(setUserDetails(userDetails?.data))


        setData({
          email: "",
          password: "",
        })

        // redirect to home page
        navigate("/")

        // // Optionally, refresh the page
        // window.location.reload();
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
          <p className="lg:text-2xl text-lg font-semibold text-center text-green-500 bg-cyan-100 rounded p-2">Wellcome Back To E-Bazar</p>

          <form action="" className="grid gap-4 py-4 mt-6" onSubmit={handleSubmit}>

            <div className="grid gap-1">
              {/* htmlFor mean label for input */}
              <label htmlFor="email" className="cursor-pointer font-semibold">Email :</label>
              <input
                className="bg-blue-50 w-full p-2 cursor-pointer border rounded outline-none focus:border-primary-200"
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

            <Link className="block ml-auto lg:text-red-300 hover:text-red-500 text-red-500"
              to="/forgot-password" >

              Forgot Password ?
            </Link>


            <button
              className={`${valideValue ? "bg-green-600 cursor-pointer hover:bg-green-700" : "bg-gray-200 cursor-not-allowed"}   text-white py-2 rounded font-semibold tracking-widest`}
              type="submit"
              disabled={!valideValue} // Disables button when input is invalid
            >
              Login
            </button>

          </form>

          <p className="text-center mt-3 text-sm text-gray-500">
            Don&apos;t have an account ?
            <Link
              to="/register"
              className="text-blue-500 hover:text-primary-700 mx-2 hover:text-blue-700 font-semibold"
            >
              [Register]
            </Link>

          </p>
        </div>
      </section>
    </>
  )
}

export default LoginPage
