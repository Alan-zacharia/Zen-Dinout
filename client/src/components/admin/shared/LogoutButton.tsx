import React from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../services/adminApiClient';




const LogoutButton : React.FC = ()=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    function hanldeLogin() {
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