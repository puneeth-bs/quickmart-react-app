// @ts-nocheck
import { useState, useEffect } from "react";
import { getProductsBySeller, deleteProduct } from "../../services/api";
import { useNavigate } from "react-router-dom";


const SellerHome = () => {
  const [itemsForSale, setItemsForSale] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    const userId = localStorage.getItem("id");
    try {
      // @ts-ignore
      const response = await getProductsBySeller(userId);
      setItemsForSale(response?.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // @ts-ignore
  const handleDelete = async (productId) => {
    await deleteProduct(productId);
    fetchItems();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-4xl font-extrabold text-violet-700 text-center mb-10">
        Your Listed Products
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {itemsForSale.length === 0 ? (
          <p className="text-center text-gray-600 text-lg col-span-full">
            You have no items listed for sale.
          </p>
        ) : (
          itemsForSale.map((item) => (
            <div
            // @ts-ignore
              key={item?._id}
              className={`relative bg-white border border-violet-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ${
                // @ts-ignore
                item.sold ? "opacity-60" : "opacity-100"
              }`}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-contain rounded-t-xl p-2"
                />
              )}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-violet-800 truncate mb-1">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Price:</span> ${item.price}
                </p>
                {item.sold && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Sold Price:</span> $
                    {item.price}
                  </p>
                )}
                <p
                  className={`text-sm font-medium ${
                    item.sold ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {item.sold ? "Sold" : "Available"}
                </p>
                
                {item.sold && (
                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Buyer:</span>{" "}
                      
                      {item?.buyerDetails?.name || "Anonymous"}
                    </p>
                    {item?.buyer?.profileLink && (
                      <a
                      // @ts-ignore
                        href={item?.buyer?.profileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-600 hover:underline"
                      >
                        View Profile
                      </a>
                    )}
                  </div>
                )}
              </div>
              
              {item.sold && (
                <span className="absolute top-3 right-3 bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-semibold">
                  Sold
                </span>
              )}

              <div className="flex justify-between p-4 border-t border-violet-100">
                <button
                  onClick={() => navigate(`/seller/edit/${item._id}`)}
                  disabled={item.sold}
                  className={`w-1/2 mx-1 text-center px-4 py-2 rounded-lg font-medium transition-all ${
                    item.sold
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-violet-600 text-white hover:bg-violet-700"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={item.sold}
                  className={`w-1/2 mx-1 text-center px-4 py-2 rounded-lg font-medium transition-all ${
                    item.sold
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerHome;
