import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

type LogoutPageProps = {
  onLogout: () => void;
};

const Navbar: React.FC<LogoutPageProps> = ({ onLogout }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    onLogout();
    navigate("/");
  };

  return (
    <header className="bg-violet-700 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to="/" className="flex items-center space-x-3">
            {/* Logo can be re-enabled here if needed */}
            <span className="text-3xl font-extrabold tracking-wide text-white">
              QuickMart
            </span>
          </Link>

          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:w-auto lg:flex lg:justify-center transition-all duration-300 ease-in-out z-50`}
        >
          <ul className="flex flex-col lg:flex-row items-center text-lg font-medium space-y-2 lg:space-y-0 lg:space-x-8 mt-4 lg:mt-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-5 py-2 font-semibold transition ${
                  isActive
                    ? "text-white border-b-2 border-white"
                    : "text-white hover:text-violet-300"
                }`
              }
            >
              Home
            </NavLink>

            <li>
              <NavLink
                to={
                  userRole === "buyer"
                    ? "/bhome"
                    : userRole === "seller"
                    ? "/shome"
                    : userRole === "admin"
                    ? "/adminhome"
                    : "/home"
                }
                className={({ isActive }) =>
                  `block px-5 py-2 font-semibold transition ${
                    isActive
                      ? "text-white border-b-2 border-white"
                      : "text-white hover:text-violet-300"
                  }`
                }
              >
                Products
              </NavLink>
            </li>

            {userRole === "seller" && (
              <li>
                <NavLink
                  to="/addProduct"
                  className={({ isActive }) =>
                    `block px-5 py-2 font-semibold transition ${
                      isActive
                        ? "text-white border-b-2 border-white"
                        : "text-white hover:text-violet-300"
                    }`
                  }
                >
                  Add Product
                </NavLink>
              </li>
            )}
            {/* 
            {userRole !== "admin" && (
              <li>
                <Link
                  to="/aboutus"
                  className="block px-5 py-2 text-white font-semibold hover:text-violet-300
 transition"
                >
                  About Us
                </Link>
              </li>
            )} */}

            {token ? (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `block px-5 py-2 font-semibold transition ${
                        isActive
                          ? "text-white border-b-2 border-white"
                          : "text-white hover:text-violet-300"
                      }`
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-5 py-2 text-white font-semibold hover:text-violet-300
 bg-transparent border-none cursor-pointer transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block px-5 py-2 font-semibold transition ${
                      isActive
                        ? "text-white border-b-2 border-white"
                        : "text-white hover:text-violet-300"
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
