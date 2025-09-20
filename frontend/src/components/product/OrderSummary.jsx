

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { FaCheck } from "react-icons/fa";

// export default function OrderSummary() {
//   const location = useLocation();
//   const [orderNumber, setOrderNumber] = useState("");
//   const [orderedProducts, setOrderedProducts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("—");

//   useEffect(() => {
//     // Get orderNumber from navigation state OR localStorage
//     const storedOrderNumber =
//       location.state?.orderNumber || localStorage.getItem("orderNumber") || "";
//     setOrderNumber(storedOrderNumber);

//     const storedProducts =
//       JSON.parse(localStorage.getItem("orderedProducts")) || [];
//     const storedTotal = JSON.parse(localStorage.getItem("orderedTotal")) || 0;
//     const storedPayment = localStorage.getItem("selectedPaymentMethod") || "—";

//     setOrderedProducts(storedProducts);
//     setTotal(storedTotal);
//     setPaymentMethod(storedPayment);
//   }, [location]);

//   // Function to format date & time
//   const formatDateTime = (dateObj) =>
//     dateObj.toLocaleString("en-IN", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   // Timeline dates
//   const today = new Date();
//   const dispatchedDate = new Date(today);
//   dispatchedDate.setDate(today.getDate() + 2);

//   const outForDeliveryDate = new Date(today);
//   outForDeliveryDate.setDate(today.getDate() + 5);

//   const deliveryDate = new Date(today);
//   deliveryDate.setDate(today.getDate() + 7);

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-10 font-roboto">
//         <h1 className="text-black text-2xl mb-9">  Your Order</h1>
//       {/* Top Row: Order ID | Payment Method | Amount */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-lg font-semibold">
//           Order ID: <span className="text-gray-800">{orderNumber}</span>
//         </h1>
//         <p className="text-gray-800 font-semibold">
//           Payment: {paymentMethod} | ₹{total}
//         </p>
//       </div>

//       {/* Products List */}
//       <div className="space-y-4 mb-8">
//         {orderedProducts.map((item) => (
//           <div key={item.id} className="flex gap-4 items-start border-b pb-3">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-16 h-16 rounded object-cover"
//             />
//             <div className="flex-1">
//               <p className="font-semibold">{item.name}</p>
//               <p className="text-gray-600 text-sm">{item.shortDescription}</p>
//               <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
//               <p className="text-gray-500 text-xs mt-1">
//                 Expected Delivery:{" "}
//                 {deliveryDate.toLocaleDateString("en-IN", {
//                   month: "long",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Progress Timeline */}
//       <div className="relative pl-6 bg-[#D9D9D9] p-10 w-[550px]">
//         {/* Vertical Line */}
//         <div className="absolute left-[46px] top-10 bottom-10 w-[4px] bg-[#2F4F4F]"></div>

//         {/* Step 1: Order Placed */}
//         <div className="relative flex items-center mb-8 ">
//           <div className="w-12 h-12 bg-[#2F4F4F] rounded-full flex items-center justify-center z-10">
//             <FaCheck className="text-white text-xs" />
//           </div>
//           <p className="ml-4 text-gray-800">
//              Order Placed <br/>
//              {formatDateTime(today)}
//           </p>
//         </div>

//         {/* Step 2: Dispatched */}
//         <div className="relative flex items-center mb-8">
//           <div className="w-12 h-12 bg-[#2F4F4F] rounded-full flex items-center justify-center z-10">
//             <FaCheck className="text-white text-xs" />
//           </div>
//           <p className="ml-4 text-gray-800">
//             Dispatched <br/>{formatDateTime(dispatchedDate)}
//           </p>
//         </div>

//         {/* Step 3: Out for Delivery */}
//         <div className="relative flex items-center mb-8">
//           <div className="w-12 h-12 border-2 border-[#2F4F4F] rounded-full bg-white z-10"></div>
//           <p className="ml-4 text-gray-800">
//             Out for Delivery <br/> {formatDateTime(outForDeliveryDate)}
//           </p>
//         </div>

//         {/* Step 4: Delivery */}
//         <div className="relative flex items-center">
//           <div className="w-12 h-12 border-2 border-gray-400 rounded-full bg-white z-10"></div>
//           <p className="ml-4 text-gray-800">
//             Expected Delivery <br/> {formatDateTime(deliveryDate)} by 11 PM
//           </p>
//         </div>
//       </div>

      
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

export default function OrderSummary() {
  const location = useLocation();
  const [orderNumber, setOrderNumber] = useState("");
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("—");

  useEffect(() => {
    const storedOrderNumber =
      location.state?.orderNumber || localStorage.getItem("orderNumber") || "";
    const storedProducts =
      JSON.parse(localStorage.getItem("orderedProducts")) || [];
    const storedTotal =
      JSON.parse(localStorage.getItem("orderedTotal")) || 0;
    const storedPayment =
      localStorage.getItem("selectedPaymentMethod") || "—";

    setOrderNumber(storedOrderNumber);
    setOrderedProducts(storedProducts);
    setTotal(storedTotal);
    setPaymentMethod(storedPayment);
  }, [location]);

  if (!orderNumber) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No order found.
      </p>
    );
  }

  // Format date & timeline
  const formatDateTime = (dateObj) =>
    dateObj.toLocaleString("en-IN", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const today = new Date();
  const dispatchedDate = new Date(today);
  dispatchedDate.setDate(today.getDate() + 2);
  const outForDeliveryDate = new Date(today);
  outForDeliveryDate.setDate(today.getDate() + 5);
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 7);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-roboto">
      <h1 className="text-black text-2xl mb-9">Your Order</h1>

      {/* Top Row */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">
          Order ID: <span className="text-gray-800">{orderNumber}</span>
        </h1>
        <p className="text-gray-800 font-semibold">
          Payment: {paymentMethod} | ₹{total}
        </p>
      </div>

      {/* Products */}
      <div className="space-y-4 mb-8">
        {orderedProducts.map((item) => (
          <div key={item.id} className="flex gap-4 items-start border-b pb-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600 text-sm">
                {item.shortDescription || ""}
              </p>
              <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
              <p className="text-gray-500 text-xs mt-1">
                Expected Delivery:{" "}
                {deliveryDate.toLocaleDateString("en-IN", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Timeline */}
      <div className="relative pl-6 bg-[#D9D9D9] p-10 w-[550px]">
        <div className="absolute left-[46px] top-10 bottom-10 w-[4px] bg-[#2F4F4F]"></div>

        <div className="relative flex items-center mb-8 ">
          <div className="w-12 h-12 bg-[#2F4F4F] rounded-full flex items-center justify-center z-10">
            <FaCheck className="text-white text-xs" />
          </div>
          <p className="ml-4 text-gray-800">
            Order Placed <br />
            {formatDateTime(today)}
          </p>
        </div>

        <div className="relative flex items-center mb-8">
          <div className="w-12 h-12 bg-[#2F4F4F] rounded-full flex items-center justify-center z-10">
            <FaCheck className="text-white text-xs" />
          </div>
          <p className="ml-4 text-gray-800">
            Dispatched <br />
            {formatDateTime(dispatchedDate)}
          </p>
        </div>

        <div className="relative flex items-center mb-8">
          <div className="w-12 h-12 border-2 border-[#2F4F4F] rounded-full bg-white z-10"></div>
          <p className="ml-4 text-gray-800">
            Out for Delivery <br /> {formatDateTime(outForDeliveryDate)}
          </p>
        </div>

        <div className="relative flex items-center">
          <div className="w-12 h-12 border-2 border-gray-400 rounded-full bg-white z-10"></div>
          <p className="ml-4 text-gray-800">
            Expected Delivery <br /> {formatDateTime(deliveryDate)} by 11 PM
          </p>
        </div>
      </div>
    </div>
  );
}
