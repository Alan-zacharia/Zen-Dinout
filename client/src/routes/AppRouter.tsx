import React, { Suspense, useState } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from '../pages/user/Login'
import Signup from '../pages/user/Register'
import AdminLogin from '../components/admin/LoginForm'
import AdminLayout from '../pages/admin/AdminHome'
import NewRestaurants from '../components/admin/RestaurantRegistrationMan'
import { useAppContext } from '../Contexts/AppContext'
import { useAdminAppContext } from '../Contexts/AdminAppContext'
import SellerHome from '../pages/seller/SellerHome'
import SellerDashBoard from '../components/seller/SellerDashBoard'
import Reservation from '../components/seller/Reservation'
import Table from '../components/seller/Table'
import Menu from '../components/seller/Menu'
import TimeSlots from '../components/seller/TimeSlots'
import Orders from '../components/seller/Orders';
import RestaurantDetails from '../components/seller/RestaurantDetails'
import PageNotFound from '../pages/PageNotFound'
import { useSellerAppContext } from '../Contexts/SellerAppContext'
import SellerRegisteration from '../components/seller/SellerRegisteration'
import SellerRegisterationPage from '../pages/seller/SellerRegisterationPage'
import UserProfile from '../components/user/UserProfile'
import HomeLayout from '../components/user/layouts/HomeLayout'
import ForgotPassword from '../pages/user/ForgotPassword'
const HomePage = React.lazy(() => import('../pages/user/Home'));
const DashBoard = React.lazy(() => import('../components/admin/DashBoard'));
const RestaurantMangement = React.lazy(() => import('../components/admin/RestaurantManagement'));
const Customers = React.lazy(() => import('../components/admin/UserManagement'));


const AppRouter : React.FC = () => {
  const {isLoggedIn} = useAppContext();
  const { isAdminLoggedIn } = useAdminAppContext();
  const { isSellerLoggedIn } = useSellerAppContext();
  
  return (
    <Router>
       <Suspense fallback={<div className='flex items-center justify-center h-screen'> <span className="loading loading-spinner loading-lg"></span></div>}>
      <Routes>
        {/* Auth routes */}
     
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={<Signup/> } />
       
         
        <Route path="/" element={<HomePage />} >
         <Route index element={ <HomeLayout/> } />
         <Route path="/account" element={ <UserProfile/> } />
        </Route>
        <Route path="/forgot-password" element={ <ForgotPassword  /> } />


       
  


        {/* Admin Routers */}

        <Route path="/admin/login" element={!isAdminLoggedIn ? <AdminLogin/> :  <Navigate to='/admin/'/> } /> 4

        <Route path='/admin/' element={isAdminLoggedIn ? <AdminLayout/> : <Navigate to ='/admin/login'/>} >
        <Route index element={isAdminLoggedIn ? <DashBoard/> : <Navigate to ='/admin/login'/>} /> 
        <Route path='/admin/customers' element={isAdminLoggedIn ?  <Customers/> : <Navigate to ='/admin/login'/>} /> 
        <Route path='/admin/restaurants' element={isAdminLoggedIn ?  <RestaurantMangement/> : <Navigate to ='/admin/login'/>} /> 
        <Route path='/admin/new-registerations' element={isAdminLoggedIn ? <NewRestaurants/> : <Navigate to ='/admin/login'/>} /> 
        </Route>

        {/* Seller Routers */}
        
        <Route path='/restaurant/registeration' element={<SellerRegisterationPage/> }/>

        <Route path='/restaurant/' element={ <SellerHome/>}>
         <Route index element={<SellerDashBoard/>} />
         <Route path='/restaurant/reservations' element={ <Reservation/>} />
         <Route path='/restaurant/table' element={ <Table/> } />
         <Route path='/restaurant/time-slots' element={ <TimeSlots/> } />
         <Route path='/restaurant/menu' element={<Menu/> } />
         <Route path='/restaurant/order-history' element={<Orders/>} />
         <Route path='/restaurant/restaurant-details' element={<RestaurantDetails/>} />
        </Route>

        <Route path="*" element={<PageNotFound/>} />
        
      </Routes>
      </Suspense>
    </Router>
  )
}


export default AppRouter;

