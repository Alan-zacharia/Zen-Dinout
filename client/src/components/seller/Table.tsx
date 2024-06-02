import React from 'react'

const Table = () => {
  return (
    <div className='h-full mt-32 '>
     <div className="pt-10 ">
        <h1 className="text-xl font-bold ">Table Management</h1>
      </div>
      <div className="overflow-x-auto shadow-sm shadow-orange-200  mt-14">
            <table className="table">
              <thead >
                <tr className="font-bold text-sm text-red-500">
                  <th>SL NO</th>
                  <th>Table No</th>
                  <th>Capacity</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody >
                <tr className=" border-red-500 font-semibold text-gray-500 text-base">
                  <td>.1</td>
                  <td>T1</td>
                  <td>4</td>
                  <td>In</td>
                  <th>
                    <button className="btn btn-primary btn-sm text-white">view</button>
                  </th>
                </tr>
              
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default Table
