import React, { useEffect } from "react";
import NavLeftSide from "./NavLeftSide";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../Contexts/AppContext";
import SignOutButton from "../../auth/SignOutButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";




const NavBar: React.FC = () => {
   const {currentUser} = useSelector((state : RootState)=> state.user)

  return (
    <div className="navbar bg-base-100 shadow-lg shadow-neutral-400 h-20">
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
              <p className="text-2xl font-bold">Home</p>
            </li>
            <li  className="m-5">
              <p className="text-2xl font-bold">Book a Table</p>
            </li >
            <li  className="m-5">
              <p className="text-2xl font-bold">Item 3</p>
            </li>
            {currentUser && (
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
              <p className="text-2xl font-bold">Home</p>
            </li>
            <li  className="m-5">
              <p className="text-2xl font-bold">Book a Table</p>
            </li >
            <li  className="m-5">
              <p className="text-2xl font-bold">Item 3</p>
            </li>
            <li  className="m-5">
              <p className="text-2xl font-bold">Bookings</p>
            </li>
            <li  className="m-5">
              <p className="text-2xl font-bold">Help</p>
            </li>
            </ul>
            )}
           
          </ul>
        </div>
        <div className=" xl:px-80 text-3xl font-bold flex items-center">
          <div className="">
            Zen<span className="text-orange-600">Dinout</span>
          </div>
          <div className="hidden md:flex">
            <NavLeftSide />
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 font-semibold text-base gap-20 cursor-pointer ">
          <li className="hover:text-red-500">
          <Link to={'/'}>Home</Link>
          </li>
      
          
          <li className="hover:text-red-500">
          <Link to={'/'}>Book a Table</Link>
          </li>
          
        
          <li className="hover:text-red-500">
          <Link to={'/'}>Blog</Link>
          </li>
         
        </ul>
      </div>
      <div className="navbar-end xl:mr-72">
        {currentUser ? (
          <>
            <div className="avatar cursor-pointer"> 
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Link to={'/account'}>
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </Link>
              </div>
            </div>
            <div>
            <SignOutButton />
            </div>
          </>
        ) : (
          <>
              <h1 className="text-lg font-bold font-sans text-red-600 cursor-pointer">
              <Link to="login">Login</Link>
              </h1>
            
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
