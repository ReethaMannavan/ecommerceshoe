import Footer from "../components/home/Footer";
import MegaMenu from "../components/home/MegaMenu";
import Navbar from "../components/home/Navbar";
import ProductDescriptionPage from "../components/product/ProductDescriptionPage";
import ProductDescriptionPageNew from "../components/product/ProductDescriptionPageNew";


const ProductDescriptionMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <MegaMenu/>
        <ProductDescriptionPageNew/>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDescriptionMainPage;
