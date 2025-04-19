import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productLinks from "../../../utils/productLinks";

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      setProducts(data?.products || []);
      setFilteredProducts(data?.products || []);

      const uniqueCategories = Array.from(
        new Set(data?.products.map((product: any) => product.category))
      );
      setCategories(uniqueCategories);
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
    applyFilters(category, priceRange, sortBy, searchQuery);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const range = Number(event.target.value);
    setPriceRange(range);
    applyFilters(selectedCategory, range, sortBy, searchQuery);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    setSortBy(sortOption);
    applyFilters(selectedCategory, priceRange, sortOption, searchQuery);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(selectedCategory, priceRange, sortBy, query);
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
  };

  const handleProductClick = (id: number) => {
    const url = productLinks[id];
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("No external link available for this product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
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
                <option key={index} value={category} className="text-gray-700">
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
                onClick={() => handleProductClick(product.id)}
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
  );
};

export default Home;
