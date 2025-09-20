// src/components/product/HomeProductGrid.jsx
import { useEffect, useState } from "react";
import ProductCard from "./HomeProductCard";
import api from "../../api/api"; // centralized axios instance

export default function HomeProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products/"); // adjust endpoint if needed
        setProducts(res.data.slice(0, 8)); // take first 8 products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 py-10">Loading products...</p>;
  }

  if (!products.length) {
    return <p className="text-center text-gray-500 py-10">No products to display.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">New & Trending</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
