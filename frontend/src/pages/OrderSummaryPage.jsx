
import Footer from "../components/home/Footer";
import MegaMenu from "../components/home/MegaMenu";
import Navbar from "../components/home/Navbar";
import OrderSummary from "../components/product/OrderSummary";


const OrderSummaryPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
        <MegaMenu/>
<OrderSummary/>
      </main>
    <Footer/>
    </div>
  );
};

export default OrderSummaryPage;
