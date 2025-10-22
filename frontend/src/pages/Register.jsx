import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  // Password strength validation
  const validatePassword = (password) => {
    if (password.length < 6) return "Weak";
    if (password.length < 8) return "Medium";
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) return "Strong";
    return "Medium";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Update password strength when password changes
    if (e.target.name === "password") {
      setPasswordStrength(validatePassword(e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", formData);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-600 mt-2">Join E-Shop today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amazonYellow focus:border-transparent outline-none transition-all"
          />
        </div>

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
            placeholder="Create a password"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amazonYellow focus:border-transparent outline-none transition-all"
          />
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className={`h-2 w-full rounded-full ${
                  passwordStrength === "Weak" ? "bg-red-200" :
                  passwordStrength === "Medium" ? "bg-yellow-200" : "bg-green-200"
                }`}>
                  <div className={`h-2 rounded-full ${
                    passwordStrength === "Weak" ? "bg-red-500 w-1/3" :
                    passwordStrength === "Medium" ? "bg-yellow-500 w-2/3" : "bg-green-500 w-full"
                  }`}></div>
                </div>
                <span className={`text-sm font-medium ${
                  passwordStrength === "Weak" ? "text-red-600" :
                  passwordStrength === "Medium" ? "text-yellow-600" : "text-green-600"
                }`}>
                  {passwordStrength}
                </span>
              </div>
            </div>
          )}
        </div>

        <button 
          type="submit"
          className="w-full bg-amazonYellow text-black font-semibold py-3 px-4 rounded-md hover:bg-yellow-400 transition-colors duration-200 transform hover:scale-105"
        >
          Create Account
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
          Already have an account?{' '}
          <a href="/login" className="text-amazonOrange hover:underline font-medium">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
