import { MdDateRange  ,MdOutlineRestaurant, MdTableRestaurant , MdDashboard  } from "react-icons/md";
import { LuTimer } from "react-icons/lu";
import { BiFoodMenu } from "react-icons/bi";
import { BsFillBoxSeamFill } from "react-icons/bs";


export const SELLER_SIDEBAR_LINKS = [
    {
        keys: "dashboard",
        label: "Dashboard",
        path: "/restaurant/",
        icon: <MdDashboard size={27}/>
      },
    {
        keys: "reservations",
        label: "Reservations",
        path: "/restaurant/reservations",
        icon: <MdDateRange size={27} />
      },
    {
        keys: "table",
        label: "Tables",
        path: "/restaurant/table",
        icon: <MdTableRestaurant size={27}/>
      },
    {
        keys: "time",
        label: "Time slots",
        path: "/restaurant/time-slots",
        icon: <LuTimer size={27}/>
      },
    {
        keys: "menu",
        label: "Menu",
        path: "/restaurant/menu",
        icon: <BiFoodMenu size={27}/>
      },
    {
        keys: "orders",
        label: "Orders",
        path: "/restaurant/order-history",
        icon: <BsFillBoxSeamFill size={27}/>
      },
    {
        keys: "restaurant",
        label: "Restaurant",
        path: "/restaurant/restaurant-details",
        icon: <MdOutlineRestaurant size={27}/>
      },
]