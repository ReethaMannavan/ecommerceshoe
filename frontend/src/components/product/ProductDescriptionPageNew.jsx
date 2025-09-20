import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/api"; // centralized baseURL
import { Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

import upi from '../../assets/images/upi.PNG'
import card from '../../assets/images/mastercard.PNG'
import rupay from '../../assets/images/rupay.PNG'
import visa from '../../assets/images/visa.png'
import whatsapp from '../../assets/images/whatsapp.PNG'

export default function ProductDescriptionPageNew() {
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Add to cart without login check
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart(product, selectedSize, quantity);
    toast.success("Added to cart!");
    navigate("/cart");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart(product, selectedSize, quantity);
    navigate("/cart");
  };

  useEffect(() => {
    fetchProduct();
  }, [productSlug]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/${productSlug}/details/`);
      setProduct(res.data);
      if (res.data.sizes.length > 0) setSelectedSize(res.data.sizes[0].id);
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
  };

  if (!product) return <div>Loading...</div>;

  const renderStars = (rating) => {
    const rounded = Math.round(rating);
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rounded ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        }
      />
    ));
  };

  const renderReviewStars = (value) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < value ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* First Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* Left: Images */}
        <div className="grid grid-cols-2 gap-2 ">
          {product.images.slice(0, 6).map((img) => (
            <img
              key={img.id}
              src={img.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* Right: Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          {/* Price */}
          <p className="text-lg text-gray-800">
            MRP: ₹{product.price}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-500">
              {product.rating} / 5 ({product.reviews.length} reviews)
            </span>
          </div>

          {/* Colors */}
          <div>
            <p className="font-medium">
              Colors: {product.colors.map((c) => c.name).join(", ")}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {product.colors.map((color) => (
                <div
                  key={color.id}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: color.hex_code }}
                />
              ))}
            </div>
          </div>
          <hr className="border-t-[1px] border-[#9F9898] my-2" />

          {/* Shoe Sizes */}
          <p className="text-black">Shoe Size</p>
          <div className="flex items-center gap-2 mt-2"> 
            {product.sizes.map((size) => (
              <button
                key={size.id}
                className={`px-3 py-1 border rounded ${
                  selectedSize === size.id ? "bg-slate-800 text-white" : ""
                }`}
                onClick={() => setSelectedSize(size.id)}
              >
                {size.size}
              </button>
            ))}
          </div>
          <hr className="border-t-[1px] border-[#9F9898] my-4" />

          {/* Quantity + Buttons */}
          <div className="flex flex-col gap-4 mt-4 ">
            <p className="text-black">Quantity</p>
            <div className="flex items-center border rounded bg-gray-300 self-start">
              <button
                className="px-3 py-2 "
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-3">{quantity}</span>
              <button
                className="px-3"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <hr className="border-t-[1px] border-[#9F9898] my-4" />
            <button
              onClick={handleAddToCart}
              className="px-8 py-2 bg-[#2F4F4F] text-white self-start w-[350px]"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="px-6 py-2 bg-[#2F4F4F] text-white self-start w-[350px]"
            >
              Buy Now
            </button>
          </div>

          {/* Secure checkout / WhatsApp / COD etc */}
          <div className=" rounded p-4 space-y-2 mt-4">
            <div className="flex items-center space-x-2 border border-black py-3 px-6 w-[550px]">
              <p>Secure Checkout With:</p>
              <img src={upi} alt="payment" className="h-6" />
              <img src={card} alt="payment" className="h-6" />
              <img src={rupay} alt="payment" className="h-6" />
              <img src={visa} alt="payment" className="h-6" />
            </div> 
            <div className="border border-black p-2 mt-2 flex items-center justify-between w-[550px]">
              <span>Unsure about your size?</span>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={whatsapp}
                  alt="WhatsApp"
                  className="h-6"
                />
              </a>
            </div>
            <div className="text-sm mx-auto text-center space-y-1 mt-2 border border-gray-200 px-5 py-3 w-[350px] rounded-2xl bg-[#D9D9D9]">
              <p><b>COD</b> Available</p>
              <hr className="border-t-[1px] border-[#9F9898] my-4"  />
              <p><b>24</b> hour Dispatch</p>
              <hr className="border-t-[1px] border-[#9F9898] my-4"  />
              <p>7 Days <b>Easy Returns & Exchange</b></p>
            </div>
          </div>

          {/* Long description */}
          <div className="mt-4 text-black text-sm">
            <p className="text-black mb-4 text-sm">Product Details:</p>{product.long_description}
          </div>
        </div>
      </div>

      {/* Second Section: Reviews */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        {product.reviews.map((rev) => (
          <div
            key={rev.id}
            className="border rounded p-4 flex flex-col md:flex-row gap-4"
          >
            {/* Left */}
            <div className="md:w-2/5 space-y-2">
              <div className="flex items-center space-x-2">
                <img
                  src={rev.reviewer_image || "/images/default-user.png"}
                  alt={rev.reviewer_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{rev.reviewer_name}</p>
                  <p className="text-sm text-gray-500">
                    {rev.reviewer_location}
                  </p>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span>Fit:</span>
                  {renderReviewStars(rev.fit)}
                </div>
                <div className="flex items-center gap-2">
                  <span>Comfort:</span>
                  {renderReviewStars(rev.comfort)}
                </div>
                <div className="flex items-center gap-2">
                  <span>Value:</span>
                  {renderReviewStars(rev.value_for_money)}
                </div>
                <div className="flex items-center gap-2">
                  <span>Quality:</span>
                  {renderReviewStars(rev.quality)}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="md:w-3/5">
              <p className="font-semibold flex items-center gap-2 mt-2">
                Overall: {renderReviewStars(rev.overall_rating)}
              </p>

              <p className="mt-4">{rev.comment}</p>
              <p className="text-sm text-gray-800 mt-5">
                {rev.reviewer_name} would recommend this product.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
