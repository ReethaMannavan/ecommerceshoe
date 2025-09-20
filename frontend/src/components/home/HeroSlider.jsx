import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api
      .get("hero-slides/")
      .then((res) => setSlides(res.data))
      .catch((err) => console.error("Error fetching hero slides:", err));
  }, []);

  // Auto slide
  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const goToSlide = useCallback((index) => {
    setCurrent(index);
  }, []);

  if (!slides.length) return null;

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === current;
        const overlaySide =
          index % 2 === 0 ? "left-8 md:left-16" : "right-8 md:right-16";

        return (
          <div
            key={slide.id}
            className={`m-4 absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            {/* Background */}
            <img
              src={slide.image}
              alt={slide.title || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            {/* Title + Paragraph Overlay */}
<div
  className={`absolute top-1/3 transform -translate-y-1/2 max-w-md bg-black/50 p-6 rounded-2xl text-white ${
    (index === 0 || index === 3) ? "left-8 md:left-16" : "right-8 md:right-16"
  }`}
>
  {slide.title && (
    <h2 className="text-2xl md:text-4xl font-bold mb-4">
      {slide.title}
    </h2>
  )}
  {slide.paragraph && (
    <p className="text-sm md:text-lg">{slide.paragraph}</p>
  )}
</div>

{/* Button Overlay */}
<div
  className={`absolute top-2/3 transform -translate-y-1/2 max-w-md p-6 ${
    (index === 0 || index === 3) ? "left-8 md:left-16" : "right-8 md:right-16"
  }`}
>
  <Link
    to={slide.button_link || "/products/category/:categorySlug"}
    className="inline-block bg-[#dadada] text-black font-bold px-6 py-4 rounded-xl shadow hover:bg-[#ff8c8c] transition"
  >
    {slide.button_text || "Shop Now"}
  </Link>
</div>

          </div>
        );
      })}

      {/* Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
            <button className="w-7 h-7 rounded-full border-2 border-[#2F4F4F] bg-white">

            
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full border-2 transition ${
              index === current
                ? "bg-[#38686e] border-[#2F4F4F]"
                : "bg-transparent border-[#2F4F4F]"
            }`}
          />

          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
