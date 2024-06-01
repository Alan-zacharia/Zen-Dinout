import axios from "axios";

import Home from "../../components/user/Home";
import NavBar from "../../components/user/layouts/NavBar";
import Hero from "../../components/user/layouts/Hero";
import Footer from "../../components/user/layouts/Footer";
import Card from "../../components/layouts/Card";
import { useQueryClient } from "react-query";



const HomePage: React.FC = () => {
  
  return ( 
    <div className="h-screen ">
      <NavBar />
      <Hero />
      <Home />
      <div className="flex flex-wrap lg:justify-normal lg:ml-20 mb-20 justify-center gap-5 lg:gap-5">
        <Card />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
