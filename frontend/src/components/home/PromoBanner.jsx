import { useEffect, useState } from "react";

export default function PromoBanner() {
  const [bgWhite, setBgWhite] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgWhite((prev) => !prev);
    }, 500); // change color every 1 second
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full py-6 mb-10 mt-10 flex justify-center items-center transition-colors duration-500 ${
        bgWhite ? "bg-white text-black" : "bg-darkslate text-white"
      }`}
    >
      <div className="text-center text-lg md:text-2xl font-semibold">
        <p>Get your first order with free gift</p>
        <p>& 50% offer</p>
      </div>
    </div>
  );
}
