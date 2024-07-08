import React from "react";
import NavBar from "../../components/user/layouts/NavBar";
import Footer from "../../components/user/layouts/Footer";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsChatRightFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  return (
    <div className="h-screen relative ">
      <div className="fixed z-50 top-0 left-0 w-full">
        <NavBar />
      </div>

      <div className="overflow-y-auto h-full ">
        <Outlet />

        {isAuthenticated && (
          <div className="absolute bottom-4 right-14">
            <div
              className="tooltip cursor-pointer rounded-full p-3.5 bg-blue-400"
              onClick={() => navigate("/chat")}
              data-tip="Messages"
            >
              <BsChatRightFill size={25} className="text-white" />
            </div>
          </div>
        )}
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
