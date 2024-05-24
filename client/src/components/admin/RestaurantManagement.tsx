import React from 'react'

const RestaurantMangement : React.FC = () => {
  return (
    <div className="text-gray-900 bg-gray-200">
    <div className="p-4 flex">
        <h1 className="text-3xl font-bold">
            Restaurant Mangement
        </h1>
    </div>
    <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
                <tr className="border-b">
                    <th className="text-left p-3 px-5">Restaurant-name</th>
                    <th className="text-left p-3 px-5">Email</th>
                    <th className="text-left p-3 px-5">Status</th>
                    <th className="text-left p-3 px-5 ">Restrict</th>
                    <th className="text-left p-3 px-5 flex justify-end"></th>
                    <th></th>
                </tr>
                <tr className="border-b hover:bg-green-200 bg-gray-100">
                    <td className="p-3 px-5"><input type="text" value="user.name" className="bg-transparent"/></td>
                    <td className="p-3 px-5"><input type="text" value="user.email" className="bg-transparent"/></td>
                    <td className="p-3 px-5">
                        <select value="user.role" className="bg-transparent">
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </td>
                    <td className="p-3 px-5"><button type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button></td>
                    <td className="p-3 px-5 flex justify-end font-bold"><button type="button" className="text-sm  hover:text-black text-gray-600 py-1 px-2 rounded focus:outline-none focus:shadow-outline">Show Details</button></td>
                </tr>
                
            </tbody>
        </table>
    </div>
</div>
  )
}

export default RestaurantMangement;
