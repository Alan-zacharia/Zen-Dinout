import React from 'react';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import Button from '../../layouts/Button';


interface  propsTypes {
    title: string;
    image : string;
    price:string;
}

const TableCards : React.FC<propsTypes> = (props ) => {
  return (
    <div className='w-full lg:w-1/4 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg'> 
        <img className='rounded-xl' src={props.image} alt="img" />
      <div className='space-y-3'>
        <h3 className='font-semibold text-center text-xl pt-6'>{props.title}</h3>
        <div className='flex flex-row justify-center'>
            <BsStarFill className='text-orange-600'/>
            <BsStarFill className='text-orange-600'/>
            <BsStarFill className='text-orange-600'/>
            <BsStarFill className='text-orange-600'/>
            <BsStarHalf className='text-orange-600'/>
        </div>
        <div className='flex flex-row items-center justify-center gap-4'>
            <h3 className='text-lg font-semibold'>{props.price}</h3>
            <Button title='Buy'/>
        </div>
      </div>
    </div>
  )
}

export default  TableCards
