import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "../../api/axios";
import { userTypesCredentials } from "../../types/userTypes";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { RiChatHistoryFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";
import BookingHistory from "./profile/BookingHistory";
import NavBar from "./layouts/NavBar";
import BookMarks from "./profile/BookMarks";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import logout from "../../utils/Logout";
import { useNavigate } from "react-router-dom";
import BookingDetailedView from "../../components/user/profile/BookingDetailedView" 

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const navigation = searchParams.get("list_name");
  const [userDetails, setUserDetails] = useState<userTypesCredentials | null>(
    null
  );
  const [nameInput, setNameInput] = useState(false);
  const [contactInput, setContactInput] = useState(false);
  const [name, setName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [contact, setContact] = useState<string | undefined>(undefined);
  const [navigationChange, setNavigationChange] = useState<string>("profile");
  const { isAuthenticated, role, id } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated && role === "user") {
          const response = await axios.get(`/api/user-profile/${id}`);
          setUserDetails(response.data.userData);
          if (response.data.userData) {
            setName(response.data.userData.username);
            setEmail(response.data.userData.email);
            setContact(response.data.userData.phone);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [nameInput, contactInput]);

  useEffect(() => {
    if (navigation) {
      setNavigationChange(navigation);
    }
  }, [navigation]);
  console.log(navigation); 
  const onEditName = () => {
    setNameInput(!nameInput);
  };

  const onEditContact = () => {
    setContactInput(!contactInput);
  };

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Name is required");
      return;
    }
    try {
      await axios.patch(`/api/update-userdetails/${id}`, {
        credentials: { username: name },
      });
      toast.success("Name Updated Successfully");
      setNameInput(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContactSubmit = async () => {
    if (!contact) {
      toast.error("Contact is required");
      return;
    } else if (contact.length !== 10) {
      toast.error("Invalid contact number");
      return;
    }
    try {
      await axios.patch(`/api/update-userdetails/${id}`, {
        credentials: { phone: contact },
      });
      toast.success("Contact Updated Successfully");
      setContactInput(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigation = (navigation: string) => {
    navigate(`/account/?list_name=${navigation}`);
    setNavigationChange(navigation);
  };

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(clearUser());
    logout("Logout Successfully completed");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  console.log(navigationChange); 
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>
      <div className="flex justify-center items-center min-h-screen  bg-gray-50 ">
        <div className="w-11/12 max-w-[1200px] h-[800px] mt-32   flex flex-row gap-6 overflow-hidden">
          <div className="w-1/3 ">
            <div className="bg-white shadow-xl shadow-neutral-300 p-6 rounded-lg">
              <div className="flex items-center gap-6">
                <div className="avatar relative cursor-pointer">
                  <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      alt="avatar"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="text-sm font-normal">
                  <p>Hello,</p>
                  <p className="text-sm font-bold">{userDetails?.username}</p>
                </div>
              </div>

              <div className="mt-6">
                <ul className="flex flex-col gap-4 text-sm font-semibold">
                  <li
                    className={`nav-item p-2 rounded-2xl cursor-pointer flex items-center ${
                      navigationChange === "profile"
                        ? "bg-gray-200 text-blue-400"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleNavigation("profile")}
                  >
                    <FaUserCircle size={20} /> &nbsp; Profile Details
                  </li>
                  <li
                    className={`nav-item p-2 rounded-2xl cursor-pointer flex items-center ${
                      navigationChange === "bookings"
                        ? "bg-gray-200 text-blue-400"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleNavigation("bookings")}
                  >
                    <RiChatHistoryFill size={21} /> &nbsp; Booking History
                  </li>
                  <li
                    className={`nav-item p-2 rounded-2xl cursor-pointer flex items-center ${
                      navigationChange === "bookmarks"
                        ? "bg-gray-200 text-blue-400"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleNavigation("bookmarks")}
                  >
                    <FaBookmark size={20} /> &nbsp; Bookmarks
                  </li>
                  <li
                    className={`nav-item p-2 rounded-2xl cursor-pointer flex items-center ${
                      navigationChange === "data"
                        ? "bg-gray-200 text-blue-400"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleNavigation("data")}
                  >
                    <BsBoxFill /> &nbsp; Order History
                  </li>
                  <li
                    className="nav-item p-2 rounded-2xl cursor-pointer flex items-center hover:bg-gray-200"
                    onClick={handleClick}
                  >
                    <RiLogoutBoxRFill
                      size={20}
                      className="hover:text-red-600"
                    />{" "}
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-2/3 overflow-y-auto">
            <div className="bg-white shadow-xl shadow-neutral-300 p-5 rounded-lg">
              {navigationChange === "profile" && (
                <div className="flex flex-col gap-10">
                  <div className="flex items-center gap-5">
                    <h1 className="text-xl font-bold">Personal Info</h1>
                    {!nameInput ? (
                      <p
                        className="text-green-500 font-bold text-sm cursor-pointer"
                        onClick={onEditName}
                      >
                        Edit ✏
                      </p>
                    ) : (
                      <p
                        className="text-red-500 font-bold text-sm cursor-pointer"
                        onClick={onEditName}
                      >
                        Cancel
                      </p>
                    )}
                  </div>
                  <div>
                    {!nameInput ? (
                      <input
                        type="text"
                        id="disabled-input"
                        className="border cursor-not-allowed border-blue-400 rounded-lg bg-neutral-100 outline-none p-3 w-[300px] text-sm"
                        disabled
                        value={userDetails?.username}
                      />
                    ) : (
                      <>
                        <input
                          type="text"
                          id="disabled-input"
                          className="border border-neutral-400 bg-neutral-100 outline-none p-3 w-[300px] text-sm"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <button
                          className="font-bold text-white bg-red-500 rounded-lg p-3"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-5">
                    <h1 className="text-xl font-bold">Email Address</h1>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="disabled-input"
                      className="border cursor-not-allowed rounded-lg border-blue-400 bg-neutral-100 outline-none p-3 w-[300px] text-sm"
                      value={email}
                      disabled
                    />
                  </div> 

                  <div className="flex items-center gap-5">
                    <h1 className="text-xl font-bold">Contact</h1>
                    {contact === undefined ? (
                      !contactInput ? (
                        <p
                          className="text-green-500 font-bold text-base cursor-pointer"
                          onClick={onEditContact}
                        >
                          Add
                        </p>
                      ) : (
                        <p
                          className="text-red-500 font-bold text-sm cursor-pointer"
                          onClick={onEditContact}
                        >
                          Cancel
                        </p>
                      )
                    ) : !contactInput ? (
                      <p
                        className="text-green-500 font-bold text-base cursor-pointer"
                        onClick={onEditContact}
                      >
                        Edit ✏
                      </p>
                    ) : (
                      <p
                        className="text-red-500 font-bold text-sm cursor-pointer"
                        onClick={onEditContact}
                      >
                        Cancel
                      </p>
                    )}
                  </div>
                  <div>
                    {!contactInput ? (
                      <input
                        type="text"
                        id="disabled-input"
                        className="border cursor-not-allowed rounded-lg border-blue-400 bg-neutral-100 outline-none p-3 w-[300px] text-sm"
                        disabled
                        value={contact}
                      />
                    ) : (
                      <>
                        <input
                          type="text"
                          id="disabled-input"
                          className="border border-neutral-400 bg-neutral-100 outline-none p-3 w-[300px] text-sm"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                        <button
                          className="font-bold text-white bg-red-500 rounded-lg p-3"
                          onClick={handleContactSubmit}
                        >
                          Submit
                        </button>
                      </>
                    )}
                  </div>

                  <div>
                    <Link to="/reset-password">
                      <button className="font-bold text-white bg-red-500 rounded-lg p-3">
                        Change Password
                      </button>
                    </Link>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="pl-3 text-sm font-bold">FAQS</p>
                    <div className="text-xs p-3">
                      What happens when I update my email address (or mobile
                      number)? Your login email id (or mobile number) changes,
                      likewise. You'll receive all your account related
                      communication on your updated email address (or mobile
                      number).
                    </div>
                    <div className="flex justify-center">
                      . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                      . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                      . . . . . . . . . . . . . . . . . . . . .
                    </div>
                  </div>
                </div>
              )}
              {navigationChange === "bookings" && (
                <>
                  <h1 className="text-2xl font-bold text-black mb-4">
                    Booking History
                  </h1>
                  <div className="max-h-[700px] overflow-y-auto">
                    <BookingHistory />
                  </div>
                </>
              )}
              {navigationChange === "bookmarks" && (
                <>
                  <h1 className="text-2xl font-bold text-black mb-4">
                    {navigationChange}
                  </h1>
                  <div className="max-h-[700px] overflow-y-auto">
                    <BookMarks />
                  </div>
                </>
              )}
              {navigationChange.startsWith("bookings/") && (
                <>
                  <div className="max-h-[700px] overflow-y-auto">
                    <BookingDetailedView bookingId={navigationChange.split('/')[1]} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
