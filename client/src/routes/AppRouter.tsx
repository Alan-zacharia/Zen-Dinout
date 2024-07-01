import React, { Suspense, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "../pages/user/Login";
import Signup from "../pages/user/Register";
import AdminLogin from "../components/admin/LoginForm";
import AdminLayout from "../pages/admin/AdminHome";
import NewRestaurants from "../components/admin/RestaurantRegistrationMan";
import SellerHome from "../pages/seller/SellerHome";
import SellerDashBoard from "../components/seller/SellerDashBoard";
import Reservation from "../components/seller/Reservation";
import Table from "../components/seller/Table";
import Menu from "../components/seller/Menu";
import TimeSlots from "../components/seller/TimeSlots";
import Orders from "../components/seller/Orders";
import RestaurantDetails from "../components/seller/RestaurantDetails";
import PageNotFound from "../pages/PageNotFound";
import SellerRegisteration from "../components/seller/SellerRegisteration";
import RestaurantViewDetails from "../pages/user/RestaurantViewDetails";
import SellerRegisterationPage from "../pages/seller/SellerRegisterationPage";
import UserProfile from "../components/user/UserProfile";
import HomeLayout from "../components/user/layouts/HomeLayout";
import ForgotPassword from "../pages/user/ForgotPassword";
import RestaurantApprovalForm from "../components/admin/RestaurantApprovalForm";
import ForgotPasswordPageRecieveEmail from "../pages/user/ForgotPasswordPageRecieveEmail";
import { localStorageGetItem } from "../utils/localStorageImpl";
import SellerLoginPage from "../pages/seller/SellerLoginPage";
import ReserveTableConfirmation from "../components/user/ReserveTableConfirmation";
import BookingSuccess from "../components/layouts/BookingSuccess";
import AddTableSlots from "../components/seller/AddTableSlots";
import {
  PrivateRoute,
  SellerPrivateRoute,
  AdminPrivateRoute,
} from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import BookingCancel from "../components/layouts/BookingCancel";
import RestaurantImagesListed from "../components/user/shared/RestaurantImageListed";

const HomePage = React.lazy(() => import("../pages/user/Home"));
const DashBoard = React.lazy(() => import("../components/admin/DashBoard"));
const RestaurantMangement = React.lazy(
  () => import("../components/admin/RestaurantManagement")
);
const Customers = React.lazy(
  () => import("../components/admin/UserManagement")
);

const AppRouter: React.FC = () => {
  const resetPassword = localStorageGetItem("&reset%pas%%");

  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            {" "}
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        }
      >
        <Routes>
          {/* !------> USER AUTH ROUTES <------! */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Route>

         {/* !------> USER ROUTES <------! */}
          <Route path="/" element={<HomePage />}>
            <Route index element={<HomeLayout />} />
            <Route
              path="/restaurant-view/:restaurantId"
              element={<RestaurantViewDetails />}
          />

          {/* !------> PRIVATE ROUTE <------! */}

          <Route element={<PrivateRoute />}>
            <Route path="account" element={<UserProfile />} />
            <Route
              path="/reserve-table"
              element={<ReserveTableConfirmation />}
            />
            <Route path="success" element={<BookingSuccess />} />
          </Route>
          </Route>
          <Route
            path="/reset-password"
            element={<ForgotPasswordPageRecieveEmail />}
          />
          <Route
            path="/reset-password/fps/:id"
            element={resetPassword ? <ForgotPassword /> : <Navigate to="*" />}
          />
          <Route path="/cancel" element={<BookingCancel />} />
          <Route path="*" element={<PageNotFound />} />

          {/** <------ USER ROUTES END -----> */}

          {/* <------ ADMIN AUTH ROUTES  ----->  */}
          <Route element={<PublicRoute />}>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>
          {/* <------ ADMIN AUTH ROUTES END ----->  */}

          {/* <------ ADMIN ROUTES  ----->  */}
          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin/" element={<AdminLayout />}>
              <Route index element={<DashBoard />} />
              <Route path="/admin/customers" element={<Customers />} />
              <Route
                path="/admin/restaurants"
                element={<RestaurantMangement />}
              />
              <Route
                path="/admin/new-registerations"
                element={<NewRestaurants />}
              />
              <Route
                path="/admin/restaurant-approval/:id"
                element={<RestaurantApprovalForm />}
              />
            </Route>
          </Route>
         {/* <------ ADMIN ROUTES END  ----->  */}

         {/* <------ SELLER AUTH ROUTES  ----->  */}
          <Route element={<PublicRoute />}>
            <Route path="/restaurant/login" element={<SellerLoginPage />} />
            <Route
              path="/restaurant/registeration"
              element={<SellerRegisterationPage />}
            />
          </Route>
          {/* <------ SELLER AUTH ROUTES END  ----->  */}

          {/* <------ SELLER ROUTES  ----->  */}
          <Route element={<SellerPrivateRoute />}>
            <Route path="/restaurant/" element={<SellerHome />}>
              <Route index element={<SellerDashBoard />} />
              <Route
                path="/restaurant/reservations"
                element={<Reservation />}
              />
              <Route path="/restaurant/table" element={<Table />} />
              <Route path="/restaurant/time-slots" element={<TimeSlots />} />
              <Route path="/restaurant/menu" element={<Menu />} />
              <Route path="/restaurant/order-history" element={<Orders />} />
              <Route
                path="/restaurant/restaurant-details"
                element={<RestaurantDetails />}
              />
              <Route
                path="/restaurant/view-table/:tableId"
                element={<AddTableSlots />}
              />
            </Route>
          </Route>
          {/* <------ SELLER ROUTES END  ----->  */}

          
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
