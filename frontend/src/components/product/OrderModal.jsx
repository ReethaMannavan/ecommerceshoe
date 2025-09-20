// import { useLocation, useNavigate } from "react-router-dom";
// import checkIcon from "../../assets/images/placed.PNG"; // your icon

// export default function OrderCompleted() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state?.orderNumber) {
//     navigate("/"); // redirect if accessed directly
//     return null;
//   }

//   const { orderNumber } = state;

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white px-4">
//       <div className="bg-white border border-black p-6 w-[450px] text-center space-y-4">
//         {/* Image */}
//         <div className="flex justify-center">
//           <img src={checkIcon} alt="Success" className="w-44 h-28" />
//         </div>

//         {/* Title + Order Info */}
//         <h2 className="text-lg font-semibold">Thank you for your order</h2>
//         <p className="text-gray-600">
//           We've received your order and will ship in 5–7 business days. <br />
//           Your order number is <strong>{orderNumber}</strong>.
//         </p>

//         {/* Buttons */}
//         <div className="flex gap-4 justify-center mt-4">
//           <button
//             className="px-4 py-2 border border-black rounded hover:bg-gray-100"
//             onClick={() => navigate("/orders")} // view past orders
//           >
//             View Orders
//           </button>
//           <button
//             className="px-4 py-2 bg-[#2F4F4F] text-white rounded hover:bg-gray-800"
//             onClick={() => navigate("/order-summary")}
//           >
//             Track Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useLocation, useNavigate } from "react-router-dom";
import checkIcon from "../../assets/images/placed.PNG";

export default function OrderCompleted() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const orderNumber = state?.orderNumber;

  // Save orderNumber to localStorage for later tracking
  if (orderNumber) {
    localStorage.setItem("orderNumber", orderNumber);
  } else {
    // If accessed directly, redirect to home
    navigate("/");
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="bg-white border border-black p-6 w-[450px] text-center space-y-4">
        {/* Image */}
        <div className="flex justify-center">
          <img src={checkIcon} alt="Success" className="w-44 h-28" />
        </div>

        {/* Title + Order Info */}
        <h2 className="text-lg font-semibold">Thank you for your order</h2>
        <p className="text-gray-600">
          We've received your order and will ship in 5–7 business days. <br />
          Your order number is <strong>{orderNumber}</strong>.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mt-4">
          <button
            className="px-4 py-2 border border-black rounded hover:bg-gray-100"
            onClick={() => navigate("/orders")} // view past orders
          >
            View Orders
          </button>
          <button
            className="px-4 py-2 bg-[#2F4F4F] text-white rounded hover:bg-gray-800"
            onClick={() => navigate("/order-summary")}
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
}
