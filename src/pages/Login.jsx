import React, { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { redirect, useNavigate } from "react-router-dom";

export const loaderFuntion = async () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  if (userDetails?.username) {
    return redirect("/");
  }
  return null;
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && username) {
      if (isRemembered) {
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ email, username })
        );
      }
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col items-center justify-center p-4">
      <div className="flex items-center space-x-2 text-sky-700 text-3xl font-semibold mb-8">
        <span>MediScribe</span>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white-300 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white-300 rounded-full opacity-50 blur-3xl"></div>

        <div className="relative">
          <div className="flex justify-center mb-6">
            <FaShieldAlt className="text-4xl text-sky-700" />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Register To Mediscribe
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your details below to register
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700">
                  Username
                </label>
              </div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="johndoe_19"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                onChange={() => setIsRemembered((prev) => !prev)}
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-200">
              Register
            </button>
          </form>

          {/* <div className="mt-6 text-center">
            <span className="text-gray-500">OR</span>
          </div> */}
          {/* 
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-sky-600 hover:underline">
              Sign Up
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
