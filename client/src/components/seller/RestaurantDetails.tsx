import { useFormik } from "formik";
import React, { ChangeEvent, useEffect, useRef, useState  } from "react";

import PreviewImage from "../layouts/PreviewImage";
import { imageCloudUpload } from "../../services/SellerApiClient";
import useSellerRefisteration from "../../hooks/useSellerRefisteration";
import { sellerRegiseterationValidation } from "../../utils/validations";
import GoogleMap from "../GoogleMap";
import getLocations from "../../services/getPlaceApi";
import { CiCircleRemove } from "react-icons/ci";
import axios from "axios";

const RestaurantDetails = () => {
  const [restaurantDetails, setRestaurantDetails] = useState<{email : string ; contact : string ; restaurantName : string}>({email:"" , contact : "" , restaurantName : ""});
  useEffect(()=>{
    const fetchData = async()=>{
      await axios.get("http://localhost:3000/restaurant/restaurant-details").then((res)=>{
        setRestaurantDetails(res.data.restaurantDetails);
      }).catch((error)=>{
        console.log(error)   
      })
    }
    fetchData()
  },[]);

  const [suggestion, setSuggestions] = useState([]);
  const [lat, setLat] = useState(10.0);
  const [lng, setLng] = useState(76.5);
  const [location, setLocation] = useState("");
  const { error, loading, registerFn } = useSellerRefisteration();
  const formik = useFormik({
    initialValues: {
      restaurantName: "",
      email: "",
      contact: "",
      address: "",
      description: "",
      openingTime: "",
      location: "",
      closingTime: "",
      TableRate: "",
      featuredImage: "",
      secondaryImages: "",
    },
    validationSchema: sellerRegiseterationValidation,
    onSubmit: async (data) => {
      await imageCloudUpload(data.featuredImage).then((res) => {
        data.featuredImage = res;
      });
      await imageCloudUpload(data.secondaryImages).then((res) => {
        data.secondaryImages = res;
      });
      registerFn(data);
    },
  });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    const data = await getLocations(e.target.value);
    setSuggestions(data);
  };
  const handleSuggestions = async (suggestion: any) => {
    const lat = suggestion.center[1];
    const lng = suggestion.center[0];
    const search = suggestion.place_name.split(",")[0];
    setLat(lat);
    setLng(lng);
    setLocation(search);
    formik.setFieldValue("location", search);
    setSuggestions([]);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputFeaturedRef = useRef<HTMLInputElement>(null); 

  const handleRemoveImage = () => {
    formik.setFieldValue("secondaryImages", null); 
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }
    
  const handleRemoveFeaturedImage = () => {
    formik.setFieldValue("featuredImage", null);  
    if (fileInputFeaturedRef.current) {
      fileInputFeaturedRef.current.value = '';
    }
  }

  return (
    <div className="h-full pt-7 mt-32  mx-auto">
      <div className="flex justify-center pb-10">
        <div className="w-full md:w-[800px] bg-white shadow-lg shadow-red-200 rounded-lg pb-10">
          <h1 className="p-5 text-2xl font-bold text-center flex px-16 ">
            Restaurant Details
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="px-4 md:px-10 lg:px-16 font-semibold"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block ">Restaurant name</label>
                <input
                  type="text"
                  placeholder="Restaurant name"
                  className="input input-bordered input-warning w-full max-w-xs"
                  {...formik.getFieldProps("restaurantName")}
                  value={restaurantDetails.restaurantName}
                />
                {formik.touched.restaurantName &&
                  formik.errors.restaurantName && (
                    <div className="text-red-500 text-sm pt-2">
                      {formik.errors.restaurantName}
                    </div>
                  )}
              </div>
              <div>
                <label className="block">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered input-warning w-full max-w-xs"
                  {...formik.getFieldProps("email")}
                  value={restaurantDetails.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm pt-2">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div>
                <label className="block">Contact</label>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="input input-bordered input-warning w-full max-w-xs"
                  {...formik.getFieldProps("contact")}
                  value={restaurantDetails.contact}
                />
                {formik.touched.contact && formik.errors.contact && (
                  <div className="text-red-500 text-sm pt-2">
                    {formik.errors.contact}
                  </div>
                )}
              </div>
              <div>
                <label className="block">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered input-warning w-full max-w-xs"
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-red-500 text-sm pt-2">
                    {formik.errors.address}
                  </div>
                )}
              </div>
            </div>
            <div className="pt-5">
              <label className="block">Description</label>
              <input
                type="text"
                placeholder="Description"
                className="input input-bordered input-warning w-full max-w-[720px]"
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm pt-2">
                  {formik.errors.description}
                </div>
              )}
            </div>
            <div className="pt-5">
              <label className="block">Location</label>
              <div className="flex flex-col md:flex-row gap-5 pt-2 items-center">
                <div className="flex flex-col lg:w-[500px] w-[300px]">
                  <input
                    type="text"
                    value={location}
                    placeholder="Location"
                    className="input input-bordered input-warning w-[300px] max-w-sm lg:max-w-[500px]"
                    onChange={handleChange}
                  />
                  {formik.touched.location && formik.errors.location && (
                    <div className="text-red-500 text-sm pt-2">
                      {formik.errors.location}
                    </div>
                  )}
                  {suggestion && (
                    <ul className=" w-[300px] mt-2 overflow-x-auto h-32 bg-white">
                      {suggestion?.map((suggestion: any, index) => (
                        <li
                          key={index}
                          className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSuggestions(suggestion)}
                        >
                          {suggestion.place_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <GoogleMap latitude={lat} longitude={lng} />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-5">
              <label>Select time:</label>
              <div className="flex gap-2 lg:gap-6">
                <label className="form-control max-w-xs">
                  <span className="label-text">Opening time</span>
                  <input
                    type="time"
                    className="input input-bordered input-error h-10"
                    {...formik.getFieldProps("openingTime")}
                  />
                  {formik.touched.openingTime && formik.errors.openingTime && (
                    <div className="text-red-500 text-sm pt-2">
                      {formik.errors.openingTime}
                    </div>
                  )}
                </label>
                <label className="form-control max-w-xs">
                  <span className="label-text">Closing time</span>
                  <input
                    type="time"
                    className="input input-bordered input-error h-10 pt-2"
                    {...formik.getFieldProps("closingTime")}
                  />
                  {formik.touched.closingTime && formik.errors.closingTime && (
                    <div className="text-red-500 text-sm pt-2">
                      {formik.errors.closingTime}
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="pt-5">
              <label className="block pb-2">Table rate</label>
              <input
                type="text"
                placeholder="399"
                className="input input-bordered input-warning w-44 max-w-xs"
                {...formik.getFieldProps("TableRate")}
              />
              {formik.touched.TableRate && formik.errors.TableRate && (
                <div className="text-red-500 text-sm pt-2">
                  {formik.errors.TableRate}
                </div>
              )}
            </div>
            <div className="pt-5 pb-5 relative">
              <label>Featured image</label>
              <br />
              {formik.values.featuredImage && !formik.errors.featuredImage && (
                <>
                <PreviewImage file={formik.values.featuredImage} />
                <div className="absolute top-8 left-[285px]">
                <button onClick={handleRemoveFeaturedImage}>
                  <CiCircleRemove
                    size={25}
                    className="text-white bg-red-500 rounded-2xl"
                  />
                </button>
              </div>
                </>
              )}

              <input
               ref={fileInputFeaturedRef} 
                type="file"
                name="featuredImage"
                className="file-input file-input-bordered file-input-accent w-full max-w-xs mt-3"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  formik.setFieldValue("featuredImage", e.target.files?.[0])
                }
              />
              {formik.touched.featuredImage && formik.errors.featuredImage && (
                <div className="text-red-500 text-sm pt-2">
                  {formik.errors.featuredImage}
                </div>
              )}
            </div>
            <div className="pt-5 pb-5 relative">
              <label>Secondary image</label>
              <br />
              {formik.values.secondaryImages &&
                !formik.errors.secondaryImages && (
                  <>
                  <PreviewImage file={formik.values.secondaryImages} />
                  <div className="absolute top-8 left-[285px]">
                  <button onClick={handleRemoveImage}>
                  <CiCircleRemove
                    size={25}
                    className="text-white bg-red-500 rounded-2xl"
                  />
                </button>
              </div>
              </>
                )}
              <input
               ref={fileInputRef}
                type="file"
                className="file-input file-input-bordered file-input-accent w-full max-w-xs mt-3"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue("secondaryImages", e.target.files?.[0]);
                }}
              />
              
              {formik.touched.secondaryImages &&
                formik.errors.secondaryImages && (
                  <div className="text-red-500 pt-2 text-sm">
                    {formik.errors.secondaryImages}
                  </div>
                )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-outline btn-success"
                disabled={loading}
              >
                {loading ? "Loading" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
