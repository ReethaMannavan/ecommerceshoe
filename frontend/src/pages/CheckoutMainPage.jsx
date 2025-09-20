
import Footer from "../components/home/Footer";
import MegaMenu from "../components/home/MegaMenu";
import Navbar from "../components/home/Navbar";
import CheckoutPage from "../components/product/CheckoutPage";


const CheckoutMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
        <MegaMenu/>
<CheckoutPage/>
      </main>
    <Footer/>
    </div>
  );
};

export default CheckoutMainPage;
