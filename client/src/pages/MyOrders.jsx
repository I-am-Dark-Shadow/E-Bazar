import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import deliveryChargeImage from "../assets/shipping_cost.jpeg"

const MyOrders = () => {
  const orders = useSelector((state) => state?.orders?.order);
  const navigate = useNavigate();

  // Group orders by creation time
  const groupedOrders = orders?.reduce((acc, order) => {
    const orderTime = new Date(order.createdAt).toLocaleString();
    if (!acc[orderTime]) acc[orderTime] = [];
    acc[orderTime].push(order);
    return acc;
  }, {}) || {};

  // Get the latest order batch only
  const orderTimes = Object.keys(groupedOrders).sort((a, b) => new Date(b) - new Date(a));
  const latestOrders = groupedOrders[orderTimes[0]] || [];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-lime-200 to-lime-500 ">
      <h1 className="text-4xl font-bold mb-6 underline kode_mono_bold">My Recent Order</h1>
      {latestOrders.length > 0 ? (
        <div className="grid gap-6">
          {latestOrders.map((order, index) => (
            <div key={index} className="bg-yellow-100 overflow-hidden text-gray-800 p-6 rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-6 border-[3.5px] border-dashed border-yellow-500 justify-center items-center lg:justify-normal">
              <img src={order?.product_details?.image[0] || deliveryChargeImage} alt={order?.product_details?.name} className="lg:w-40 lg:h-40 object-cover rounded-xl w-40 h-40" />
              <div className="font-mono lg:text-base text-xs">
                <h2 className="text-2xl font-semibold">{order?.product_details?.name}</h2>
                <p className="text-gray-600"><span className="font-bold">Order ID:</span> {order?.orderId}</p>
                {order?.paymentId && (
                  <p className="text-gray-600"><span className="font-bold">Payment ID:</span> {order?.paymentId}</p>
                )}
                <p className="text-gray-600"><span className="font-bold">Payment Status:</span> {order?.payment_status}</p>
                {/* {
                  order?.payment_status === "CASH ON DELIVERY" && (
                    <p className="text-gray-600"><span className="font-bold">Item Price:</span> ₹{order?.product_details?.price}</p>
                  )
                } */}

                <p className="text-gray-600"><span className="font-bold">Total Amount:</span> ₹{order?.totalAmt}</p>
                <p className="text-gray-600"><span className="font-bold">All Total:</span> ₹{order?.subTotalAmt}</p>
                <p className="text-gray-600"><span className="font-bold">Ordered On:</span> {new Date(order?.createdAt).toLocaleString()}</p>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4">No Orders Found</h2>
          <p className="text-gray-600 mb-4">Looks like you have not placed any orders yet.</p>
          <button onClick={() => navigate("/")} className="bg-indigo-500 text-white px-4 py-2 rounded-lg">Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
