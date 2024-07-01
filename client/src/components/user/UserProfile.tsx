import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import axios from "../../api/axios";
import { userTypesCredentials } from "../../types/userTypes";

const UserProfile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<userTypesCredentials | null>(null);
  const [nameInput, setNameInput] = useState(false);
  const [contactInput, setContactInput] = useState(false);
  const [name, setName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [contact, setContact] = useState<string | undefined>(undefined);
  const {isAuthenticated , role ,id} = useSelector((state : RootState)=> state.user) 
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id)
        if(isAuthenticated && role == "user"){
          const response = await axios.get(`/api/user-profile/${id}`);
          setUserDetails(response.data.userData);
          if (response.data.userData) {
            setName(response.data.userData.username);
            setEmail(response.data.userData.email);
            setContact(response.data.userData.phone);
          }
        }
      } catch (error) {
        console.log(error)   
        // toast.error(error?.response?.data?.message);
      }
    };
    fetchData();
  }, [nameInput ,contactInput]);

  const onEditName = () => {
    setNameInput(!nameInput);
  };

  const onEditContact = () => {
    setContactInput(!contactInput);
  };

  const handleSubmit = () => {
    if (!name) {
      toast.error("Name is required");
      return;
    }
    toast.success("Name Updated Successfully");
    console.log(name)
    axios.put("/api/update-userdetails/666ec3c4971da755495ea9bd",{credentials : {username : name}})
    setNameInput(false); 
  };


  const handleContactSubmit = () => {
    if (!contact ) {
      toast.error("Contact is required");
      return;
    }else if(contact.length !== 10){
      toast.error("Invalid contact number");
      return;
    }
    toast.success("Contact Updated Successfully");
    axios.put("/api/update-userdetails/666ec3c4971da755495ea9bd",{credentials : {phone : contact}})
    setContactInput(false); 
  };

  return (
    <div className="h-full">
      <Toaster reverseOrder={true} />
      <div className="h-[900px] bg-gray-200 pt-2">
        <div className="h-full mx-auto mt-20 w-[1200px] flex flex-row">
          <div className="flex flex-col w-[400px] gap-6 p-5">
            <div className="w-full h-36 bg-white shadow-xl shadow-neutral-300 flex flex-row gap-5 items-center">
              <div className="avatar pl-10 pt-10 pb-10 flex flex-col relative cursor-pointer">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="avatar" />
                </div>
                <p className="text-red-500 absolute bottom-3 right-0 flex flex-row items-center cursor-pointer text-sm font-bold" onClick={onEditName}>
                  Edit ✏
                </p>
              </div>
              <div className="text-sm font-normal">
                <p>Hello,</p>
                <p className="text-sm font-bold">{userDetails?.username}</p>
              </div>
            </div>
            <div className="p-20 w-full h-[600px] bg-white shadow-xl shadow-neutral-300 flex flex-col gap-10 text-lg font-bold text-blue-500 items-center">
              <div className="w-[200px] px-10 pt-1 h-10 hover:bg-black">
                Account
              </div>
              <div className="w-[200px] px-10 pt-1 h-10 hover:bg-black">
                Bookings
              </div>
              <div className="w-[200px] px-10 pt-1 h-10 hover:bg-black">
                Transactions
              </div>
              <div className="w-[200px] px-10 pt-1 h-10 hover:bg-black">
                Settings
              </div>
              <div className="w-[200px] px-10 pt-1 h-10 hover:bg-black">
                Logout
              </div>
            </div>
          </div>

          <div className="w-[800px] h-[770px] bg-white shadow-xl shadow-neutral-300 mt-5">
            <div className="flex flex-col gap-6">
              <div className="flex pl-14 pt-14 items-center gap-5">
                <h1 className="text-xl font-bold">Personal Info</h1>
                {!nameInput ? (
                  <p className="text-red-500 font-bold text-sm cursor-pointer" onClick={onEditName}>
                    Edit ✏
                  </p>
                ) : (
                  <p className="text-red-500 font-bold text-sm cursor-pointer" onClick={onEditName}>
                    Cancel
                  </p>
                )}
              </div>
              <div className="pl-14">
                {!nameInput ? (
                  <input
                    type="text"
                    id="disabled-input"
                    className="border cursor-not-allowed border-neutral-400 bg-neutral-100 outline-none p-3 w-[300px] text-sm"
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
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex pl-14 pt-14 items-center gap-5">
                <h1 className="text-xl font-bold">Email Address</h1>
              </div>
              <div className="pl-14">
                <input
                  type="text"
                  id="disabled-input"
                  className="border cursor-not-allowed border-neutral-400 bg-neutral-100 outline-none p-3 w-[300px] text-sm"
                  value={email}
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex pl-14 pt-14 items-center gap-5">
                <h1 className="text-xl font-bold">Contact</h1>
                {contact == undefined ? (
                  !contactInput ?   (
                    <p className="text-green-500 font-bold text-base cursor-pointer" onClick={onEditContact}>
                    Add
                    </p>
                  ) : (
                    <p className="text-red-500 font-bold text-sm cursor-pointer" onClick={onEditContact}>
                    Cancel
                    </p>
                  )
                ):(
                  !contactInput ?   (
                    <p className="text-green-500 font-bold text-base cursor-pointer" onClick={onEditContact}>
                    Edit ✏
                    </p>
                  ) : (
                    <p className="text-red-500 font-bold text-sm cursor-pointer" onClick={onEditContact}>
                    Cancel
                    </p>
                  )
                )}
              </div>
              <div className="pl-14">
                {!contactInput ? (
                  <input
                    type="text"
                    id="disabled-input"
                    className="border cursor-not-allowed border-neutral-400 bg-neutral-100 outline-none p-3 w-[300px] text-sm"
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
            </div>
            <div className="flex flex-col gap-6">
              <Link to="/reset-password">
                <div className="flex pl-14 pt-14 items-center gap-5">
                  <button className="font-bold text-white bg-red-500 rounded-lg p-3">
                    Change Password
                  </button>
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col pl-14 pt-14 gap-1">
                <div>
                  <p className="pl-3 text-sm font-bold ">FAQS</p>
                </div>
                <div>
                  <p className="text-xs p-3">
                    What happens when I update my email address (or mobile
                    number)? Your login email id (or mobile number) changes,
                    likewise. You'll receive all your account related
                    communication on your updated email address (or mobile
                    number).
                  </p>
                  <p className="flex justify-center">
                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . . .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
