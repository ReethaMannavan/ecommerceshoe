// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext"; // ✅ useCart hook

// import visa from '../../assets/images/visa.png';
// import icon1 from '../../assets/images/checkoutgpay.PNG';
// import icon2 from '../../assets/images/checkoutpaypal.PNG';
// import icon3 from '../../assets/images/checkoutclearpay.PNG';
// import icon4 from '../../assets/images/checkoutklarna.PNG';

// export default function CheckoutPage() {
//   const { cartItems, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     cardName: "",
//     cardNumber: "",
//     cvv: "",
//     expiry: "",
//     address: "",
//     city: "",
//     state: "",
//     landmark: "",
//     pincode: "",
//     paymentMethod: "card",
//   });

//   const [formErrors, setFormErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const delivery = 0;
//   const total = subtotal + delivery;

//   const generateOrderNumber = () => {
//     const randomNum = Math.floor(100000 + Math.random() * 900000);
//     return "#Bh" + randomNum;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const errors = {};

//     // Personal Details Validation
//     if (!formData.firstName.match(/^[A-Za-z]+$/)) {
//       errors.firstName = "First name is required and letters only.";
//     }
//     if (!formData.lastName.match(/^[A-Za-z]+$/)) {
//       errors.lastName = "Last name is required and letters only.";
//     }
//     if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
//       errors.email = "Valid email is required.";
//     }
//     if (!formData.phone.match(/^\d{10}$/)) {
//       errors.phone = "Phone number must be 10 digits.";
//     }

//     // Address Validation
//     if (!formData.address) errors.address = "Address is required.";
//     if (!formData.city) errors.city = "City is required.";
//     if (!formData.state) errors.state = "State is required.";
//     if (!formData.pincode.match(/^\d{5,6}$/)) errors.pincode = "Pincode must be 5-6 digits.";

//     // Payment Validation
//     if (!formData.paymentMethod) {
//       errors.paymentMethod = "Select a payment method.";
//     } else if (formData.paymentMethod === "card") {
//       if (!formData.cardName.match(/^[A-Za-z ]+$/)) errors.cardName = "Card name required, letters only.";
//       if (!formData.cardNumber.match(/^\d{16}$/)) errors.cardNumber = "Card number must be 16 digits.";
//       if (!formData.cvv.match(/^\d{3}$/)) errors.cvv = "CVV must be 3 digits.";
//       if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) errors.expiry = "Expiry must be MM/YY.";
//     }

//     setFormErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       const orderNumber = generateOrderNumber();
//       clearCart();

//       // Navigate to Order Completed Page
//       navigate("/ordercompleted", { state: { orderNumber } });
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//       {/* Sidebar: Order Summary */}
//       <div className="bg-[#2F4F4F] text-white p-6 rounded-lg space-y-4 md:col-span-1">
//         <h2 className="text-lg font-semibold">Order Summary</h2>
//         <hr className="border-gray-400" />

//         {cartItems.map((item) => (
//           <div key={`${item.id}-${item.size}`} className="flex gap-4 items-start">
//             <img src={item.image} alt={item.name} className="w-20 h-20 rounded object-cover" />
//             <div className="flex-1 text-sm">
//               <p className="font-semibold">{item.name}</p>
//               <p className="text-gray-200">{item.shortDescription}</p>
//               <p>Size: {item.size}</p>
//               <p>Quantity: {item.quantity}</p>
//               <p>MRP: ₹{item.price}</p>
//             </div>
//           </div>
//         ))}

//         <hr className="border-gray-400" />
//         <div className="flex justify-between text-sm">
//           <span>Amount</span>
//           <span>₹{subtotal}</span>
//         </div>
//         <div className="flex justify-between text-sm">
//           <span>Delivery fees</span>
//           <span>Free</span>
//         </div>
//         <div className="flex justify-between font-bold text-lg">
//           <span>Total</span>
//           <span>₹{total}</span>
//         </div>
//       </div>

//       {/* Main Section: Checkout Form */}
//       <div className="md:col-span-2 space-y-8">
//         <h2 className="text-xl font-bold text-center">Complete Your Order</h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Personal Details */}
//           <div>
//             <h3 className="font-semibold mb-2">Personal Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="First Name"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//                 {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="lastName"
//                   placeholder="Last Name"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//                 {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
//               </div>
//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email ID"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//                 {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//                 {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
//               </div>
//             </div>
//           </div>

//           {/* Payment & Address fields remain the same */}
//           {/* ... include your payment and address fields here with same error display ... */}

//            {/* Payment Details */}
//           <div>
//             <h3 className="font-semibold mb-2">Payment Details</h3>
//            <div className="flex gap-4 mb-4">
//               <img src={visa} alt="visa" className="h-6" />
//               <img src={icon1} alt="gpay" className="h-6" />
//               <img src={icon2} alt="paypal" className="h-6" />
//               <img src={icon3} alt="clearpay" className="h-6" />
//               <img src={icon4} alt="klarna" className="h-6" />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <input
//                   type="text"
//                   name="cardName"
//                   placeholder="Card Holder Name"
//                   value={formData.cardName}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//                 {formErrors.cardName && <p className="text-red-500 text-sm">{formErrors.cardName}</p>}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="cardNumber"
//                   placeholder="Card Number"
//                   value={formData.cardNumber}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//                 {formErrors.cardNumber && <p className="text-red-500 text-sm">{formErrors.cardNumber}</p>}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="cvv"
//                   placeholder="CVV"
//                   value={formData.cvv}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//                 {formErrors.cvv && <p className="text-red-500 text-sm">{formErrors.cvv}</p>}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="expiry"
//                   placeholder="Expiration Date (MM/YY)"
//                   value={formData.expiry}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//                 {formErrors.expiry && <p className="text-red-500 text-sm">{formErrors.expiry}</p>}
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-3">
//               <input
//                 type="radio"
//                 id="cod"
//                 name="paymentMethod"
//                 value="cod"
//                 checked={formData.paymentMethod === "cod"}
//                 onChange={handleChange}
//               />
//               <label htmlFor="cod">Cash on Delivery</label>
//             </div>
//             {formErrors.paymentMethod && <p className="text-red-500 text-sm">{formErrors.paymentMethod}</p>}
//           </div>

//           {/* Shipping Address */}
//           <div>
//             <h3 className="font-semibold mb-2">Shipping Address</h3>
//             <div>
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Address Line 1"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full mb-2"
//               />
//               {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
//               <div>
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//                 {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="state"
//                   placeholder="State"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//                 {formErrors.state && <p className="text-red-500 text-sm">{formErrors.state}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="landmark"
//                 placeholder="Landmark"
//                 value={formData.landmark}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full"
//               />
//               <div>
//                 <input
//                   type="text"
//                   name="pincode"
//                   placeholder="Pincode"
//                   value={formData.pincode}
//                   onChange={handleChange}
//                   className="border p-2 rounded w-full"
//                 />
//                 {formErrors.pincode && <p className="text-red-500 text-sm">{formErrors.pincode}</p>}
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between">
//             <button
//               type="button"
//               className="bg-gray-300 px-6 py-2 rounded-lg"
//               onClick={() => navigate("/cart")}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-[#2F4F4F] text-white px-6 py-2 rounded-lg"
//             >
//               Order Now
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ useCart hook
import toast from "react-hot-toast";

import visa from "../../assets/images/visa.png";
import icon1 from "../../assets/images/checkoutgpay.PNG";
import icon2 from "../../assets/images/checkoutpaypal.PNG";
import icon3 from "../../assets/images/checkoutclearpay.PNG";
import icon4 from "../../assets/images/checkoutklarna.PNG";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    cvv: "",
    expiry: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    pincode: "",
    paymentMethod: "card",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 0;
  const total = subtotal + delivery;

  const generateOrderNumber = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return "#Bh" + randomNum;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    // Personal Details Validation
    if (!formData.firstName.match(/^[A-Za-z]+$/)) {
      errors.firstName = "First name is required and letters only.";
    }
    if (!formData.lastName.match(/^[A-Za-z]+$/)) {
      errors.lastName = "Last name is required and letters only.";
    }
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = "Valid email is required.";
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    // Address Validation
    if (!formData.address) errors.address = "Address is required.";
    if (!formData.city) errors.city = "City is required.";
    if (!formData.state) errors.state = "State is required.";
    if (!formData.pincode.match(/^\d{5,6}$/))
      errors.pincode = "Pincode must be 5-6 digits.";

    // Payment Validation
    if (!formData.paymentMethod) {
      errors.paymentMethod = "Select a payment method.";
    } else if (formData.paymentMethod === "card") {
      if (!formData.cardName.match(/^[A-Za-z ]+$/))
        errors.cardName = "Card name required, letters only.";
      if (!formData.cardNumber.match(/^\d{16}$/))
        errors.cardNumber = "Card number must be 16 digits.";
      if (!formData.cvv.match(/^\d{3}$/)) errors.cvv = "CVV must be 3 digits.";
      if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/))
        errors.expiry = "Expiry must be MM/YY.";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const orderNumber = generateOrderNumber();

      // ✅ Save ordered products, total and payment method to localStorage
      localStorage.setItem("orderedProducts", JSON.stringify(cartItems));
      localStorage.setItem("orderedTotal", JSON.stringify(total));
      localStorage.setItem("selectedPaymentMethod", formData.paymentMethod);

      // Clear cart
      clearCart();
   toast.success(`Order ${orderNumber} placed successfully! 🎉`);
      // Navigate to Order Completed Page with order number
      navigate("/ordercompleted", { state: { orderNumber } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Sidebar: Order Summary */}
      <div className="bg-[#2F4F4F] text-white p-6 rounded-lg space-y-4 md:col-span-1">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <hr className="border-gray-400" />

        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex gap-4 items-start"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1 text-sm">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-200">{item.shortDescription}</p>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
              <p>MRP: ₹{item.price}</p>
            </div>
          </div>
        ))}

        <hr className="border-gray-400" />
        <div className="flex justify-between text-sm">
          <span>Amount</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Delivery fees</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Main Section: Checkout Form */}
      <div className="md:col-span-2 space-y-8">
        <h2 className="text-xl font-bold text-center">Complete Your Order</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details */}
          <div>
            <h3 className="font-semibold mb-2">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm">{formErrors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm">{formErrors.lastName}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm">{formErrors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm">{formErrors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment & Address sections remain same, no change */}

          <div>
            <h3 className="font-semibold mb-2">Payment Details</h3>
            <div className="flex gap-4 mb-4">
              <img src={visa} alt="visa" className="h-6" />
              <img src={icon1} alt="gpay" className="h-6" />
              <img src={icon2} alt="paypal" className="h-6" />
              <img src={icon3} alt="clearpay" className="h-6" />
              <img src={icon4} alt="klarna" className="h-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="cardName"
                  placeholder="Card Holder Name"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.cardName && (
                  <p className="text-red-500 text-sm">{formErrors.cardName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.cardNumber && (
                  <p className="text-red-500 text-sm">
                    {formErrors.cardNumber}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.cvv && (
                  <p className="text-red-500 text-sm">{formErrors.cvv}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiration Date (MM/YY)"
                  value={formData.expiry}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.expiry && (
                  <p className="text-red-500 text-sm">{formErrors.expiry}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              <label htmlFor="cod">Cash on Delivery</label>
            </div>
            {formErrors.paymentMethod && (
              <p className="text-red-500 text-sm">{formErrors.paymentMethod}</p>
            )}
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Address Line 1"
                value={formData.address}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-2"
              />
              {formErrors.address && (
                <p className="text-red-500 text-sm">{formErrors.address}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.city && (
                  <p className="text-red-500 text-sm">{formErrors.city}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.state && (
                  <p className="text-red-500 text-sm">{formErrors.state}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={formData.landmark}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <div>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {formErrors.pincode && (
                  <p className="text-red-500 text-sm">{formErrors.pincode}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 px-6 py-2 rounded-lg"
              onClick={() => navigate("/cart")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#2F4F4F] text-white px-6 py-2 rounded-lg"
            >
              Order Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
