import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-8">
        My Orders
      </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : orders?.length === 0 ? (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 text-center border border-gray-700/50">
          <p className="text-gray-400 text-lg">
            You haven't placed any orders yet.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <thead className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 border-b border-gray-700">
              <tr>
                <th className="py-4 px-4 text-left text-sm font-semibold text-gray-300">
                  IMAGE
                </th>
                <th className="py-4 px-4 text-left text-sm font-semibold text-gray-300">
                  ORDER ID
                </th>
                <th className="py-4 px-4 text-left text-sm font-semibold text-gray-300">
                  DATE
                </th>
                <th className="py-4 px-4 text-left text-sm font-semibold text-gray-300">
                  TOTAL
                </th>
                <th className="py-4 px-4 text-left text-sm font-semibold text-gray-300">
                  PAID
                </th>
                <th className="py-4 px-4 text-left text-sm font-semibold text-gray-300">
                  DELIVERED
                </th>
                <th className="py-4 px-4 text-left text-sm font-semibold text-gray-300">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.user}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>

                  <td className="py-4 px-4 text-gray-300 font-mono text-sm">
                    {order._id.substring(0, 10)}...
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-pink-400 font-semibold">
                    ₹{order.totalPrice}
                  </td>

                  <td className="py-4 px-4">
                    {order.isPaid ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    {order.isDelivered ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                        Delivered
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        Processing
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
