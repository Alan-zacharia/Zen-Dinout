import { FcBullish } from "react-icons/fc";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../../lib/constants/Navigation";
import { useQueryClient } from "react-query";
import LogoutButton from "./LogoutButton";

const linkClassess =
  "flex items-center gap-2 px-3 py-2 rounded-lg text-base hover:no-underline hover:bg-indigo-200  font-light active:bg-indigo-400 ";

interface SidebarLink {
  label: string;
  path: string;
  icon: JSX.Element;
}

interface SidebarProps {
  menu: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ menu }) => {

  return (
    <>
      <div className="lg:flex flex-col w-60 p-3 bg-white text-white hidden">
        <div className="flex items-center gap-2 px-1 py-3">
          <FcBullish fontSize={24} />
          <span className=" text-black text-2xl font-bold">Zen Dinout</span>
        </div>
        <div className=" flex flex-col gap-4 py-8">
          {DASHBOARD_SIDEBAR_LINKS.map((item: SidebarLink, index: number) => (
            <SideBarLinks key={index} item={item} />
          ))}
        </div>
        <div className="pt-2 flex-1 flex flex-col  gap-0.5 border-t">
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map(
            (item: SidebarLink, index: number) => (
              <SideBarLinks key={index} item={item} />
            )
          )}
        </div>
        <div
          className={classNames(
            " cursor-pointer hover:bg-red-500 hover:text-white mb-6",
            linkClassess
          )}
        >
          <span className="text-xl text-black ">
            <HiOutlineLogout />
          </span>
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default Sidebar;

interface SideBarLinksProps {
  item: SidebarLink;
}

const SideBarLinks: React.FC<SideBarLinksProps> = ({ item }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname == item.path
          ? "text-white  font-extrabold bg-indigo-400"
          : "text-black font-semibold",
        linkClassess
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
};
