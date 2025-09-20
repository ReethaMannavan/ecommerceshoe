
import Footer from "../components/home/Footer";
import MegaMenu from "../components/home/MegaMenu";
import Navbar from "../components/home/Navbar";
import SearchResultsPage from "../components/home/SearchResultsPage";



const SearchPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <Navbar/>
      <main className="flex-grow">
        <MegaMenu/>
<SearchResultsPage/>
      </main>
    <Footer/>
    </div>
  );
};

export default SearchPage;
