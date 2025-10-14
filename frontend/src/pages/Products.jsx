import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const { user, updateCartCount } = useContext(AuthContext);

  // Fetch products when the component loads or search params change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const searchQuery = searchParams.get('search');
        const categoryQuery = searchParams.get('category');
        
        console.log("🔄 Fetching products...", { searchQuery, categoryQuery });
        
        // Build query parameters
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (categoryQuery) params.append('category', categoryQuery);
        
        const queryString = params.toString();
        const url = queryString ? `/products?${queryString}` : '/products';
        
        const res = await api.get(url);
        console.log("✅ Products received:", res.data);
        setProducts(res.data);
        
        if (searchQuery) {
          setMessage(`Found ${res.data.length} products matching "${searchQuery}"`);
        } else {
          setMessage(`Found ${res.data.length} products`);
        }
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setMessage(`Error fetching products: ${err.message}`);
      }
    };
    fetchProducts();
  }, [searchParams]);

  // Add product to cart
  const addToCart = async (productId) => {
    if (!user) {
      setMessage("Please log in to add items to your cart");
      return;
    }

    try {
      console.log("🛒 Adding to cart:", productId);
      await api.post("/cart/add", { productId, quantity: 1 });
      setMessage("Item added to cart!");
      
      // Update cart count by fetching the updated cart
      const cartRes = await api.get("/cart");
      const totalItems = cartRes.data.cart.reduce((sum, item) => sum + item.quantity, 0);
      updateCartCount(totalItems);
    } catch (err) {
      console.error("❌ Cart error:", err);
      setMessage(err.response?.data?.message || "Failed to add to cart");
    }
  };

  const clearSearch = () => {
    window.location.href = '/products';
  };

  const searchQuery = searchParams.get('search');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Products'}
          </h1>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="text-amazonOrange hover:underline text-sm mt-1"
            >
              Clear search and show all products
            </button>
          )}
        </div>
        <div className="text-sm text-gray-600">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </div>
      </div>
      
      {message && (
        <div className={`px-4 py-3 rounded-md ${
          message.includes('Error') 
            ? 'bg-red-50 border border-red-200 text-red-700'
            : 'bg-green-50 border border-green-200 text-green-700'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">
              {searchQuery 
                ? `No products found matching "${searchQuery}". Try a different search term.`
                : 'No products found. Loading...'
              }
            </p>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="mt-4 bg-amazonYellow text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors"
              >
                Show All Products
              </button>
            )}
          </div>
        ) : (
          products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group"
            >
              {/* Product Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {p.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {p.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-amazonOrange">
                    ${p.price}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {p.category}
                  </span>
                </div>
                
                <button 
                  onClick={() => addToCart(p._id)}
                  className="w-full bg-amazonYellow text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors duration-200 transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
