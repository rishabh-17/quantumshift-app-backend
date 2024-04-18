import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setAdminAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      if (
        email === "admin@quantumshift.com" &&
        password === "QuantumShiftAdmin@2024"
      ) {
        localStorage.setItem("adminAuth", true);
        setAdminAuth(true);
        navigate("/");
      }
    }
  };

  return (
    <div class="bg-gradient-to-br from-blue-400 to-purple-600 min-h-screen flex items-center justify-center w-full">
      <div class=" mx-auto px-6 py-8 bg-white rounded-lg shadow-lg w-[80%] md:w-[30%]">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome <span class="text-blue-600 dark:text-blue-500">Back!</span>
        </h2>
        <form class="space-y-4 w-full" onSubmit={handleSubmit}>
          <div class="relative">
            <input
              type="email"
              placeholder="Email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
      </div>
    </div>
  );
};

export default Login;
