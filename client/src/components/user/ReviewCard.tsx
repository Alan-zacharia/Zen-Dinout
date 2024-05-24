import React from 'react'
import ReviewCard from './layouts/ReviewCard'
import Image from "../../assets/Login-image.jpg";
const Reviews : React.FC = () => {
  return (
    <div className=' flex flex-col items-center justify-center md:px-32 px-5 '>
        <h1 className='font-semibold text-4xl text-center lg:pt-16 pt-24 pb-10'>Reviews</h1>
        <div className='flex flex-col md:flex-row md:pl-28 lg:pl-0 gap-8 lg:w-3/4  mt-5'> 
            <ReviewCard image={Image} name='hjasgdjg'/>
            <ReviewCard image={Image} name='hjasgdjg'/>
            <ReviewCard image={Image} name='hjasgdjg'/>
        </div>
    </div>
  )
}

export default Reviews
