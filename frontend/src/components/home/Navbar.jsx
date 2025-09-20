
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Menu } from "@headlessui/react";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import api from "../../api/api";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";


export default function Navbar() {
  const [logo, setLogo] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

const [searchTerm, setSearchTerm] = useState("");
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
const navigate = useNavigate();


  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await api.get("/logos/latest/");
        setLogo(res.data?.image_url || null);
      } catch {
        setLogo(null);
      }
    };
    fetchLogo();
  }, []);




  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      // Navigate to the search results page with query param
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(""); // optional: clear input after search
    }
  };
  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="bg-darkslate text-white px-4 py-4 flex items-center justify-between relative">
      {/* Logo + Search */}
      <div className="flex items-center gap-4">
        {logo ? (
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full"></div>
        )}

        {/* <div className="relative hidden sm:flex">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search here"
            className="rounded-full pl-10 pr-4 py-2 w-[350px] text-black"
          />
        </div> */}

          <form onSubmit={handleSearchSubmit} className="relative hidden sm:flex">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      <input
        type="text"
        placeholder="Search here"
        className="rounded-full pl-10 pr-4 py-2 w-[350px] text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>

      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`hover:text-palered ${
              link.name === "Home" ? "text-palered" : ""
            }`}
          >
            {link.name}
          </a>
        ))}

        {/* User Dropdown */}
        {user ? (
          <div className="relative group">
            <button className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">
              Hi, {user.username}
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              <a href="/order-summary" className="px-4 py-2 hover:bg-gray-200">
                Track Orders
              </a>
              <button
                onClick={logout}
                className="text-left px-4 py-2 w-full hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <a href="/login" className="hover:text-palered">
            Log in / Register
          </a>
        )}

        {/* Cart */}
        {/* Cart */}
<div
  className="relative cursor-pointer"
  onClick={() => navigate("/cart")}
>
  <ShoppingCartIcon className="w-6 h-6" />
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-palered text-black text-xs rounded-full px-1">
      {cartCount}
    </span>
  )}
</div>


      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-darkslate flex flex-col items-center p-4 md:hidden gap-2">
          <input
            type="text"
            placeholder="Search here"
            className="rounded-full px-4 py-2 w-64 text-black mb-2"
          />
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="py-2 text-white hover:text-palered"
            >
              {link.name}
            </a>
          ))}

          {user ? (
            <>
              <a
                href="/track-orders"
                className="py-2 text-white hover:text-palered"
              >
                Track Orders
              </a>
              <button
                onClick={logout}
                className="py-2 text-white hover:text-palered w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/login" className="py-2 text-white hover:text-palered">
              Log in / Register
            </a>
          )}

          <div className="relative mt-2">
            <ShoppingCartIcon className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-palered text-black text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
