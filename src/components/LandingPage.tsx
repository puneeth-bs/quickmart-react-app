import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [redirectPath, setRedirectPath] = useState("/home");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "seller") setRedirectPath("/shome");
      else if (role === "buyer") setRedirectPath("/bhome");
      else if (role === "admin") setRedirectPath("/adminhome");
    } else {
      setRedirectPath("/home");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 lg:px-24">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Seamless Trading, <br /> Powered by QuickMart
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Connect with buyers and sellers in seconds. QuickMart brings a smooth,
          trusted experience for trading your favorite products online.
        </p>
        <div className="mt-10 flex justify-center gap-5">
          <button
            onClick={() => navigate(redirectPath)}
            className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-3 rounded-lg text-lg font-medium transition shadow"
          >
            Get Started
          </button>
          {/* <a
            href="/aboutus"
            className="bg-white border border-violet-700 text-violet-700 hover:bg-violet-50 px-6 py-3 rounded-lg text-lg font-medium transition shadow"
          >
            Learn More
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
