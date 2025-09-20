// src/components/search/SearchResultsPage.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/api";
import ProductGrid from "../product/ProductGrid";

export default function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Get search query from URL params
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/products/?search=${searchQuery}`);
        const data = Array.isArray(res.data.results)
          ? res.data.results
          : Array.isArray(res.data)
          ? res.data
          : [];
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    if (searchQuery) fetchProducts();
  }, [searchQuery]);

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  return (
    <div className="max-w-7xl px-4 py-8 mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        Search Results for "{searchQuery}"
      </h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <ProductGrid products={products} onProductClick={handleProductClick} />
      )}
    </div>
  );
}
