// @ts-nocheck
import React, { useState, useEffect } from "react";
import productLinks from "../../../utils/productLinks";

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState(
    sessionStorage.getItem("selectedCategory") || "All Categories"
  );
  const [priceRange, setPriceRange] = useState(
    Number(sessionStorage.getItem("priceRange")) || 1000
  );
  const [sortBy, setSortBy] = useState(sessionStorage.getItem("sortBy") || "");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const handleProductClick = (product: any) => {
    console.log(product)
    setSelectedProduct(product);
  };

  const fetchProducts = async (query = "") => {
    try {
      setLoading(true);
      const baseUrl = "https://dummyjson.com/products";
      const url = query ? `${baseUrl}/search?q=${query}` : baseUrl;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data.products);

      setProducts(data?.products || []);
      setFilteredProducts(data?.products || []);

      // Get unique categories only when not searching
      if (!query) {
        const uniqueCategories = Array.from(
          new Set(data?.products.map((product: any) => product.category))
        );

        setCategories(uniqueCategories);
      }

      setError("");
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);
    sessionStorage.setItem("selectedCategory", category);
    applyFilters(category, priceRange, sortBy, searchQuery);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const range = Number(event.target.value);
    setPriceRange(range);
    sessionStorage.setItem("priceRange", range.toString());
    applyFilters(selectedCategory, range, sortBy, searchQuery);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    setSortBy(sortOption);
    sessionStorage.setItem("sortBy", sortOption);
    applyFilters(selectedCategory, priceRange, sortOption, searchQuery);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    fetchProducts(query); // directly use API search instead of frontend filter
  };

  const applyFilters = (
    category: string,
    range: number,
    sortOption: string,
    query: string
  ) => {
    let filtered = products;

    if (category && category !== "All Categories") {
      filtered = filtered.filter(
        (product: any) => product.category === category
      );
    }

    filtered = filtered.filter((product: any) => product.price <= range);

    if (sortOption === "price-asc") {
      filtered = filtered.sort((a: any, b: any) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered = filtered.sort((a: any, b: any) => b.price - a.price);
    }

    if (query) {
      filtered = filtered.filter((product: any) =>
        product.title.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
    sessionStorage.setItem("filteredProducts", JSON.stringify(filtered)); // <-- save here
  };

  useEffect(() => {
    const cachedFiltered = sessionStorage.getItem("filteredProducts");
    const cachedCategory = sessionStorage.getItem("selectedCategory") || "";
    const cachedPrice = Number(sessionStorage.getItem("priceRange")) || 1000;
    const cachedSort = sessionStorage.getItem("sortBy") || "";
    const cachedSearch = sessionStorage.getItem("searchQuery") || "";

    setSelectedCategory(cachedCategory);
    setPriceRange(cachedPrice);
    setSortBy(cachedSort);
    setSearchQuery(cachedSearch);

    fetchProducts().then(() => {
      if (cachedFiltered) {
        setFilteredProducts(JSON.parse(cachedFiltered));
      } else {
        applyFilters(cachedCategory, cachedPrice, cachedSort, cachedSearch);
      }
    });
  }, []);

  return (
    <>
      <div className="container min-h-screen px-4 lg:px-24 py-8 font-sans bg-violet-50">
        <div className="text-center mb-8">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full md:w-1/2 lg:w-1/3 px-5 py-3 border border-violet-300 text-violet-800 placeholder-gray-600 bg-white rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-violet-600"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4 bg-white rounded-xl shadow p-6 self-start">
            <h2 className="text-2xl font-semibold text-violet-700 mb-6">
              Filters
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: Up to ${priceRange}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceRange}
                onChange={handlePriceChange}
                className="w-full accent-violet-600"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full border border-violet-300 text-violet-800 bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 placeholder-gray-600"
              >
                <option value="All Categories" className="text-gray-700">
                  All Categories
                </option>
                {categories.map((category, index) => (
                  <option
                    key={index}
                    value={category}
                    className="text-gray-700"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="w-full border border-violet-300 text-violet-800 bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              >
                <option value="" className="text-gray-700">
                  Default
                </option>
                <option value="price-asc" className="text-gray-700">
                  Price: Low to High
                </option>
                <option value="price-desc" className="text-gray-700">
                  Price: High to Low
                </option>
              </select>
            </div>
          </aside>

          <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              <p className="text-center text-gray-500 col-span-full">
                Loading products...
              </p>
            ) : error ? (
              <p className="text-red-500 col-span-full">{error}</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product: any) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="bg-white rounded-xl shadow hover:shadow-lg p-4 transition duration-300 cursor-pointer border border-gray-100 hover:border-violet-300"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-40 w-full object-contain mb-4 rounded-md"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-violet-600 font-medium mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Category: {product.category}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No products found.</p>
            )}
          </main>
        </div>
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full relative shadow-xl text-gray-800 overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
            >
              &times;
            </button>

            {/* Product Layout */}
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedProduct.images}
                alt={selectedProduct.title}
                className="w-full md:w-1/2 h-64 object-contain bg-gray-50 rounded"
              />

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-violet-700 mb-2">
                  {selectedProduct.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  Brand:{" "}
                  <span className="font-semibold">{selectedProduct.brand}</span>
                </p>
                <p className="text-violet-600 font-semibold text-lg mb-2">
                  ${selectedProduct.price}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedProduct.description}
                </p>

                {/* Stock and Info */}
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>Availability: {selectedProduct.availabilityStatus}</p>
                  <p>Stock: {selectedProduct.stock}</p>
                  <p>Minimum Order: {selectedProduct.minimumOrderQuantity}</p>
                  <p>Shipping: {selectedProduct.shippingInformation}</p>
                  <p>Return Policy: {selectedProduct.returnPolicy}</p>
                  <p>Warranty: {selectedProduct.warrantyInformation}</p>
                  <p>SKU: {selectedProduct.sku}</p>
                  <p>
                    Tags:{" "}
                    {selectedProduct.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded-full mr-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Ratings */}
                <div className="text-sm mb-4">
                  <span className="text-yellow-500 text-lg">
                    {"★".repeat(Math.round(selectedProduct.rating))}
                    {"☆".repeat(5 - Math.round(selectedProduct.rating))}
                  </span>{" "}
                  <span className="text-gray-600 ml-2">
                    ({selectedProduct.rating})
                  </span>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={() => {
                    const isLoggedIn = localStorage.getItem("id");
                    if (!isLoggedIn) {
                      alert("Please login to continue.");
                    } else {
                      alert("Purchase flow goes here.");
                    }
                  }}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg shadow transition"
                >
                  🛒 Buy Now
                </button>
              </div>
            </div>

            {/* Optional: Render Reviews */}
            {selectedProduct.reviews?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-semibold text-violet-700 mb-2">
                  Customer Reviews
                </h3>
                <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                  {selectedProduct.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border-t pt-2 text-sm text-gray-700"
                    >
                      <p>{review.comment || "No comment provided."}</p>
                      {review.rating && (
                        <p className="text-yellow-500">
                          {"★".repeat(review.rating)}{" "}
                          <span className="text-gray-500">
                            ({review.rating}/5)
                          </span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
