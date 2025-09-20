
import { useEffect, useState } from "react";
import api from "../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function MegaMenu() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [offers, setOffers] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false); // for hamburger toggle

  useEffect(() => {
    api.get("/categories/").then(res => setCategories(res.data));
    api.get("/brands/").then(res => setBrands(res.data));
    api.get("/offers/").then(res => setOffers(res.data));
  }, []);

  return (
    <div className="bg-white relative z-40">
      <h1 className="text-center text-4xl font-bold mb-6 mt-10">StepUp.in</h1>
      <hr className="mx-auto w-[950px] border-black border-1 mt-4" />

      {/* Navbar */}
      <div className="relative">
        {/* Desktop Navbar */}
        <div className="hidden md:flex container mx-auto justify-center space-x-8 px-6 py-3 text-lg font-bold text-black">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="relative cursor-pointer hover:text-[#FFA0A0]"
              onMouseEnter={() => setHovered(cat.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link
  to={`/products/category/${cat.slug}`}
  className="font-semibold hover:text-red-500"
>
  {cat.name}
</Link>
            </div>
          ))}

          <div
            className="relative cursor-pointer hover:text-[#FFA0A0]"
            onMouseEnter={() => setHovered("brands")}
            onMouseLeave={() => setHovered(null)}
          >
            Brands
          </div>

          <div
            className="relative cursor-pointer hover:text-[#FFA0A0]"
            onMouseEnter={() => setHovered("offers")}
            onMouseLeave={() => setHovered(null)}
          >
            Offers
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="flex md:hidden justify-between items-center px-6 py-3">
          <span className="text-lg font-bold">StepUp.in</span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-xl font-bold"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white shadow-lg"
            >
              <ul className="flex flex-col p-6 space-y-4">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <span className="font-semibold">{cat.name}</span>
                    <ul className="pl-4 mt-2 space-y-1">
                      {cat.subcategories.map(sub =>
                        sub.items.map(item => (
                          <li
                            key={item.id}
                            className="text-sm hover:text-[#FFA0A0] cursor-pointer"
                          >
                            {item.name}
                          </li>
                        ))
                      )}
                    </ul>
                  </li>
                ))}

                <li>
                  <span className="font-semibold">Brands</span>
                  <ul className="pl-4 mt-2 grid grid-cols-2 gap-2">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => {
                      const letterBrands = brands.filter(b =>
                        b.name.toUpperCase().startsWith(letter)
                      );
                      if (!letterBrands.length) return null;
                      return letterBrands.map(b => (
                        <li key={b.id} className="text-sm hover:text-[#FFA0A0] cursor-pointer">
                          {b.name}
                        </li>
                      ));
                    })}
                  </ul>
                </li>

                <li>
                  <span className="font-semibold">Offers</span>
                  <ul className="pl-4 mt-2 space-y-1">
                    {offers.map(of => (
                      <li key={of.id} className="text-sm hover:text-[#FFA0A0] cursor-pointer">
                        {of.title}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Dropdowns */}
       {/* Desktop Dropdowns */}
<AnimatePresence>
  {hovered && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="hidden md:block absolute top-full left-0 right-0 bg-white shadow-lg z-50"
      // Wrap the whole dropdown in a div that includes hovered category
      onMouseEnter={() => setHovered(hovered)} // keep it open when mouse enters dropdown
      onMouseLeave={() => setHovered(null)}    // close only when leaving dropdown
    >
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Categories Dropdown */}
        {categories
          .filter(cat => cat.slug === hovered)
          .map(cat => (
            <div key={cat.id} className="grid grid-flow-col auto-cols-max gap-10">
              {cat.subcategories.map(sub => (
                <div key={sub.id}>
                  <h3 className="font-semibold text-[#2F4F4F] mb-2">{sub.name}</h3>
                  <ul className="space-y-1">
                    {sub.items.map(item => (
                      <li
                        key={item.id}
                        className="text-sm hover:text-[#FFA0A0] cursor-pointer"
                      >
                        <Link
        to={`/products/subitem/${item.slug}`}
        className="cursor-pointer"
      >
        {item.name}
      </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

        {/* Brands Dropdown */}
        {hovered === "brands" && (
          <div className="grid grid-cols-6 gap-6">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => {
              const letterBrands = brands.filter(b =>
                b.name.toUpperCase().startsWith(letter)
              );
              if (!letterBrands.length) return null;
              return (
                <div key={letter}>
                  <h3 className="font-semibold text-[#2F4F4F] mb-2">{letter}</h3>
                  <ul className="space-y-1 text-sm">
                    {letterBrands.map(b => (
                      <li key={b.id} className="hover:text-[#FFA0A0] cursor-pointer">
                        {b.name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* Offers Dropdown */}
        {hovered === "offers" && (
          <ul className="grid grid-cols-1 gap-2 text-sm">
            {offers.map(of => (
              <li key={of.id} className="hover:text-[#FFA0A0] cursor-pointer">
                {of.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>


      </div>

      <hr className="mx-auto w-[950px] border-black border-1 mt-4" />
    </div>
  );
}
