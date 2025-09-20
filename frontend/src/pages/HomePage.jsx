import Footer from "../components/home/Footer";
import HeroSlider from "../components/home/HeroSlider";
import HomeProductGrid from "../components/home/HomeProductGrid";
import MegaMenu from "../components/home/MegaMenu";
import Navbar from "../components/home/Navbar";
import Overview from "../components/home/Overview";
import PromoBanner from "../components/home/PromoBanner";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
        <MegaMenu/>
 <HeroSlider/>
 <Overview/>
 <HomeProductGrid/>
 <PromoBanner/>
      </main>
    <Footer/>
    </div>
  );
};

export default HomePage;
