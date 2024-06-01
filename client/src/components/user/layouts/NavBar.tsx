import React, { useEffect } from "react";
import NavLeftSide from "./NavLeftSide";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../Contexts/AppContext";
import SignOutButton from "../../auth/SignOutButton";

const NavBar: React.FC = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="navbar bg-base-100 ">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-80  "
          >
            <li className="m-5 ">
              <a className="text-2xl font-bold">Home</a>
            </li>
            <li  className="m-5">
              <a className="text-2xl font-bold">Book a Table</a>
            </li >
            <li  className="m-5">
              <a className="text-2xl font-bold">Item 3</a>
            </li>
            {isLoggedIn && (
                <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-80  "
              >
               <div className="avatar cursor-pointer flex gap-5 m-8">
               <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                 <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
               </div>
               <p className="text-2xl font-bold">profile</p>
             </div>
            <li className="m-5 ">
              <a className="text-2xl font-bold">Home</a>
            </li>
            <li  className="m-5">
              <a className="text-2xl font-bold">Book a Table</a>
            </li >
            <li  className="m-5">
              <a className="text-2xl font-bold">Item 3</a>
            </li>
            <li  className="m-5">
              <a className="text-2xl font-bold">Bookings</a>
            </li>
            <li  className="m-5">
              <a className="text-2xl font-bold">Help</a>
            </li>
            </ul>
            )}
           
          </ul>
        </div>
        <div className=" xl:px-80 text-3xl font-bold flex items-center">
          <a className="">
            Zen<span className="text-orange-600">Dinout</span>
          </a>
          <a className="hidden md:flex">
            <NavLeftSide />
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 font-semibold text-base gap-20 cursor-pointer ">
          <li className="hover:text-red-500">
            <a>Home</a>
          </li>
          <li className="hover:text-red-500">
            <a>Book a Table</a>
          </li>
          <li className="hover:text-red-500">
            <a>Blog</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end xl:mr-72">
        {isLoggedIn ? (
          <>
            <div className="avatar cursor-pointer">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div>
            <SignOutButton />
            </div>
          </>
        ) : (
          <>
            <Link to="login">
              <h1 className="text-lg font-bold font-sans text-red-600 cursor-pointer">
                <a>Login</a>
              </h1>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
