import React from 'react'
import SellerLogin from '../../components/auth/SellerLogin';

const SellerLoginPage : React.FC = () => {
  return (
    <div className='h-screen ' >
        <div 
        className="absolute inset-0 bg-cover bg-center " 
        style={{backgroundImage: `url("https://www.mashed.com/img/gallery/the-ingenious-ways-servers-get-customers-to-leave-restaurants/l-intro-1659547036.jpg")`}}
      ></div>
    <SellerLogin/>
  </div>
  )
}

export default SellerLoginPage
