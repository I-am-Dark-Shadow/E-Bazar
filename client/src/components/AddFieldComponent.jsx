/* eslint-disable react/prop-types */
import { FaRegWindowClose } from "react-icons/fa";


const AddFieldComponent = ({ close,value, onChsange, submit  }) => {
    return (
        <>
            <section className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50 p-4">
                <div className="w-full max-w-md p-4 bg-white rounded-xl">
                    <div className="flex items-center justify-between shadow-md p-3 bg-amber-100 rounded-md gap-20">
                        <h1 className="text-xl kode_mono_bold text-gray-900">Add New Field</h1>
                        <button onClick={close} className="w-fit block ml-auto text-red-600 hover:text-red-700">
                            <FaRegWindowClose size={30} />
                        </button>
                    </div>
                    <input 
                    type="text"
                    className=" mt-5 w-full p-3 border focus:outline-green-500 border-yellow-400 rounded-md bg-blue-50"
                    placeholder="Enter Field Name"
                    value={value}
                    onChange={onChsange}
                    />

                    <button
                    onClick={submit}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-5">
                        Add Field
                    </button>
                </div>
            </section>
        </>
    )
}

export default AddFieldComponent