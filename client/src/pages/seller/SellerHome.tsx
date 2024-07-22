import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/seller/shared/SideBar";
import Header from "../../components/seller/shared/Header";
import { BsChatRightFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const SellerHome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-x-hidden bg-slate-50">
      <div>
        <SideBar />
      </div>
      <nav>
        <Header />
      </nav>
      <div className="mx-auto w-screen lg:px-56 ">
        <Outlet />
        <div
          className="tooltip absolute bottom-[5%] right-14 cursor-pointer rounded-full p-3.5 bg-green-400"
          onClick={() => navigate("/restaurant/chat")}
          data-tip="Enqueries"
        >
          <BsChatRightFill size={25} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default SellerHome;

