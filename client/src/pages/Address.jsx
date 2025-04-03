import { useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "../components/AddAddress";

import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import EditAddressDetails from "../components/EditAddressDetails";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";

const Address = () => {

  const addressList = useSelector((state) => state?.addresses?.addressList);

  const [openAddress, setOpenAddress] = useState(false);

  const [openEditAddress, setOpenEditAddress] = useState(false);

  const [editAddress, setEditAddress] = useState({});

  const { fetchAddress } = useGlobalContext();

  const handleDisableAddress = async (id) => {
    try {

      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: {
          _id: id
        }
      })

      // check if response is success
      if (response?.data?.success) {
        toast.success("Address Disabled/Removed")
        if (fetchAddress) {
          fetchAddress()
        }
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }


  return (
    <div className="p-4">
      <div className="py-3 px-6 font-semibold bg-yellow-100 shadow-md flex items-center justify-between rounded-md">
        <h2 className="text-md lg:text-2xl kode_mono_bold">ALL ADDRESSES</h2>
        <button onClick={() => setOpenAddress(true)} className="text-md lg:text-xl p-1 lg:p-2 border-4 border-green-500 bg-green-400 text-white hover:bg-green-500 rounded-md shadow-md">Add Address</button>
      </div>
      {
        addressList?.length > 0 ? (
          addressList?.map((address, index) => {
            return (
              <>
                <div key={index} className={`mt-4 bg-yellow-50 hover:bg-yellow-100 cursor-pointer border-2 border-dashed border-yellow-500 rounded-lg p-4 flex gap-1 ${!address.status && "hidden"}`}>
                  {/* address index number */}

                  <div className="w-full">
                    <h4 className="font-bold uppercase text-lg flex items-center gap-2 -mt-1">
                      🏠:
                      <span className="text-green-600 font-bold uppercase text-lg"> {index + 1}</span>
                    </h4>
                    <p className="text-indigo-600 font-bold uppercase text-lg items-center gap-2">
                      Address :
                      <span className="text-gray-600 font-medium normal-case text-base"> {address.address_line}</span>
                    </p>
                    <p className="text-indigo-600 font-bold uppercase text-lg items-center gap-2">
                      City :
                      <span className="text-gray-600 font-medium normal-case text-base"> {address.city}</span>
                    </p>
                    <p className="text-indigo-600 font-bold uppercase text-lg items-center gap-2">
                      Pincode :
                      <span className="text-gray-600 font-medium normal-case text-base"> {address.pincode}</span>
                    </p>
                    <p className="text-indigo-600 font-bold uppercase text-lg items-center gap-2">
                      State :
                      <span className="text-gray-600 font-medium normal-case text-base"> {address.state}</span>
                    </p>
                    <p className="text-indigo-600 font-bold uppercase text-lg items-center gap-2">
                      Country :
                      <span className="text-gray-600 font-medium normal-case text-base"> {address.country}</span>
                    </p>
                    <p className="text-indigo-600 font-bold uppercase text-lg items-center gap-2">
                      Mobile Number :
                      <span className="text-gray-600 font-medium normal-case text-base"> {address.mobile}</span>
                    </p>
                  </div>
                  <div className="px-2 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setOpenEditAddress(true)
                        setEditAddress(address)
                      }}
                      className="text-green-500 p-1 border-2 border-green-500 rounded-md cursor-pointer hover:bg-green-500 hover:text-white">
                      <BiSolidEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDisableAddress(address._id)}
                      className="text-red-500 p-1 border-2 border-red-500 rounded-md cursor-pointer hover:bg-red-500 hover:text-white">
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              </>
            )
          })
        ) : (
          <div className="my-4">
            <p className="text-xl font-mono font-medium text-red-500 animate-pulse">No Address Found</p>
          </div>
        )
      }
      <div onClick={() => setOpenAddress(true)} className="h-16 bg-blue-50 hover:bg-blue-100 border-2 border-dashed rounded border-blue-500 my-4 flex items-center justify-center cursor-pointer text-gray-500">
        Add New Address..
      </div>

      {/* add address modal */}
      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }

      {
        openEditAddress && (
          <EditAddressDetails data={editAddress} close={() => setOpenEditAddress(false)} />
        )
      }


    </div>
  )
}

export default Address