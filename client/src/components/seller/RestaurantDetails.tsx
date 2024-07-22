import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { toast, Toaster } from "react-hot-toast";
import PreviewImage from "../layouts/PreviewImage";
import SecondaryImages from "../layouts/SecondaryImages";
import { imageCloudUpload } from "../../services/SellerApiClient";
import useSellerRegisteration from "../../hooks/useSellerRegisteration";
import { sellerRegiseterationValidation } from "../../utils/validations";
import GoogleMap from "../GoogleMap";
import axios from "../../api/axios";
import { CiCircleRemove } from "react-icons/ci";
import getLocations from "../../services/getPlaceApi";
import { RestaurantType } from "../../types/restaurantTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const convertToLocalTime = (utcDateTime : string) => {
  const date = new Date(utcDateTime);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
};
const RestaurantDetails = () => {
  const { isAuthenticated, role, id } = useSelector(
    (state: RootState) => state.user
  );
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantType>({
    email: "",
    contact: "",
    restaurantName: "",
    address: "",
    description: "",
    location: {
      type: "",
      coordinates: [0, 0],
    },
    closingTime: "",
    openingTime: "",
    TableRate: "",
    secondaryImages: "",
    featuredImage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated && role == "seller") {
          const res = await axios.get(`/restaurant/restaurant-details/${id}`);
          if (res.data.restaurantDetails) {
            res.data.restaurantDetails.openingTime = convertToLocalTime(res.data.restaurantDetails.openingTime)
            res.data.restaurantDetails.closingTime = convertToLocalTime(res.data.restaurantDetails.closingTime)
            setRestaurantDetails(res.data.restaurantDetails);
            formik.setValues({
              ...formik.values,
              email: res.data.restaurantDetails.email,
              contact: res.data.restaurantDetails.contact,
              restaurantName: res.data.restaurantDetails.restaurantName,
              address: res.data.restaurantDetails.address,
              description: res.data.restaurantDetails.description,
              TableRate: res.data.restaurantDetails.TableRate,
              openingTime:convertToLocalTime(res.data.restaurantDetails.openingTime),
              closingTime:convertToLocalTime(res.data.restaurantDetails.closingTime),
              featuredImage: res.data.restaurantDetails.featuredImage,
              secondaryImages: res.data.restaurantDetails.secondaryImages,
              location: {
                type: res.data.restaurantDetails.location.type,
                coordinates: res.data.restaurantDetails.location.coordinates,
              },
              place_name: res.data.restaurantDetails.place_name,
            });
            setLat(res.data.restaurantDetails.location.coordinates[1]);
            setLng(res.data.restaurantDetails.location.coordinates[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchData();
  }, []);
  console.log(restaurantDetails.openingTime)
  const [suggestion, setSuggestions] = useState<any[]>([]);
  const [lat, setLat] = useState<number>(10.0);
  const [lng, setLng] = useState<number>(76.5);
  const [location, setLocation] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [secondaryImage, setSecondaryImage] = useState<File | null>(null);
  const { error, registerFn } = useSellerRegisteration();
  const [loadings, setLoadings] = useState(false);
  console.log(restaurantDetails.openingTime)
  const formik = useFormik({
    initialValues: {
      restaurantName: restaurantDetails.restaurantName,
      email: restaurantDetails.email,
      contact: restaurantDetails.contact,
      address: restaurantDetails.address,
      description: restaurantDetails.description,
      openingTime: restaurantDetails.openingTime,
      closingTime: restaurantDetails.closingTime,
      TableRate: restaurantDetails.TableRate,
      location: {
        type: restaurantDetails.location.type,
        coordinates: restaurantDetails.location.coordinates,
      },
      featuredImage: "",
      secondaryImages: "",
      place_name: "",
    },
    validationSchema: sellerRegiseterationValidation,
    onSubmit: async (data) => {
      data.openingTime = restaurantDetails.openingTime
      data.closingTime = restaurantDetails.closingTime
      console.log(data.openingTime , data.closingTime)  
      const today = new Date();
      const startTimeParts = data.openingTime.split(":");
      const endTimeParts = data.closingTime.split(":");
      today.setHours(parseInt(startTimeParts[0], 10));
      today.setMinutes(parseInt(startTimeParts[1], 10));
      data.openingTime = today.toISOString();
      today.setHours(parseInt(endTimeParts[0], 10));
      today.setMinutes(parseInt(endTimeParts[1], 10));
      data.closingTime = today.toISOString();
      try {
        setLoadings(true);
        await imageCloudUpload(data.featuredImage).then((res) => {
          data.featuredImage = res;
        });
        await imageCloudUpload(data.secondaryImages).then((res) => {
          data.secondaryImages = res;
        });
        registerFn(data, id as string);
        toast.success("Restaurant Updated");
      } catch (error) {
        console.error("Error updating restaurant:", error);
        toast.error("Failed to update restaurant");
      } finally {
        setLoadings(false);
      }
    },
  });

  // Handle changing featured image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      formik.setFieldValue("featuredImage", file);
    }
  };

  // Handle changing secondary image
  const handleSecondaryImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSecondaryImage(file);
      formik.setFieldValue("secondaryImages", file);
    }
  };

  // Handle selecting a location suggestion
  const handleSuggestions = (suggestion: any) => {
    const lat = suggestion.center[1];
    const lng = suggestion.center[0];
    const search = suggestion.place_name;
    formik.setValues({
      ...formik.values,
      place_name: search,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });
    setRestaurantDetails({ ...restaurantDetails, ["place_name"]: search });
    setLat(lat);
    setLng(lng);
    setLocation(search);
    setSuggestions([]);
  };

  // Reference for file input to clear value
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputFeaturedRef = useRef<HTMLInputElement>(null);

  // Clear featured image
  const handleRemoveFeaturedImage = () => {
    formik.setFieldValue("featuredImage", null);
    setImage(null);
    if (fileInputFeaturedRef.current) {
      fileInputFeaturedRef.current.value = "";
    }
  };

  // Clear secondary image
  const handleRemoveImage = () => {
    formik.setFieldValue("secondaryImages", null);
    setSecondaryImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle change of contact input
  const handleInputContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(restaurantDetails)
    setRestaurantDetails({ ...restaurantDetails, [name]: value });
    formik.setFieldValue(name, value);
  };

  // Handle change of restaurant name input
  const handleInputRestaurantNameChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setRestaurantDetails({ ...restaurantDetails, [name]: value });
    formik.setFieldValue(name, value);
  };

  // Handle change of table rate input
  const handleTableRate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurantDetails({ ...restaurantDetails, [name]: value });
    formik.setFieldValue(name, value);
  };

  // Handle change of address input
  const handleAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurantDetails({ ...restaurantDetails, [name]: value });
    formik.setFieldValue(name, value);
  };

  // Handle change of description input
  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurantDetails({ ...restaurantDetails, [name]: value });
    formik.setFieldValue(name, value);
  };

  // Handle change of opening time input
  const handleOpeningTime = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurantDetails({ ...restaurantDetails, [name]: value });
    formik.setFieldValue(name, value);
  };

  // Handle change of closing time input
  const handleClosingTime = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(value)
    setRestaurantDetails({ ...restaurantDetails, [name]: value });
    formik.setFieldValue(name, value);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation(value);
    setRestaurantDetails({ ...restaurantDetails, [name]: value });
    try {
      const data = await getLocations(e.target.value);
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  console.log(formik.errors)
  return (
    <div className="h-full pt-7 mt-32  mx-auto">
      <Toaster position="top-center" />
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
                <label className="block">Restaurant name</label>
                <input
                  type="text"
                  placeholder="Restaurant name"
                  className="input input-bordered input-warning w-full max-w-xs"
                  name="restaurantName"
                  onChange={handleInputRestaurantNameChange}
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
                  className="input input-bordered input-warning w-full max-w-xs cursor-not-allowed"
                  {...formik.getFieldProps("email")}
                  value={restaurantDetails.email}
                  readOnly
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
                  onChange={handleInputContactChange}
                  name="contact"
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
                  name="address"
                  onChange={handleAddress}
                  value={restaurantDetails.address}
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
                name="description"
                onChange={handleDescription}
                value={restaurantDetails.description}
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
                    value={restaurantDetails.place_name}
                    placeholder="place_name"
                    className="input input-bordered input-warning w-[300px] max-w-sm lg:max-w-[500px]"
                    name="place_name"
                    onChange={handleChange}
                  />
                  {formik.touched.place_name && formik.errors.place_name && (
                    <div className="text-red-500 text-sm pt-2">
                      {formik.errors.place_name}
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
                    name="openingTime"
                    onChange={handleOpeningTime}
                    value={restaurantDetails.openingTime}
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
                    name="closingTime"
                    onChange={handleClosingTime}
                    value={restaurantDetails.closingTime}
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
                name="TableRate"
                onChange={handleTableRate}
                value={restaurantDetails.TableRate}
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
              {restaurantDetails.featuredImage && (
                <img
                  className="w-[300px]"
                  src={restaurantDetails.featuredImage}
                  alt="Featured"
                />
              )}
              {formik.values.featuredImage &&
                !restaurantDetails.featuredImage &&
                !formik.errors.featuredImage && (
                  <>
                    <PreviewImage file={image} />
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
                onChange={handleImageChange}
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
              {restaurantDetails.secondaryImages && (
                <img
                  className="w-[300px]"
                  src={restaurantDetails.secondaryImages}
                  alt="Secondary"
                />
              )}
              {formik.values.secondaryImages &&
                !formik.errors.secondaryImages &&
                !restaurantDetails.featuredImage && (
                  <>
                    <SecondaryImages files={secondaryImage} />
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
                onChange={handleSecondaryImageChange}
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
                disabled={loadings}
              >
                {loadings ? "Loading" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
