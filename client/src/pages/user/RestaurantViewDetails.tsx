import React , {useState} from 'react';
import {useParams} from 'react-router-dom';
import RestaurantViewComponent from "../../components/user/RestaurantViewComponent";
import RestaurantReview from '../../components/user/shared/RestaurantReview';
import RestauarantAbout from '../../components/user/shared/RestauarantAbout';
import RestaurantImagesListed from '../../components/user/shared/RestaurantImageListed';
import ResturantDetailedSelecting from '../../components/user/shared/ResturantDetailedSelecting';

const RestaurantViewDetails : React.FC = () => {
  const {restaurantId} = useParams()
  console.log(restaurantId) 
  const [selectedTab , setSelectedTab] = useState<string>("Overview");
  const handleTabSelect = (tabName : string)=>{
    setSelectedTab(tabName)
  }
  return (
    <>
    <div className='h-full pt-14  flex  overflow-x-hidden'>
       <RestaurantViewComponent/>
    </div>
    <div className='flex flex-col mx-6 gap-10 pb-20'>
    <ResturantDetailedSelecting onSelectTab={handleTabSelect}/> 
      {selectedTab === "Overview"  && 
      <>
       <RestauarantAbout/>
       <RestaurantReview/>
       </>
       }
      {selectedTab === "Photos" && <RestaurantImagesListed restaurantId={restaurantId}/>}
      {selectedTab === "Reviews" && <RestaurantReview/>}
    </div>
    </>
  )
}

export default RestaurantViewDetails
