import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Order.jsx";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>

        <footer className="bg-amazonBlue text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2025 E-Shop. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
