import { HiOutlineCog, HiOutlineQuestionMarkCircle, HiOutlineUsers } from 'react-icons/hi';
import { MdTableRestaurant , MdDashboard } from "react-icons/md";
import { SiImessage } from "react-icons/si";



export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin/",
    icon: <MdDashboard />
  },
  {
    key: "customers",
    label: "Customers",
    path: "/admin/customers",
    icon: <HiOutlineUsers />
  },
  {
    key: "restaurants",
    label: "Restaurants",
    path: "/admin/restaurants",
    icon: <MdTableRestaurant />
  },
  
  {
    key: "registerations",
    label: "New Registerations",
    path: "/admin/new-registerations",
    icon: <MdTableRestaurant />
  },
  {
    key: "messages",
    label: "messages",
    path: "/admin/messages",
    icon: <SiImessage />
  },
  
]


 export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
      key: "settings",
      label: "Settings",
      path: "/admin/settings",
      icon: <HiOutlineCog/>,
    },
    {
      key: "support",
      label: "Support",
      icon: <HiOutlineQuestionMarkCircle/>,
      path: "/admin/support",
    },
  ];
  