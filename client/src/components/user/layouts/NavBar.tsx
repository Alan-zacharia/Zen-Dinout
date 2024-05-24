import React, { useState } from "react";
import { Link } from "react-scroll";
/** Icons */
import { BiRestaurant } from "react-icons/bi";
import { AiOutlineClose, AiOutlineMenuFold } from "react-icons/ai";
/**end */
import { useNavigate } from "react-router-dom";
import Button from "../../layouts/Button";

const NavBar: React.FC = () => {

  const navigate = useNavigate();
  const [session, setsession] = useState("");
  const [menu, setMenu] = useState(false);
  function handleChange() {
    setMenu(menu => !menu);
  }
   function handleLogout(){ 
    localStorage.removeItem("user");
    navigate('/login');
   }
   function handleLogin(){ 
    localStorage.removeItem("user");
    navigate('/login');
   }

  return (
  
    <div className="fixed w-full">
      <div>
        <div className="flex flex-row justify-between p-5 px-5 md:px-32 bg-white shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
          <div className="flex flex-row items-center cursor-pointer">
            <span>
              <BiRestaurant size={32} />
            </span>
            <h1 className="text-xl font-semibold">Zen Dinout</h1>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-orange-500  transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-orange-500  transition-all cursor-pointer"
            >
              About
            </Link>
            <Link
              to="blog"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-orange-500 transition-all cursor-pointer"
            >
              Blog
            </Link>
            <Link
              to="reviews"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-orange-500  transition-all cursor-pointer"
            >
              Reviews
            </Link>
            {session ? (
              <div onClick={handleLogin}>
              <Button  title="Logout"/>
              </div>
              ) : (
                <div onClick={handleLogout}>
                <Button  title="Login"/>
                </div>
              )
            }
        
          </nav>
          <div className="md:hidden">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleLogin} />
            ) : (
              <AiOutlineMenuFold size={25} onClick={handleChange} />
            )}
          </div>
          <div
            className={`${
              menu ? "translate-x-0" : "-translate-x-full"
            } lg:hidden bg-black absolute flex flex-col text-white left-0 top-20 font-semibold text-2xl pt-8 text-center pb-4 gap-8 w-full h-fit transition-transform duration-300`}
          >
            <Link
              to="home"
              className="hover:text-orange-500  transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="tables"
              className="hover:text-orange-500  transition-all cursor-pointer"
            >
              Tables
            </Link>
            <Link
              to="about"
              className="hover:text-orange-500  transition-all cursor-pointer"
            >
              About
            </Link>
            <Link
              to="blog"
              className="hover:text-orange-500 transition-all cursor-pointer"
            >
              Blog
            </Link>
            <Link
              to="reviews"
              className="hover:text-orange-500  transition-all cursor-pointer"
            >
              Reviews
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
