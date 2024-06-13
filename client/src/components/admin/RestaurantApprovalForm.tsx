import axios from 'axios';
import React, { useEffect ,  useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {toast , Toaster} from "react-hot-toast";
const RestaurantApprovalForm = () => {
  const navigate = useNavigate();
  const [restaurantDetails , setRestautrantDetails] = useState<{restaurantName : string ; email :string ; contact : string}>();
  const { id } = useParams();
  useEffect(()=>{
  const fetchData = async()=>{
     await axios.get(`http://localhost:3000/admin/restaurant-approval/${id}`).then((res)=>{
      console.log(res.data)
      setRestautrantDetails(res.data.restaurants);
     }).catch((error)=>{ 
      console.log(error); 
     })
  }
  fetchData();
  },[])
  const handleApprove = async()=>{
     await axios.put(`http://localhost:3000/admin/restaurant-approval/${id}`).then((response)=>{
       toast.success("Approved successfull");
      setTimeout(()=>{
        navigate('/admin/restaurants');
      },2000)
     }).catch((error)=>{
      console.log(error);  
     })
  }
  return (
    <div className='flex p-20 items-center h-full'>
      <Toaster position='top-center'/>
      <div className='w-full max-w-[900px] bg-white shadow-2xl shadow-neutral-500 rounded-3xl flex flex-col lg:flex-row lg:p-10 justify-between'>
        {restaurantDetails && (
        <div className='flex flex-col gap-5 '>
          <p className='text-base font-semibold text-black '>Restaurant Name&ensp;: <span className='text-blue-500'>{restaurantDetails.restaurantName}</span></p>
          <p className='text-base font-semibold text-black '>Email Address&ensp;&ensp;&ensp;&ensp;:  <span className='text-blue-500'>{restaurantDetails.email}</span></p>
          <p className='text-base font-semibold text-black '>Contact number&ensp;&ensp;: <span className='text-blue-500'>{restaurantDetails.contact}</span></p>
        </div>

        )}
   
        <div className='flex flex-col items-center  gap-5'>
          <button className='text-white bg-green-500 p-2 rounded-full px-10 font-bold text-base hover:bg-green-600 mb-5 lg:mb-0' onClick={handleApprove}>Approve</button>
          <div className="w-full lg:w-[400px] bg-black/60 h-[1px] my-5 lg:my-0"></div>
          <textarea className='bg-rose-200 w-full lg:w-[400px] h-[200px] mb-5 outline-none p-5 text-black font-semibold lg:mb-0 rounded-3xl placeholder:text-black' placeholder='Reason for rejecting ?'/>
          <button className='text-white bg-red-500 p-2 rounded-full px-10 font-bold text-base  hover:bg-red-700'>Reject</button>
        </div>
      </div>
    </div>
  )
}

export default RestaurantApprovalForm
