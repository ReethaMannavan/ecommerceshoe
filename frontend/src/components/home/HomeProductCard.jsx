// src/components/product/ProductCard.jsx
export default function HomeProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition p-2 flex flex-col">
      {/* Product Image */}
      <img
        src={product.image || "/images/fallback.png"}
        alt={product.name}
        className="w-full h-48 object-cover mb-3 rounded"
      />

      {/* Product Content */}
      <div className="flex-1 flex flex-col gap-1 items-center">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        {product.shortDescription && (
          <p className="text-gray-500 text-sm">{product.shortDescription}</p>
        )}
        <p className="text-gray-900 font-bold mt-auto">MRP: ₹{product.price}</p>
      </div>
    </div>
  );
}
