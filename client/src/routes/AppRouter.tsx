import React, { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from '../pages/user/Login'
import Signup from '../pages/user/Register'
import AdminLogin from '../components/admin/LoginForm'
import AdminLayout from '../pages/admin/AdminHome'
import NewRestaurants from '../components/admin/RestaurantRegistrationMan'
   
import OtpPage from '../pages/Otp'
const HomePage = React.lazy(() => import('../pages/user/Home'));
const DashBoard = React.lazy(() => import('../components/admin/DashBoard'));
const RestaurantMangement = React.lazy(() => import('../components/admin/RestaurantManagement'));
const Customers = React.lazy(() => import('../components/admin/UserManagement'));


const AppRouter : React.FC = () => {
  return (
    <Router>
       <Suspense fallback={<div className='flex items-center justify-center  h-screen '> <span className="loading loading-spinner loading-lg"></span></div>}>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/otp" element={<OtpPage/>} />

        <Route path="/" element={<HomePage />} />

        
        <Route path="/admin/login" element={<AdminLogin/>} /> 

        <Route path='/admin/' element={ <AdminLayout/>} >
        <Route index element={<DashBoard/>} /> 
       
        <Route path='/admin/customers' element={<Customers/>} /> 
        
        <Route path='/admin/restaurants' element={<RestaurantMangement/>} /> 
        <Route path='/admin/new-registerations' element={<NewRestaurants/>} /> 
       </Route>
      </Routes>
      </Suspense>
    </Router>
  )
}

export default AppRouter;

