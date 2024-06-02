import React from "react";

const RestaurantDetails = () => {
  return (
    <div className="h-full pt-7 mt-32  mx-auto">
      <div className="flex justify-center pb-10">
        <div className="w-full md:w-[800px] bg-white shadow-lg shadow-red-200 rounded-lg pb-10">
          <h1 className="p-5 text-2xl font-bold text-center flex px-16 ">Restaurant Details</h1>
          <form className="px-4 md:px-10 lg:px-16 font-semibold">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block ">Restaurant name</label>
                <input
                  type="text"
                  placeholder="Restaurant name"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
              </div>
              <div>
                <label className="block">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
              </div>
              <div>
                <label className="block">Contact</label>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
              </div>
              <div>
                <label className="block">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
              </div>
            </div>
            <div className="pt-5">
              <label className="block">Description</label>
              <input
                type="text"
                placeholder="Description"
                className="input input-bordered input-warning w-full max-w-[720px]"
              />
            </div>
            <div className="pt-5">
              <label className="block">Location</label>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered input-warning w-full max-w-xs"
                />
                <div className="w-full md:w-[300px] h-40 bg-black"></div>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-5">
              <label>Select time:</label>
              <div className="flex gap-2">
                <label className="form-control max-w-xs">
                  <span className="label-text">Opening time</span>
                  <input
                    type="time"
                    className="input input-bordered input-error h-10"
                  />
                </label>
                <label className="form-control max-w-xs">
                  <span className="label-text">Closing time</span>
                  <input
                    type="time"
                    className="input input-bordered input-error h-10"
                  />
                </label>
              </div>
            </div>
            <div className="pt-5">
              <label className="block pb-2">Table rate</label>
              <input
                type="text"
                placeholder="399"
                className="input input-bordered input-warning w-44 max-w-xs"
              />
            </div>
            <div className="pt-5 pb-5">
              <label>Featured image</label>
              <br />
              
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-accent w-full max-w-xs mt-3"
                />
            </div>
            <div className="pt-5 pb-5">
              <label>Secondary images</label>
              <br />
              
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-accent w-full max-w-xs mt-3"
                />
            </div>
            
            <div className="flex justify-center">
              <button className="btn btn-outline btn-success">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
