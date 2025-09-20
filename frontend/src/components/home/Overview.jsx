import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import api from "../../api/api";

export default function Overview() {
  const [overview, setOverview] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    api
      .get("/overview/")
      .then((res) => {
        if (res.data.length > 0) setOverview(res.data[0]);
      })
      .catch((err) => console.error("Error fetching overview:", err));
  }, []);

  if (!overview) return null;

  return (
    <section
      ref={ref}
      className={`max-w-6xl mx-auto px-4 py-12 text-center transition-all duration-1000 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
        {overview.title}
      </h2>

      {/* Description */}
      <p className="text-black mb-10 leading-relaxed max-w-3xl mx-auto font-semibold">
        {overview.description}
      </p>

      {/* Subtitle */}
      <h3 className="text-xl md:text-2xl font-semibold mb-8 text-black">
        {overview.subtitle}
      </h3>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
  {overview.items.map((item) => (
    <Link
      key={item.id}
      to={item.link}
      className="block group transform transition hover:scale-105"
    >
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-64 object-cover rounded-2xl group-hover:opacity-90 transition"
        />
      </div>
      <h4 className="mt-7 text-lg font-semibold text-black group-hover:text-[#FFA0A0] transition">
        {item.title}
      </h4>
    </Link>
  ))}
</div>

    </section>
  );
}
