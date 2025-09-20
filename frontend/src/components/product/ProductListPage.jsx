
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../../api/api";
// import ProductGrid from "../product/ProductGrid";

// export default function ProductListPage() {
//   const { categorySlug, subitemSlug } = useParams();
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filters, setFilters] = useState({
//     style: "",
//     size: "",
//     brand: "",
//     color: "",
//     sort: "featured",
//   });

//   const navigate = useNavigate();

//   // Fetch once
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         let url = "/products/";
//         if (subitemSlug) url += `?subitem=${subitemSlug}`;
//         else if (categorySlug) url += `?category=${categorySlug}`;

//         const res = await axios.get(url);
//         const data = Array.isArray(res.data.results)
//           ? res.data.results
//           : Array.isArray(res.data)
//           ? res.data
//           : [];
//         setAllProducts(data);
//         setFilteredProducts(data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };

//     fetchProducts();
//   }, [categorySlug, subitemSlug]);

//   // Apply filters + sorting whenever filters change
//   useEffect(() => {
//     let result = [...allProducts];

//     // Style filter (by subitem slug or name)
//     if (filters.style) {
//       result = result.filter(
//         (p) => p.subitem?.slug === filters.style || p.subitem?.name === filters.style
//       );
//     }

//     // Size filter
//     if (filters.size) {
//       result = result.filter((p) =>
//         p.sizes?.some((s) => s.size === filters.size)
//       );
//     }

//     // Brand filter
//     if (filters.brand) {
//       result = result.filter(
//         (p) => p.brand?.slug === filters.brand || p.brand?.name === filters.brand
//       );
//     }

//     // Color filter
//     if (filters.color) {
//       result = result.filter((p) =>
//         p.colors?.some(
//           (c) =>
//             c.name.toLowerCase() === filters.color.toLowerCase()
//         )
//       );
//     }

//     // Sorting
//     if (filters.sort === "price_low") {
//       result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//     } else if (filters.sort === "price_high") {
//       result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//     } else if (filters.sort === "rating") {
//       result.sort((a, b) => b.rating - a.rating);
//     } else if (filters.sort === "new") {
//       result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//     }
//     // featured → default order (do nothing)

//     setFilteredProducts(result);
//   }, [filters, allProducts]);

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleProductClick = (slug) => {
//     navigate(`/product/${slug}`);
//   };

//   return (
//     <div className="max-w-7xl px-4 py-8 mx-auto">
//       {/* FILTER + SORT */}
//       {/* FILTER + SORT */}
// <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 ">
//   {/* Left label */}
//   <div className="md:w-1/6 flex justify-start font-semibold text-gray-700 ml-4">
//     Filter →
//   </div>

//   {/* Center: Filters */}
//   <div className="flex flex-wrap justify-center gap-4 md:w-4/6">
//     {/* Style */}
//     <select
//       value={filters.style}
//       onChange={(e) => handleFilterChange("style", e.target.value)}
//       className="border rounded px-3 py-2"
//     >
//       <option value="">Style</option>
//       <option value="sandals">Sandals</option>
//       <option value="trainers">Trainers</option>
//       <option value="boots">Boots</option>
//       <option value="slippers">Slippers</option>
//       <option value="canvas">Canvas</option>
//       <option value="summer-shop">Summer Shop</option>
//     </select>

//     {/* Size */}
//     <select
//       value={filters.size}
//       onChange={(e) => handleFilterChange("size", e.target.value)}
//       className="border rounded px-3 py-2"
//     >
//       <option value="">Size</option>
//       <option value="UK3">UK 3</option>
//       <option value="UK4">UK 4</option>
//       <option value="UK5">UK 5</option>
//       <option value="UK6">UK 6</option>
//       <option value="UK7">UK 7</option>
//       <option value="UK8">UK 8</option>
//     </select>

//     {/* Brand */}
//     <select
//       value={filters.brand}
//       onChange={(e) => handleFilterChange("brand", e.target.value)}
//       className="border rounded px-3 py-2"
//     >
//       <option value="">Brand</option>
//       <option value="becket">Becket</option>
//       <option value="comfy-steps">Comfy Steps</option>
//       <option value="kickers">Kickers</option>
//       <option value="lambertta">Lambertta</option>
//       <option value="marvel">Marvel</option>
//       <option value="skechers">Skechers</option>
//       <option value="totes">Totes</option>
//     </select>

//     {/* Color */}
//     <select
//       value={filters.color}
//       onChange={(e) => handleFilterChange("color", e.target.value)}
//       className="border rounded px-3 py-2"
//     >
//       <option value="">Color</option>
//       <option value="Black">Black</option>
//       <option value="Blue">Blue</option>
//       <option value="Orange">Orange</option>
//       <option value="Green">Green</option>
//       <option value="Brown">Brown</option>
//       <option value="White">White</option>
//       <option value="Red">Red</option>
//       <option value="Grey">Grey</option>
//     </select>
//   </div>

//   {/* Right: Sorting */}
//   <div className="md:w-1/6 flex justify-end">
//     <select
//       value={filters.sort}
//       onChange={(e) => handleFilterChange("sort", e.target.value)}
//       className="border rounded px-3 py-2"
//     >
//       <option value="featured">Featured</option>
//       <option value="new">New Arrivals</option>
//       <option value="price_low">Price: Low → High</option>
//       <option value="price_high">Price: High → Low</option>
//       <option value="rating">Overall Rating</option>
//     </select>
//   </div>
// </div>


//       {/* Product Grid */}
//       <ProductGrid
//         products={filteredProducts}
//         onProductClick={handleProductClick}
//       />
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/api";
import ProductGrid from "../product/ProductGrid";

export default function ProductListPage() {
  const { categorySlug, subitemSlug } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    style: "",
    size: "",
    brand: "",
    color: "",
    sort: "featured",
  });

  const navigate = useNavigate();

  // Fetch once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "/products/";
        if (subitemSlug) url += `?subitem=${subitemSlug}`;
        else if (categorySlug) url += `?category=${categorySlug}`;

        const res = await axios.get(url);
        const data = Array.isArray(res.data.results)
          ? res.data.results
          : Array.isArray(res.data)
          ? res.data
          : [];
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [categorySlug, subitemSlug]);

  // Apply filters + sorting whenever filters change
 useEffect(() => {
  let result = [...allProducts];

  // ✅ Style filter (subitem)
  if (filters.style) {
    result = result.filter(
      (p) =>
        p.subitem?.slug === filters.style ||
        p.subitem?.name?.toLowerCase() === filters.style.toLowerCase()
    );
  }

  // ✅ Size filter
  if (filters.size) {
    result = result.filter((p) =>
      p.sizes?.some((s) => s.size === filters.size)
    );
  }

  // ✅ Brand filter
  if (filters.brand) {
    result = result.filter(
      (p) =>
        p.brand?.slug === filters.brand ||
        p.brand?.name?.toLowerCase() === filters.brand.toLowerCase()
    );
  }

  // ✅ Color filter
  if (filters.color) {
    result = result.filter((p) =>
      p.colors?.some(
        (c) =>
          c.name?.toLowerCase() === filters.color.toLowerCase() ||
          c.slug === filters.color
      )
    );
  }

  // ✅ Sorting
  if (filters.sort === "price_low") {
    result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (filters.sort === "price_high") {
    result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (filters.sort === "rating") {
    result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  } else if (filters.sort === "new") {
    result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
  // 'featured' → default order, do nothing

  setFilteredProducts(result);
}, [filters, allProducts]);


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  return (
    <div className="max-w-7xl px-4 py-8 mx-auto">
      {/* FILTER + SORT */}
      {/* FILTER + SORT */}
<div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 ">
  {/* Left label */}
  <div className="md:w-1/6 flex justify-start font-semibold text-gray-700 ml-4">
    Filter →
  </div>

  {/* Center: Filters */}
  <div className="flex flex-wrap justify-center gap-4 md:w-4/6">
    {/* Style */}
    <select
      value={filters.style}
      onChange={(e) => handleFilterChange("style", e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="">Style</option>
      <option value="sandals">Sandals</option>
      <option value="trainers">Trainers</option>
      <option value="boots">Boots</option>
      <option value="slippers">Slippers</option>
      <option value="canvas">Canvas</option>
      <option value="summer-shop">Summer Shop</option>
    </select>

    {/* Size */}
    <select
      value={filters.size}
      onChange={(e) => handleFilterChange("size", e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="">Size</option>
      <option value="UK3">UK 3</option>
      <option value="UK4">UK 4</option>
      <option value="UK5">UK 5</option>
      <option value="UK6">UK 6</option>
      <option value="UK7">UK 7</option>
      <option value="UK8">UK 8</option>
    </select>

    {/* Brand */}
    <select
      value={filters.brand}
      onChange={(e) => handleFilterChange("brand", e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="">Brand</option>
      <option value="becket">Becket</option>
      <option value="comfy-steps">Comfy Steps</option>
      <option value="kickers">Kickers</option>
      <option value="lambertta">Lambertta</option>
      <option value="marvel">Marvel</option>
      <option value="skechers">Skechers</option>
      <option value="totes">Totes</option>
    </select>

    {/* Color */}
    <select
      value={filters.color}
      onChange={(e) => handleFilterChange("color", e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="">Color</option>
      <option value="Black">Black</option>
      <option value="Blue">Blue</option>
      <option value="Orange">Orange</option>
      <option value="Green">Green</option>
      <option value="Brown">Brown</option>
      <option value="White">White</option>
      <option value="Red">Red</option>
      <option value="Grey">Grey</option>
    </select>
  </div>

  {/* Right: Sorting */}
  <div className="md:w-1/6 flex justify-end">
    <select
      value={filters.sort}
      onChange={(e) => handleFilterChange("sort", e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="featured">Featured</option>
      <option value="new">New Arrivals</option>
      <option value="price_low">Price: Low → High</option>
      <option value="price_high">Price: High → Low</option>
      <option value="rating">Overall Rating</option>
    </select>
  </div>
</div>


      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        onProductClick={handleProductClick}
      />
    </div>
  );
}
