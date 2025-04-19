import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

type SignupPageProp = {
  onSignup: (token: string) => void;
};

const SignUpPage: React.FC<SignupPageProp> = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      const response = await registerUser(formData);
      setSuccess(response.message);
      // @ts-ignore
      localStorage.setItem("token", response?.token);
      // @ts-ignore
      localStorage.setItem("role", response?.user?.role);
      // @ts-ignore
      localStorage.setItem("id", response?.user?._id);
      // @ts-ignore
      onSignup(response?.token);

      // @ts-ignore
      if (response?.user?.role === "buyer") {
        navigate("/bhome");
      } else {
        navigate("/shome");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-violet-50 px-4 font-sans">
      <div className="w-full max-w-lg bg-white p-10 rounded-xl shadow-xl">
        <h2 className="text-4xl font-extrabold text-center text-violet-700">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Please fill in your details to get started.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Select Role
            </label>
            <select
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-800 bg-white rounded-lg shadow-sm focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
            >
              <option value="" disabled className="text-gray-500">
                Choose your role
              </option>
              <option value="buyer" className="text-gray-700">
                Buyer
              </option>
              <option value="seller" className="text-gray-700">
                Seller
              </option>
              <option value="admin" className="text-gray-700">
                Admin
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-800 placeholder-gray-600 bg-white rounded-lg shadow-sm focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
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
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., 123-456-7890"
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
              placeholder="Create a password"
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-800 placeholder-gray-600 bg-white rounded-lg shadow-sm focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-sm font-medium rounded-lg shadow-md text-white bg-violet-700 hover:bg-violet-800 transition"
          >
            Sign Up
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {success}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
