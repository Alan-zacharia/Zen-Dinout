import axios from "axios";

import TablesComponents from "../../components/user/TableComponent";
import NavBar from "../../components/user/layouts/NavBar";
import Home from "../../components/user/Home";
import About from "../../components/user/About";
import Reviews from "../../components/user/ReviewCard";
import Footer from "../../components/user/layouts/Footer";
axios.defaults.withCredentials = true;

const HomePage: React.FC = () => {
  return (
    <div className="h-screen">
      <NavBar />
      <main>
        <div id="home">
          <Home />
        </div>
       
        <div id="restaurants">
          <TablesComponents/>
        </div>
        <div id="about">
          <About/>
        </div>
        <div id="reviews">
          <Reviews/>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;
