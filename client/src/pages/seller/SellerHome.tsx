import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/seller/shared/SideBar'
import Header from '../../components/seller/shared/Header'

const SellerHome = () => {
  return (
    <div className='flex flex-col md:flex-row h-screen overflow-x-hidden bg-slate-50'>
        <div >
        <SideBar/>
        </div>
        <nav > 
          <Header/>
        </nav>
        <div className='mx-auto w-screen lg:px-56 '>
        <Outlet/>
        </div>
    </div>
  )
}

export default SellerHome