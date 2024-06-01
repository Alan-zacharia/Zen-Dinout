import React, { Suspense } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from '../pages/user/Login'
import Signup from '../pages/user/Register'
import AdminLogin from '../components/admin/LoginForm'
import AdminLayout from '../pages/admin/AdminHome'
import NewRestaurants from '../components/admin/RestaurantRegistrationMan'
import OtpPage from '../pages/Otp'
import { useAppContext } from '../Contexts/AppContext'
import { useAdminAppContext } from '../Contexts/AdminAppContext'
import SellerHome from '../pages/seller/SellerHome'
import SellerDashBoard from '../components/seller/SellerDashBoard'
const HomePage = React.lazy(() => import('../pages/user/Home'));
const DashBoard = React.lazy(() => import('../components/admin/DashBoard'));
const RestaurantMangement = React.lazy(() => import('../components/admin/RestaurantManagement'));
const Customers = React.lazy(() => import('../components/admin/UserManagement'));


const AppRouter : React.FC = () => {
  const {isLoggedIn} = useAppContext();
  const { isAdminLoggedIn } = useAdminAppContext();

  
  return (
    <Router>
       <Suspense fallback={<div className='flex items-center justify-center h-screen'> <span className="loading loading-spinner loading-lg"></span></div>}>
      <Routes>
        {/* Auth routes */}
     
        <Route path="/login" element={ !isLoggedIn ?  <Login/> : <Navigate to='/'/>} />
        <Route path="/register" element={!isLoggedIn ?  <Signup/>  : <Navigate to='/'/>} />
        <Route path="/otp"  element={<OtpPage />} />
       
         
        <Route path="/" element={<HomePage />} />
       
  


        {/* Admin Routers */}

        <Route path="/admin/login" element={!isAdminLoggedIn ? <AdminLogin/> :  <Navigate to='/admin/'/> } /> 
        <Route path='/admin/' element={isAdminLoggedIn ? <AdminLayout/> : <Navigate to ='/admin/login'/>} >
        <Route index element={<DashBoard/>} /> 
        <Route path='/admin/customers' element={<Customers/>} /> 
        <Route path='/admin/restaurants' element={<RestaurantMangement/>} /> 
        <Route path='/admin/new-registerations' element={<NewRestaurants/>} /> 
        </Route>

        {/* Seller Routers */}
        <Route path='/restaurant/' element={<SellerHome/>}>
         <Route index element={<SellerDashBoard/>} />
         <Route path='/restaurant/reservations' element={<SellerDashBoard/>} />
         <Route path='/restaurant/table' element={<SellerDashBoard/>} />
         <Route path='/restaurant/time-slots' element={<SellerDashBoard/>} />
         <Route path='/restaurant/menu' element={<SellerDashBoard/>} />
         <Route path='/restaurant/order' element={<SellerDashBoard/>} />
         <Route path='/restaurant/restaurant-view' element={<SellerDashBoard/>} />
          
        </Route>

        <Route path="*" element={<Navigate to='/page-not-Found'/>} />
      </Routes>
      </Suspense>
    </Router>
  )
}


export default AppRouter;

