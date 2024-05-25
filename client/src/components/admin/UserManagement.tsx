// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Customer: React.FC = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {  
    axios
      .get("http://localhost:3000/admin/users-list")
      .then((res) => {
        setUser(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      }); 
  }, [user]);


//   const blockUser = (id : string , block:boolean) => {
//     axios.put(`http://localhost:4000/admin/user-actions/${id}/${block}`).then((response)=>{
//      setUser((prevUser : any)=>
//       prevUser.map((u:any)=>
//         u._id == id ? {...u , isBlocked : !u.isBlocked} : u
//       )
//       )
//     }).catch((err)=>{
//         console.log(err)
//     })
//   };
   

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex">
        <h1 className="text-3xl font-bold">User Mangement</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            
            <tr className="border-b">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-left p-3 px-5">Role</th>
              <th className="text-left p-3 px-5">Phone</th>
              <th className="text-left p-3 px-5 flex justify-end">Status</th>
              <th></th>
            </tr>
            {user && user.length > 0 ? (

              user.map((user: any) => {
                return (
                  <tr className="border-b hover:bg-orange-100 bg-gray-100">
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        value={user.username}
                        className="bg-transparent border-none focus:outline-none"
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        className="bg-transparent border-none focus:outline-none"
                        value={user.email}
                      />
                    </td>

                    <td className="p-3 px-5">
                      <select value="user.role" className="bg-transparent">
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="p-3 px-6">nill</td>
                    <td className="p-3 px-5 flex justify-end">
                    
                    </td>
                  </tr>
                );
              })):(
                <tr className="border-b hover:bg-red-400 bg-gray-100">
                <td colSpan={5} className="p-3 text-center text-black font-bold text-2xl">
                  Users not found
                </td>
              </tr>
              )}
             
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
