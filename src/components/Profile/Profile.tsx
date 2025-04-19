// @ts-nocheck
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getProfileDetails,
  updateProfile,
  getUserOrders,
  getProductsBySeller,
} from "../../services/api";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [editingName, setEditingName] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");

  const fetchUserData = async () => {
    const userId = localStorage.getItem("id");
    const userDetails = await getProfileDetails(userId);
    setUser(userDetails);
    setFormData({ name: userDetails.name, phone: userDetails.phone });
  };

  const fetchProductData = async () => {
    if (userRole === "buyer") {
      // @ts-ignore
      const response = await getUserOrders(userId);
      setProducts(response?.products);
    } else {
      // @ts-ignore
      const response = await getProductsBySeller(userId);
      console.log(response);
      setProducts(response?.products);
    }
  };

  // @ts-ignore
  const handleNameUpdate = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    // @ts-ignore
    await updateProfile(userId, { name: formData.name });
    setEditingName(false);
    fetchUserData();
  };

  const handlePhoneUpdate = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    await updateProfile(userId, { phone: formData.phone });
    setEditingPhone(false);
    fetchUserData();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-violet-50 font-sans">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Section */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                // @ts-ignore
                user?.name
              )}&background=random`}
              alt="Profile Avatar"
              className="w-28 h-28 rounded-full mx-auto shadow-md"
            />
            <h2 className="text-2xl font-bold mt-4 text-violet-700">
              {user?.name}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
            <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
          </div>

          <div className="mt-8 space-y-6">
            {/* Editable Name */}
            {!editingName ? (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Full Name</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-800">{user?.name}</span>
                  <FaEdit
                    onClick={() => setEditingName(true)}
                    className="text-violet-600 cursor-pointer hover:text-violet-800"
                    title="Edit Name"
                  />
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleNameUpdate}
                className="bg-violet-50 p-4 rounded-lg shadow-inner"
              >
                <label className="block text-sm font-semibold text-violet-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 text-violet-900 placeholder-gray-500 border border-violet-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
                />

                <div className="flex gap-3 mt-4 justify-end">
                  <button
                    type="submit"
                    className="bg-violet-600 text-white px-5 py-2 rounded-lg shadow hover:bg-violet-700 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingName(false)}
                    className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Editable Phone */}
            {!editingPhone ? (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Phone</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-800">
                    {user?.phone || "Not provided"}
                  </span>
                  <FaEdit
                    onClick={() => setEditingPhone(true)}
                    className="text-violet-600 cursor-pointer hover:text-violet-800"
                    title="Edit Phone"
                  />
                </div>
              </div>
            ) : (
              <form
                onSubmit={handlePhoneUpdate}
                className="bg-violet-50 p-4 rounded-lg shadow-inner"
              >
                <label className="block text-sm font-semibold text-violet-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 text-violet-900 placeholder-gray-500 border border-violet-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
                />

                <div className="flex gap-3 mt-4 justify-end">
                  <button
                    type="submit"
                    className="bg-violet-600 text-white px-5 py-2 rounded-lg shadow hover:bg-violet-700 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPhone(false)}
                    className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Product Section */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-violet-700 mb-6">
            {userRole === "buyer" ? "Purchased Products" : "Listed Items"}
          </h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-violet-50 rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-contain bg-white p-2"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Price: ${product.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      {userRole === "buyer" ? (
                        <>
                          Sold by:{" "}
                          <Link
                            to="/anonymous-profile"
                            state={{ _id: product?.seller?._id }}
                            className="text-violet-600 hover:underline"
                          >
                            {product?.seller?.name}
                          </Link>
                        </>
                      ) : product.sold ? (
                        <>
                          Sold to:{" "}
                          <Link
                            to="/anonymous-profile"
                            state={{ _id: product?.buyerDetails?._id }}
                            className="text-violet-600 hover:underline"
                          >
                            {product?.buyerDetails?.name}
                          </Link>
                        </>
                      ) : (
                        <span className="text-green-600 font-medium">
                          Available
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No {userRole === "buyer" ? "purchases" : "listings"} yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
