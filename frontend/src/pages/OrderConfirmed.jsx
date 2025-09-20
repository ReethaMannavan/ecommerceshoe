
import Footer from "../components/home/Footer";
import MegaMenu from "../components/home/MegaMenu";
import Navbar from "../components/home/Navbar";
import OrderCompleted from "../components/product/OrderModal";


const OrderConfirmedPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
        <MegaMenu/>
<OrderCompleted/>
      </main>
    <Footer/>
    </div>
  );
};

export default OrderConfirmedPage;
