import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    location: "",
  });

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response?.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, product);
      navigate(-1);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-violet-50 px-4 font-sans">
      <div className="w-full max-w-xl bg-white p-10 rounded-xl shadow-xl">
        <h2 className="text-4xl font-extrabold text-center text-violet-700">
          Edit Product
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Update your product details.
        </p>

        <form onSubmit={handleSave} className="mt-8 space-y-6">
          {/* Product ID (Disabled) */}
          <div>
            <label
              htmlFor="productId"
              className="block text-sm font-medium text-gray-700"
            >
              Product ID
            </label>
            <input
              id="productId"
              name="productId"
              type="text"
              value={id}
              disabled
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-gray-100 text-gray-500 rounded-lg shadow-sm sm:text-sm"
            />
          </div>

          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-900 placeholder-gray-500 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-900 placeholder-gray-500 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              value={product.location}
              onChange={handleChange}
              placeholder="Enter product location"
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-900 placeholder-gray-500 bg-white rounded-lg shadow-sm focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              required
              value={product.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-900 placeholder-gray-500 bg-white rounded-lg shadow-sm focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="w-full py-2 px-4 text-sm font-medium rounded-lg shadow-md text-white bg-violet-700 hover:bg-violet-800 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/shome")}
              className="w-full py-2 px-4 text-sm font-medium rounded-lg shadow-md text-violet-700 bg-white border border-violet-700 hover:bg-violet-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
