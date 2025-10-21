import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import SearchSuggestions from "./SearchSuggestions";

function Navbar() {
  const { user, logout, cartCount } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/products?search=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  return (
    <nav className="bg-amazonBlue text-white p-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-amazonYellow">
        MiniAmazon
      </Link>

      {/* Search Bar */}
      <div className="flex-grow mx-4 relative">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="flex-1 px-3 py-2 rounded-l-md text-black border-r-0 focus:outline-none focus:ring-2 focus:ring-amazonYellow"
          />
          <button
            type="submit"
            className="bg-amazonYellow text-black px-3 py-2 rounded-r-md hover:bg-yellow-400 transition-colors"
          >
            <Search size={20} />
          </button>
        </form>
        
        {showSuggestions && (
          <SearchSuggestions 
            query={searchQuery} 
            onSelect={handleSuggestionSelect}
          />
        )}
      </div>

      {/* Links */}
      <div className="flex items-center space-x-4">
        <Link to="/products" className="hover:text-amazonYellow">
          Products
        </Link>

        {user ? (
          <>
            <Link to="/cart" className="flex items-center hover:text-amazonYellow relative group">
              <ShoppingCart size={20} className="mr-1 transition-transform duration-200 group-hover:scale-110" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amazonOrange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse hover:animate-bounce transition-all duration-300 hover:scale-110">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/orders" className="hover:text-amazonYellow">
              Orders
            </Link>
            <button
              onClick={logout}
              className="bg-amazonYellow text-black px-3 py-1 rounded-md hover:bg-yellow-400"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="flex items-center hover:text-amazonYellow">
            <User size={20} className="mr-1" /> Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
