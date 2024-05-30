import axios from "axios";

import Home from "../../components/user/Home";
import NavBar from "../../components/user/layouts/NavBar";
import Hero from "../../components/user/layouts/Hero";
import Footer from "../../components/user/layouts/Footer";
import Card from "../../components/layouts/Card";


axios.defaults.withCredentials = true;

const HomePage: React.FC = () => {
  return (
    <div className="h-screen ">
      <NavBar/>
      <Hero/>
      <Home/>
      <section className="xl:ml-7 md:justify-center xl:justify-normal flex flex-wrap gap-3 mb-52 bg-slate-50">
      <Card/>
      </section>
      <Footer/>
    
    </div>
  );
};

export default HomePage;
