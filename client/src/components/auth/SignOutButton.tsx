import React from 'react'
import { Logout } from '../../services/api'


import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { localStorageRemoveItem } from '../../utils/localStorageImpl';
const SignOutButton : React.FC = () => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        Logout().then((res)=>{
            localStorageRemoveItem("%%register%%");
            // queryClient.invalidateQueries('validateToken');
        }).catch((err)=>{
            console.log(err)
        })
        toast.success("User Logout successfully");
        navigate("/login")
    }
  return (
    <button onClick={handleClick} className='text-white mx-5 px-3 p-[6px] font-bold bg-red-500 hover:bg-red-700'>
      Logout
    </button>
  )
}

export default SignOutButton
