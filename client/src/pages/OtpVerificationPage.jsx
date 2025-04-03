import { useEffect, useRef, useState } from "react"

// import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerificationPage = () => {

  // data is used to store the value of the input field
  const [data, setData] = useState(["", "", "", "", "", ""])

  // input one box then automatically focus on next box
  const inputRef = useRef([])

  // when redirect to otp-verification page then eccept email field value from forgot-password page
  const location = useLocation()

  // react router navigate hook
  const navigate = useNavigate()

  // suppose user redirect or open otp-verification url without email field
  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password")
    }
  },[location, navigate]) 
  // By adding location and navigate to the dependency array, 
  // you're telling React to re-run the effect whenever location or navigate changes. 
  // This ensures that the effect is always up-to-date and avoids potential bugs.


  const valideValue = data.every((item) => item)

  // API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // if password and confirm password match then show success message
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp : data.join(""),
          email : location?.state?.email
        }
      })

      // if response is error then show error message using toast
      if (response.data.error) {
        toast.error(response.data.message)
      }

      // if response is success then show success message using toast
      if (response.data.success) {
        toast.success(response.data.message)
        setData(["", "", "", "", "", ""])

        // redirect to verification-otp page
        navigate("/reset-password",{
          state : {
            data : response.data,
            email : location?.state?.email
          }
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
          <p className="lg:text-2xl text-xl font-semibold text-center text-green-500 bg-cyan-100 rounded p-2">OTP Verification</p>

          <form action="" className="grid gap-4 py-4 mt-6" onSubmit={handleSubmit}>

            <div className="grid gap-1">
              {/* htmlFor mean label for input */}
              <label htmlFor="otp" className="cursor-pointer font-semibold">Enter your OTP :</label>

              <div className="flex gap-4 justify-center">
                {
                  data.map((element, index) => {
                    return (
                      <input
                        key={"otp" + index}
                        className="bg-blue-50 my-4 w-full max-w-14 p-2 text-center cursor-pointer border rounded outline-none focus:border-primary-200 text-xl font-semibold text-blue-900"
                        type="text"
                        id="otp"
                        ref={(ref) => {
                          inputRef.current[index] = ref // input one box then automatically focus on next box
                          return ref
                        }}
                        maxLength={1} // Limit input to 1 character
                        value={data[index]} // Get value from data array at index position
                        onChange={(e) => {
                          const value = e.target.value;

                          // Update data array at index position
                          const newData = [...data];
                          newData[index] = value;
                          setData(newData)

                          // Focus on next input box
                          if (value && index < 5) {
                            inputRef.current[index + 1].focus();
                          }

                        }}
                      />
                    )
                  })
                }
              </div>


            </div>


            <button
              className={`${valideValue ? "bg-green-600 cursor-pointer hover:bg-green-700" : "bg-gray-200 cursor-not-allowed"}   text-white py-2 rounded font-semibold tracking-widest`}
              type="submit"
              disabled={!valideValue} // Disables button when input is invalid
            >
              Verify OTP
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

export default OtpVerificationPage