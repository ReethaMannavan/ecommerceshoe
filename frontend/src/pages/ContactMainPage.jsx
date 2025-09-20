import ContactPage from "../components/contact/ContactPage";
import Footer from "../components/home/Footer";
import MegaMenu from "../components/home/MegaMenu";
import Navbar from "../components/home/Navbar";


const ContactMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
        <MegaMenu/>
<ContactPage/>
      </main>
    <Footer/>
    </div>
  );
};

export default ContactMainPage;
