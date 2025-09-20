import Footer from "../components/home/Footer";
import MegaMenu from "../components/home/MegaMenu";
import Navbar from "../components/home/Navbar";
import ProductListPage from "../components/product/ProductListPage";

const ProductListMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <MegaMenu />
        <ProductListPage />
      </main>
      <Footer />
    </div>
  );
};

export default ProductListMainPage;
