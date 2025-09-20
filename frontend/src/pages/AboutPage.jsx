import About from "../components/about/About";
import Footer from "../components/home/Footer";
import MegaMenu from "../components/home/MegaMenu";
import Navbar from "../components/home/Navbar";


const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
        <MegaMenu/>
<About/>
      </main>
    <Footer/>
    </div>
  );
};

export default AboutPage;
