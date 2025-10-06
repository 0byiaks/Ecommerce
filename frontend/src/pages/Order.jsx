import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("📦 Fetching orders...");
        const res = await api.get("/orders");
        console.log("✅ Orders received:", res.data);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setMessage("Error fetching orders");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <div className="text-sm text-gray-600">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-700">
          {message}
        </div>
      )}
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Place an order from your cart to see it here!</p>
          <a 
            href="/cart" 
            className="inline-block bg-amazonYellow text-black font-semibold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors"
          >
            View Cart
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order._id || index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order._id || `#${index + 1}`}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-2xl font-bold text-amazonOrange mt-2">
                      ${order.total}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Items:</h4>
                <div className="space-y-3">
                  {order.items?.map((item, itemIndex) => (
                    <div key={item.productId?._id || itemIndex} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                          <span className="text-lg">📦</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
