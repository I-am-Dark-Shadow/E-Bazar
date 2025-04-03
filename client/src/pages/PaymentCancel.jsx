import { MdCancel } from 'react-icons/md';  // Import cancel icon
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-400 via-red-500 to-red-600 -mt-5">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 md:p-12">
        <div className="flex flex-col items-center text-center">
          {/* Cancel Icon */}
          <div className="mb-4">
            <MdCancel className="w-24 h-24 text-red-600" />
          </div>
          {/* Heading */}
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">
            Payment Cancelled
          </h1>
          {/* Subheading */}
          <p className="text-lg text-gray-600 mb-6">
            Unfortunately, your payment could not be processed. Please try again or contact support for assistance.
          </p>
          {/* Additional Info */}
          <div className="w-full text-left space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Reason:</span>
              <span className="text-gray-600">Payment Error</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Payment Status:</span>
              <span className="text-red-500">Failed</span>
            </div>
          </div>
          {/* Buttons */}
          <div className="mt-6 space-x-4">
            <Link
              className="w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition duration-300"
              to="/"
            >
              Return to Home
            </Link>
            {/* <button
              className="w-full md:w-auto px-6 py-3 border-2 border-red-600 text-red-600 rounded-md shadow-md hover:bg-red-600 hover:text-white transition duration-300"
              onClick={() => window.location.href = '/payment'}  // Assuming a payment retry page exists
            >
              Retry Payment
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
