import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ProductCard from "../product/ProductCard";

export default function ProductGrid({ products }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
  <ProductCard key={`${product.id}-${index}`} product={product} />
))}
    </motion.div>
  );
}
