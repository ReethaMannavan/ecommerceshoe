


import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom"; // <-- import Link

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`}> {/* <-- wrap card in Link */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
      >
        {/* Image */}
        <div className="relative group overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-sm text-gray-500 font-medium">{product.brand?.name}</h3>
          <p className="text-lg font-semibold text-black">{product.name}</p>
          <p className="text-base text-black">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.round(product.rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">{product.rating}</span>
          </div>

          {/* Price */}
          <p className="mt-2 text-lg font-bold text-slate-800">
            MRP: ₹{product.price}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
