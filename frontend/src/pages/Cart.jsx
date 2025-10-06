import { useEffect, useState, useContext } from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

function Cart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const { updateCartCount } = useContext(AuthContext);

  const fetchCart = async () => {
    try {
      console.log("🛒 Fetching cart...");
      const res = await api.get("/cart");
      console.log("✅ Cart received:", res.data);
      setCart(res.data.cart);
    } catch (err) {
      console.error("❌ Cart fetch error:", err);
      console.error("Error response:", err.response?.data);
      setMessage(`Error fetching cart: ${err.response?.data?.message || err.message}`);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      setMessage("Item removed from cart");
      fetchCart();
      
      // Update cart count
      const cartRes = await api.get("/cart");
      const totalItems = cartRes.data.cart.reduce((sum, item) => sum + item.quantity, 0);
      updateCartCount(totalItems);
    } catch (err) {
      setMessage("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");
      setMessage("Cart cleared");
      setCart([]);
      updateCartCount(0);
    } catch (err) {
      setMessage("Error clearing cart");
    }
  };

  const checkout = async () => {
    try {
      console.log("🛒 Starting checkout...");
      console.log("Cart items:", cart);

      if (cart.length === 0) {
        setMessage("Your cart is empty! Add some items first.");
        return;
      }

      const res = await api.post("/orders");
      console.log("✅ Checkout successful:", res.data);
      setMessage("Order placed successfully!");
      setCart([]);
      updateCartCount(0);
    } catch (err) {
      console.error("❌ Checkout failed:", err);
      console.error("Error response:", err.response?.data);
      setMessage(`Checkout failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <div className="text-sm text-gray-600">
          {cart.length} {cart.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-md ${
          message.includes('successful') || message.includes('added')
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <a 
            href="/" 
            className="inline-block bg-amazonYellow text-black font-semibold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors"
          >
            Browse Products
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cart.map((item) => (
              <div key={item.productId._id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                {/* Product Image */}
                <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                  <span className="text-2xl">📦</span>
                </div>
                
                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.productId.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-amazonOrange font-bold text-xl">${item.productId.price}</p>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
              <span className="text-2xl font-bold text-amazonOrange">${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={checkout}
                className="w-full bg-amazonYellow text-black font-semibold py-3 px-4 rounded-md hover:bg-yellow-400 transition-colors"
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={clearCart}
                className="w-full bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
