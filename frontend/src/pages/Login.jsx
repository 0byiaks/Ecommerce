import { useState, useContext } from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      login(res.data.user, res.data.token);
      setMessage("Login successful!");
      navigate("/products");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
        <p className="text-gray-600 mt-2">Welcome back to E-Shop</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amazonYellow focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amazonYellow focus:border-transparent outline-none transition-all"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-amazonYellow text-black font-semibold py-3 px-4 rounded-md hover:bg-yellow-400 transition-colors duration-200 transform hover:scale-105"
        >
          Sign In
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-md ${
          message.includes('successful') 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-amazonOrange hover:underline font-medium">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
