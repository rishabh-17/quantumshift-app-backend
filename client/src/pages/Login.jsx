import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // POST request to login endpoint
    const response = await axios.post(
      (import.meta.env.VITE_BACKEND_URL || "") + "/api/v1/auth/login",
      JSON.stringify({ email, password })
    );

    // Handle the response
    const data = await response.json();
    if (data.login) {
      // Successful login, redirect the user to the home page
      navigate("/");
    } else {
      // Error handling
      alert("Invalid email or password");
    }
  };

  return (
    <div class="bg-gradient-to-br from-blue-400 to-purple-600 min-h-screen flex items-center justify-center">
      <div class="max-w-md mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome Back!
        </h2>
        <form class="space-y-4">
          <div class="relative">
            <input
              type="email"
              placeholder="Email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              class="absolute left-3 top-3 h-6 w-6 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 1L22 6.47V17.53L12 23l-10-5.47V6.47L12 1m0-1L2 6.47v11.06L12 24l10-5.47V6.47L12 0z"
              />
            </svg>
          </div>
          <div class="relative">
            <input
              type="password"
              placeholder="Password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              class="absolute left-3 top-3 h-6 w-6 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 1L22 6.47V17.53L12 23l-10-5.47V6.47L12 1m0-1L2 6.47v11.06L12 24l10-5.47V6.47L12 0z"
              />
            </svg>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p class="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <a href="#" class="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
