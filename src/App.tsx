import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUp";
import LoginPage from "./components/LoginPage";
import ProductPage from "./components/ProductPage";
import SellerForm from "./components/SellerForm";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile/Profile";
import SellerHome from "./components/Home/SellerHome";
import BuyerHome from "./components/Home/BuyerHome";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home/Home";
import Cart from "./components/Cart";
import AboutUs from "./components/AboutUs";
import EditProduct from "./components/Home/EditProduct";
import AdminHome from "./components/Home/AdminHome";
import AnonymousProfile from "./components/Profile/AnonymousProfile";

function App() {
  // @ts-ignore
  const [message, setMessage] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("token") !== null);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isAuthenticated]);

  const handleLogin = (token: string): void => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
        setMessage(response.data);
      } catch (error) {
        console.error("Error connecting to the server:", error);
        setMessage("Failed to connect to the server");
      }
    };

    checkServerConnection();
  }, []);

  return (
    <div className="min-h-screen bg-violet-50 font-sans">
      <Router>
        <Navbar onLogout={handleLogout} />
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage onSignup={handleLogin} />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/aboutus" element={<AboutUs />} />

            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/seller" element={<SellerForm />} />
              <Route path="/shome" element={<SellerHome />} />
              <Route path="/bhome" element={<BuyerHome />} />
              <Route path = "/bhome/:id" element = {<ProductPage />} />
              <Route path="/seller/edit/:id" element={<EditProduct />} />{" "}
              <Route path="/adminhome" element={<AdminHome />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/anonymous-profile" element={<AnonymousProfile />} />
              <Route path="/addProduct" element={<SellerForm />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;