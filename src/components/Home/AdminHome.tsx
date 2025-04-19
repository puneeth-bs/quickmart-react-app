import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminHome = () => {
  const [sellers, setSellers] = useState<any[]>([]);
  const [buyers, setBuyers] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const fetchUsersWithProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await axios.get(
        "http://localhost:3000/api/user/get-users-with-products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const data = response.data;

      if (data.success) {
        setSellers(data.data.sellers || []);
        setBuyers(data.data.buyers || []);
        setError("");
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Failed to load data."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await axios.get(
        `http://localhost:3000/api/user/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      if (data.success) {
        setMessage("User deleted successfully!");
        fetchUsersWithProducts();
      } else {
        setMessage("Failed to delete user.");
      }
    } catch (err: any) {
      setMessage(
        err.response?.data?.message || err.message || "Failed to delete user."
      );
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchUsersWithProducts();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10 min-h-screen bg-violet-50">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-violet-700">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-lg mt-3">
          Manage all users and their product history.
        </p>
      </div>

      {message && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg font-medium z-50">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading data...</p>
      ) : error ? (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Sellers */}
          <div>
            <h2 className="text-3xl font-bold text-violet-700 text-center mb-6">
              Sellers
            </h2>
            {sellers.length > 0 ? (
              sellers.map((seller) => (
                <div
                  key={seller._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 relative mb-6"
                >
                  <button
                    onClick={() => deleteUser(seller._id)}
                    className="absolute top-4 right-4 bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full hover:bg-red-200"
                    title="Delete User"
                  >
                    Delete
                  </button>

                  <h3 className="text-xl font-bold text-violet-600">
                    {seller.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{seller.email}</p>

                  <h4 className="text-md font-semibold text-gray-800 mt-3 mb-2">
                    Products Sold:
                  </h4>
                  {seller.soldProducts.length > 0 ? (
                    <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                      {seller.soldProducts.map((product: any) => (
                        <li key={product._id}>
                          {product.name} - ${product.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 italic">
                      No products sold yet.
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No sellers registered yet.
              </p>
            )}
          </div>

          {/* Buyers */}
          <div>
            <h2 className="text-3xl font-bold text-violet-700 text-center mb-6">
              Buyers
            </h2>
            {buyers.length > 0 ? (
              buyers.map((buyer) => (
                <div
                  key={buyer._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 relative mb-6"
                >
                  <button
                    onClick={() => deleteUser(buyer._id)}
                    className="absolute top-4 right-4 bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full hover:bg-red-200"
                    title="Delete User"
                  >
                    Delete
                  </button>

                  <h3 className="text-xl font-bold text-violet-600">
                    {buyer.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{buyer.email}</p>

                  <h4 className="text-md font-semibold text-gray-800 mt-3 mb-2">
                    Products Purchased:
                  </h4>
                  {buyer.purchasedProducts?.length > 0 ? (
                    <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                      {buyer.purchasedProducts.map((product: any) => (
                        <li key={product._id}>
                          {product.name} - ${product.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 italic">
                      No products purchased yet.
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No buyers registered yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
