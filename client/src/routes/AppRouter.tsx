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
import RestaurantViewDetails from '../pages/user/RestaurantViewDetails'
import SellerRegisterationPage from '../pages/seller/SellerRegisterationPage'
import UserProfile from '../components/user/UserProfile'
import HomeLayout from '../components/user/layouts/HomeLayout'
import ForgotPassword from '../pages/user/ForgotPassword'
import RestaurantApprovalForm from '../components/admin/RestaurantApprovalForm'
import ForgotPasswordPageRecieveEmail from '../pages/user/ForgotPasswordPageRecieveEmail'
import { localStorageGetItem } from '../utils/localStorageImpl'
import SellerLoginPage from '../pages/seller/SellerLoginPage'
const HomePage = React.lazy(() => import('../pages/user/Home'));
const DashBoard = React.lazy(() => import('../components/admin/DashBoard'));
const RestaurantMangement = React.lazy(() => import('../components/admin/RestaurantManagement'));
const Customers = React.lazy(() => import('../components/admin/UserManagement'));


const AppRouter : React.FC = () => {
  const {isLoggedIn} = useAppContext();
  const { isAdminLoggedIn } = useAdminAppContext();
  // const { isSellerLoggedIn } = useSellerAppContext();
  let isSellerLoggedIn = true
  const resetPassword = localStorageGetItem("&reset%pas%%"); 
  const registerHide = localStorageGetItem("%%register%%"); 
  const sellerHIde = localStorageGetItem("%%sellregis%%"); 

  
  return (
    <Router>
       <Suspense fallback={<div className='flex items-center justify-center h-screen'> <span className="loading loading-spinner loading-lg"></span></div>}>
      <Routes>
        {/* Auth routes */}
     
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={!registerHide ? <Signup/> : <Navigate to="/"/>} />
       
         
        <Route path="/" element={<HomePage />} >
         <Route index element={ <HomeLayout/> } />
         <Route path="/account" element={ <UserProfile/> } />
         <Route path="/restaurant-view/:restaurantId" element={ <RestaurantViewDetails/> } />
        </Route>
        <Route path='/reset-password' element={<ForgotPasswordPageRecieveEmail />}/>

        <Route path="/reset-password/fps/:id" element={resetPassword ? <ForgotPassword  /> : <Navigate to="*"/> } />


       
  


        {/* Admin Routers */}

        <Route path="/admin/login" element={!isAdminLoggedIn ? <AdminLogin/> :  <Navigate to='/admin/'/> } /> 4

        <Route path='/admin/' element={isAdminLoggedIn ? <AdminLayout/> : <Navigate to ='/admin/login'/>} >
        <Route index element={isAdminLoggedIn ? <DashBoard/> : <Navigate to ='/admin/login'/>} /> 
        <Route path='/admin/customers' element={isAdminLoggedIn ?  <Customers/> : <Navigate to ='/admin/login'/>} /> 
        <Route path='/admin/restaurants' element={isAdminLoggedIn ?  <RestaurantMangement/> : <Navigate to ='/admin/login'/>} /> 
        <Route path='/admin/new-registerations' element={isAdminLoggedIn ? <NewRestaurants/> : <Navigate to ='/admin/login'/>} /> 
        <Route path='/admin/restaurant-approval/:id' element={isAdminLoggedIn ? <RestaurantApprovalForm/> : <Navigate to ='/admin/login'/>} /> 
        </Route>

        {/* Seller Routers */}
        
        <Route path='/restaurant/registeration' element={!sellerHIde ? <SellerRegisterationPage/> : <Navigate to="/restaurant/"/> }/>
        <Route path='/restaurant/login' element={ <SellerLoginPage/> }/>

        <Route path='/restaurant/' element={isSellerLoggedIn ? <SellerHome/> : <Navigate to="/login"/>}>
         <Route index element={isSellerLoggedIn ? <SellerDashBoard/> : <Navigate to="/login"/>} />
         <Route path='/restaurant/reservations' element={isSellerLoggedIn ? <Reservation/> : <Navigate to="/login"/> } />
         <Route path='/restaurant/table' element={ isSellerLoggedIn ? <Table/> : <Navigate to="/login"/>  } />
         <Route path='/restaurant/time-slots' element={ isSellerLoggedIn ?  <TimeSlots/> : <Navigate to="/login"/> } />
         <Route path='/restaurant/menu' element={ isSellerLoggedIn ? <Menu/> : <Navigate to="/login"/> } />
         <Route path='/restaurant/order-history' element={isSellerLoggedIn ? <Orders/> : <Navigate to="/login"/>} />
         <Route path='/restaurant/restaurant-details' element={isSellerLoggedIn ? <RestaurantDetails/> : <Navigate to="/login"/>} />
        </Route>

        <Route path="*" element={<PageNotFound/>} />
        
      </Routes>
      </Suspense>
    </Router>
  )
}


export default AppRouter;

