import { MdCheckCircle } from 'react-icons/md';  // Import the checkmark icon
import { Link, useLocation } from 'react-router-dom';
import { DisplayPriceIndianRuppe } from '../utils/DisplayPriceIndianRuppe';

const Success = () => {
    const location = useLocation();

    //console.log(location?.state?.orderId);


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 -mt-5">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 lg:p-12">
                <div className="flex flex-col items-center text-center">
                    {/* Success Icon */}
                    <div className="mb-4">
                        <MdCheckCircle className="w-24 h-24 text-green-500" />
                    </div>
                    {/* Heading */}
                    <h1 className="text-4xl font-semibold text-gray-800 mb-4">
                        {/* eslint-disable-next-line no-extra-boolean-cast */}
                        {Boolean(location?.state?.text) ? location?.state?.text : 'Payment'} Successfully!
                    </h1>
                    {/* Subheading */}
                    <p className="text-lg text-gray-600 mb-6">
                        {/* eslint-disable-next-line no-extra-boolean-cast */}
                        {Boolean(location?.state?.text) ? "Your Order has been processed" : "Your payment has been successfully"}  and your order will be shipped soon.
                    </p>
                    {/* Details */}
                    <div className="w-full text-left space-y-3">
                        {
                            location?.state?.orderId && (
                                <div className="flex justify-between">
                                    <span className="font-semibold text-gray-700">Order ID:</span>
                                    <span className="text-gray-600">{location?.state?.orderId}</span>
                                </div>
                            )
                        }

                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">Payment Status:</span>
                            <span className="text-green-500">Successful</span>
                        </div>
                        {
                            location?.state?.amount && (
                                <div className="flex justify-between">
                                    <span className="font-semibold text-gray-700">Amount Paid:</span>
                                    <span className="text-gray-600 font-mono">{DisplayPriceIndianRuppe(location?.state?.subTotalAmt)}</span>
                                </div>
                            )
                        }
                    </div>
                    {/* Button */}
                    <div className="mt-6">
                        <Link
                            className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300"
                            to="/"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Success;
