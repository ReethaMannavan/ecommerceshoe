import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useForm } from "react-hook-form";

const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch contact info
  useEffect(() => {
    api
      .get("/contact-info/")
      .then((res) => setContactInfo(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Submit enquiry
  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const res = await api.post("/enquiry/", data);
      setSuccessMsg(res.data.message);
      reset();
    } catch (error) {
      setErrorMsg("Failed to send enquiry. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 mx-4">
        {/* Left Column */}
        <div className="md:w-2/5">
          <h2 className="text-2xl font-bold text-[#2F4F4F] mb-10">
            {contactInfo?.title}
          </h2>
          <h3 className="text-lg font-semibold mb-2">
            {contactInfo?.subtitle}
          </h3>
          <p className="mb-10">
            <span className="font-semibold block mb-2">Inquiry/Complaint: </span>
            {contactInfo?.inquiry_phone}
          </p>
          <p className="mb-1">
            <span className="font-semibold block mb-2">Any other queries: </span>
            {contactInfo?.query_phone}
          </p>
          <p className="mb-1">
            <span className="font-semibold mb-2 mt-6 block">Timing: </span>
            {contactInfo?.timing}
          </p>
          <p className="mb-1 mt-6">
            <span className="font-semibold">Email: </span>
            <a
              href={`mailto:${contactInfo?.email}`}
              className="text-blue-600 hover:underline"
            >
              {contactInfo?.email}
            </a>
          </p>
        </div>

        {/* Right Column */}
        <div>
          {contactInfo?.image && (
            <img
              src={contactInfo.image}
              alt="Contact"
              className=" shadow-md w-full h-auto"
            />
          )}
        </div>
      </div>
<hr className="border-t-1 border-gray-500 my-6" />
      {/* Section 2 - Enquiry Form */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-[#2F4F4F] mb-6">Enquiry Form</h2>

        {successMsg && (
          <p className="mb-4 text-green-600 font-medium">{successMsg}</p>
        )}
        {errorMsg && <p className="mb-4 text-red-600 font-medium">{errorMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z ]+$/,
                  message: "Name should contain only letters",
                },
              })}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-[#FFA0A0]"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-[#FFA0A0]"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold mb-1">Phone</label>
              <input
                type="text"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone must be 10 digits",
                  },
                })}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-[#FFA0A0]"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block font-semibold mb-1">Message</label>
            <textarea
              {...register("message", {
                required: "Message is required",
              })}
              rows="4"
              className="w-full border rounded-lg p-2 focus:ring focus:ring-[#FFA0A0]"
            ></textarea>
            {errors.message && (
              <p className="text-red-600 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2F4F4F] text-white px-6 py-2 rounded-lg hover:bg-[#FFA0A0] transition"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
