/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import { FaRegWindowClose } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";


const AddAddress = ({ close }) => {

    const { register, handleSubmit, reset } = useForm();

    const { fetchAddress } = useGlobalContext()

    const onSubmit = async (data) => {

        try {
            const response = await Axios({
                ...SummaryApi.createAddress,
                data: {
                    address_line: data.addressline,
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode,
                    country: data.country,
                    mobile: data.mobile
                }
            })

            // destructure the response because response is an object and we want to get the data
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (close) {
                    close()
                    reset()
                    fetchAddress()
                }
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }


    return (
        <>
            <section className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 z-50 p-4">
                <div className="bg-white p-4 w-full max-w-2xl max-h-[90vh] mt-4 mx-auto overflow-y-scroll lg:custom-scrollbar-green">
                    <div className='flex justify-between items-center gap-4 bg-yellow-100 p-3 rounded border-2 border-dashed border-yellow-500'>
                        <h2 className='font-semibold kode_mono_bold text-3xl underline'>Add Address</h2>
                        <button onClick={close} className='hover:text-red-600 text-red-500'>
                            <FaRegWindowClose size={30} />
                        </button>
                    </div>
                    <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid gap-1'>
                            <label htmlFor='addressline'>Address :</label>
                            <input
                                type='text'
                                id='addressline'
                                className='border bg-blue-50 p-2 rounded outline-green-500'
                                {...register("addressline", { required: true })}
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor='city'>City :</label>
                            <input
                                type='text'
                                id='city'
                                className='border bg-blue-50 p-2 rounded outline-green-500'
                                {...register("city", { required: true })}
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor='state'>State :</label>
                            <input
                                type='text'
                                id='state'
                                className='border bg-blue-50 p-2 rounded outline-green-500'
                                {...register("state", { required: true })}
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor='pincode'>Pincode :</label>
                            <input
                                type='number'
                                id='pincode'
                                className='border bg-blue-50 p-2 rounded outline-green-500'
                                {...register("pincode", { required: true })}
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor='country'>Country :</label>
                            <input
                                type='text'
                                id='country'
                                className='border bg-blue-50 p-2 rounded outline-green-500'
                                {...register("country", { required: true })}
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor='mobile'>Mobile No. :</label>
                            <input
                                type='text'
                                id='mobile'
                                className='border bg-blue-50 p-2 rounded outline-green-500'
                                {...register("mobile", { required: true })}
                            />
                        </div>

                        {

                        }
                        <button type='submit' className='bg-green-500 w-full rounded py-2 font-semibold mt-4 hover:bg-green-600 text-white'>Submit</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddAddress