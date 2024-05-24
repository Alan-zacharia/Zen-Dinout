import React from 'react'

const RecentRestaurants : React.FC = () => {
    const user = [
        {
        id: 1,
        name: "Sea food",
        email: "dummyuser@example.com",
      },
        
        {
        id: 1,
        name: "Sea food",
        email: "dummyuser@example.com",
      },
        
        {
        id: 1,
        name: "Sea food",
        email: "dummyuser@example.com",
      },
        
        {
        id: 1,
        name: "Sea food",
        email: "dummyuser@example.com",
      },
        
    ]
  return (
    <div className='bg-white px-4 pt-3 pb-4 rounded-sm flex-1 border-gray-200'>
      <strong className='text-gray-700 font-medium'>Recent Restaurants</strong>
      <div className='mt-3'>
       <table className='w-full text-gray-700'>
        <thead>
            <tr>
                <td>ID</td>
                <td>Restaurant name</td>
                <td>email</td>
                <td>view</td>
            </tr>
        </thead>
        <tbody>
        {user.map((user)=>(
        <tr key={user.id}>
           <td>{user.id}</td>
           <td>{user.name}</td>
           <td>{user.email}</td>
           <td>view</td>
        </tr>
        ))}
        </tbody>
       </table>
      </div>
     
    </div>
  )
}

export default  RecentRestaurants;
