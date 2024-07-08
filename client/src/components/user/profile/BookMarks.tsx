import React,{useState} from 'react';

const BookMarks : React.FC = () => {
    const [bookmarks , setBookMarks] = useState<string[]>([])
  return (
    <div className="p-8 flex flex-col gap-4">
     {bookmarks.length === 0 ? (
       <p className="text-gray-500 font-bold">No saved Restaurants.</p>
     ):(
        bookmarks.map((booking) =>(
            <div  className="bg-black w-full h-28 rounded-lg">
        
            </div>
        ))
    )}
    </div>
  )
};

export default BookMarks;
