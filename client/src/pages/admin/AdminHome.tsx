// AdminLayout Component
import React, { useState } from 'react';
import Header from '../../components/admin/shared/Header';
import Sidebar from '../../components/admin/shared/SideBar';
import { Link, Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineMenuFold } from 'react-icons/ai';

const AdminLayout: React.FC = () => {
    const [menu, setMenu] = useState(false);
    function handleChange() {
      setMenu(menu => !menu);
    }
  return (
    <div className="flex flex-col md:flex-row h-screen bg-neutral-50 overflow-x-hidden">
      <Sidebar menu={menu} />
      <div className="flex-1">
        <Header />
        <div className="md:hidden fixed right-4 top-4">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuFold size={25} onClick={handleChange} />
            )}
          </div>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
