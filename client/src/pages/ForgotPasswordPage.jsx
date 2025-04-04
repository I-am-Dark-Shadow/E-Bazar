import { useState } from "react"

// import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {

  // data is used to store the value of the input field
  const [data, setData] = useState({
    email: "",
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

  const navigate = useNavigate()

  const valideValue = Object.values(data).every((item) => item)


  // API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // if password and confirm password match then show success message
      const response = await Axios({
        ...SummaryApi.forgort_password,
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
        navigate("/verification-otp", {
          state : data
        })
        // when OTP was reset email field will be empty
        setData({
          email: "",
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
          <p className="lg:text-2xl text-xl font-semibold text-center text-green-500 bg-cyan-100 rounded p-2">Forgot Password</p>

          <form action="" className="gap-4 py-4 mt-6 flex flex-col justify-center" onSubmit={handleSubmit}>

            <div className="flex flex-col justify-center gap-1">
              {/* htmlFor mean label for input */}
              <label htmlFor="email" className="cursor-pointer font-semibold">Email :</label>
              <input
                className="bg-blue-50 p-2 cursor-pointer flex items-center border rounded outline-none focus:border-primary-200"
                type="email"
                id="email"
                value={data.email}
                onChange={handleChange}
                name="email"
                placeholder="Enter your Email"
              />
            </div>



            <div className="flex flex-col justify-center gap-1">
              <button
                className={`${valideValue ? "bg-green-600 cursor-pointer hover:bg-green-700" : "bg-gray-200 cursor-not-allowed"}   text-white py-2 rounded font-semibold tracking-widest`}
                type="submit"
                disabled={!valideValue} // Disables button when input is invalid
              >
                Send OTP
              </button>
            </div>

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

export default ForgotPasswordPage
