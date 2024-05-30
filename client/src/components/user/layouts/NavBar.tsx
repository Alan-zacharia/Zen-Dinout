import React from "react"
import NavLeftSide from "./NavLeftSide";
import { Link } from "react-router-dom";


const NavBar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 ">
    <div className="navbar-start ">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
          
          <li ><a>Home</a></li>
          <li>
            <a>Book a Table</a>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div className=" xl:px-80 text-3xl font-bold flex items-center"  >
      <a className="">Zen<span className="text-orange-600">Dinout</span></a>
      <a className="hidden md:flex" ><NavLeftSide/></a>
        </div>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu-horizontal px-1 font-semibold text-base gap-20 cursor-pointer ">
     
        <li className="hover:text-red-500"><a>Home</a></li>
        <li className="hover:text-red-500">
       <a>Book a Table</a>
        </li>
        <li className="hover:text-red-500"><a>Blog</a></li>
      </ul>
    </div>
    <div className="navbar-end xl:mr-72">
     <Link to='login'><h1 className="text-lg font-bold font-sans text-red-600 cursor-pointer"><a>Login</a></h1></Link>
    </div>
  </div>
  );
};

export default NavBar;
