import { createContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch cart count when user changes
  useEffect(() => {
    if (user) {
      const fetchCartCount = async () => {
        try {
          const res = await api.get("/cart");
          const totalItems = res.data.cart.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(totalItems);
        } catch (err) {
          console.error("Error fetching cart count:", err);
          setCartCount(0);
        }
      };
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [user]);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setCartCount(0);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateCartCount = (newCount) => {
    setCartCount(newCount);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, cartCount, updateCartCount }}>
      {children}
    </AuthContext.Provider>
  );
};
