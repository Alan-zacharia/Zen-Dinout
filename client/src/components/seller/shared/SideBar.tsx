import React from "react";

import { IoLogOut } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { SELLER_SIDEBAR_LINKS } from "../../../lib/constants/SellerNavigation";
import axios from "axios";
import {useDispatch} from "react-redux";
import { useQueryClient } from "react-query";
import { localStorageRemoveItem } from "../../../utils/localStorageImpl";
import { clearUser } from "../../../redux/user/userSlice";
import logout from "../../../utils/Logout";

interface SidebarLink {
  keys : string;
  label: string;
  path: string;
  icon: JSX.Element;
}

const SideBar = () => {
  const QueryClient = useQueryClient();
  const dispatch = useDispatch();
  const handleLogout = async()=>{
    dispatch(clearUser());
    logout("Seller Logout")
    await axios.put("http://localhost:3000/restaurant/restaurant-logout");
    localStorageRemoveItem("%%sellregis%%")
    QueryClient.invalidateQueries('validateSellerToken');
  }
  return (
    <div>
     
      <div className="h-full hidden lg:flex fixed ">
        <div className="flex flex-1">
          <div>
            <ul className="menu p-4 w-48 min-h-full  bg-blue-500 gap-5 rounded-tr-2xl rounded-br-2xl font-semibold text-white pt-32 font-serif">
                { SELLER_SIDEBAR_LINKS.map(
                    (item: SidebarLink, index: number) => (
                       <SideBarLinks key={index} item={item} />
                    )
                )}
              <span className="text-base font-bold">
                ----------------------
              </span>
              <li className="hover:bg-white hover:text-red-500 hover:rounded-2xl " onClick={handleLogout}>
                <p>
                  <IoLogOut size={27} />
                  
                  Logout
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

interface sideBarLinks {
  item: SidebarLink;
}

export const SideBarLinks: React.FC<sideBarLinks> = ({ item }) => {
    const { pathname } = useLocation();
  
    return (
      <Link to={item.path} className={classNames(
        pathname === item.path ? "hover:bg-white hover:text-blue-500 bg-white text-blue-500 rounded-xl hover:rounded-2xl" : "text-black  font-semibold",
      )}>
        <li className="hover:bg-white hover:text-blue-500 hover:rounded-xl">
          <a>
            {item.icon} {item.label}
          </a>
        </li>
      </Link>
    );
  };
  