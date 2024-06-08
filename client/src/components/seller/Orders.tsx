import React from 'react'

const Orders = () => {
  return (
    <div className='h-screen pt-32 '>
       <div className='p-5'>
        <h1 className='text-2xl font-bold text-green-500'>Orders List</h1>
      
      <div className="overflow-x-auto shadow-sm shadow-green-200  mt-14">
            <table className="table">
              <thead >
                <tr className="font-bold text-sm text-green-500">
                  <th>SL NO</th>
                  <th>Date</th>
                  <th>Order No</th>
                  <th>Table NO </th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody >
                <tr className=" border-green-500 font-semibold text-gray-500 text-base">
                  <td>.1</td>
                  <td>T1</td>
                  <td>4</td>
                  <td>In</td>
                  <td>In</td>
                  <td>In</td>
                  <th>
                    <button className="btn btn-primary btn-sm text-white">view</button>
                  </th>
                </tr>
              
              </tbody>
            </table>
          </div>
          </div>
    </div>
  )
}

export default Orders
