import React, { useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../utils/userSlice";

type LoginPageProps = {
  onLogin: (token: string) => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      const response = await loginUser(formData);
      setSuccess(response.message);
      dispatch(login());
      // @ts-ignore
      localStorage.setItem("token", response?.token);
      // @ts-ignore
      localStorage.setItem("role", response?.user?.role);
      // @ts-ignore
      localStorage.setItem("id", response?.user?._id);
      setTimeout(() => {
        setSuccess("");
        // @ts-ignore
        if (response?.user?.role === "buyer") {
          navigate("/bhome");
          // @ts-ignore
        } else if (response?.user?.role === "admin") {
          navigate("/adminhome");
        } else {
          navigate("/shome");
        }
        // @ts-ignore
        onLogin(response?.token);
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Invalid credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-violet-50 px-4 font-sans">
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl">
        <h2 className="text-4xl font-extrabold text-center text-violet-700">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Please enter your credentials to access your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-800 placeholder-gray-600 bg-white rounded-lg shadow-sm focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-800 placeholder-gray-600 bg-white rounded-lg shadow-sm focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-sm font-medium rounded-lg shadow-md text-white bg-violet-700 hover:bg-violet-800 transition"
          >
            Log In
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}

        {success && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-2xl text-center w-80 animate-fade-in">
              <div className="flex items-center justify-center text-green-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-600">Success!</h2>
              <p className="text-gray-600 mt-2 text-sm">
                You’ve successfully logged in. Redirecting you now...
              </p>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-violet-700 hover:underline hover:text-violet-800"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
