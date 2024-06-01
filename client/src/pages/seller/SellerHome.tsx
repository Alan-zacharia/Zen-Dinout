import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/seller/shared/SideBar'
import Header from '../../components/seller/shared/Header'

const SellerHome = () => {
  return (
    <div>
        <Header/>
        <SideBar/>
        <div>
        <Outlet/>
        </div>
    </div>
  )
}

export default SellerHome
