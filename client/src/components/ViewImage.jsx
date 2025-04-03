/* eslint-disable react/prop-types */
import { FaRegWindowClose } from "react-icons/fa";

const ViewImage = ({ url, close }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50 p-4">
            <div className="relative p-4 bg-white rounded-xl max-w-screen-lg w-full">
                {/* Close Button */}
                <button onClick={close} className="absolute top-3 right-3 text-red-600 hover:text-red-700">
                    <FaRegWindowClose size={30} />
                </button>

                {/* Image with max size and padding */}
                <div className="flex items-center justify-center p-5">
                    <img
                        className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        alt="View Image Full Screen"
                        src={url}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewImage;
