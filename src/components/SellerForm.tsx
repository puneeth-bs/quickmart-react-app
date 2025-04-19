import React, { useState } from "react";
import { addProduct, getPreSignedURL, uploadFile } from "../services/api";
import { useNavigate } from "react-router-dom";

const SellerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    image: "",
    price: "",
    category: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [fileToUpload, setFileToUpload] = useState<File>();

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileToUpload(file);
    try {
      const response = await getPreSignedURL(file?.name, file?.type);
      setImageUrl(response?.url);
    } catch (err) {
      console.error("Error uploading file", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.description ||
      !formData.location ||
      !formData.price ||
      !formData.category
    ) {
      setError("Please fill in all fields");
      return;
    }

    try {
      let finalImageUrl = "";
      if (fileToUpload && imageUrl) {
        // Upload the file to the pre-signed URL
        await uploadFile(imageUrl, fileToUpload);

        const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;
        const fileKey = fileToUpload.name;
        finalImageUrl = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
      }

      const formWithImage = { ...formData, image: finalImageUrl };
      console.log("Final Product Data:", formWithImage);

      await addProduct(formWithImage);
      setSuccess("Product added successfully!");
      navigate("/shome");
    } catch (err) {
      console.error("Error during form submission:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-violet-50 px-4 font-sans">
      <div className="w-full max-w-xl bg-white p-10 rounded-xl shadow-xl">
        <h2 className="text-4xl font-extrabold text-center text-violet-700">
          Add Product
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Fill out the form below to list a product.
        </p>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mt-6 space-y-6"
        >
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
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-800 placeholder-gray-600 bg-white rounded-lg shadow-sm focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
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
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-800 placeholder-gray-600 bg-white rounded-lg shadow-sm focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-800 bg-white rounded-lg shadow-sm focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Vehicle">Vehicles</option>
              <option value="toys-and-games">Toys and Games</option>
              <option value="home-goods">Home Goods</option>
            </select>
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
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter product location"
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-800 placeholder-gray-600 bg-white rounded-lg shadow-sm focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
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
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="mt-1 block w-full px-4 py-2 border border-violet-300 text-violet-800 placeholder-gray-600 bg-white rounded-lg shadow-sm focus:ring-violet-600 focus:border-violet-600 sm:text-sm"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-violet-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-violet-300 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-lg shadow-md text-white bg-violet-700 hover:bg-white hover:text-violet-700 hover:border-violet-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition"
          >
            Submit Product
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

export default SellerForm;
