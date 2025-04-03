/* eslint-disable react/prop-types */

import { FaRegWindowClose } from "react-icons/fa";


const ConfirmBox = ({ cancel, confirm, close }) => {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50 p-4">
                <div className="bg-white w-full max-w-lg rounded-md p-4">
                    <div className="">
                        <div className="flex items-center justify-between shadow-md p-3 bg-amber-100 rounded-md">
                            <h1 className="text-xl kode_mono_bold text-red-600">Permanently Delete</h1>
                            <button onClick={close} className="w-fit block ml-auto text-red-600 hover:text-red-700">
                                <FaRegWindowClose size={30} />
                            </button>
                        </div>
                        <h2 className="text-lg font-semibold mb-4 mt-6">Are you sure?</h2>
                        <p className="text-gray-600 mb-4">Are you sure to delete this item permanently?</p>
                        <div className="flex justify-end">
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2" onClick={cancel}>Cancel</button>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md" onClick={confirm}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmBox