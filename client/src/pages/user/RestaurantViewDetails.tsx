import React from 'react';
import RestaurantViewComponent from "../../components/user/RestaurantViewComponent";
import RestaurantReview from '../../components/user/shared/RestaurantReview';
import RestauarantAbout from '../../components/user/shared/RestauarantAbout';

const RestaurantViewDetails : React.FC = () => {
  return (
    <>
    <div className='h-full pt-14  flex  overflow-x-hidden'>
       <RestaurantViewComponent/>
    </div>
    <div className='flex flex-col gap-3'>
       <RestauarantAbout/>
       <RestaurantReview/>
    </div>
    </>
  )
}

export default RestaurantViewDetails
