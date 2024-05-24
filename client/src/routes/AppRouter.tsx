import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from '../pages/user/Login'
import Signup from '../pages/user/Register'
import AdminLogin from '../components/admin/LoginForm'
import AdminLayout from '../pages/admin/AdminHome'
import Dashboard from '../components/admin/DashBoard'
import Customer from '../components/admin/UserManagement'
import RestaurantMangement from '../components/admin/RestaurantManagement'
import NewRestaurants from '../components/admin/RestaurantRegistrationMan'
import HomePage from '../pages/user/Home'
import OtpPage from '../pages/Otp'


const AppRouter : React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/otp" element={<OtpPage/>} />

        <Route path="/" element={<HomePage />} />

        
        <Route path="/admin/login" element={<AdminLogin/>} /> 

        <Route path='/admin/' element={ <AdminLayout/>} >
        <Route index element={<Dashboard/>} /> 
        <Route path='/admin/customers' element={<Customer/>} /> 
        <Route path='/admin/restaurants' element={<RestaurantMangement/>} /> 
        <Route path='/admin/new-registerations' element={<NewRestaurants/>} /> 
       </Route>


      </Routes>
    </Router>
  )
}

export default AppRouter;

