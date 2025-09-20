import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

export default function Footer() {
  const [contact, setContact] = useState({});
  const [socialMedia, setSocialMedia] = useState([]);
  const [newsletter, setNewsletter] = useState({});
  const [email, setEmail] = useState("");

  useEffect(() => {
    api.get("/footercontact/").then((res) => setContact(res.data[0]));
    api.get("/social-media/").then((res) => setSocialMedia(res.data));
    api.get("/newsletter/").then((res) => setNewsletter(res.data[0]));
  }, []);

  const handleSubscribe = async () => {
    if (!email) return alert("Please enter your email");
    try {
      await api.post("/newsletter/subscribe/", { email });
      alert("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      alert("Error subscribing");
    }
  };

  return (
    <footer className="bg-[#2F4F4F] text-white py-10 px-6 md:px-16 font-['Libre_Baskerville']">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Contact Us */}
        <div>
          <h2 className="font-bold mb-4">Contact Us</h2>
          <p className="text-sm">We’d love to hear from you!</p>
          <p className="text-sm">Landline: {contact?.landline || "N/A"}</p>
          <p className="text-sm">WhatsApp: {contact?.whatsapp || "N/A"}</p>
          <p className="text-sm">Email: {contact?.email || "N/A"}</p>
          <p className="text-sm">Address: {contact?.address || "N/A"}</p>
        </div>

        {/* Shop Links */}
        <div>
          <h2 className="font-bold mb-4">Shop</h2>
          <ul className="space-y-1 text-sm list-disc">
            <li>
              <Link to="/products/category/:categorySlug">New in</Link>
            </li>
            <li>
              <Link to="/products/category/:categorySlug">Women</Link>
            </li>
            <li>
              <Link to="/products/category/:categorySlug">Men</Link>
            </li>
            <li>
              <Link to="/products/category/:categorySlug">Accessories</Link>
            </li>
            <li>
              <Link to="/products/category/:categorySlug">Heels</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
          </ul>
        </div>

        {/* Info Links */}
        <div>
          <h2 className="font-bold mb-4">Info</h2>
          <ul className="space-y-1 text-sm list-disc">
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/">Return & Exchange Policy</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Terms of Service</Link>
            </li>
            <li>
              <Link to="/">Shipping Policy</Link>
            </li>
            <li>
              <Link to="/about">Blogs</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="font-bold mb-4">Social Media</h2>
          <div className="flex space-x-3">
            {socialMedia.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={item.icon} alt={item.name} className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
         <h2 className="font-bold mb-4">{newsletter?.heading || "Newsletter"}</h2>
<p className="mb-3">{newsletter?.subtext || "Subscribe to our newsletter."}</p>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="bg-white text-black font-bold px-4 py-2 mt-2 hover:bg-[#FFA0A0] transition"
          >
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
}
