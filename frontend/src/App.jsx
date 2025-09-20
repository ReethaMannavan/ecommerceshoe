import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import ScrollToTop from "./components/scroll/ScrollToTop";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import ContactMainPage from "./pages/ContactMainPage";
import AboutPage from "./pages/AboutPage";
import ProductListMainPage from "./pages/ProductListMainPage";
import ProductDescriptionMainPage from "./pages/ProductDescriptionMainPage";
import AuthToggle from "./components/login/AuthToggle";
import LoginPage from "./pages/LoginPage";
import CartMainPage from "./pages/CartMainPage";
import CheckoutMainPage from "./pages/CheckoutMainPage";
import OrderConfirmedPage from "./pages/OrderConfirmed";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import ProtectedRoute from "./components/product/ProtectedRoute";
import SearchResultsPage from "./components/home/SearchResultsPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen font-roboto">
          <main>
            <ScrollToTop />
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactMainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<CartMainPage />} />

            <Route path="/search" element={<SearchPage />} />


              <Route path="/checkout" element={<CheckoutMainPage />} />
              <Route path="/ordercompleted" element={<OrderConfirmedPage />} />
              <Route path="/order-summary" element={<OrderSummaryPage />} />

              <Route
                path="/products/subitem/:subitemSlug"
                element={<ProductListMainPage />}
              />

              {/* Product List by category */}
              <Route
                path="/products/category/:categorySlug"
                element={<ProductListMainPage />}
              />

              <Route
                path="/product/:productSlug"
                element={<ProductDescriptionMainPage />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
