import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { buyProduct } from "../services/api";

const ProductPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location?.state;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSellerClick = () => {
    navigate("/anonymous-profile", { state: product.seller });
  };

  const purchaseProduct = async (productId: string) => {
    try {
      await buyProduct(productId);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate(-1);
      }, 2000);
    } catch (err) {
      setError("Failed to purchase the product. Please try again.");
      console.error("Error purchasing the product:", err);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-violet-50">
      <div className="container mx-auto p-6 font-sans">
        {/* Seller Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-96 rounded-2xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-violet-700 mb-4">
                Seller Details
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Name:</strong> {product.seller.name}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong> {product.seller.email}
              </p>
              <button
                className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Purchase Success Banner */}
        {success && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg font-medium">
            Product purchased successfully! Redirecting...
          </div>
        )}

        {/* Error Display */}
        {error ? (
          <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-xl mx-auto">
            <h1 className="text-4xl font-bold text-red-600">Error</h1>
            <p className="mt-4 text-gray-600">{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-10 max-w-5xl mx-auto">
            {/* Product Image */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-xl shadow-md object-contain w-full max-w-sm h-80 bg-white"
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-violet-700">
                  {product.name}
                </h1>
                <p className="mt-4 text-gray-700">{product.description}</p>
                <p className="mt-4 text-gray-700">
                  <strong>Location:</strong> {product.location}
                </p>
                <p className="mt-4 text-gray-700">
                  <strong>Seller:</strong>{" "}
                  <span
                    className="text-violet-600 underline hover:text-violet-800 cursor-pointer"
                    onClick={handleSellerClick}
                  >
                    {product.seller.name}
                  </span>
                </p>
                <p className="mt-6 text-2xl font-bold text-violet-600">
                  ${product.price}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Available Quantity: {product.quantity}
                </p>
              </div>

              {/* Buy Button */}
              <div className="mt-8">
                <button
                  onClick={() => purchaseProduct(product._id)}
                  className="w-full py-3 px-6 bg-violet-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-violet-800 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
