import { useEffect, useState } from "react";
import axios from "../../api/api";
import ProductGrid from "../product/ProductGrid";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/products/?limit=8").then((res) => {
      setProducts(res.data.results || res.data);
    });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Featured Products</h2>
      <ProductGrid products={products} />
    </section>
  );
}
