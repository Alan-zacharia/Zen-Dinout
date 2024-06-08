import NavBar from "../../components/user/layouts/NavBar";
import Footer from "../../components/user/layouts/Footer";
import { Outlet } from "react-router-dom";


const HomePage: React.FC = () => {
  return (
    <div className="h-screen ">
      <div className="fixed z-50 top-0 left-0 w-full">
      <NavBar /> 
      </div>
      <div className="">
      <Outlet />
      </div>
      <div >
      <Footer />
      </div>
    </div>
  );
};

export default HomePage;
