import React from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../services/adminApiClient';
import { useDispatch } from "react-redux";
import { clearUser } from '../../../redux/user/userSlice';
import logout from '../../../utils/Logout';




const LogoutButton : React.FC = ()=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function hanldeLogin() {
      dispatch(clearUser());
      logout("admin logout")
      adminLogout().then(()=>{
            queryClient.invalidateQueries("validateAToken");
      }).catch((error)=>{
console.log(error)
        })
        navigate("/admin/login");
      }
    return (
        <button
        onClick={hanldeLogin}
        className="text-black font-semibold hover:font-bold"
      >
        Log Out
      </button>
    )
}

export default LogoutButton;