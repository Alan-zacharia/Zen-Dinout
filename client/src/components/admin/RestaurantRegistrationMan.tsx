import React from 'react'

const NewRestaurants : React.FC = () => {
  return (
    <div className="text-gray-900 bg-gray-200">
    <div className="p-4 flex">
        <h1 className="text-3xl font-bold">
           New Restaurants
        </h1>
    </div>
    <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
                <tr className="border-b">
                    <th className="text-left p-3 px-5">Restaurant-name</th>
                    <th className="text-left p-3 px-5">Address</th>
                    <th className="text-left p-3 px-5">Email</th>
                    <th className="text-left p-3 px-5 flex justify-end">Action</th>
                    <th></th>
                </tr>
                <tr className="border-b hover:bg-blue-200 bg-gray-100">
                    <td className="p-3 px-5"><input type="text" value="user.name" className="bg-transparent"/></td>
                    <td className="p-3 px-5"><input type="text" value="user.adress" className="bg-transparent"/></td>
                    <td className="p-3 px-5"><input type="text" value="user.email" className="bg-transparent"/></td>
                    
                    <td className="p-3 px-5 flex justify-end font-bold"><button type="button" className="text-sm bg-green-600 hover:bg-green-400 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">View</button></td>
                </tr>
                
            </tbody>
        </table>
    </div>
</div>
  )
}

export default NewRestaurants;
