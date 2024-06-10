import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import getLocations from "../../../services/getPlaceApi";
import classNames from "classnames";


const NavLeftSide = () => {
  const [suggestion, setSuggestions] = useState([]);
  const [searchItem, setSearchItem] = useState<string>("");

  const handleLocationSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchedTerm = e.target.value;
    setSearchItem(searchedTerm);
    const data = await getLocations(searchedTerm);
    setSuggestions(data);
  };
  const handleInput = (suggestion : any)=>{
    setSearchItem(suggestion.place_name);
    setSuggestions([])
  }

  return (
    <div className="lg:flex items-center text-[14px] px-10 flex flex-col relative">
     <input type="text" className="px-2 w-[200px] outline-none border border-black"
     onChange={handleLocationSearch} 
     value={searchItem} 
     placeholder="Location......."/>
    <FaLocationDot size={23} className="absolute right-12 top-2"/>
     {suggestion &&  (
     <ul className={classNames( suggestion.length > 1 ? "bg-white absolute w-[200px] top-12 overflow-x-auto h-52" : "" ) } >      
      {suggestion.map((suggestion : any , index : number)=>(
         <li key={index}
         className="px-4 py-3 cursor-pointer hover:bg-blue-200"
         onClick={()=> handleInput(suggestion)}
         >
          {suggestion.place_name}
         </li>     
     ))}
    </ul>
    )}
    </div>
  );
};

export default NavLeftSide;
