

// import { useNavigate } from "react-router-dom";
// import { Trash2 } from "lucide-react"; 
// import { useCart } from "../context/CartContext";
// import deliveryicon from '../../assets/images/delivery.PNG'
// import icon1 from '../../assets/images/checkoutgpay.PNG'
// import icon2 from '../../assets/images/checkoutpaypal.PNG'
// import icon3 from '../../assets/images/checkoutclearpay.PNG'
// import icon4 from '../../assets/images/checkoutklarna.PNG'

// export default function CartPage() {
//   const navigate = useNavigate();
//   const { cartItems, removeFromCart, updateQuantity, updateSize } = useCart();

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.price * (item.quantity || 1),
//     0
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
//       {/* Title + Continue Shopping */}
//       <div className="text-center space-y-2">
//         <h1 className="text-3xl font-semibold">Your Cart</h1>
//         <p className="text-gray-500">
//           <a href="/" className="underline">Continue Shopping</a>
//         </p>
//         <div className="border border-gray-700 w-[750px] px-3 py-4 rounded-2xl mx-auto">
// Free & Fast arriving Sunday Order within
//  23 hours,53 minutes,50 seconds
//         </div>
//       </div>

//       {/* Cart Items */}
//       <div className="space-y-6">
//         {cartItems.length === 0 && (
//           <p className="text-center text-gray-500">Your cart is empty.</p>
//         )}
//         {cartItems.map((item) => (
//           <div
//             key={`${item.id}-${item.size}`}
//             className="grid grid-cols-4 gap-4 items-center border-b pb-4"
//           >
//             {/* Column 1: Image */}
//             <img
//               src={item.image || "/images/fallback.png"}
//               alt={item.name}
//               className="w-24 h-24 object-cover rounded"
//             />

//             {/* Column 2: Name + Description + MRP */}
//             <div className="space-y-1">
//               <p className="font-semibold">{item.name}</p>
//               <p className="text-gray-500 text-sm">{item.description || ""}</p>
//               <p className="text-gray-500">MRP ₹{item.price}</p>
//             </div>

//             {/* Column 3: Size & Quantity */}
//             <div className="flex flex-col gap-2">
//               {item.sizes && item.sizes.length > 0 && (
//                 <select
//                   value={item.size}
//                   onChange={(e) => updateSize(item.id, item.size, e.target.value)}
//                   className="border border-black rounded px-2 py-1"
//                 >
//                   {item.sizes.map((size) => (
//                     <option key={size.id} value={size.size}>
//                       {size.size}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               <select
//                 value={item.quantity || 1}
//                 onChange={(e) =>
//                   updateQuantity(item.id, item.size, parseInt(e.target.value))
//                 }
//                 className="border border-black rounded px-2 py-1"
//               >
//                 {[1, 2, 3, 4, 5].map((q) => (
//                   <option key={q} value={q}>
//                     {q}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Column 4: Remove */}
//             <button onClick={() => removeFromCart(item.id, item.size)}>
//               <Trash2 className="text-red-500 w-5 h-5" />
//             </button>
//           </div>
//         ))}
//       </div>
// <hr className="border-t-[1px] border-[#464545] my-2" />
//       {/* Summary */}
//       {cartItems.length > 0 && (
//         <div className="pt-4 space-y-2">
//           <div className="flex justify-between font-semibold">
//             <span>Total</span>
//             <span>₹{totalPrice}</span>
//           </div>
//           <div className="flex justify-between items-center text-sm text-gray-900">
//             <span className="text-black">Delivery: Free</span>
//             <p>
//               Delivery & returns info{" "}
//               <img
//                 src={deliveryicon}
//                 alt="info"
//                 className="inline w-5 h-5 ml-1"
//               />
//             </p>
//           </div>
//         </div>
//       )}
// <hr className="border-t-[1px] border-[#464545] my-2" />

//       {/* Checkout Section */}
//       {cartItems.length > 0 && (
//         <div className="space-y-4 flex flex-col items-center">
//           <button
//             className="w-[550px]  bg-[#2F4F4F] text-white py-3"
//             onClick={() => navigate("/checkout")}
//           >
//             Checkout Securely
//           </button>

//           {/* Express Checkout */}
//           <p className="text-black text-sm self-start ml-[350px]">Express Checkout</p>
//           <div className="flex flex-col gap-4 w-[550px]">
//             <button className="flex items-center justify-center gap-2 border border-black rounded px-4 py-2 w-full">
//               <img src={icon1} alt="GPay" className="w-16 h-6" />
             
//             </button>
//             <button className="flex items-center justify-center gap-2 border border-black rounded px-4 py-2 w-full">
//               <img src={icon2}  alt="PayPal" className="w-16 h-6" />
             
//             </button>
//             <button className="flex items-center justify-center gap-2 border border-black rounded px-4 py-2 w-full">
//               <img src={icon3}  alt="ClearPay" className="w-20 h-6" />
             
//             </button>
//             <button className="flex items-center justify-center gap-2 border border-black rounded px-4 py-2 w-full">
//               <img src={icon4} alt="Klarna" className="w-16 h-6" />
            
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react"; 
import { useCart } from "../context/CartContext";
import deliveryicon from '../../assets/images/delivery.PNG'
import icon1 from '../../assets/images/checkoutgpay.PNG'
import icon2 from '../../assets/images/checkoutpaypal.PNG'
import icon3 from '../../assets/images/checkoutclearpay.PNG'
import icon4 from '../../assets/images/checkoutklarna.PNG'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

import toast from "react-hot-toast";


export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, updateSize } = useCart();
  const { user } = useContext(AuthContext);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to proceed to checkout!"); 
      navigate("/login");
      return;
    }
    toast.success("Redirecting to checkout...");
    navigate("/checkout"); // proceed to payment
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Title + Continue Shopping */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold">Your Cart</h1>
        <p className="text-gray-500">
          <a href="/" className="underline">Continue Shopping</a>
        </p>
        <div className="border border-gray-700 w-[750px] px-3 py-4 rounded-2xl mx-auto">
Free & Fast arriving Sunday Order within
 23 hours,53 minutes,50 seconds
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartItems.length === 0 && (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="grid grid-cols-4 gap-4 items-center border-b pb-4"
          >
            <img
              src={item.image || "/images/fallback.png"}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="space-y-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.description || ""}</p>
              <p className="text-gray-500">MRP ₹{item.price}</p>
            </div>

            <div className="flex flex-col gap-2">
              {item.sizes && item.sizes.length > 0 && (
                <select
                  value={item.size}
                  onChange={(e) => updateSize(item.id, item.size, e.target.value)}
                  className="border border-black rounded px-2 py-1"
                >
                  {item.sizes.map((size) => (
                    <option key={size.id} value={size.size}>
                      {size.size}
                    </option>
                  ))}
                </select>
              )}

              <select
                value={item.quantity || 1}
                onChange={(e) =>
                  updateQuantity(item.id, item.size, parseInt(e.target.value))
                }
                className="border border-black rounded px-2 py-1"
              >
                {[1, 2, 3, 4, 5].map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={() => removeFromCart(item.id, item.size)}>
              <Trash2 className="text-red-500 w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
<hr className="border-t-[1px] border-[#464545] my-2" />

      {/* Summary */}
      {cartItems.length > 0 && (
        <div className="pt-4 space-y-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-900">
            <span className="text-black">Delivery: Free</span>
            <p>
              Delivery & returns info{" "}
              <img
                src={deliveryicon}
                alt="info"
                className="inline w-5 h-5 ml-1"
              />
            </p>
          </div>
        </div>
      )}
<hr className="border-t-[1px] border-[#464545] my-2" />

      {/* Checkout Section */}
      {cartItems.length > 0 && (
        <div className="space-y-4 flex flex-col items-center">
          <button
            className="w-[550px] bg-[#2F4F4F] text-white py-3"
            onClick={handleCheckout}
          >
            Checkout Securely
          </button>

          <p className="text-black text-sm self-start ml-[350px]">Express Checkout</p>
          <div className="flex flex-col gap-4 w-[550px]">
            <button className="flex items-center justify-center gap-2 border border-black rounded px-4 py-2 w-full">
              <img src={icon1} alt="GPay" className="w-16 h-6" />
            </button>
            <button className="flex items-center justify-center gap-2 border border-black rounded px-4 py-2 w-full">
              <img src={icon2}  alt="PayPal" className="w-16 h-6" />
            </button>
            <button className="flex items-center justify-center gap-2 border border-black rounded px-4 py-2 w-full">
              <img src={icon3}  alt="ClearPay" className="w-20 h-6" />
            </button>
            <button className="flex items-center justify-center gap-2 border border-black rounded px-4 py-2 w-full">
              <img src={icon4} alt="Klarna" className="w-16 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
