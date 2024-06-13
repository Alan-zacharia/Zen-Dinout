import React from 'react'
import { Logout } from '../../services/api'
import { useQueryClient } from 'react-query';
import { localStorageRemoveItem } from '../../utils/localStorageImpl';

const SignOutButton : React.FC = () => {
    const queryClient = useQueryClient();
    const handleClick = ()=>{
        Logout().then((res)=>{
            localStorageRemoveItem("%%register%%");
            queryClient.invalidateQueries('validateToken');
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <button onClick={handleClick} className='text-white mx-5 px-3 p-[6px] font-bold bg-red-500 hover:bg-red-700'>
      Logout
    </button>
  )
}

export default SignOutButton
